import type { Answer, GameState, QNode, TreeNode } from './types';
import { TREE } from './data/tree';

export { TREE };

export function createState(): GameState {
  return { current: TREE, history: [] };
}

export function isQ(node: TreeNode): node is QNode { return node.t === 'q'; }

export function answer(state: GameState, ans: Answer): GameState {
  if (!isQ(state.current)) return state;
  const next = ans === 'y' ? state.current.y : state.current.n;
  return {
    current: next,
    history: [...state.history, { node: state.current, answer: ans }]
  };
}

export function undo(state: GameState): GameState {
  if (state.history.length === 0) return state;
  const last = state.history[state.history.length - 1]!;
  return { current: last.node, history: state.history.slice(0, -1) };
}

export function reset(): GameState { return createState(); }

/** Progress estimate — same heuristic as original HTML: depth * 15, clamped. */
export function progressPercent(state: GameState): number {
  const depth = state.history.length;
  const bonus = state.current.t === 'L' ? 10 : 0;
  if (state.current.t === 'L') return 100;
  return Math.min(95, depth * 15 + bonus);
}
