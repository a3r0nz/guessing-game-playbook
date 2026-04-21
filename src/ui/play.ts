import type { Answer, GameState, LNode, QNode } from '../types';
import { answer, createState, progressPercent, reset as resetState, undo } from '../engine';

let state: GameState = createState();
let root: HTMLElement | null = null;

export function mountPlay(el: HTMLElement, onSwitchToTree: () => void) {
  root = el;
  // Initial skeleton (matches original HTML structure)
  root.innerHTML = `
    <div class="callout">
      <b>วิธีใช้:</b> สมมติว่าคุณเป็นคนถาม กดตอบ "ใช่/ไม่ใช่" ตามสิ่งที่คุณคิดว่าคำตอบน่าจะเป็น จะค่อยๆ แคบลงจนได้หมวดที่น่าจะตรง พร้อมตัวอย่างคำตอบ
    </div>
    <div class="quiz-progress"><div class="quiz-progress-bar" id="progressBar" style="width:0%"></div></div>
    <div class="breadcrumb" id="breadcrumb"></div>
    <div id="quizBody"></div>
    <div class="action-row">
      <button class="action-btn" id="backBtn" style="display:none">← ย้อนกลับ</button>
      <button class="action-btn" id="resetBtn">↻ เริ่มใหม่</button>
      <button class="action-btn" id="treeBtn">ดูต้นไม้ทั้งหมด</button>
    </div>
  `;
  root.querySelector<HTMLButtonElement>('#backBtn')!.onclick = onBack;
  root.querySelector<HTMLButtonElement>('#resetBtn')!.onclick = onReset;
  root.querySelector<HTMLButtonElement>('#treeBtn')!.onclick = onSwitchToTree;
  render();
}

function render() {
  if (!root) return;
  const body = root.querySelector<HTMLDivElement>('#quizBody')!;
  const bc = root.querySelector<HTMLDivElement>('#breadcrumb')!;
  const pb = root.querySelector<HTMLDivElement>('#progressBar')!;
  const backBtn = root.querySelector<HTMLButtonElement>('#backBtn')!;

  // Breadcrumb
  bc.innerHTML = state.history.map(h => {
    const cls = h.answer === 'y' ? 'yes' : 'no';
    const label = h.answer === 'y' ? 'ใช่' : 'ไม่ใช่';
    return `<span class="crumb ${cls}"><b>${truncate(h.node.q, 20)}</b> → ${label}</span>`;
  }).join('');

  pb.style.width = progressPercent(state) + '%';
  backBtn.style.display = state.history.length > 0 ? 'inline-block' : 'none';

  if (state.current.t === 'L') {
    body.innerHTML = renderResult(state.current);
    return;
  }
  body.innerHTML = renderQuestion(state.current, state.history.length + 1);
  // Wire yes/no buttons
  body.querySelector<HTMLButtonElement>('.answer-btn.yes')!.onclick = () => onAnswer('y');
  body.querySelector<HTMLButtonElement>('.answer-btn.no')!.onclick = () => onAnswer('n');
}

function renderQuestion(node: QNode, step: number): string {
  return `
    <div class="question-card">
      <div class="question-step">คำถาม #${step}</div>
      <div class="question-text">${escapeHTML(node.q)}</div>
      ${node.h ? `<div class="question-hint">${escapeHTML(node.h)}</div>` : ''}
    </div>
    <div class="answer-buttons">
      <button class="answer-btn yes">ใช่</button>
      <button class="answer-btn no">ไม่ใช่</button>
    </div>
  `;
}

function renderResult(leaf: LNode): string {
  return `
    <div class="result-card">
      <h3>สรุปผล</h3>
      <div class="cat-name">${escapeHTML(leaf.cat)}</div>
      ${leaf.desc ? `<div class="cat-desc">${escapeHTML(leaf.desc)}</div>` : ''}
      <div class="chips">${leaf.ex.map(e => `<span class="chip">${escapeHTML(e)}</span>`).join('')}</div>
    </div>
    <div class="callout" style="margin-top:12px">
      <b>คำแนะนำ:</b> ถ้ายังไม่ใช่ในรายการ ลองคิดของคล้ายๆ ในหมวดเดียวกัน หรือย้อนกลับไปลองเปลี่ยนคำตอบคำถามก่อนหน้า
    </div>
  `;
}

function onAnswer(a: Answer) {
  state = answer(state, a);
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function onBack() {
  state = undo(state);
  render();
}
function onReset() {
  state = resetState();
  render();
}

function truncate(s: string, n: number): string { return s.length > n ? s.slice(0, n) + '…' : s; }
function escapeHTML(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
