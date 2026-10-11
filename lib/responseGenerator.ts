import { ResponseCardData, Tone } from '../types';

interface GenerationParams {
  situation: string;
  relationship?: string;
  tone: Tone;
}

// Helper to sanitize/extract key themes
function detectTheme(situation: string, relationship?: string): {
  isWork: boolean;
  isDating: boolean;
  isFriend: boolean;
  isHome: boolean;
  isFinancial: boolean;
} {
  const text = `${situation} ${relationship || ''}`.toLowerCase();
  return {
    isWork: /boss|manager|client|coworker|colleague|project|deadline|meeting|work|office|email/.test(text),
    isDating: /date|dating|tinder|hinge|boyfriend|partner|ex|guy|girl|flirt|romantic/.test(text),
    isFriend: /friend|pal|buddy|bestie|group chat|hangout|dinner|party/.test(text),
    isHome: /roommate|landlord|apartment|rent|kitchen|dishes|noise|lease|housemate|radiator|repair/.test(text),
    isFinancial: /money|borrow|loan|split|bill|reimburse|pay|venmo|dinner/.test(text),
  };
}

export function generateResponses({ situation, relationship, tone }: GenerationParams): ResponseCardData[] {
  const themes = detectTheme(situation, relationship);
  const recipient = relationship?.trim() ? relationship.trim() : 'them';

  // Base generator pool depending on tone & detected theme
  if (tone === 'gentle') {
    if (themes.isWork) {
      return [
        {
          id: `res-gentle-1-${Date.now()}`,
          tone: 'gentle',
          badge: 'Soft & Empathetic',
          content:
            `“Thank you for looping me in. I want to make sure this gets the thoughtful attention it deserves, so I've scheduled time first thing Monday morning to dive into it properly. Please let me know if there's any critical context before then!”`,
          explanation: 'Demonstrates accountability and dedication while respectfully guarding non-working hours without anxiety.',
          deliveryTip: 'Send as a scheduled message or a prompt end-of-day email response.',
          wordCount: 38,
        },
        {
          id: `res-gentle-2-${Date.now()}`,
          tone: 'gentle',
          badge: 'Collaborative & Understanding',
          content:
            `“I appreciate how much is on everyone's plate right now. My current capacity is focused on delivering our key priorities, so I won't be able to turn this around tonight. I'll pick this up right at the start of next week.”`,
          explanation: 'Frames the delay around quality and existing commitments rather than personal unavailability.',
          deliveryTip: 'Warm and professional; leaves no room for guilt.',
          wordCount: 42,
        },
        {
          id: `res-gentle-3-${Date.now()}`,
          tone: 'gentle',
          badge: 'Warm & Reassuring',
          content:
            `“Received! I'm away from my desk for the evening, but I have this on my top priority list for Monday morning. Have a restful weekend!”`,
          explanation: 'A brisk, reassuring check-in that confirms receipt without opening the door to live weekend back-and-forth.',
          deliveryTip: 'Great for Slack, Teams, or quick email replies.',
          wordCount: 28,
        },
      ];
    }

    if (themes.isDating) {
      return [
        {
          id: `res-gentle-1-${Date.now()}`,
          tone: 'gentle',
          badge: 'Warm & Honest',
          content:
            `“I've really enjoyed spending time with you and getting to know you. I naturally move a bit more slowly and like keeping some breathing room in my week, so please don't take it personally if I'm not on my phone much. Looking forward to our next chat!”`,
          explanation: 'Reassures interest while clearly defining your natural communication pace so you never feel pressured.',
          deliveryTip: 'Text during mid-day when both of you are relaxed, not late at night.',
          wordCount: 47,
        },
        {
          id: `res-gentle-2-${Date.now()}`,
          tone: 'gentle',
          badge: 'Gentle Boundary',
          content:
            `“You're so sweet to check in! I tend to be pretty offline during my personal time, but I wanted to say hi and let you know I appreciate you thinking of me. Hope your day is going well!”`,
          explanation: 'Acknowledges their sweetness without committing to instantaneous texting habits.',
          deliveryTip: 'Warm, positive, and defuses any feeling of rejection.',
          wordCount: 36,
        },
        {
          id: `res-gentle-3-${Date.now()}`,
          tone: 'gentle',
          badge: 'Kind & Clear',
          content:
            `“I appreciate your honesty so much! I want to be open with you too—I prefer to take things one date at a time without rushing ahead. Let's see how our next hangout feels!”`,
          explanation: 'Models openness and healthy emotional pacing without being defensive.',
          deliveryTip: 'Direct yet tender; fosters respectful mutual expectations.',
          wordCount: 33,
        },
      ];
    }

    if (themes.isHome) {
      return [
        {
          id: `res-gentle-1-${Date.now()}`,
          tone: 'gentle',
          badge: 'Warm & Neighborly',
          content:
            `“Hey! Hope your day is going well. Just wanted to check in about the common spaces—I know we're both busy, but could we make a shared effort to clear cookware after cooking? It makes coming home so much more peaceful for both of us. Thank you!”`,
          explanation: 'Approaches the issue as a shared team goal for a peaceful home rather than an accusation.',
          deliveryTip: 'Pair with a warm face-to-face smile or friendly text when things are calm.',
          wordCount: 48,
        },
        {
          id: `res-gentle-2-${Date.now()}`,
          tone: 'gentle',
          badge: 'Considerate Request',
          content:
            `“Hi! Just a gentle nudge regarding the maintenance issue we spoke about. It's impacting daily routines a bit, so I'd really appreciate an update on when someone might come by. Thanks for your help!”`,
          explanation: 'Polite and patient, giving the recipient the benefit of the doubt while asking for a concrete timeline.',
          deliveryTip: 'Clear written paper trail with friendly tone.',
          wordCount: 37,
        },
        {
          id: `res-gentle-3-${Date.now()}`,
          tone: 'gentle',
          badge: 'Casual & Friendly',
          content:
            `“Quick favor—could you please take care of the sink before heading out today? I need to use the counter for prep later. Really appreciate it!”`,
          explanation: 'Focuses on a specific practical necessity rather than general frustration.',
          deliveryTip: 'Lighthearted and quick, avoiding built-up resentment.',
          wordCount: 26,
        },
      ];
    }

    // Default gentle
    return [
      {
        id: `res-gentle-1-${Date.now()}`,
        tone: 'gentle',
        badge: 'Warm & Empathetic',
        content:
          `“Thank you for sharing this with me and for your patience. I've taken some time to reflect on it, and while I understand where you're coming from, I need to prioritize what works best for me right now. I hope you can understand, and I truly wish you the best with it.”`,
        explanation: 'Expresses empathy and understanding while firmly declining without over-apologizing.',
        deliveryTip: 'Speak or write from a place of calm center; you do not owe an elaborate excuse.',
        wordCount: 48,
      },
      {
        id: `res-gentle-2-${Date.now()}`,
        tone: 'gentle',
        badge: 'Soft Boundary',
        content:
          `“I care about our relationship and want to be upfront with you: I don't have the emotional or practical bandwidth to take this on right now. Let's reconnect when things feel lighter!”`,
        explanation: 'Frames the limit around your current capacity, preserving personal goodwill.',
        deliveryTip: 'Affectionate and honest. Prevents unnecessary resentment.',
        wordCount: 33,
      },
      {
        id: `res-gentle-3-${Date.now()}`,
        tone: 'gentle',
        badge: 'Kind & Clear',
        content:
          `“I really appreciate you asking, but I'm going to pass on this one. Thank you for thinking of me!”`,
        explanation: 'Short, sweet, and graceful. Leaves zero room for debate.',
        deliveryTip: 'Simple is powerful. Resist the impulse to add justification.',
        wordCount: 18,
      },
    ];
  }

  if (tone === 'confident') {
    if (themes.isWork) {
      return [
        {
          id: `res-conf-1-${Date.now()}`,
          tone: 'confident',
          badge: 'Grounded & Professional',
          content:
            `“Hi team, I've logged this request and will prioritize it first thing on Monday morning when our full team is back online. If there are specific assets needed before then, please let me know by 5 PM today so we're set up for success.”`,
          explanation: 'Commands professional respect by owning your schedule and setting proactive expectations.',
          deliveryTip: 'Projects calm leadership and time management.',
          wordCount: 44,
        },
        {
          id: `res-conf-2-${Date.now()}`,
          tone: 'confident',
          badge: 'Firm & Composed',
          content:
            `“Thanks for flagging this. Given our project priorities, my focus today is completing our sprint deliverables. I'll review this alongside next week's workload and confirm an estimated completion date on Monday.”`,
          explanation: 'Anchors decisions in agreed-upon business priorities rather than personal availability.',
          deliveryTip: 'Assertive, clear, and unassailable in a corporate environment.',
          wordCount: 36,
        },
        {
          id: `res-conf-3-${Date.now()}`,
          tone: 'confident',
          badge: 'Clear Boundaries',
          content:
            `“I am stepping away for the weekend and will pick this up when I return on Monday. Have a good weekend everyone.”`,
          explanation: 'Calm, transparent, and normalized. Shows that downtime is standard and expected.',
          deliveryTip: 'Zero fluff, zero guilt.',
          wordCount: 22,
        },
      ];
    }

    if (themes.isDating) {
      return [
        {
          id: `res-conf-1-${Date.now()}`,
          tone: 'confident',
          badge: 'Poised & Intentional',
          content:
            `“I've enjoyed getting to know you, but I want to be honest: I'm looking for a steady, relaxed pace where we both have room for our own routines. When messages feel constant, it feels a bit fast for me. I'd love to stay in touch, but at a more balanced rhythm.”`,
          explanation: 'Clear self-awareness delivered without anger. Gives the other person a respectful roadmap.',
          deliveryTip: 'Direct communication builds mutual respect early on.',
          wordCount: 52,
        },
        {
          id: `res-conf-2-${Date.now()}`,
          tone: 'confident',
          badge: 'Self-Assured',
          content:
            `“Thanks for the note! I'm pretty intentional about my offline time during the week, so I usually catch up on messages in the evenings. Talk soon!”`,
          explanation: 'Establishes personal habits without apologizing for having a life outside texting.',
          deliveryTip: 'Friendly and completely non-defensive.',
          wordCount: 27,
        },
        {
          id: `res-conf-3-${Date.now()}`,
          tone: 'confident',
          badge: 'Clear Decision',
          content:
            `“It was great meeting you, but I don't feel the romantic spark I'm looking for. I wanted to be straightforward out of respect for your time. Wishing you all the very best!”`,
          explanation: 'The gold standard closure: kind, honest, decisive, and polite.',
          deliveryTip: 'Clean closure allows both people to move forward gracefully.',
          wordCount: 32,
        },
      ];
    }

    if (themes.isHome) {
      return [
        {
          id: `res-conf-1-${Date.now()}`,
          tone: 'confident',
          badge: 'Constructive & Firm',
          content:
            `“Hi! For our shared space to work comfortably, we need dishes and cookware cleared and washed within a few hours of use. Let's make sure that's the standard we're both sticking to going forward.”`,
          explanation: 'Sets standard household norms with calm authority rather than resentment.',
          deliveryTip: 'Clear expectations create comfortable shared living.',
          wordCount: 34,
        },
        {
          id: `res-conf-2-${Date.now()}`,
          tone: 'confident',
          badge: 'Professional Follow-up',
          content:
            `“Following up on my previous message from last week regarding the repair. As this is directly affecting habitability, I need a confirmed date and time window for the technician by tomorrow end-of-day. Thank you.”`,
          explanation: 'Establishes clear deadlines and a recorded trail for property management.',
          deliveryTip: 'Sent in writing (email or portal) for documentation.',
          wordCount: 36,
        },
        {
          id: `res-conf-3-${Date.now()}`,
          tone: 'confident',
          badge: 'Decisive Request',
          content:
            `“Please clean up the kitchen cookware before tonight so the counters are open for dinner. Appreciate you getting it taken care of.”`,
          explanation: 'Polite, clear, and action-oriented.',
          deliveryTip: 'Leaves no doubt about the timeline needed.',
          wordCount: 21,
        },
      ];
    }

    // Default confident
    return [
      {
        id: `res-conf-1-${Date.now()}`,
        tone: 'confident',
        badge: 'Grounded & Assertive',
        content:
          `“I've thought this through carefully, and I've decided this isn't the right fit for me. I respect your perspective, and I'm letting you know now so you can make your arrangements accordingly.”`,
        explanation: 'Owns your agency with poise. Clear, respectful, and decisive.',
        deliveryTip: 'Deliver with steady confidence; avoid minimizing with "just" or "sorry".',
        wordCount: 34,
      },
      {
        id: `res-conf-2-${Date.now()}`,
        tone: 'confident',
        badge: 'Clear Boundary',
        content:
          `“I value our relationship, which is why I'm being direct: I won't be able to commit to this. Let's focus on what we previously agreed on.”`,
        explanation: 'Signals strength and maturity while preserving relationship boundaries.',
        deliveryTip: 'Direct, composed, and unshakeable.',
        wordCount: 26,
      },
      {
        id: `res-conf-3-${Date.now()}`,
        tone: 'confident',
        badge: 'Succinct & Sure',
        content:
          `“That doesn't work for my schedule, so I won't be able to participate. Best of luck moving forward!”`,
        explanation: 'Simple refusal that is neither harsh nor apologetic.',
        deliveryTip: 'Clean and empowering.',
        wordCount: 16,
      },
    ];
  }

  // Tone === 'direct'
  if (themes.isWork) {
    return [
      {
        id: `res-dir-1-${Date.now()}`,
        tone: 'direct',
        badge: 'Concise & Unambiguous',
        content:
          `“I am off the clock until Monday morning. I will review this as soon as I return to my desk.”`,
        explanation: 'Straight to the point. Establishes unambiguous working boundaries.',
        deliveryTip: 'Use for off-hours messages where clarity is paramount.',
        wordCount: 18,
      },
      {
        id: `res-dir-2-${Date.now()}`,
        tone: 'direct',
        badge: 'Focused & Firm',
        content:
          `“I cannot take on this deliverable with the current turnaround time. If this is a priority, which existing task should I deprioritize?”`,
        explanation: 'Transfers the prioritization decision back to the requester where it belongs.',
        deliveryTip: 'Highly effective with managers and demanding clients.',
        wordCount: 24,
      },
      {
        id: `res-dir-3-${Date.now()}`,
        tone: 'direct',
        badge: 'Clean Closure',
        content:
          `“I'm not available for this project. Please reassign it to ensure deadlines are met.”`,
        explanation: 'Zero ambiguity. Prevents delay while keeping project moving.',
        deliveryTip: 'Clear, direct, and professional.',
        wordCount: 14,
      },
    ];
  }

  if (themes.isHome) {
    return [
      {
        id: `res-dir-1-${Date.now()}`,
        tone: 'direct',
        badge: 'Direct & Action-Oriented',
        content:
          `“Please wash and put away your dishes from yesterday. The sink needs to be clear for everyone to use.”`,
        explanation: 'Removes all passive-aggressive subtext and states the straightforward expectation.',
        deliveryTip: 'Direct, neutral, without emotional heat.',
        wordCount: 19,
      },
      {
        id: `res-dir-2-${Date.now()}`,
        tone: 'direct',
        badge: 'Firm Formal Notice',
        content:
          `“The issue reported on ${new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} remains unresolved. Please confirm the scheduled repair date by 5 PM today.”`,
        explanation: 'Provides factual timestamp and explicit requested action.',
        deliveryTip: 'Best sent via email with maintenance subject line.',
        wordCount: 22,
      },
      {
        id: `res-dir-3-${Date.now()}`,
        tone: 'direct',
        badge: 'Short & Unequivocal',
        content:
          `“Please turn down the volume after 10 PM on weeknights as agreed in our house rules.”`,
        explanation: 'References mutual agreement without debating particulars.',
        deliveryTip: 'Calm and factual.',
        wordCount: 15,
      },
    ];
  }

  // Default direct
  return [
    {
      id: `res-dir-1-${Date.now()}`,
      tone: 'direct',
      badge: 'Direct & Unambiguous',
      content:
        `“I won't be able to do this. I wanted to let you know right away so you can make other plans.”`,
      explanation: 'Unflinching clarity that respects both your time and theirs.',
      deliveryTip: 'Leaves zero loopholes or mixed signals.',
      wordCount: 20,
    },
    {
      id: `res-dir-2-${Date.now()}`,
      tone: 'direct',
      badge: 'Firm Boundary',
      content:
        `“That doesn't work for me, and I'm not open to discussing it further. Thank you for understanding.”`,
      explanation: 'Shuts down repeated boundary pushing or unwanted negotiation.',
      deliveryTip: 'Ideal when earlier softer hints have been ignored.',
      wordCount: 18,
    },
    {
      id: `res-dir-3-${Date.now()}`,
      tone: 'direct',
      badge: 'Clean Decline',
      content:
        `“No, I can't take this on. Good luck getting it sorted out.”`,
      explanation: 'The simplest, most honest answer. A complete sentence.',
      deliveryTip: 'Courteous closure without unneeded apologies.',
      wordCount: 12,
    },
  ];
}

// Helper to regenerate a single card with fresh alternative phrasing
export function regenerateAlternative(card: ResponseCardData, index: number, situation: string): ResponseCardData {
  const variations: Record<Tone, string[]> = {
    gentle: [
      `“Thank you for checking in with me! I'm unable to help with this right now as I need to keep some space for myself, but I'm sending you my best wishes and hope it goes smoothly.”`,
      `“I appreciate you thinking of me for this. Unfortunately, my plate is completely full at the moment so I'll have to pass. Let's touch base later when things calm down!”`,
      `“I wish I could help, but I won't be able to take this on right now. Thank you for understanding, and good luck with everything!”`,
      `“It's so kind of you to reach out. I'm taking some much-needed personal time right now, so I won't be able to participate. Sending you warmth!”`,
    ],
    confident: [
      `“Thanks for thinking of me. I've taken a look at my commitments and won't be able to take this on. Wishing you every success with it!”`,
      `“I'm writing to let you know that I won't be available for this. I wanted to tell you promptly so you can proceed with other arrangements.”`,
      `“I appreciate the opportunity, but this doesn't align with what I'm able to commit to right now. Let's keep in touch regarding future projects.”`,
      `“I've made it a rule to protect my evenings and weekends, so I won't be able to step in here. Best of luck wrapping it up!”`,
    ],
    direct: [
      `“I can't commit to this. Thank you for thinking of me, and good luck getting it completed.”`,
      `“This isn't feasible for me. Please go ahead without me.”`,
      `“I will not be able to participate in this. Please proceed with alternative arrangements.”`,
      `“I am declining this request. Best regards.”`,
    ],
  };

  const pool = variations[card.tone] || variations.confident;
  const nextContent = pool[(index + Math.floor(Math.random() * pool.length)) % pool.length];

  return {
    ...card,
    id: `alt-${card.tone}-${Date.now()}`,
    content: nextContent,
    wordCount: nextContent.split(/\s+/).length,
  };
}
