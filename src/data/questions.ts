import type { Question } from '../types';

/**
 * Map from tree-question text (from the original mindmap) → {yesTag, noTag}
 * Used ONLY to flatten the tree data into entities. Users never see these keys.
 * - yesTag: added to entities on the yes-path
 * - noTag:  added to entities on the no-path (for discriminators like male/female)
 */
export const TREE_Q_MAP: Record<string, { yes: string; no?: string }> = {
  'เป็นสิ่งมีชีวิตหรือตัวละครมั้ย?': { yes: 'living' },
  'เป็นคนหรือตัวละคร(รูปคน)มั้ย?':   { yes: 'humanoid' },
  'เป็นคนจริง (ไม่ใช่การ์ตูน/สมมติ) มั้ย?': { yes: 'real', no: 'fictional' },
  'เป็นคนไทยมั้ย?':                  { yes: 'thai', no: 'foreign' },
  'ยังมีชีวิตอยู่มั้ย?':               { yes: 'alive', no: 'deceased' },
  'อยู่ในวงการบันเทิงมั้ย?':           { yes: 'entertainment' },
  'เป็นผู้หญิงมั้ย?':                  { yes: 'female', no: 'male' },
  'เป็นผู้ชาย?':                      { yes: 'male', no: 'female' },
  'เป็นนักแสดงเป็นหลักมั้ย?':         { yes: 'actor' },
  'เป็นนักแสดงมั้ย?':                 { yes: 'actor' },
  'เป็นนักร้องเป็นหลักมั้ย?':         { yes: 'singer' },
  'เป็นนักร้อง/แร็ปเปอร์มั้ย?':        { yes: 'singer' },
  'เป็น Influencer/YouTuber มั้ย?':  { yes: 'influencer' },
  'เป็น YouTuber/คอนเทนต์ครีเอเตอร์?':{ yes: 'influencer' },
  'เป็น T-Pop ไอดอล/กลุ่มมั้ย?':      { yes: 'idol' },
  'เป็นไอดอล K-Pop มั้ย?':           { yes: 'idol' },
  'เป็นนักกีฬามั้ย?':                 { yes: 'athlete' },
  'เป็นนักกีฬาระดับโลก?':             { yes: 'athlete' },
  'เป็นนักฟุตบอลมั้ย?':               { yes: 'footballer' },
  'เป็นนักมวย/ศิลปะป้องกันตัว?':      { yes: 'martial_artist' },
  'เป็นนักการเมืองมั้ย?':              { yes: 'politician' },
  'เป็นผู้นำการเมืองโลก?':             { yes: 'politician' },
  'เป็นนักธุรกิจ/มหาเศรษฐีมั้ย?':     { yes: 'businessperson' },
  'เป็นนักธุรกิจ/เทคโนโลยี?':          { yes: 'businessperson' },
  'เป็นพระมหากษัตริย์/เชื้อพระวงศ์?':   { yes: 'royalty' },
  'เป็นคนเอเชีย (ไม่ใช่ไทย) มั้ย?':    { yes: 'asian' },
  'เป็นคนเกาหลี (K-Pop / ดารา)?':    { yes: 'korean' },
  'เป็นคนญี่ปุ่น?':                    { yes: 'japanese' },
  'เป็นคนจีน/ฮ่องกง?':                { yes: 'chinese' },
  'อยู่ในวงการบันเทิงฮอลลีวูด/ตะวันตก?':{ yes: 'western', no: 'western' }, // western branch overall
  'เป็นตัวการ์ตูน/อนิเมะมั้ย?':        { yes: 'cartoon' },
  'เป็นอนิเมะญี่ปุ่น?':                { yes: 'anime' },
  'เป็นแนวต่อสู้ (Shonen) มั้ย?':      { yes: 'shonen' },
  'เป็นแนวน่ารัก/เด็ก?':              { yes: 'kids_friendly' },
  'เป็นดิสนีย์/พิกซาร์?':              { yes: 'disney' },
  'เป็นเจ้าหญิงดิสนีย์?':              { yes: 'princess' },
  'เป็นซูเปอร์ฮีโร่?':                 { yes: 'superhero' },
  'เป็น Marvel มั้ย?':                { yes: 'marvel' },
  'เป็นตัวร้าย (Villain) มั้ย?':        { yes: 'villain', no: 'hero' },
  'เป็นตัวละครจากหนังคนจริง/ซีรีส์?':   { yes: 'live_action' },
  'เป็นตัวละครจากเกม?':                { yes: 'video_game' },
  'เป็นสัตว์มั้ย?':                    { yes: 'animal', no: 'plant' },
  'เป็นสัตว์เลี้ยงทั่วไป?':             { yes: 'pet' },
  'อยู่ในน้ำเป็นหลัก?':                { yes: 'aquatic' },
  'เป็นสัตว์เลี้ยงลูกด้วยนมในน้ำ?':      { yes: 'aquatic_mammal' },
  'เป็นปลา?':                         { yes: 'fish' },
  'บินได้?':                          { yes: 'flying' },
  'จับต้องได้ (มีรูปร่างทางกายภาพ) มั้ย?':{ yes: 'physical', no: 'abstract' },
  'เป็นอาหาร/กินได้มั้ย?':             { yes: 'food' },
  'เป็นอาหารคาว (ไม่ใช่ขนม/เครื่องดื่ม)?': { yes: 'savory' },
  'เป็นอาหารไทย?':                    { yes: 'thai_food' },
  'เป็นของหวาน/ขนม?':                 { yes: 'sweet' },
  'เป็นขนมเอเชีย (ญี่ปุ่น/เกาหลี/จีน)?':  { yes: 'asian_sweet' },
  'เป็นผลไม้?':                       { yes: 'fruit' },
  'เป็นผลไม้ไทย/เมืองร้อน?':          { yes: 'tropical_fruit' },
  'มีแอลกอฮอล์?':                     { yes: 'alcoholic' },
  'ใหญ่กว่าคนมั้ย?':                   { yes: 'larger_than_person' },
  'ใหญ่กว่าตัวคน?':                    { yes: 'larger_than_person' },
  'ใหญ่กว่ามือถือมั้ย?':               { yes: 'larger_than_phone' },
  'ใส่/สวมได้?':                       { yes: 'wearable' },
  'เป็นแบรนด์/บริษัท?':                { yes: 'brand' },
  'เป็นอารมณ์/ความรู้สึก?':            { yes: 'emotion' },
  'เป็นดาราศาสตร์/อวกาศ?':            { yes: 'space' },

  // === Food subtree ===
  'กินได้มั้ย?':                       { yes: 'food' },
  'เป็นขนมไทย?':                      { yes: 'thai_sweet' },
  'เป็นอาหารเอเชีย?':                 { yes: 'asian_cuisine' },
  'เป็นอาหารญี่ปุ่น?':                 { yes: 'japanese_food' },
  'เป็นอาหารเกาหลี?':                 { yes: 'korean_food' },
  'เป็นอาหารจีน?':                    { yes: 'chinese_food' },
  'เป็นเครื่องดื่ม?':                  { yes: 'drink' },
  'เป็นผัก?':                         { yes: 'vegetable' },

  // === Places ===
  'เป็นสถานที่?':                     { yes: 'place' },
  'อยู่ในประเทศไทย?':                 { yes: 'thai_place' },
  'อยู่ในกรุงเทพ?':                   { yes: 'bangkok' },
  'ภาคเหนือ?':                        { yes: 'thai_north' },
  'ภาคใต้?':                          { yes: 'thai_south' },
  'เป็นแลนด์มาร์กระดับโลก?':          { yes: 'landmark' },
  'เป็นประเทศ?':                      { yes: 'country' },
  'เป็นเมืองใหญ่?':                   { yes: 'city' },

  // === Animals (more specific) ===
  'เป็นนก?':                          { yes: 'bird' },
  'เป็นแมลง/อาร์ทโรพอด?':             { yes: 'insect' },
  'เป็นสัตว์เลื้อยคลาน?':              { yes: 'reptile' },
  'เป็นดอกไม้?':                      { yes: 'flower' },

  // === Objects ===
  'ใช้ไฟฟ้า/อิเล็กทรอนิกส์?':           { yes: 'electronic' },
  'เป็นอุปกรณ์คอม/สื่อสาร?':           { yes: 'it_device' },
  'อุปกรณ์บันเทิง?':                   { yes: 'entertainment_gear' },
  'เป็นของใช้ในครัว?':                 { yes: 'kitchen' },
  'เป็นของใช้ในห้องน้ำ?':              { yes: 'bathroom' },
  'เป็นเฟอร์นิเจอร์?':                 { yes: 'furniture' },
  'เป็นเสื้อผ้า?':                     { yes: 'clothing' },
  'เป็นรองเท้า?':                      { yes: 'shoes' },
  'เป็นเครื่องประดับ?':                { yes: 'jewelry' },
  'เป็นเครื่องสำอาง?':                 { yes: 'cosmetic' },
  'เป็นเครื่องดนตรี?':                 { yes: 'instrument' },
  'เป็นเครื่องเขียน/ออฟฟิศ?':         { yes: 'stationery' },
  'เป็นอาวุธ?':                        { yes: 'weapon' },
  'เป็นยานพาหนะ?':                    { yes: 'vehicle' },
  'เป็นของเล่น/กีฬา?':                 { yes: 'toy_sport' },

  // === Brand subtypes ===
  'เป็นแบรนด์เทคโนโลยี?':              { yes: 'tech_brand' },
  'แบรนด์อาหาร/เครื่องดื่ม?':          { yes: 'food_brand' },
  'แบรนด์แฟชั่น/กีฬา?':                { yes: 'fashion_brand' },
  'แบรนด์รถ?':                         { yes: 'car_brand' },

  // === Media ===
  'เป็นหนัง/ซีรีส์?':                  { yes: 'film_or_show' },
  'เป็นหนัง?':                         { yes: 'movie' },
  'เป็นซีรีส์ต่างประเทศ?':             { yes: 'foreign_series' },
  'เป็นเพลง?':                         { yes: 'song' },

  // === Activity / concept ===
  'เป็นกีฬา?':                         { yes: 'sport' },
  'เป็นอาชีพ?':                        { yes: 'profession_noun' },
  'เป็นปรากฏการณ์ธรรมชาติ?':          { yes: 'natural' },
  'เป็นเทศกาล/วันสำคัญ?':             { yes: 'festival' },
  'เทศกาลไทย?':                        { yes: 'thai_festival' },
};

/**
 * Some leaf category names imply additional tags (beyond the tree-path tags).
 * e.g. a leaf called "นก" means all its entities are birds — but the tree
 * doesn't have a "เป็นนก?" question, so we inject the `bird` tag here.
 */
export const LEAF_IMPLIED_TAGS: Array<{ match: RegExp; tags: string[] }> = [
  { match: /นก/,                       tags: ['bird', 'flying', 'animal'] },
  { match: /ปลา/,                      tags: ['fish', 'aquatic', 'animal'] },
  { match: /แมลง|แมงมุม/,              tags: ['insect', 'animal'] },
  { match: /สัตว์เลื้อยคลาน|สะเทินน้ำ/, tags: ['reptile', 'animal'] },
  { match: /สัตว์น้ำ/,                 tags: ['aquatic', 'animal'] },
  { match: /ดอกไม้/,                   tags: ['flower', 'plant'] },
  { match: /Marvel Hero/,              tags: ['hero', 'marvel', 'superhero', 'cartoon'] },
  { match: /Marvel Villain/,           tags: ['villain', 'marvel', 'superhero', 'cartoon'] },
  { match: /^DC$/,                     tags: ['dc', 'superhero', 'cartoon'] },
  { match: /เจ้าหญิงดิสนีย์/,          tags: ['princess', 'disney', 'female', 'cartoon'] },
  { match: /หนัง/,                     tags: ['movie'] },
  { match: /IT\/คอม/,                  tags: ['it_device', 'electronic'] },
  { match: /อิเล็กทรอนิกส์/,           tags: ['electronic'] },
  { match: /อาวุธ/,                    tags: ['weapon'] },
  { match: /รองเท้า/,                  tags: ['wearable'] },
  { match: /ตัวละครนิทาน/,             tags: ['folklore', 'fictional'] },
  { match: /ดาราชาย/,                  tags: ['male'] },
  { match: /ดาราหญิง/,                 tags: ['female'] },
  { match: /นักร้องชาย/,               tags: ['male'] },
  { match: /นักร้องหญิง/,              tags: ['female'] },
  { match: /YouTuber ชาย|พิธีกร.*ชาย/, tags: ['male'] },
  { match: /อินฟลูฯ หญิง|ตลกหญิง|นางแบบ/, tags: ['female'] },
  { match: /T-Pop ไอดอลหญิง/,         tags: ['female'] },
  { match: /เครื่องดื่ม/,              tags: ['alcoholic'] },
];

/**
 * The user-facing question bank. The engine picks from here by information gain.
 * `weight` boosts priority (generic/high-level questions have higher weight).
 */
export const QUESTIONS: Question[] = [
  // --- Top-level (highest weight, ask early) ---
  { id: 'living',         text: 'เป็นสิ่งมีชีวิตหรือตัวละครมั้ย?', tag: 'living',   hint: 'คน, สัตว์, พืช, หรือตัวการ์ตูนที่มีบุคลิก', weight: 100 },
  { id: 'physical',       text: 'จับต้องได้มั้ย (มีรูปร่างทางกายภาพ)?', tag: 'physical', hint: 'ถ้าเป็นแนวคิด/อารมณ์ = ไม่ใช่', weight: 95 },
  { id: 'humanoid',       text: 'เป็นคน/ตัวละครรูปคนมั้ย?',         tag: 'humanoid', hint: 'สัตว์ตอบไม่ใช่ ตัวการ์ตูนรูปคนตอบใช่', weight: 90 },
  { id: 'real',           text: 'เป็นคนจริงมั้ย (ไม่ใช่การ์ตูน/สมมติ)?', tag: 'real', hint: 'Thor = ไม่ใช่ เพราะเป็นตัวละคร; Chris Hemsworth = ใช่', weight: 85 },

  // --- Demographics ---
  { id: 'thai',           text: 'เป็นคนไทยมั้ย?',                  tag: 'thai',    weight: 80 },
  { id: 'asian',          text: 'เป็นคนเอเชีย (ไม่ใช่ไทย) มั้ย?',  tag: 'asian',   weight: 75 },
  { id: 'korean',         text: 'เป็นคนเกาหลีมั้ย?',                tag: 'korean',  weight: 70 },
  { id: 'japanese',       text: 'เป็นคนญี่ปุ่นมั้ย?',                tag: 'japanese', weight: 70 },
  { id: 'chinese',        text: 'เป็นคนจีน/ฮ่องกงมั้ย?',            tag: 'chinese', weight: 70 },
  { id: 'western',        text: 'เป็นคนตะวันตก/ฮอลลีวูดมั้ย?',     tag: 'western', weight: 70 },

  { id: 'alive',          text: 'ยังมีชีวิตอยู่มั้ย?',                tag: 'alive',   weight: 75 },
  { id: 'female',         text: 'เป็นผู้หญิงมั้ย?',                  tag: 'female', hint: 'ตอบ "อาจจะ" ได้ถ้าเป็น entity ที่ไม่มีเพศชัดเจน', weight: 70 },

  // --- Profession ---
  { id: 'entertainment',  text: 'อยู่ในวงการบันเทิงมั้ย?',          tag: 'entertainment', weight: 65 },
  { id: 'actor',          text: 'เป็นนักแสดงเป็นหลักมั้ย?',         tag: 'actor',   weight: 60 },
  { id: 'singer',         text: 'เป็นนักร้อง/แร็ปเปอร์มั้ย?',        tag: 'singer',  weight: 60 },
  { id: 'influencer',     text: 'เป็น Influencer/YouTuber มั้ย?',  tag: 'influencer', weight: 55 },
  { id: 'idol',           text: 'เป็นไอดอล (K-Pop/T-Pop) มั้ย?',    tag: 'idol',    weight: 55 },
  { id: 'athlete',        text: 'เป็นนักกีฬามั้ย?',                  tag: 'athlete', weight: 60 },
  { id: 'footballer',     text: 'เป็นนักฟุตบอลมั้ย?',                tag: 'footballer', weight: 50 },
  { id: 'martial_artist', text: 'เป็นนักมวย/ศิลปะต่อสู้มั้ย?',       tag: 'martial_artist', weight: 50 },
  { id: 'politician',     text: 'เป็นนักการเมือง/ผู้นำโลกมั้ย?',     tag: 'politician', weight: 60 },
  { id: 'businessperson', text: 'เป็นนักธุรกิจ/เทคโนโลยีมั้ย?',      tag: 'businessperson', weight: 55 },
  { id: 'royalty',        text: 'เป็นพระมหากษัตริย์/ราชวงศ์มั้ย?',   tag: 'royalty', weight: 55 },

  // --- Media / Fiction ---
  { id: 'cartoon',        text: 'เป็นตัวการ์ตูน/อนิเมะมั้ย?',        tag: 'cartoon', hint: 'Thor = ใช่ (ต้นฉบับจากการ์ตูน) — ตอบ "อาจจะ" ได้ถ้าเป็นทั้งการ์ตูนและหนัง', weight: 70 },
  { id: 'anime',          text: 'เป็นอนิเมะญี่ปุ่นมั้ย?',             tag: 'anime',   weight: 60 },
  { id: 'shonen',         text: 'เป็นแนวต่อสู้ (Shonen) มั้ย?',      tag: 'shonen',  weight: 45 },
  { id: 'kids_friendly',  text: 'เป็นแนวน่ารัก/เด็กดูมั้ย?',         tag: 'kids_friendly', weight: 50 },
  { id: 'disney',         text: 'เป็นดิสนีย์/พิกซาร์มั้ย?',           tag: 'disney',  weight: 55 },
  { id: 'princess',       text: 'เป็นเจ้าหญิงดิสนีย์มั้ย?',           tag: 'princess', weight: 40 },
  { id: 'superhero',      text: 'เป็นซูเปอร์ฮีโร่มั้ย?',              tag: 'superhero', weight: 60 },
  { id: 'marvel',         text: 'เป็น Marvel มั้ย?',                tag: 'marvel',  weight: 50 },
  { id: 'dc',             text: 'เป็น DC มั้ย?',                    tag: 'dc',      weight: 50 },
  { id: 'villain',        text: 'เป็นตัวร้ายมั้ย?',                  tag: 'villain', weight: 45 },
  { id: 'live_action',    text: 'มาจากหนังคนจริง/ซีรีส์มั้ย?',       tag: 'live_action', weight: 55 },
  { id: 'video_game',     text: 'เป็นตัวละครจากเกมมั้ย?',            tag: 'video_game', weight: 55 },

  // --- Animals ---
  { id: 'animal',         text: 'เป็นสัตว์มั้ย?',                    tag: 'animal',  weight: 80 },
  { id: 'pet',            text: 'เป็นสัตว์เลี้ยงทั่วไปมั้ย?',         tag: 'pet',     weight: 55 },
  { id: 'fish',           text: 'เป็นปลามั้ย?',                      tag: 'fish',    weight: 50 },
  { id: 'bird',           text: 'เป็นนกมั้ย?',                       tag: 'bird',    weight: 50 },
  { id: 'flying',         text: 'บินได้มั้ย?',                       tag: 'flying',  weight: 50 },
  { id: 'aquatic',        text: 'อยู่ในน้ำเป็นหลักมั้ย?',             tag: 'aquatic', weight: 50 },
  { id: 'insect',         text: 'เป็นแมลง/แมงมุมมั้ย?',              tag: 'insect',  weight: 45 },
  { id: 'reptile',        text: 'เป็นสัตว์เลื้อยคลาน/สะเทินน้ำมั้ย?', tag: 'reptile', weight: 45 },

  // --- Food ---
  { id: 'food',           text: 'เป็นอาหาร/กินได้มั้ย?',              tag: 'food',    weight: 70 },
  { id: 'savory',         text: 'เป็นอาหารคาวมั้ย?',                 tag: 'savory',  weight: 55 },
  { id: 'sweet',          text: 'เป็นของหวาน/ขนมมั้ย?',              tag: 'sweet',   weight: 55 },
  { id: 'thai_food',      text: 'เป็นอาหารไทยมั้ย?',                 tag: 'thai_food', weight: 55 },
  { id: 'asian_sweet',    text: 'เป็นขนมเอเชียมั้ย?',                 tag: 'asian_sweet', weight: 45 },
  { id: 'fruit',          text: 'เป็นผลไม้มั้ย?',                    tag: 'fruit',   weight: 55 },
  { id: 'tropical_fruit', text: 'เป็นผลไม้เมืองร้อน/ไทยมั้ย?',       tag: 'tropical_fruit', weight: 45 },
  { id: 'alcoholic',      text: 'มีแอลกอฮอล์มั้ย?',                   tag: 'alcoholic', weight: 40 },

  // --- Objects ---
  { id: 'larger_than_person', text: 'ใหญ่กว่าคนมั้ย?',                tag: 'larger_than_person', weight: 55 },
  { id: 'wearable',       text: 'ใส่/สวมได้มั้ย?',                   tag: 'wearable', weight: 50 },
  { id: 'weapon',         text: 'เป็นอาวุธมั้ย?',                    tag: 'weapon',  weight: 45 },
  { id: 'electronic',     text: 'เป็นอิเล็กทรอนิกส์มั้ย?',            tag: 'electronic', weight: 50 },
  { id: 'it_device',      text: 'เป็นคอมพิวเตอร์/มือถือมั้ย?',        tag: 'it_device', weight: 45 },
  { id: 'brand',          text: 'เป็นแบรนด์/บริษัทมั้ย?',             tag: 'brand',   weight: 55 },

  // --- Abstract ---
  { id: 'abstract',       text: 'เป็นนามธรรมมั้ย (จับต้องไม่ได้)?',   tag: 'abstract', weight: 45 },
  { id: 'emotion',        text: 'เป็นอารมณ์/ความรู้สึกมั้ย?',         tag: 'emotion', weight: 50 },
  { id: 'natural',        text: 'เป็นปรากฏการณ์ธรรมชาติมั้ย?',       tag: 'natural', weight: 50 },
  { id: 'space',          text: 'เกี่ยวกับดาราศาสตร์/อวกาศมั้ย?',    tag: 'space',   weight: 50 },
  { id: 'concept',        text: 'เป็นแนวคิด/นามธรรมอื่นๆ มั้ย?',     tag: 'concept', weight: 45 },

  // --- Places ---
  { id: 'place',          text: 'เป็นสถานที่มั้ย?',                   tag: 'place',   weight: 85 },
  { id: 'thai_place',     text: 'อยู่ในประเทศไทยมั้ย?',               tag: 'thai_place', weight: 65 },
  { id: 'bangkok',        text: 'อยู่ในกรุงเทพมั้ย?',                 tag: 'bangkok', weight: 55 },
  { id: 'landmark',       text: 'เป็นแลนด์มาร์กระดับโลกมั้ย?',        tag: 'landmark', weight: 65, hint: 'เช่น หอไอเฟล, แกรนด์แคนยอน, ทัชมาฮาล, ภูเขาไฟฟูจิ' },
  { id: 'country',        text: 'เป็นประเทศมั้ย?',                    tag: 'country', weight: 70 },
  { id: 'city',           text: 'เป็นเมืองใหญ่มั้ย?',                  tag: 'city',    weight: 60 },

  // --- Food specifics ---
  { id: 'drink',          text: 'เป็นเครื่องดื่มมั้ย?',                tag: 'drink',   weight: 55 },
  { id: 'vegetable',      text: 'เป็นผักมั้ย?',                       tag: 'vegetable', weight: 45 },
  { id: 'asian_cuisine',  text: 'เป็นอาหารเอเชียมั้ย?',               tag: 'asian_cuisine', weight: 50 },
  { id: 'japanese_food',  text: 'เป็นอาหารญี่ปุ่นมั้ย?',               tag: 'japanese_food', weight: 45 },
  { id: 'korean_food',    text: 'เป็นอาหารเกาหลีมั้ย?',                tag: 'korean_food',   weight: 45 },
  { id: 'chinese_food',   text: 'เป็นอาหารจีนมั้ย?',                   tag: 'chinese_food',  weight: 45 },

  // --- Media / work ---
  { id: 'movie',          text: 'เป็นหนังมั้ย?',                      tag: 'movie',   weight: 65 },
  { id: 'film_or_show',   text: 'เป็นหนัง/ซีรีส์มั้ย?',               tag: 'film_or_show', weight: 60 },
  { id: 'foreign_series', text: 'เป็นซีรีส์ต่างประเทศมั้ย?',          tag: 'foreign_series', weight: 50 },
  { id: 'song',           text: 'เป็นเพลงมั้ย?',                      tag: 'song',    weight: 65 },
  { id: 'sport',          text: 'เป็นกีฬา (ประเภท) มั้ย?',             tag: 'sport',   weight: 60, hint: 'เช่น ฟุตบอล, เทนนิส — ไม่ใช่นักกีฬา' },

  // --- Objects (detailed) ---
  { id: 'vehicle',        text: 'เป็นยานพาหนะมั้ย?',                  tag: 'vehicle', weight: 70 },
  { id: 'clothing',       text: 'เป็นเสื้อผ้ามั้ย?',                  tag: 'clothing', weight: 55 },
  { id: 'shoes',          text: 'เป็นรองเท้ามั้ย?',                  tag: 'shoes',   weight: 45 },
  { id: 'furniture',      text: 'เป็นเฟอร์นิเจอร์มั้ย?',              tag: 'furniture', weight: 55 },
  { id: 'kitchen',        text: 'เป็นของใช้ในครัวมั้ย?',              tag: 'kitchen', weight: 50 },
  { id: 'bathroom',       text: 'เป็นของใช้ในห้องน้ำมั้ย?',           tag: 'bathroom', weight: 45 },
  { id: 'instrument',     text: 'เป็นเครื่องดนตรีมั้ย?',              tag: 'instrument', weight: 55 },
  { id: 'jewelry',        text: 'เป็นเครื่องประดับมั้ย?',             tag: 'jewelry', weight: 45 },
  { id: 'cosmetic',       text: 'เป็นเครื่องสำอางมั้ย?',              tag: 'cosmetic', weight: 45 },
  { id: 'stationery',     text: 'เป็นเครื่องเขียน/ของใช้ออฟฟิศมั้ย?', tag: 'stationery', weight: 45 },
  { id: 'toy_sport',      text: 'เป็นของเล่น/อุปกรณ์กีฬามั้ย?',        tag: 'toy_sport', weight: 50 },
  { id: 'larger_than_phone', text: 'ใหญ่กว่ามือถือมั้ย?',              tag: 'larger_than_phone', weight: 60 },

  // --- Brand specifics ---
  { id: 'tech_brand',     text: 'เป็นแบรนด์เทคโนโลยีมั้ย?',           tag: 'tech_brand', weight: 50 },
  { id: 'food_brand',     text: 'เป็นแบรนด์อาหาร/เครื่องดื่มมั้ย?',  tag: 'food_brand', weight: 45 },
  { id: 'fashion_brand',  text: 'เป็นแบรนด์แฟชั่น/กีฬามั้ย?',         tag: 'fashion_brand', weight: 45 },
  { id: 'car_brand',      text: 'เป็นแบรนด์รถมั้ย?',                  tag: 'car_brand', weight: 45 },

  // --- Profession (noun, not person) ---
  { id: 'profession_noun',text: 'เป็นชื่ออาชีพ (ไม่ใช่คน) มั้ย?',      tag: 'profession_noun', weight: 55, hint: 'เช่น หมอ, ครู — ไม่ใช่คนดังที่เป็นหมอ' },

  // --- Festival ---
  { id: 'festival',       text: 'เป็นเทศกาล/วันสำคัญมั้ย?',           tag: 'festival', weight: 55 },
];

export const QUESTIONS_BY_ID = new Map(QUESTIONS.map(q => [q.id, q]));
export const QUESTIONS_BY_TAG = new Map(QUESTIONS.map(q => [q.tag, q]));
