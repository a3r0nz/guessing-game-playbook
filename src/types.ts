export interface QNode {
  t: 'q';
  q: string;
  y: TreeNode;
  n: TreeNode;
  h: string;
}

export interface LNode {
  t: 'L';
  cat: string;
  ex: string[];
  desc: string;
}

export type TreeNode = QNode | LNode;

export type Answer = 'y' | 'n';

export interface HistoryItem {
  node: QNode;
  answer: Answer;
}

export interface GameState {
  current: TreeNode;
  history: HistoryItem[];
}
