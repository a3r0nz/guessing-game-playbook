import type { Answer, Book, GameState, HistoryItem, LeafNode, PlayNode, QNode } from './types';
import { OPENING, BOOKS, BOOK_BY_ROOT } from './data/books';

export function createState(): GameState {
  return { current: OPENING, book: null, history: [] };
}

export function isLeaf(n: PlayNode): n is LeafNode { return n.t === 'L'; }
export function isQ(n: PlayNode): n is QNode { return n.t === 'q'; }

/**
 * Advance by one answer.
 * 'yes' / 'no': navigate into chosen child.
 * 'maybe' / 'unknown': DON'T advance — UI uses `peekChildren` to show both.
 */
export function answer(state: GameState, ans: Answer): GameState {
  if (!isQ(state.current)) return state;
  if (ans === 'maybe' || ans === 'unknown') return state;
  const chosen = ans === 'yes' ? state.current.y : state.current.n;
  const bookAtChosen = BOOK_BY_ROOT.get(chosen) ?? null;
  const nextBook: Book | null = state.book ?? bookAtChosen;
  const item: HistoryItem = {
    node: state.current,
    answer: ans,
    bookId: nextBook?.id ?? null
  };
  return { current: chosen, book: nextBook, history: [...state.history, item] };
}

export function undo(state: GameState): GameState {
  if (state.history.length === 0) return state;
  const last = state.history[state.history.length - 1]!;
  const nextHistory = state.history.slice(0, -1);
  // Recompute which book we're in by replaying history
  let book: Book | null = null;
  for (const h of nextHistory) {
    const child = h.answer === 'yes' ? h.node.y : h.node.n;
    const b = BOOK_BY_ROOT.get(child);
    if (b) book = b;
  }
  return { current: last.node, book, history: nextHistory };
}

export function reset(): GameState { return createState(); }

/**
 * Merge leaves from both children — used when user picks "maybe"/"unknown".
 * Returns up to `limit` representative typical entities from each subtree,
 * interleaved so user sees variety.
 */
export function peekChildren(node: QNode, limit = 30): { yes: LeafNode[]; no: LeafNode[] } {
  return { yes: collectLeaves(node.y), no: collectLeaves(node.n) };
  void limit; // limit currently unused; UI decides how many to render per side
}

function collectLeaves(node: PlayNode): LeafNode[] {
  if (isLeaf(node)) return [node];
  return [...collectLeaves(node.y), ...collectLeaves(node.n)];
}

export function maxDepthRemaining(node: PlayNode): number {
  if (isLeaf(node)) return 0;
  return 1 + Math.max(maxDepthRemaining(node.y), maxDepthRemaining(node.n));
}

export const OPENING_DEPTH = maxDepthRemaining(OPENING);

export interface Frame {
  state: GameState;
  atLeaf: LeafNode | null;
  atQuestion: QNode | null;
  bookContext: Book | null;
  depth: number;        // questions answered
  remaining: number;    // deeper questions still possible from current node
  progress: number;     // 0-100
}

export function frame(state: GameState): Frame {
  const atLeaf = isLeaf(state.current) ? state.current : null;
  const atQuestion = isQ(state.current) ? state.current : null;
  const depth = state.history.length;
  const remaining = maxDepthRemaining(state.current);
  const progress = atLeaf
    ? 100
    : Math.min(95, Math.round((depth / (depth + Math.max(remaining, 1))) * 100));
  return { state, atLeaf, atQuestion, bookContext: state.book, depth, remaining, progress };
}

export { BOOKS };
