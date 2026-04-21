import type { LeafNode, PlayNode, QNode } from '../../types';

export const q = (
  text: string,
  yes: PlayNode,
  no: PlayNode,
  extras?: { hint?: string; trap?: string }
): QNode => ({ t: 'q', q: text, y: yes, n: no, hint: extras?.hint, trap: extras?.trap });

export const L = (
  label: string,
  typical: string[],
  extras?: { subQuestions?: string[]; traps?: string[]; note?: string }
): LeafNode => ({ t: 'L', label, typical, subQuestions: extras?.subQuestions, traps: extras?.traps, note: extras?.note });
