import type { Entity } from '../types';
import { ENTITIES, entitiesByCategory } from '../data/entities';
import { TAG_META, TAG_GROUPS } from '../data/tags';

let query = '';
let activeTag: string | null = null;

export function mountBrowse(root: HTMLElement) {
  root.innerHTML = '';

  // Search
  const searchWrap = document.createElement('div');
  searchWrap.className = 'search-wrap';
  searchWrap.innerHTML = `
    <input class="search" type="search" placeholder="ค้นหา... (เช่น: Thor, หมา, ต้มยำ)" autocomplete="off" />
    <span class="search-icon">⌕</span>
  `;
  const input = searchWrap.querySelector<HTMLInputElement>('input')!;
  let timer: number | undefined;
  input.addEventListener('input', () => {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => { query = input.value.trim().toLowerCase(); renderList(list); }, 120);
  });
  root.appendChild(searchWrap);

  // Tag filter bar
  const tagBar = document.createElement('div');
  tagBar.className = 'browse-tag-bar';
  const allBtn = document.createElement('button');
  allBtn.className = 'browse-tag' + (activeTag === null ? ' active' : '');
  allBtn.textContent = 'ทั้งหมด';
  allBtn.onclick = () => { activeTag = null; renderTagBar(tagBar); renderList(list); };
  tagBar.appendChild(allBtn);
  renderTagBar(tagBar);
  root.appendChild(tagBar);

  const list = document.createElement('div');
  root.appendChild(list);
  renderList(list);
}

function renderTagBar(tagBar: HTMLElement) {
  // keep first "all" button, replace rest
  while (tagBar.children.length > 1) tagBar.removeChild(tagBar.lastChild!);
  // Show a curated set of quick-filter tags (top-level nature/profession)
  const quickTags = [
    'humanoid', 'animal', 'physical', 'abstract',
    'thai', 'western', 'asian',
    'entertainment', 'athlete', 'politician',
    'cartoon', 'superhero', 'video_game',
    'food', 'fruit', 'brand'
  ];
  for (const t of quickTags) {
    const meta = TAG_META[t];
    if (!meta) continue;
    const b = document.createElement('button');
    b.className = 'browse-tag' + (activeTag === t ? ' active' : '');
    b.textContent = meta.label;
    b.onclick = () => { activeTag = activeTag === t ? null : t; renderTagBar(tagBar); renderList(document.querySelector('#browse > div:last-child')!); };
    tagBar.appendChild(b);
  }
  // Update "all" active state
  const first = tagBar.firstElementChild as HTMLElement;
  first.classList.toggle('active', activeTag === null);
}

function renderList(listEl: HTMLElement) {
  listEl.innerHTML = '';
  const filtered = filterEntities();
  if (filtered.length === 0) {
    listEl.innerHTML = `<div class="callout"><b>ไม่พบ</b> — ลองเปลี่ยนคำค้นหา หรือลบ tag filter</div>`;
    return;
  }

  // Group by category, sorted by size desc
  const byCat = new Map<string, Entity[]>();
  for (const e of filtered) {
    const arr = byCat.get(e.category) ?? [];
    arr.push(e);
    byCat.set(e.category, arr);
  }
  const sorted = [...byCat.entries()].sort((a, b) => b[1].length - a[1].length);

  for (const [cat, items] of sorted) {
    const block = document.createElement('div');
    block.className = 'cat-block';
    const h = document.createElement('h4');
    h.innerHTML = `<span>${escapeHTML(cat)}</span><span class="count">${items.length} รายการ</span>`;
    block.appendChild(h);
    const chips = document.createElement('div');
    chips.className = 'chips';
    for (const e of items.slice(0, 60)) {
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.textContent = e.name;
      chips.appendChild(chip);
    }
    if (items.length > 60) {
      const more = document.createElement('span');
      more.className = 'chip muted';
      more.textContent = `+${items.length - 60} อีก`;
      chips.appendChild(more);
    }
    block.appendChild(chips);
    listEl.appendChild(block);
  }

  const summary = document.createElement('div');
  summary.className = 'callout small';
  summary.innerHTML = `พบ <b>${filtered.length.toLocaleString('th-TH')}</b> รายการ จากทั้งหมด ${ENTITIES.length.toLocaleString('th-TH')} • จัดกลุ่ม ${sorted.length} หมวด`;
  listEl.prepend(summary);
}

function filterEntities(): Entity[] {
  let list = ENTITIES;
  if (activeTag) list = list.filter(e => e.tags.has(activeTag!));
  if (query) {
    list = list.filter(e =>
      e.name.toLowerCase().includes(query) ||
      e.category.toLowerCase().includes(query)
    );
  }
  return list;
}

function escapeHTML(s: string): string {
  return String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]!));
}

// Silence "declared but never used" when tags.ts only re-exports groups
void entitiesByCategory;
void TAG_GROUPS;
