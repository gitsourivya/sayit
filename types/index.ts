export type Tone = 'gentle' | 'confident' | 'direct';

export interface ResponseCardData {
  id: string;
  tone: Tone;
  badge: string;
  content: string;
  explanation: string;
  deliveryTip: string;
  wordCount: number;
}

export interface SituationState {
  situation: string;
  relationship: string;
  tone: Tone;
}
