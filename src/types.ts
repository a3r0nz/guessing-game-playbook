// ========== Playbook types (new 5-books design) ==========

export type Answer = 'yes' | 'no' | 'maybe' | 'unknown';

export interface QNode {
  t: 'q';
  q: string;            // question text
  hint?: string;        // strategic hint — why ask this now
  trap?: string;        // common mistake to avoid here
  y: PlayNode;
  n: PlayNode;
}

export interface LeafNode {
  t: 'L';
  label: string;        // short category label, e.g. "ดาราชายไทย รุ่นใหม่"
  typical: string[];    // ~10-30 representative entities, most-likely first
  subQuestions?: string[]; // discriminators to ask if still stuck
  traps?: string[];     // edge cases / common confusions
  note?: string;        // optional 1-liner context
}

export type PlayNode = QNode | LeafNode;

export interface Book {
  id: string;
  label: string;        // "PERSON"
  emoji: string;
  strategy: string;     // memorable 1-liner: "ภูมิภาค → สถานะ → เพศ → อาชีพ"
  root: PlayNode;
}

export interface HistoryItem {
  node: QNode;
  answer: Answer;
  bookId: string | null;
}

export interface GameState {
  current: PlayNode;    // where we are now (could be a Q or a Leaf)
  book: Book | null;    // active book (null during OPENING)
  history: HistoryItem[];
}

// ========== Reference / Browse types (legacy tag-based data) ==========

export interface Entity {
  id: string;
  name: string;
  category: string;
  tags: Set<string>;
  popularity: number;
}
