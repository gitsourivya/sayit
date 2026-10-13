import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
const model = process.env.GEMINI_MODEL || "gemini-3.8-flash";

const allowedTones = ["gentle", "confident", "direct"];

export async function POST(request: Request) {
  try {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return NextResponse.json(
        { error: "Gemini API key is not configured." },
        { status: 500 }
      );
    }

    const body = await request.json();

    const situation =
      typeof body.situation === "string" ? body.situation.trim() : "";

    const tone =
      typeof body.tone === "string" ? body.tone.toLowerCase() : "";

    if (!situation || situation.length > 2000) {
      return NextResponse.json(
        { error: "Enter a situation of up to 2000 characters." },
        { status: 400 }
      );
    }

    if (!allowedTones.includes(tone)) {
      return NextResponse.json(
        { error: "Please select a valid tone." },
        { status: 400 }
      );
    }

    const ai = new GoogleGenAI({ apiKey });

    const prompt = `You are SayIt, a thoughtful communication coach.

Help the user express themselves naturally in this situation:
${situation}

Preferred tone: ${tone}.

Generate exactly three distinct, ready-to-send replies:
1. Gentle
2. Confident
3. Direct

Use natural conversational language. Respect the user's boundaries.
Do not invent facts or assume another person's motives.
Keep each response to 1–3 concise sentences.
If the situation suggests a risk of harm, prioritize safety.

Return ONLY valid JSON matching this structure:
{
  "responses": [
    { "tone": "Gentle", "text": "A natural reply" },
    { "tone": "Confident", "text": "A natural reply" },
    { "tone": "Direct", "text": "A natural reply" }
  ]
}

Do not include Markdown, code fences, comments, or extra properties.
Ensure the JSON is complete and all string values are properly escaped.`;

    // Prevent the frontend from waiting indefinitely.
    const timeoutSignal = AbortSignal.timeout(30_000);

   
let result;

for (let attempt = 1; attempt <= 3; attempt++) {
  try {
    result = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        temperature: 0.4,
        maxOutputTokens: 1200,
      },
    });

    break;
  } catch (error) {
    const status =
      typeof error === "object" &&
      error !== null &&
      "status" in error
        ? error.status
        : undefined;

    const retryable = [429, 500, 502, 503, 504].includes(
      Number(status)
    );

    if (!retryable || attempt === 3) {
      throw error;
    }

    // Wait 1 second, then 2 seconds before retrying.
    await new Promise((resolve) =>
      setTimeout(resolve, attempt * 1000)
    );
  }
}

if (!result) {
  throw new Error("Gemini did not return a result.");
}


    const text = result.text;

    if (!text) {
      console.error("Gemini returned an empty response.");
      return NextResponse.json(
        { error: "The AI returned an empty response. Please try again." },
        { status: 502 }
      );
    }

    let parsed: unknown;

    try {
      parsed = JSON.parse(text);
    } catch {
      console.error("Gemini returned invalid JSON:", text);

      return NextResponse.json(
        {
          error: "The AI returned an incomplete response. Please try again.",
        },
        { status: 502 }
      );
    }

    if (
      typeof parsed !== "object" ||
      parsed === null ||
      !("responses" in parsed) ||
      !Array.isArray(parsed.responses) ||
      parsed.responses.length !== 3 ||
      !parsed.responses.every(
        (item: unknown) =>
          typeof item === "object" &&
          item !== null &&
          "tone" in item &&
          "text" in item &&
          typeof item.tone === "string" &&
          typeof item.text === "string" &&
          item.text.trim().length > 0
      )
    ) {
      console.error("Gemini returned an invalid response format.");

      return NextResponse.json(
        { error: "The AI returned an invalid response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error("SayIt generation error:", error);

    if (error instanceof Error && error.name === "TimeoutError") {
      return NextResponse.json(
        { error: "The AI took too long to respond. Please try again." },
        { status: 504 }
      );
    }

    return NextResponse.json(
      { error: "Couldn't generate replies. Please try again." },
      { status: 500 }
    );
  }
}