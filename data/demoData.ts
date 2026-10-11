import { ResponseCardData } from '../types';

export const DEMO_RESPONSES: ResponseCardData[] = [
  {
    id: 'demo-gentle',
    tone: 'gentle',
    badge: 'Gentle & Warm',
    content:
      "“Thank you so much for thinking of me! I really appreciate the invite and would love to catch up soon, but my schedule is completely full this weekend. Let's definitely find some time next month when things settle down.”",
    explanation:
      'Validates the connection warmly with sincere appreciation, while declining clearly without over-explaining or feeling apologetic.',
    deliveryTip: 'Best sent promptly as a text so you do not carry mental weight or leave them hanging.',
    wordCount: 42,
  },
  {
    id: 'demo-confident',
    tone: 'confident',
    badge: 'Confident & Grounded',
    content:
      "“Thanks for reaching out! I'm dedicating this weekend to rest and won't be taking on any extra commitments right now. Hope you all have a wonderful time, and I'll see you next week.”",
    explanation:
      'Frames your boundary as an active, positive choice. Clear and warm, establishing comfortable precedent without defensive language.',
    deliveryTip: 'Keep your tone light and assured. Resists the urge to justify why you need rest.',
    wordCount: 33,
  },
  {
    id: 'demo-direct',
    tone: 'direct',
    badge: 'Direct & Clear',
    content:
      "“I won't be able to make it this time, but thank you for asking. Hope it goes really well!”",
    explanation:
      'Concise, unambiguous, and courteous. Closes the loop cleanly without leaving false hope or openings for rescheduling pressure.',
    deliveryTip: 'Short and sweet. Perfect for group chats or busy acquaintances.',
    wordCount: 18,
  },
];

export interface StarterScenario {
  id: string;
  label: string;
  relationship: string;
  prompt: string;
  recommendedTone: 'gentle' | 'confident' | 'direct';
}

export const STARTER_SCENARIOS: StarterScenario[] = [
  {
    id: 'work-boundaries',
    label: 'Declining late Friday request',
    relationship: 'Manager or Senior Colleague',
    prompt:
      'My manager sent an urgent non-emergency request at 4:45 PM on Friday asking for it by morning. I have family plans and want to address it first thing Monday without sounding dismissive.',
    recommendedTone: 'confident',
  },
  {
    id: 'dating-pacing',
    label: 'Setting boundaries while dating',
    relationship: 'Someone I went on 2 dates with',
    prompt:
      'We went out twice and had fun, but they are texting multiple times a day expecting immediate replies and talking about exclusive plans. I like taking things slow and need more breathing room.',
    recommendedTone: 'gentle',
  },
  {
    id: 'roommate-dishes',
    label: 'Addressing shared space chores',
    relationship: 'Roommate',
    prompt:
      'My roommate leaves dirty pots and dishes in the sink for days. I have hinted before, but I need to ask them directly to clear their cookware after cooking so the kitchen stays usable.',
    recommendedTone: 'direct',
  },
  {
    id: 'landlord-repair',
    label: 'Overdue maintenance request',
    relationship: 'Landlord / Property Manager',
    prompt:
      'The radiator in my bedroom has been making loud banging noises and barely heating for two weeks. I sent an email last Monday that got no reply, so I need a firm follow-up.',
    recommendedTone: 'direct',
  },
];
