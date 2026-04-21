import type { TreeNode } from '../types';
import { TREE } from '../engine';

export function mountBrowse(root: HTMLElement) {
  root.innerHTML = `
    <div class="search-wrap">
      <input id="search" type="search" class="search" placeholder="ค้นหา... (เช่น: หมา, ต้มยำ, มาริโอ้)" autocomplete="off">
      <span class="search-icon">⌕</span>
    </div>
    <div class="search-count" id="searchCount"></div>
    <div class="tree-controls">
      <button class="action-btn" id="expandAll">เปิดทั้งหมด</button>
      <button class="action-btn" id="collapseAll">ปิดทั้งหมด</button>
      <button class="action-btn" id="expand2">เปิด 2 ชั้น</button>
    </div>
    <div id="treeRoot"></div>
  `;
  const treeRoot = root.querySelector<HTMLDivElement>('#treeRoot')!;
  treeRoot.appendChild(buildNode(TREE, null));

  root.querySelector<HTMLButtonElement>('#expandAll')!.onclick = () => toggleAll(true);
  root.querySelector<HTMLButtonElement>('#collapseAll')!.onclick = () => toggleAll(false);
  root.querySelector<HTMLButtonElement>('#expand2')!.onclick = () => expandLevel(2);

  setupSearch(root);
}

function buildNode(node: TreeNode, answerLabel: 'yes' | 'no' | null): HTMLElement {
  if (node.t === 'L') {
    const el = document.createElement('div');
    el.className = 'node leaf-node';
    el.setAttribute('data-searchable', (node.cat + ' ' + node.ex.join(' ')).toLowerCase());
    el.innerHTML = `
      <div class="leaf-wrap">
        <div class="leaf-title">${answerLabel ? `<span class="node-badge ${answerLabel}">${answerLabel === 'yes' ? 'ใช่' : 'ไม่'}</span> ` : ''}${escapeHTML(node.cat)}</div>
        <div class="chips">${node.ex.map(e => `<span class="chip">${escapeHTML(e)}</span>`).join('')}</div>
      </div>
    `;
    return el;
  }

  const el = document.createElement('div');
  el.className = 'node';
  el.setAttribute('data-searchable', node.q.toLowerCase());

  const head = document.createElement('div');
  head.className = 'node-head';
  head.innerHTML = `
    <span class="node-arrow">▶</span>
    ${answerLabel ? `<span class="node-badge ${answerLabel}">${answerLabel === 'yes' ? 'ใช่' : 'ไม่'}</span>` : ''}
    <span class="node-text"><span class="q">${escapeHTML(node.q)}</span></span>
  `;
  head.onclick = () => el.classList.toggle('open');
  el.appendChild(head);

  const body = document.createElement('div');
  body.className = 'node-body';
  body.appendChild(buildNode(node.y, 'yes'));
  body.appendChild(buildNode(node.n, 'no'));
  el.appendChild(body);

  return el;
}

function toggleAll(open: boolean) {
  document.querySelectorAll<HTMLDivElement>('#treeRoot .node').forEach(n => {
    n.classList.toggle('open', open);
  });
}
function expandLevel(n: number) {
  toggleAll(false);
  const walk = (el: Element, depth: number) => {
    if (depth > n) return;
    if (el.classList.contains('node')) el.classList.add('open');
    [...el.children].forEach(c => {
      const isNode = c.classList.contains('node');
      walk(c, depth + (isNode ? 1 : 0));
    });
  };
  document.querySelectorAll<HTMLDivElement>('#treeRoot > .node').forEach(n => walk(n, 1));
}

function setupSearch(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>('#search')!;
  const countEl = root.querySelector<HTMLDivElement>('#searchCount')!;
  let timer: number | undefined;
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => doSearch(input.value.trim().toLowerCase(), countEl), 150);
  });
}

function doSearch(query: string, countEl: HTMLElement) {
  const nodes = document.querySelectorAll<HTMLDivElement>('#treeRoot .node, #treeRoot .leaf-node');
  if (!query) {
    nodes.forEach(n => {
      n.style.display = '';
      n.classList.remove('highlight');
    });
    toggleAll(false);
    countEl.textContent = '';
    return;
  }
  let matchCount = 0;
  const matched = new Set<Element>();
  nodes.forEach(n => {
    const text = n.getAttribute('data-searchable') || '';
    if (text.includes(query)) {
      matched.add(n);
      matchCount++;
    }
  });
  nodes.forEach(n => {
    const isMatch = matched.has(n);
    const hasMatchChild = [...n.querySelectorAll('.node, .leaf-node')].some(c => matched.has(c));
    if (isMatch || hasMatchChild) {
      n.style.display = '';
      if (n.classList.contains('node')) n.classList.add('open');
      if (isMatch) n.classList.add('highlight'); else n.classList.remove('highlight');
    } else {
      n.style.display = 'none';
    }
  });
  countEl.textContent = `พบ ${matchCount} รายการ`;
}

function escapeHTML(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}
