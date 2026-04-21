export interface TagMeta {
  label: string;
  group: string;
}

export const TAG_META: Record<string, TagMeta> = {
  // ===== Top-level nature =====
  living:        { label: 'สิ่งมีชีวิต/ตัวละคร',     group: 'nature' },
  humanoid:      { label: 'คน/ตัวละครรูปคน',       group: 'nature' },
  animal:        { label: 'สัตว์',                group: 'nature' },
  plant:         { label: 'พืช',                  group: 'nature' },
  physical:      { label: 'สิ่งของจับต้องได้',       group: 'nature' },
  abstract:      { label: 'นามธรรม',              group: 'nature' },

  // ===== Reality =====
  real:          { label: 'คนจริง',                group: 'reality' },
  fictional:     { label: 'ตัวละครสมมติ',           group: 'reality' },

  // ===== Demographics =====
  thai:          { label: 'ไทย',                   group: 'origin' },
  foreign:       { label: 'ต่างชาติ',               group: 'origin' },
  asian:         { label: 'เอเชีย (ไม่ใช่ไทย)',     group: 'origin' },
  korean:        { label: 'เกาหลี',                group: 'origin' },
  japanese:      { label: 'ญี่ปุ่น',                group: 'origin' },
  chinese:       { label: 'จีน/ฮ่องกง',             group: 'origin' },
  western:       { label: 'ตะวันตก/ฮอลลีวูด',       group: 'origin' },

  alive:         { label: 'ยังมีชีวิต',             group: 'status' },
  deceased:      { label: 'ล่วงลับ/ประวัติศาสตร์',   group: 'status' },

  male:          { label: 'ผู้ชาย',                 group: 'gender' },
  female:        { label: 'ผู้หญิง',                group: 'gender' },

  // ===== Occupations =====
  entertainment: { label: 'วงการบันเทิง',           group: 'profession' },
  actor:         { label: 'นักแสดง',                group: 'profession' },
  singer:        { label: 'นักร้อง/แร็ปเปอร์',      group: 'profession' },
  influencer:    { label: 'อินฟลูฯ/YouTuber',      group: 'profession' },
  idol:          { label: 'ไอดอล (K-Pop/T-Pop)',   group: 'profession' },
  athlete:       { label: 'นักกีฬา',                group: 'profession' },
  footballer:    { label: 'นักฟุตบอล',              group: 'profession' },
  martial_artist:{ label: 'นักมวย/ศิลปะต่อสู้',     group: 'profession' },
  politician:    { label: 'นักการเมือง/ผู้นำโลก',   group: 'profession' },
  businessperson:{ label: 'นักธุรกิจ/เทคโนโลยี',    group: 'profession' },
  royalty:       { label: 'พระมหากษัตริย์/ราชวงศ์', group: 'profession' },

  // ===== Fiction =====
  cartoon:       { label: 'การ์ตูน/อนิเมะ',          group: 'media' },
  anime:         { label: 'อนิเมะญี่ปุ่น',            group: 'media' },
  shonen:        { label: 'โชเน็น/ต่อสู้',           group: 'media' },
  kids_friendly: { label: 'น่ารัก/เด็กดู',           group: 'media' },
  disney:        { label: 'ดิสนีย์/พิกซาร์',         group: 'media' },
  princess:      { label: 'เจ้าหญิงดิสนีย์',          group: 'media' },
  superhero:     { label: 'ซูเปอร์ฮีโร่',            group: 'media' },
  marvel:        { label: 'Marvel',                 group: 'media' },
  dc:            { label: 'DC',                     group: 'media' },
  villain:       { label: 'ตัวร้าย',                 group: 'media' },
  hero:          { label: 'ฮีโร่',                   group: 'media' },
  live_action:   { label: 'หนังคนจริง/ซีรีส์',       group: 'media' },
  video_game:    { label: 'ตัวละครเกม',             group: 'media' },
  folklore:      { label: 'นิทาน/ตำนาน',            group: 'media' },

  // ===== Animals =====
  pet:           { label: 'สัตว์เลี้ยง',              group: 'animal' },
  aquatic:       { label: 'สัตว์น้ำ',                group: 'animal' },
  aquatic_mammal:{ label: 'สัตว์เลี้ยงลูกด้วยนมในน้ำ',group: 'animal' },
  fish:          { label: 'ปลา',                    group: 'animal' },
  flying:        { label: 'บินได้',                  group: 'animal' },
  bird:          { label: 'นก',                     group: 'animal' },
  insect:        { label: 'แมลง/แมงมุม',            group: 'animal' },
  reptile:       { label: 'สัตว์เลื้อยคลาน',          group: 'animal' },

  // ===== Food =====
  food:          { label: 'อาหาร/กินได้',           group: 'food' },
  savory:        { label: 'อาหารคาว',               group: 'food' },
  sweet:         { label: 'ของหวาน/ขนม',            group: 'food' },
  thai_food:     { label: 'อาหารไทย',               group: 'food' },
  asian_sweet:   { label: 'ขนมเอเชีย',              group: 'food' },
  fruit:         { label: 'ผลไม้',                  group: 'food' },
  tropical_fruit:{ label: 'ผลไม้เมืองร้อน',          group: 'food' },
  alcoholic:     { label: 'มีแอลกอฮอล์',            group: 'food' },

  // ===== Objects =====
  larger_than_person: { label: 'ใหญ่กว่าคน',        group: 'object' },
  wearable:      { label: 'ใส่/สวมได้',             group: 'object' },
  weapon:        { label: 'อาวุธ',                  group: 'object' },
  electronic:    { label: 'อิเล็กทรอนิกส์',         group: 'object' },
  it_device:     { label: 'IT/คอมพิวเตอร์',         group: 'object' },
  brand:         { label: 'แบรนด์/บริษัท',           group: 'object' },

  // ===== Abstract =====
  emotion:       { label: 'อารมณ์/ความรู้สึก',       group: 'abstract' },
  natural:       { label: 'ปรากฏการณ์ธรรมชาติ',     group: 'abstract' },
  space:         { label: 'ดาราศาสตร์/อวกาศ',       group: 'abstract' },
  concept:       { label: 'แนวคิด/นามธรรมอื่น',      group: 'abstract' },

  // ===== Regional / Places =====
  place:          { label: 'สถานที่',                group: 'place' },
  thai_place:     { label: 'สถานที่ในไทย',           group: 'place' },
  bangkok:        { label: 'กรุงเทพ',                group: 'place' },
  thai_north:     { label: 'ภาคเหนือ',               group: 'place' },
  thai_south:     { label: 'ภาคใต้',                 group: 'place' },
  landmark:       { label: 'แลนด์มาร์กโลก',          group: 'place' },
  country:        { label: 'ประเทศ',                 group: 'place' },
  city:           { label: 'เมืองใหญ่',              group: 'place' },

  // ===== Extras inferred from category names =====
  flower:         { label: 'ดอกไม้',                 group: 'plant' },
  movie:          { label: 'หนัง',                   group: 'media' },
  film_or_show:   { label: 'หนัง/ซีรีส์',            group: 'media' },
  foreign_series: { label: 'ซีรีส์ต่างประเทศ',        group: 'media' },
  song:           { label: 'เพลง',                   group: 'media' },
  sport:          { label: 'กีฬา (ประเภท)',          group: 'media' },
  profession_noun:{ label: 'อาชีพ (ชื่อ)',           group: 'profession' },
  festival:       { label: 'เทศกาล/วันสำคัญ',        group: 'abstract' },
  thai_festival:  { label: 'เทศกาลไทย',              group: 'abstract' },

  // ===== Food subtypes =====
  drink:          { label: 'เครื่องดื่ม',             group: 'food' },
  vegetable:      { label: 'ผัก',                    group: 'food' },
  thai_sweet:     { label: 'ขนมไทย',                 group: 'food' },
  asian_cuisine:  { label: 'อาหารเอเชีย',            group: 'food' },
  japanese_food:  { label: 'อาหารญี่ปุ่น',            group: 'food' },
  korean_food:    { label: 'อาหารเกาหลี',             group: 'food' },
  chinese_food:   { label: 'อาหารจีน',               group: 'food' },

  // ===== Object subtypes =====
  larger_than_phone: { label: 'ใหญ่กว่ามือถือ',      group: 'object' },
  vehicle:        { label: 'ยานพาหนะ',               group: 'object' },
  clothing:       { label: 'เสื้อผ้า',                group: 'object' },
  shoes:          { label: 'รองเท้า',                 group: 'object' },
  furniture:      { label: 'เฟอร์นิเจอร์',            group: 'object' },
  kitchen:        { label: 'ของใช้ในครัว',           group: 'object' },
  bathroom:       { label: 'ของใช้ในห้องน้ำ',        group: 'object' },
  instrument:     { label: 'เครื่องดนตรี',            group: 'object' },
  jewelry:        { label: 'เครื่องประดับ',           group: 'object' },
  cosmetic:       { label: 'เครื่องสำอาง',            group: 'object' },
  stationery:     { label: 'เครื่องเขียน/ออฟฟิศ',    group: 'object' },
  toy_sport:      { label: 'ของเล่น/อุปกรณ์กีฬา',    group: 'object' },
  entertainment_gear:{ label: 'อุปกรณ์บันเทิง',      group: 'object' },

  // ===== Brand subtypes =====
  tech_brand:     { label: 'แบรนด์เทค',              group: 'object' },
  food_brand:     { label: 'แบรนด์อาหาร',            group: 'object' },
  fashion_brand:  { label: 'แบรนด์แฟชั่น',            group: 'object' },
  car_brand:      { label: 'แบรนด์รถ',               group: 'object' },
};

export const TAG_GROUPS: Record<string, { label: string; order: number }> = {
  nature:     { label: 'ประเภทพื้นฐาน',  order: 1 },
  reality:    { label: 'จริง/สมมติ',     order: 2 },
  origin:     { label: 'ที่มา/สัญชาติ',  order: 3 },
  status:     { label: 'สถานะ',          order: 4 },
  gender:     { label: 'เพศ',            order: 5 },
  profession: { label: 'อาชีพ',          order: 6 },
  media:      { label: 'สื่อ/ประเภทงาน', order: 7 },
  animal:     { label: 'สัตว์',           order: 8 },
  plant:      { label: 'พืช',            order: 9 },
  food:       { label: 'อาหาร',          order: 10 },
  object:     { label: 'สิ่งของ',        order: 11 },
  place:      { label: 'สถานที่',         order: 12 },
  abstract:   { label: 'นามธรรม',        order: 13 },
};
