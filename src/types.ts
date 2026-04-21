export type Answer = 'yes' | 'maybe' | 'unknown' | 'no';

export interface Entity {
  id: string;
  name: string;
  category: string;
  tags: Set<string>;
  popularity: number;
}

export interface Question {
  id: string;
  text: string;
  tag: string;
  hint?: string;
  weight: number;
}

export interface HistoryItem {
  questionId: string;
  questionText: string;
  tag: string;
  answer: Answer;
}

export interface GameState {
  history: HistoryItem[];
  askedQuestions: Set<string>;
}

export interface ScoredCandidate {
  entity: Entity;
  score: number;
}

export interface QuestionCandidate {
  question: Question;
  gain: number;
  yesCount: number;
  noCount: number;
}
