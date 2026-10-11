"use client";

import { useState } from "react";

type ResponseOption = {
  tone: string;
  text: string;
};

const tones = ["Gentle", "Confident", "Direct"];

export default function Home() {
  const [situation, setSituation] = useState("");
  const [tone, setTone] = useState("Confident");
  const [responses, setResponses] = useState<ResponseOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(-1);

  async function generateResponses() {
    if (!situation.trim()) {
      setError("Tell us a little about your situation first.");
      return;
    }

    if (situation.trim().length > 2000) {
      setError("Please keep your situation under 2000 characters.");
      return;
    }

    setLoading(true);
    setError("");
    setResponses([]);
    setCopied(-1);

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          situation: situation.trim(),
          tone: tone.toLowerCase(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.error || "Couldn't generate replies. Please try again."
        );
      }

      if (
        !Array.isArray(data.responses) ||
        data.responses.length !== 3
      ) {
        throw new Error("The AI returned an unexpected response. Try again.");
      }

      setResponses(data.responses);
      setTimeout(() => {
        document
          .getElementById("responses")
          ?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 100);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  }

  async function copyResponse(text: string, index: number) {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(index);
      setTimeout(() => setCopied(-1), 1800);
    } catch {
      setError("Couldn't copy automatically. Please select and copy the text.");
    }
  }

  return (
    <main className="min-h-screen bg-[#faf7f2] text-[#30212d]">
      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <a href="#" className="text-3xl font-bold tracking-tight">
          sayit<span className="text-[#bd7189]">.</span>
        </a>

        <div className="flex gap-6 text-sm text-[#766974]">
          <a href="#how-it-works" className="hover:text-[#30212d]">
            How it works
          </a>
          <a href="#about" className="hover:text-[#30212d]">
            About
          </a>
        </div>
      </nav>

      {/* Hero and input form */}
      <section className="mx-auto max-w-4xl px-6 pb-16 pt-16 text-center sm:pt-24">
        <p className="mb-5 text-xs font-semibold uppercase tracking-[0.25em] text-[#b66c83]">
          Your words, your boundaries
        </p>

        <h1 className="font-serif text-5xl leading-tight tracking-tight sm:text-7xl">
          Not sure how to
          <br />
          <span className="italic text-[#b66c83]">say it?</span>
        </h1>

        <p className="mx-auto mt-6 max-w-lg text-base leading-7 text-[#766974] sm:text-lg">
          Tell us what&apos;s happening. We&apos;ll help you find the words.
          For the conversations you&apos;ve been putting off.
        </p>

        <div className="mx-auto mt-12 max-w-2xl rounded-3xl border border-[#e9dfdf] bg-white p-5 text-left shadow-sm sm:p-7">
          <label
            htmlFor="situation"
            className="mb-3 block text-sm font-semibold"
          >
            What&apos;s the situation?
          </label>

          <textarea
            id="situation"
            value={situation}
            onChange={(event) => setSituation(event.target.value)}
            placeholder="My friend keeps cancelling plans at the last minute..."
            maxLength={2000}
            rows={4}
            aria-describedby="character-count"
            className="w-full resize-y rounded-2xl border border-[#eee5e4] bg-[#fdfbf9] p-4 text-sm leading-6 outline-none transition focus:border-[#bd8294] focus:ring-2 focus:ring-[#bd8294]/15"
          />

          <p
            id="character-count"
            className="mt-2 text-right text-xs text-[#948792]"
          >
            {situation.length}/2000
          </p>

          <div className="mt-5">
            <p className="mb-3 text-sm font-semibold">
              How do you want to sound?
            </p>

            <div className="flex flex-wrap gap-2">
              {tones.map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={tone === option}
                  onClick={() => setTone(option)}
                  className={`rounded-full border px-5 py-2 text-sm transition ${
                    tone === option
                      ? "border-[#6c4058] bg-[#6c4058] text-white"
                      : "border-[#e8dede] bg-white text-[#766974] hover:border-[#bd8294]"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={generateResponses}
            disabled={loading}
            className="mt-7 w-full rounded-full bg-[#6c4058] px-6 py-4 text-sm font-semibold text-white transition hover:bg-[#543047] disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Finding your words..." : "Help me find the words"}
            {!loading && <span aria-hidden="true"> ↗</span>}
          </button>

          {error && (
            <p
              role="alert"
              className="mt-4 text-center text-sm text-red-700"
            >
              {error}
            </p>
          )}

          <p className="mt-4 text-center text-xs leading-5 text-[#948792]">
            Your situation matters. Avoid sharing names or sensitive personal
            details.
          </p>
        </div>
      </section>

      {/* AI-generated responses */}
      <section
        id="responses"
        className="mx-auto max-w-6xl scroll-mt-8 px-6 pb-24"
      >
        <div className="mb-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#b66c83]">
            Your words, your way
          </p>

          <h2 className="mt-3 font-serif text-3xl sm:text-4xl">
            There&apos;s more than one way to say it.
          </h2>

          <p className="mt-3 text-sm text-[#948792]">
            Thoughtful replies, tailored to your situation.
          </p>
        </div>

        {loading && (
          <div
            role="status"
            className="py-10 text-center text-sm text-[#766974]"
          >
            <p className="text-lg">Finding the right words...</p>
            <p className="mt-2">
              Give us a moment to think this through.
            </p>
          </div>
        )}

        {!loading && responses.length > 0 && (
          <div className="grid gap-5 md:grid-cols-3">
            {responses.map((response, index) => (
              <article
                key={`${response.tone}-${index}`}
                className="flex flex-col rounded-3xl border border-[#e9dfdf] bg-white p-6"
              >
                <div className="mb-5 flex items-center justify-between">
                  <h3 className="font-semibold">{response.tone}</h3>
                  <span className="text-xs text-[#b66c83]">
                    0{index + 1}
                  </span>
                </div>

                <p className="flex-1 whitespace-pre-wrap text-sm leading-7 text-[#766974]">
                  {response.text}
                </p>

                <button
                  type="button"
                  onClick={() => copyResponse(response.text, index)}
                  className="mt-6 rounded-full border border-[#e8dede] px-4 py-2.5 text-sm transition hover:bg-[#faf7f2]"
                >
                  {copied === index ? "Copied ✓" : "Copy response"}
                </button>
              </article>
            ))}
          </div>
        )}

        {!loading && responses.length === 0 && !error && (
          <p className="text-center text-sm text-[#948792]">
            Your replies will appear here when you&apos;re ready.
          </p>
        )}
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="border-t border-[#e9dfdf] px-6 py-16 text-center"
      >
        <h2 className="font-serif text-3xl">
          A little clarity goes a long way.
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-[#766974]">
          Describe the moment. Choose your tone. Find words that feel like you.
          SayIt is here to help you communicate, not tell you what to feel.
        </p>
      </section>

      {/* Footer */}
      <footer
        id="about"
        className="border-t border-[#e9dfdf] px-6 py-7 text-center text-xs text-[#948792]"
      >
        sayit. · Find your words. Keep your boundaries.
      </footer>
    </main>
  );
}
