import type { Answer, Entity, GameState, HistoryItem, Question, QuestionCandidate, ScoredCandidate } from './types';
import { QUESTIONS, QUESTIONS_BY_ID } from './data/questions';
import { ENTITIES } from './data/entities';

/** Soft weight for "อาจจะ" answers — boosts matching, lightly penalizes non-matching */
const MAYBE_BOOST = 0.35;
const MAYBE_PENALTY = 0.15;

/**
 * Hard filter: apply yes/no answers. maybe/unknown do NOT filter.
 */
export function filterCandidates(all: Entity[], history: HistoryItem[]): Entity[] {
  if (history.length === 0) return all;
  return all.filter(e => {
    for (const h of history) {
      if (h.answer === 'yes'  && !e.tags.has(h.tag)) return false;
      if (h.answer === 'no'   &&  e.tags.has(h.tag)) return false;
      // 'maybe' / 'unknown' don't filter — handled in scoring
    }
    return true;
  });
}

/**
 * Score candidates using popularity + soft boosts from 'maybe' answers.
 */
export function scoreCandidates(candidates: Entity[], history: HistoryItem[]): ScoredCandidate[] {
  const maybes = history.filter(h => h.answer === 'maybe');
  return candidates
    .map(entity => {
      let score = entity.popularity;
      for (const h of maybes) {
        if (entity.tags.has(h.tag)) score += MAYBE_BOOST;
        else score -= MAYBE_PENALTY;
      }
      return { entity, score };
    })
    .sort((a, b) => b.score - a.score);
}

/**
 * Pick the next question to ask. Criteria:
 *  1. Not already asked
 *  2. Information gain on current candidate pool (closer to 50/50 split = better)
 *  3. Tie-break with weight (ask higher-weight / more generic questions earlier)
 */
export function pickNextQuestion(
  candidates: Entity[],
  asked: Set<string>,
  pool: Question[] = QUESTIONS
): QuestionCandidate | null {
  if (candidates.length <= 1) return null;

  const scored: QuestionCandidate[] = [];
  for (const q of pool) {
    if (asked.has(q.id)) continue;
    let yesCount = 0;
    for (const e of candidates) if (e.tags.has(q.tag)) yesCount++;
    const noCount = candidates.length - yesCount;
    // 0 when all same answer, 1 when perfect 50/50
    const balance = 1 - Math.abs(yesCount - noCount) / candidates.length;
    if (balance < 0.05) continue; // question adds nothing
    // Combine balance (how well it splits) with human-assigned weight.
    // Higher weight → ask earlier (fundamental questions like "living?").
    // Balance still matters but weight is a strong nudge so openers feel natural.
    const gain = balance * 0.6 + (q.weight / 100) * 0.4;
    scored.push({ question: q, gain, yesCount, noCount });
  }

  if (scored.length === 0) return null;
  scored.sort((a, b) => b.gain - a.gain);
  return scored[0]!;
}

/** Estimate how "narrowed down" we are, in [0,1]. Based on log-remaining. */
export function progressPercent(startCount: number, currentCount: number): number {
  if (startCount <= 1) return 100;
  const progress = 1 - Math.log(Math.max(currentCount, 1)) / Math.log(startCount);
  return Math.round(Math.max(0, Math.min(1, progress)) * 100);
}

// ========== State helpers ==========

export function createState(): GameState {
  return { history: [], askedQuestions: new Set() };
}

export function applyAnswer(state: GameState, questionId: string, answer: Answer): GameState {
  const q = QUESTIONS_BY_ID.get(questionId);
  if (!q) return state;
  const item: HistoryItem = { questionId, questionText: q.text, tag: q.tag, answer };
  return {
    history: [...state.history, item],
    askedQuestions: new Set([...state.askedQuestions, questionId])
  };
}

export function undoLastAnswer(state: GameState): GameState {
  if (state.history.length === 0) return state;
  const next = state.history.slice(0, -1);
  return {
    history: next,
    askedQuestions: new Set(next.map(h => h.questionId))
  };
}

export function resetState(): GameState {
  return createState();
}

// ========== Top-level convenience ==========

export interface EngineFrame {
  candidates: Entity[];
  scored: ScoredCandidate[];
  nextQuestion: QuestionCandidate | null;
  progress: number;
}

export function computeFrame(state: GameState, startCount = ENTITIES.length): EngineFrame {
  const candidates = filterCandidates(ENTITIES, state.history);
  const scored = scoreCandidates(candidates, state.history);
  const nextQuestion = pickNextQuestion(candidates, state.askedQuestions);
  const progress = progressPercent(startCount, candidates.length);
  return { candidates, scored, nextQuestion, progress };
}
