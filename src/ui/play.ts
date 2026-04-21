import type { Answer, GameState } from '../types';
import { ENTITIES } from '../data/entities';
import { applyAnswer, computeFrame, createState, resetState, undoLastAnswer } from '../engine';

const CANDIDATE_REVEAL_THRESHOLD = 25; // show candidate chips when <=
const GUESS_PROMPT_THRESHOLD = 12;      // show prominent "เดา" CTA when <=

let state: GameState = createState();
let lastCount: number = ENTITIES.length;
let guessed: string | null = null;

const ANSWER_LABELS: Record<Answer, string> = {
  yes: 'ใช่',
  maybe: 'อาจจะ',
  unknown: 'ไม่รู้',
  no: 'ไม่ใช่'
};

export function renderPlay(root: HTMLElement) {
  root.innerHTML = '';
  const frame = computeFrame(state);

  root.appendChild(liveCounter(frame.candidates.length, frame.progress));
  if (state.history.length > 0) root.appendChild(breadcrumb());

  // Guessed state
  if (guessed) {
    root.appendChild(resultCard(guessed));
    root.appendChild(actionRow({ showUndo: false }));
    return;
  }

  // Zero candidates — conflict
  if (frame.candidates.length === 0) {
    root.appendChild(zeroState());
    root.appendChild(actionRow({ showUndo: true }));
    return;
  }

  // Single candidate — auto-result
  if (frame.candidates.length === 1) {
    const ent = frame.candidates[0]!;
    root.appendChild(resultCard(ent.name, ent.category));
    root.appendChild(actionRow({ showUndo: true }));
    return;
  }

  // Candidates visible?
  if (frame.candidates.length <= CANDIDATE_REVEAL_THRESHOLD) {
    root.appendChild(candidatesBlock(frame.scored, frame.candidates.length <= GUESS_PROMPT_THRESHOLD));
  }

  // Question
  if (frame.nextQuestion) {
    root.appendChild(questionCard(frame.nextQuestion.question.text, frame.nextQuestion.question.hint, state.history.length + 1));
    root.appendChild(answerButtons(frame.nextQuestion.question.id));
  } else {
    root.appendChild(noMoreQuestionsCard(frame.candidates.length));
  }

  root.appendChild(actionRow({ showUndo: state.history.length > 0 }));

  // Mark progress pulse if count changed
  if (frame.candidates.length !== lastCount && frame.candidates.length < lastCount) {
    const numEl = root.querySelector('.live-counter .num');
    if (numEl) {
      numEl.classList.add('pulse');
      setTimeout(() => numEl.classList.remove('pulse'), 400);
    }
  }
  lastCount = frame.candidates.length;
}

function liveCounter(current: number, progress: number): HTMLElement {
  const d = document.createElement('div');
  d.className = 'live-counter';
  d.innerHTML = `
    <div>
      <div class="label">เหลือ</div>
      <div><span class="num">${current.toLocaleString('th-TH')}</span> <span class="muted small">/ ${ENTITIES.length.toLocaleString('th-TH')}</span></div>
    </div>
    <div class="progress" aria-label="progress ${progress}%"><div class="bar" style="width:${progress}%"></div></div>
  `;
  return d;
}

function breadcrumb(): HTMLElement {
  const d = document.createElement('div');
  d.className = 'breadcrumb';
  state.history.forEach((h, idx) => {
    const span = document.createElement('span');
    span.className = `crumb ${h.answer}`;
    span.innerHTML = `${escapeHTML(truncate(h.questionText, 22))} <span class="v">${ANSWER_LABELS[h.answer]}</span>`;
    const btn = document.createElement('button');
    btn.setAttribute('aria-label', 'ลบคำตอบนี้');
    btn.textContent = '×';
    btn.onclick = () => removeHistoryAt(idx);
    span.appendChild(btn);
    d.appendChild(span);
  });
  return d;
}

function questionCard(text: string, hint: string | undefined, step: number): HTMLElement {
  const d = document.createElement('div');
  d.className = 'q-card';
  d.innerHTML = `
    <div class="q-step">คำถาม #${step}</div>
    <div class="q-text">${escapeHTML(text)}</div>
    ${hint ? `<div class="q-hint">💡 ${escapeHTML(hint)}</div>` : ''}
  `;
  return d;
}

function answerButtons(questionId: string): HTMLElement {
  const d = document.createElement('div');
  d.className = 'answers';
  const mk = (key: Answer, cls: string, label: string) => {
    const b = document.createElement('button');
    b.className = `ans ${cls}`;
    b.textContent = label;
    b.onclick = () => answer(questionId, key);
    return b;
  };
  d.appendChild(mk('yes',     'ans-yes',     '✓ ใช่'));
  d.appendChild(mk('no',      'ans-no',      '✗ ไม่ใช่'));
  d.appendChild(mk('maybe',   'ans-maybe',   '± อาจจะ'));
  d.appendChild(mk('unknown', 'ans-unknown', '? ไม่รู้'));
  return d;
}

function candidatesBlock(scored: ReturnType<typeof computeFrame>['scored'], prominent: boolean): HTMLElement {
  const d = document.createElement('div');
  d.className = 'candidates';
  const top = scored.slice(0, prominent ? 15 : 30);
  d.innerHTML = `
    <h3>🎯 ${prominent ? 'ใกล้เดาได้แล้ว — เลือกเลย' : 'เข้าวินแคบลงแล้ว'}</h3>
    <div class="desc">${prominent
      ? 'แตะชื่อที่คิดว่าใช่ หรือ ตอบคำถามต่อไปเพื่อกรองต่อ'
      : 'เรียงตามความนิยม — ถ้าเห็นคำตอบแล้ว แตะเพื่อเดา'}
    </div>
  `;
  const chips = document.createElement('div');
  chips.className = 'chips';
  for (const sc of top) {
    const chip = document.createElement('button');
    chip.className = 'chip clickable';
    chip.innerHTML = `<span class="chip-cat">${escapeHTML(shortCat(sc.entity.category))}</span>${escapeHTML(sc.entity.name)}`;
    chip.onclick = () => guess(sc.entity.name);
    chips.appendChild(chip);
  }
  d.appendChild(chips);
  return d;
}

function resultCard(name: string, category?: string): HTMLElement {
  const d = document.createElement('div');
  d.className = 'result';
  d.innerHTML = `
    <h3>🎉 น่าจะเดาได้แล้ว</h3>
    <div class="name">${escapeHTML(name)}</div>
    ${category ? `<div class="cat">หมวด: ${escapeHTML(category)}</div>` : ''}
    <div class="muted small">ถ้าถูก — เย่! ถ้าไม่ ลองกด "ย้อน" แก้คำตอบก่อนหน้าดู</div>
  `;
  return d;
}

function noMoreQuestionsCard(n: number): HTMLElement {
  const d = document.createElement('div');
  d.className = 'q-card';
  d.innerHTML = `
    <div class="q-step">หมดคำถามแล้ว</div>
    <div class="q-text">เหลือ ${n} ตัวเลือกที่เป็นไปได้</div>
    <div class="q-hint">เลือกจากรายชื่อข้างบน หรือกด "ย้อน" เปลี่ยนคำตอบ</div>
  `;
  return d;
}

function zeroState(): HTMLElement {
  const d = document.createElement('div');
  d.className = 'zero';
  d.innerHTML = `
    <b>ไม่เจอ entity ที่ตรงทุกข้อ 🤔</b>
    <small>คำตอบก่อนหน้านี้อาจขัดกันเอง — ลองกด "ย้อน" แก้คำตอบล่าสุด หรือเปลี่ยน "ใช่/ไม่ใช่" บางข้อเป็น "อาจจะ"</small>
  `;
  return d;
}

function actionRow(opts: { showUndo: boolean }): HTMLElement {
  const d = document.createElement('div');
  d.className = 'actions';
  if (opts.showUndo) {
    const undo = document.createElement('button');
    undo.className = 'btn warn';
    undo.textContent = '← ย้อนกลับ';
    undo.onclick = onUndo;
    d.appendChild(undo);
  }
  const reset = document.createElement('button');
  reset.className = 'btn danger';
  reset.textContent = '↻ เริ่มใหม่';
  reset.onclick = onReset;
  d.appendChild(reset);
  return d;
}

// ===== handlers =====
function answer(questionId: string, ans: Answer) {
  state = applyAnswer(state, questionId, ans);
  rerender();
}
function guess(name: string) {
  guessed = name;
  rerender();
}
function onUndo() {
  guessed = null;
  state = undoLastAnswer(state);
  rerender();
}
function onReset() {
  guessed = null;
  state = resetState();
  lastCount = ENTITIES.length;
  rerender();
}
function removeHistoryAt(idx: number) {
  const newHistory = state.history.filter((_, i) => i !== idx);
  state = {
    history: newHistory,
    askedQuestions: new Set(newHistory.map(h => h.questionId))
  };
  rerender();
}

let root: HTMLElement | null = null;
export function mountPlay(el: HTMLElement) {
  root = el;
  rerender();
}
function rerender() {
  if (root) renderPlay(root);
  if (navigator.vibrate) navigator.vibrate(6);
}

// ===== utils =====
function truncate(s: string, n: number): string { return s.length > n ? s.slice(0, n) + '…' : s; }
function escapeHTML(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
function shortCat(c: string): string { return c.length > 14 ? c.slice(0, 13) + '…' : c; }
