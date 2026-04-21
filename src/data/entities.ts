import type { Entity } from '../types';
import type { TreeNode } from './tree';
import { TREE } from './tree';
import { TREE_Q_MAP, LEAF_IMPLIED_TAGS } from './questions';

function slug(s: string): string {
  return s.toLowerCase()
    .replace(/[()[\]{}"']/g, '')
    .replace(/\s+/g, '_')
    .slice(0, 80);
}

/**
 * Walk the decision tree and emit one Entity per leaf example.
 * Path accumulation:
 *   - q node yes-branch: add yes-tag
 *   - q node no-branch:  add no-tag (if defined; for discriminators)
 *   - L leaf: create entity with accumulated tags + implied tags from leaf name
 *
 * Deduplicates by normalized name: if an example appears in two leaves,
 * we union their tags (preserves "Thor" = marvel + hero + character ...).
 */
function walk(
  node: TreeNode,
  tags: Set<string>,
  category: string,
  out: Map<string, Entity>,
  leafCount: { n: number }
): void {
  if (node.t === 'L') {
    leafCount.n++;
    const leafTags = new Set(tags);
    // category name itself is a coarse tag (useful in browse)
    leafTags.add('cat:' + slug(node.cat));
    // leaf-name-implied tags
    for (const { match, tags: impliedTags } of LEAF_IMPLIED_TAGS) {
      if (match.test(node.cat)) {
        for (const t of impliedTags) leafTags.add(t);
      }
    }
    // Assign each example as an entity.
    // Key by (name + category) — same name in different categories = distinct
    // entities (e.g., "Thor" the Marvel hero vs "Thor" the movie).
    // Within the same leaf, duplicates are unioned.
    for (const [i, name] of node.ex.entries()) {
      const cleaned = name.replace(/\s*\(ไม่ใช่[^)]*\)/g, '').replace(/\s*\(ตัดออก\)/g, '').trim();
      if (!cleaned || /ตัดออก|ไม่ใช่.*ตัดออก/.test(name)) continue;
      const id = (slug(cleaned) + '__' + slug(node.cat)) || 'e_' + leafCount.n + '_' + i;
      const existing = out.get(id);
      if (existing) {
        for (const t of leafTags) existing.tags.add(t);
      } else {
        out.set(id, {
          id,
          name: cleaned,
          category: node.cat,
          tags: new Set(leafTags),
          // earlier examples in a leaf tend to be more popular — rough heuristic
          popularity: Math.max(0.1, 1 - i / Math.max(node.ex.length, 10))
        });
      }
    }
    return;
  }
  // q node
  const map = TREE_Q_MAP[node.q];
  const yesTags = new Set(tags);
  const noTags = new Set(tags);
  if (map) {
    yesTags.add(map.yes);
    if (map.no) noTags.add(map.no);
  }
  walk(node.y, yesTags, category, out, leafCount);
  walk(node.n, noTags, category, out, leafCount);
}

function buildEntities(): Entity[] {
  const out = new Map<string, Entity>();
  walk(TREE, new Set<string>(), '', out, { n: 0 });
  return [...out.values()];
}

export const ENTITIES: Entity[] = buildEntities();

export const ALL_TAGS: Set<string> = (() => {
  const s = new Set<string>();
  for (const e of ENTITIES) for (const t of e.tags) s.add(t);
  return s;
})();

export function entitiesByCategory(): Map<string, Entity[]> {
  const map = new Map<string, Entity[]>();
  for (const e of ENTITIES) {
    const arr = map.get(e.category) ?? [];
    arr.push(e);
    map.set(e.category, arr);
  }
  return map;
}
