import type { Book, PlayNode } from '../../types';
import { q } from './_helpers';
import { PERSON_BOOK_ROOT } from './person';
import { CHARACTER_BOOK_ROOT } from './character';
import { CREATURE_BOOK_ROOT } from './creature';
import { THING_BOOK_ROOT } from './thing';
import { PLACE_BOOK_ROOT } from './place';
import { ABSTRACT_BOOK_ROOT } from './abstract';

export const BOOKS: Book[] = [
  { id: 'person',    label: 'PERSON',    emoji: '👤', strategy: 'ภูมิภาค → สถานะ → อาชีพ → เพศ/รุ่น',     root: PERSON_BOOK_ROOT },
  { id: 'character', label: 'CHARACTER', emoji: '🎭', strategy: 'medium (anime/Disney/Marvel/game) → drill', root: CHARACTER_BOOK_ROOT },
  { id: 'creature',  label: 'CREATURE',  emoji: '🐾', strategy: 'สัตว์/พืช → ที่อยู่ → ขนาด/ประเภท',       root: CREATURE_BOOK_ROOT },
  { id: 'thing',     label: 'THING',     emoji: '📦', strategy: 'กินได้ → พาหนะ → ใส่ → ไฟฟ้า → เฉพาะทาง', root: THING_BOOK_ROOT },
  { id: 'place',     label: 'PLACE',     emoji: '📍', strategy: 'ไทย/ต่างประเทศ → ภูมิภาค → ประเภท',      root: PLACE_BOOK_ROOT },
  { id: 'abstract',  label: 'ABSTRACT',  emoji: '💭', strategy: 'อารมณ์/ธรรมชาติ/อวกาศ/กีฬา/อาชีพ/เทศกาล/แนวคิด', root: ABSTRACT_BOOK_ROOT },
];

/** Map from a node-reference (book root) → the Book it belongs to. */
export const BOOK_BY_ROOT: Map<PlayNode, Book> = new Map(BOOKS.map(b => [b.root, b]));

/**
 * OPENING — shared 3-question opening that routes to one of 6 books.
 * Flow:
 *   Q1 living?           yes → humanoid?       no → physical?
 *   Q2a humanoid?         yes → real?           no → CREATURE
 *   Q2b physical?         yes → THING           no → place?
 *   Q3a real?             yes → PERSON          no → CHARACTER
 *   Q3b place?            yes → PLACE           no → ABSTRACT
 */
export const OPENING: PlayNode = q('มีชีวิต/เป็นตัวละครมั้ย?',
  // yes (living/character)
  q('เป็นคน/ตัวละครรูปคนมั้ย?',
    // humanoid
    q('เป็นคนจริง (ไม่ใช่สมมติ)?',
      PERSON_BOOK_ROOT,
      CHARACTER_BOOK_ROOT,
      { hint: 'ถ้าเป็นตัวละคร (Thor, Elsa, Naruto) → ไม่ใช่',
        trap: 'คนจริงที่แสดงเป็นตัวละคร (Chris Hemsworth = Thor) → ยึด "คนจริง" = ใช่' }),
    // non-humanoid living
    CREATURE_BOOK_ROOT,
    { hint: 'สัตว์ + พืช = CREATURE; คน + ตัวการ์ตูนรูปคน = humanoid' }),
  // no (not living)
  q('จับต้องได้ (มีรูปร่างทางกายภาพ)?',
    // physical
    THING_BOOK_ROOT,
    // abstract
    q('เป็นสถานที่?',
      PLACE_BOOK_ROOT,
      ABSTRACT_BOOK_ROOT,
      { hint: 'สถานที่ = จุด/พื้นที่; นามธรรม = แนวคิด/อารมณ์' }),
    { hint: 'จับได้ = ของ; จับไม่ได้ = สถานที่/นามธรรม',
      trap: 'สถานที่ก็ "อยู่ได้จริง" แต่เราเอามันเข้า abstract เพราะ "เอามือจับ" ไม่เข้าท่า' }),
  { hint: '3 คำถามเปิดคัดแยก 6 books: Person / Character / Creature / Thing / Place / Abstract',
    trap: 'ตัวละครรูปสัตว์ (Pikachu, Simba) — humanoid=no → CREATURE? ไม่! ใช้ "อาจจะ" แล้วโน้มไป CHARACTER' });
