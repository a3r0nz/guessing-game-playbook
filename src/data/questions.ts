
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

