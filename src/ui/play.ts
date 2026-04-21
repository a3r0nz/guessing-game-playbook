import type { Answer, GameState, LeafNode, QNode } from '../types';
import { answer, createState, frame, isLeaf, isQ, peekChildren, reset as resetState, undo } from '../engine';

let state: GameState = createState();
let peekOpen = false;   // whether the "maybe preview" panel is shown at current Q

let root: HTMLElement | null = null;

export function mountPlay(el: HTMLElement) {
  root = el;
  rerender();
}

function rerender() {
  if (!root) return;
  root.innerHTML = '';
  const f = frame(state);

  // Book context banner (only after entering a book)
  if (f.bookContext) root.appendChild(bookBanner(f.bookContext.emoji, f.bookContext.label, f.bookContext.strategy));

  // Progress + step counter
  root.appendChild(progressBar(f.depth, f.progress));

  // Breadcrumb of answered questions
  if (state.history.length > 0) root.appendChild(breadcrumb());

  // Leaf screen vs Question screen
  if (f.atLeaf) {
    root.appendChild(leafCard(f.atLeaf));
  } else if (f.atQuestion) {
    root.appendChild(questionCard(f.atQuestion, f.depth + 1));
    if (peekOpen) root.appendChild(peekPanel(f.atQuestion));
    root.appendChild(answerButtons());
  }

  // Action row
  root.appendChild(actionRow({ showUndo: state.history.length > 0 }));

  if (navigator.vibrate) navigator.vibrate(6);
}

// ========== Components ==========

function bookBanner(emoji: string, label: string, strategy: string): HTMLElement {
  const d = document.createElement('div');
  d.className = 'book-banner';
  d.innerHTML = `
    <div class="book-title"><span class="book-emoji">${emoji}</span>${escapeHTML(label)} BOOK</div>
    <div class="book-strategy">กลยุทธ์: ${escapeHTML(strategy)}</div>
  `;
  return d;
}

function progressBar(step: number, progress: number): HTMLElement {
  const d = document.createElement('div');
  d.className = 'live-counter';
  d.innerHTML = `
    <div>
      <div class="label">คำถามที่ผ่านมา</div>
      <div><span class="num">${step}</span> <span class="muted small">ข้อ</span></div>
    </div>
    <div class="progress"><div class="bar" style="width:${progress}%"></div></div>
  `;
  return d;
}

function breadcrumb(): HTMLElement {
  const d = document.createElement('div');
  d.className = 'breadcrumb';
  for (const h of state.history) {
    const s = document.createElement('span');
    s.className = `crumb ${h.answer}`;
    s.innerHTML = `${escapeHTML(truncate(h.node.q, 20))} <span class="v">${ANSWER_LABELS[h.answer]}</span>`;
    d.appendChild(s);
  }
  return d;
}

function questionCard(node: QNode, step: number): HTMLElement {
  const d = document.createElement('div');
  d.className = 'q-card';
  d.innerHTML = `
    <div class="q-step">คำถาม #${step}</div>
    <div class="q-text">${escapeHTML(node.q)}</div>
    ${node.hint ? `<div class="q-hint">💡 ${escapeHTML(node.hint)}</div>` : ''}
    ${node.trap ? `<div class="q-trap">⚠ ${escapeHTML(node.trap)}</div>` : ''}
  `;
  return d;
}

function answerButtons(): HTMLElement {
  const d = document.createElement('div');
  d.className = 'answers';
  const mk = (key: Answer, cls: string, label: string) => {
    const b = document.createElement('button');
    b.className = `ans ${cls}`;
    b.textContent = label;
    b.onclick = () => onAnswer(key);
    return b;
  };
  d.appendChild(mk('yes',     'ans-yes',     '✓ ใช่'));
  d.appendChild(mk('no',      'ans-no',      '✗ ไม่ใช่'));
  d.appendChild(mk('maybe',   'ans-maybe',   '± อาจจะ'));
  d.appendChild(mk('unknown', 'ans-unknown', '? ไม่รู้'));
  return d;
}

function peekPanel(node: QNode): HTMLElement {
  const { yes: yesLeaves, no: noLeaves } = peekChildren(node);
  const d = document.createElement('div');
  d.className = 'peek';
  d.innerHTML = `
    <div class="peek-title">🔍 พรีวิวทั้งสองทาง (ยังไม่ commit)</div>
    <div class="peek-desc">ถ้าเป็น "ใช่" จะเจอ: ${summarize(yesLeaves)}. ถ้าเป็น "ไม่ใช่" จะเจอ: ${summarize(noLeaves)}.
      <br>เลือกทิศทางที่คิดว่าใกล้คำตอบจริงเพื่อเดินต่อ:</div>
  `;
  const row = document.createElement('div');
  row.className = 'peek-row';
  row.appendChild(peekSideBtn('ใช่', yesLeaves, 'yes'));
  row.appendChild(peekSideBtn('ไม่ใช่', noLeaves, 'no'));
  d.appendChild(row);
  return d;
}

function peekSideBtn(label: string, leaves: LeafNode[], dir: 'yes' | 'no'): HTMLElement {
  const b = document.createElement('button');
  b.className = `peek-side peek-${dir}`;
  const sample = leaves.flatMap(l => l.typical.slice(0, 3)).slice(0, 8);
  b.innerHTML = `
    <div class="peek-side-label">${label} (${leaves.length} หมวด)</div>
    <div class="peek-side-sample">${sample.map(s => `<span class="chip">${escapeHTML(s)}</span>`).join('')}</div>
  `;
  b.onclick = () => { peekOpen = false; state = answer(state, dir); rerender(); };
  return b;
}

function leafCard(leaf: LeafNode): HTMLElement {
  const d = document.createElement('div');
  d.className = 'leaf-card';
  d.innerHTML = `
    <div class="leaf-header">🎯 คุณมาถึง:</div>
    <div class="leaf-label">${escapeHTML(leaf.label)}</div>
    ${leaf.note ? `<div class="leaf-note">${escapeHTML(leaf.note)}</div>` : ''}
  `;

  const chips = document.createElement('div');
  chips.className = 'chips leaf-chips';
  for (const name of leaf.typical) {
    const c = document.createElement('button');
    c.className = 'chip clickable';
    c.textContent = name;
    c.onclick = () => guessToast(name);
    chips.appendChild(c);
  }
  d.appendChild(chips);

  if (leaf.subQuestions && leaf.subQuestions.length > 0) {
    const sq = document.createElement('div');
    sq.className = 'leaf-section';
    sq.innerHTML = `<h4>ถ้ายังไม่ชัด ลองถาม:</h4>`;
    const ul = document.createElement('ul');
    for (const q of leaf.subQuestions) {
      const li = document.createElement('li');
      li.textContent = q;
      ul.appendChild(li);
    }
    sq.appendChild(ul);
    d.appendChild(sq);
  }

  if (leaf.traps && leaf.traps.length > 0) {
    const tr = document.createElement('div');
    tr.className = 'leaf-section leaf-traps';
    tr.innerHTML = `<h4>⚠ กับดัก:</h4>`;
    const ul = document.createElement('ul');
    for (const t of leaf.traps) {
      const li = document.createElement('li');
      li.textContent = t;
      ul.appendChild(li);
    }
    tr.appendChild(ul);
    d.appendChild(tr);
  }

  return d;
}

function actionRow(opts: { showUndo: boolean }): HTMLElement {
  const d = document.createElement('div');
  d.className = 'actions';
  if (opts.showUndo) {
    const undoB = document.createElement('button');
    undoB.className = 'btn warn';
    undoB.textContent = '← ย้อนกลับ';
    undoB.onclick = onUndo;
    d.appendChild(undoB);
  }
  const resetB = document.createElement('button');
  resetB.className = 'btn danger';
  resetB.textContent = '↻ เริ่มใหม่';
  resetB.onclick = onReset;
  d.appendChild(resetB);
  return d;
}

// ========== handlers ==========

function onAnswer(a: Answer) {
  if (a === 'maybe' || a === 'unknown') {
    peekOpen = !peekOpen;
    rerender();
    return;
  }
  peekOpen = false;
  state = answer(state, a);
  rerender();
}
function onUndo() {
  peekOpen = false;
  state = undo(state);
  rerender();
}
function onReset() {
  peekOpen = false;
  state = resetState();
  rerender();
}

let toastTimer: number | undefined;
function guessToast(name: string) {
  let t = document.getElementById('toast');
  if (!t) {
    t = document.createElement('div');
    t.id = 'toast';
    t.className = 'toast';
    document.body.appendChild(t);
  }
  t.textContent = `👉 เดาว่า: "${name}"`;
  t.classList.add('show');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => t!.classList.remove('show'), 2000);
}

// ========== utils ==========

const ANSWER_LABELS: Record<Answer, string> = {
  yes: 'ใช่', no: 'ไม่ใช่', maybe: 'อาจจะ', unknown: 'ไม่รู้'
};

function summarize(leaves: LeafNode[]): string {
  if (leaves.length === 0) return '(ว่าง)';
  return leaves.slice(0, 3).map(l => l.label).join(', ') + (leaves.length > 3 ? ` +${leaves.length - 3} อื่น` : '');
}

function truncate(s: string, n: number): string { return s.length > n ? s.slice(0, n) + '…' : s; }

function escapeHTML(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// silence unused
void isQ;
void isLeaf;
