import type { PlayNode } from '../../types';
import { L, q } from './_helpers';

// ================================================================
// PLACE BOOK — locations (natural & man-made)
// Strategy: ไทย/ต่างประเทศ → ภูมิภาค → ประเภท
// ================================================================

// ---- THAI PLACES ----
const bangkokPlace = L('สถานที่ในกรุงเทพ',
  ['สยามพารากอน','สยามเซ็นเตอร์','ไอคอนสยาม','เซ็นทรัลเวิลด์','เซ็นทรัลพระราม 2','เซ็นทรัลลาดพร้าว','เอ็มโพเรียม','เอ็มควอเทียร์','เทอร์มินอล 21','มาบุญครอง (MBK)','จตุจักร','ตลาดจตุจักร','เยาวราช','ข้าวสาร','ถนนสุขุมวิท','ทองหล่อ','เอกมัย','อารีย์','ประดิพัทธ์','พระบรมหาราชวัง','วัดพระแก้ว','วัดโพธิ์','วัดอรุณ','สนามหลวง','สวนลุมพินี','สวนสาธารณะเบญจสิริ','สยาม','รัชดา','อโศก','RCA','MBK','ดุสิต','ตลาดนัดรถไฟ','เจริญกรุง','คลองโอ่งอ่าง'],
  { subQuestions: ['ห้าง/วัด/สวน?','เขตอะไร?'] });

const northernPlace = L('สถานที่ภาคเหนือ',
  ['เชียงใหม่','ถนนนิมมาน','เชียงราย','ดอยสุเทพ','ดอยอินทนนท์','ดอยอ่างขาง','แม่ฮ่องสอน','ปาย','ลำปาง','ลำพูน','แพร่','น่าน','พะเยา','สุโขทัย','อุทยานประวัติศาสตร์สุโขทัย','วัดร่องขุ่น','วัดพระธาตุลำปางหลวง','ดอยตุง','สามเหลี่ยมทองคำ','ตาก','ภาคเหนือ'],
  { subQuestions: ['ภูเขา/เมือง/วัด?'] });

const southernPlace = L('สถานที่ภาคใต้',
  ['ภูเก็ต','ป่าตอง','พีพี (Phi Phi)','กระบี่','อ่าวนาง','เกาะหลีเป๊ะ','พังงา','เกาะตะปู','เกาะสมุย','เกาะเต่า','เกาะพะงัน','สุราษฎร์ธานี','ชุมพร','ระนอง','นครศรีธรรมราช','ตรัง','พัทลุง','สตูล','หาดใหญ่','สงขลา','เบตง','ปัตตานี','ยะลา','นราธิวาส','เขาหลัก'],
  { subQuestions: ['เกาะ/ชายหาด/เมือง?','อันดามัน/อ่าวไทย?'] });

const centralPlace = L('สถานที่ภาคกลาง/อีสาน/อื่น',
  ['อยุธยา','พระนครศรีอยุธยา','วัดมหาธาตุ','วัดไชยวัฒนาราม','สุพรรณบุรี','ลพบุรี','กาญจนบุรี','น้ำตกเอราวัณ','สะพานข้ามแม่น้ำแคว','พระบาทสมเด็จพระเจ้าอยู่หัว','เขาใหญ่','ปากช่อง','นครราชสีมา (โคราช)','อุบลราชธานี','ขอนแก่น','อุดรธานี','หนองคาย','สกลนคร','มุกดาหาร','ชลบุรี','พัทยา','เกาะล้าน','บางแสน','หัวหิน','ชะอำ','เพชรบุรี','ประจวบคีรีขันธ์'],
  { subQuestions: ['ภาคกลาง/อีสาน/ตะวันออก?','ทะเล/เขา/เมือง?'] });

const thaiPlace = q('อยู่ในกรุงเทพ?',
  bangkokPlace,
  q('ภาคเหนือ?',
    northernPlace,
    q('ภาคใต้?', southernPlace, centralPlace)),
  { hint: 'ภูมิภาคไทย: กทม → เหนือ → ใต้ → กลาง/อีสาน' });

// ---- FOREIGN · LANDMARK ----
const landmarkEurope = L('แลนด์มาร์กยุโรป',
  ['หอไอเฟล (Eiffel Tower)','พิพิธภัณฑ์ลูฟร์ (Louvre)','นอเทรอดาม','Arc de Triomphe','พระราชวัง Versailles','โคลอสเซียม','Pantheon','Vatican','St. Peter\'s Basilica','Sistine Chapel','หอเอนปิซา (Leaning Tower of Pisa)','Trevi Fountain','Venice (St. Mark\'s Square)','Big Ben','Tower of London','Tower Bridge','Buckingham Palace','London Eye','British Museum','Stonehenge','Edinburgh Castle','Brandenburg Gate','Berlin Wall','Neuschwanstein Castle','Santorini','Mykonos','Parthenon (Acropolis)','Sagrada Familia','Park Güell','Alhambra','Red Square','St. Basil\'s Cathedral'],
  { subQuestions: ['ฝรั่งเศส/อิตาลี/อังกฤษ/สเปน?','สร้าง/ธรรมชาติ?'] });

const landmarkAmerica = L('แลนด์มาร์กอเมริกา',
  ['เทพีเสรีภาพ (Statue of Liberty)','ตึกเอ็มไพร์สเตต','Times Square','Central Park','Brooklyn Bridge','Rockefeller Center','One World Trade Center','Hollywood Sign','Hollywood Walk of Fame','สะพานโกลเด้นเกต','Alcatraz','Disneyland','Walt Disney World','Universal Studios','Las Vegas Strip','Grand Canyon','Yosemite','Yellowstone','Mount Rushmore','Niagara Falls','CN Tower','Machu Picchu','Christ the Redeemer (ริโอ)','Iguazu Falls','Amazon','Easter Island','Galapagos'],
  { subQuestions: ['USA/ใต้/แคนาดา?','ธรรมชาติ/สร้างขึ้น?'] });

const landmarkAsia = L('แลนด์มาร์กเอเชีย',
  ['กำแพงเมืองจีน','พระราชวังต้องห้าม','Oriental Pearl Tower','Shanghai Bund','ทัชมาฮาล','Red Fort','India Gate','Angkor Wat','Borobudur','Bagan','Halong Bay','Mount Fuji','Tokyo Tower','Tokyo Skytree','Shibuya Crossing','Senso-ji','Fushimi Inari','Kinkaku-ji','Osaka Castle','Dotonbori','Universal Studios Japan','Marina Bay Sands (สิงคโปร์)','Gardens by the Bay','Merlion','Petronas Towers','Batu Caves','Genting','Bali Tanah Lot','Ubud','Hagia Sophia','Blue Mosque','Cappadocia','Petra','Mount Everest','Burj Khalifa','Palm Jumeirah'],
  { subQuestions: ['จีน/ญี่ปุ่น/อินเดีย/อาเซียน/ตะวันออกกลาง?'] });

const landmarkOther = L('แลนด์มาร์กอื่น (ออสเตรเลีย/แอฟริกา)',
  ['โอเปร่าเฮาส์ซิดนีย์','Sydney Harbour Bridge','Bondi Beach','Uluru (Ayers Rock)','Great Barrier Reef','Mount Kilimanjaro','Victoria Falls','Table Mountain','Serengeti','Sahara Desert','Pyramids of Giza (อียิปต์)','Sphinx','Valley of the Kings','Mount Sinai'],
  { subQuestions: ['แอฟริกา/ออสเตรเลีย?','ธรรมชาติ/อารยธรรม?'] });

const landmarkBranch = q('อยู่ในยุโรป?',
  landmarkEurope,
  q('อยู่ในอเมริกา (เหนือ/ใต้)?',
    landmarkAmerica,
    q('อยู่ในเอเชีย (ไม่ใช่ไทย)?',
      landmarkAsia,
      landmarkOther)),
  { hint: 'แยกตามทวีป — ยุโรป/อเมริกา/เอเชีย/อื่น' });

// ---- COUNTRY / CITY ----
const countryName = L('ประเทศ',
  ['ไทย','เวียดนาม','ลาว','กัมพูชา','เมียนมา','มาเลเซีย','สิงคโปร์','อินโดนีเซีย','ฟิลิปปินส์','จีน','ฮ่องกง','ไต้หวัน','ญี่ปุ่น','เกาหลีใต้','เกาหลีเหนือ','มองโกเลีย','อินเดีย','ปากีสถาน','เนปาล','ภูฏาน','มัลดีฟส์','ตุรกี','ซาอุดีอาระเบีย','UAE','อิสราเอล','อิหร่าน','รัสเซีย','ยูเครน','เยอรมนี','ฝรั่งเศส','อังกฤษ','UK','สเปน','อิตาลี','โปรตุเกส','กรีซ','ดัตช์','สวีเดน','นอร์เวย์','ฟินแลนด์','เดนมาร์ก','USA','แคนาดา','เม็กซิโก','บราซิล','อาร์เจนตินา','ชิลี','เปรู','อียิปต์','โมร็อกโก','แอฟริกาใต้','เคนยา','ออสเตรเลีย','นิวซีแลนด์'],
  { subQuestions: ['ทวีปไหน?','ขนาดใหญ่/เล็ก?'] });

const cityName = L('เมืองใหญ่ระดับโลก',
  ['โตเกียว','โอซาก้า','เกียวโต','นาโกย่า','ซัปโปโร','นิวยอร์ก','ลอสแอนเจลิส','ชิคาโก','ซานฟรานซิสโก','ซีแอตเทิล','วอชิงตันดีซี','บอสตัน','ไมอามี่','ลาสเวกัส','ฮอนโนลูลู','ปารีส','นิซ','มาร์เซย์','ลอนดอน','แมนเชสเตอร์','เอดินบะระ','ดูไบ','อาบูดาบี','สิงคโปร์','โซล','ปูซาน','ปักกิ่ง','เซี่ยงไฮ้','ฮ่องกง','ไทเป','ดานัง','โฮจิมินห์','ฮานอย','พนมเปญ','เวียงจันทน์','ย่างกุ้ง','กัวลาลัมเปอร์','ปีนัง','จาการ์ตา','บาหลี','มะนิลา','ซิดนีย์','เมลเบิร์น','บาร์เซโลนา','มาดริด','ลิสบอน','โรม','มิลาน','เวนิส','ฟลอเรนซ์','เบอร์ลิน','มิวนิค','เวียนนา','ซูริก','อัมสเตอร์ดัม','โคเปนเฮเกน','ออสโล','สตอกโฮล์ม','เฮลซิงกิ','มอสโก','อิสตันบูล','ไคโร','เคปทาวน์','มุมไบ','เดลี'],
  { subQuestions: ['ยุโรป/เอเชีย/อเมริกา?','เมืองหลวง/ธุรกิจ/ท่องเที่ยว?'] });

// ---- FOREIGN root ----
const foreignPlace = q('เป็นแลนด์มาร์กเฉพาะ (ไม่ใช่ทั้งประเทศ/เมือง)?',
  landmarkBranch,
  q('เป็นประเทศ?', countryName, cityName),
  { hint: 'แลนด์มาร์ก = จุดเฉพาะ; ประเทศ = ขอบเขตใหญ่; เมือง = กลาง' });

// ---- PLACE BOOK root ----
export const PLACE_BOOK_ROOT: PlayNode = q('อยู่ในประเทศไทย?',
  thaiPlace,
  foreignPlace,
  { hint: 'ไทย vs ต่างประเทศ — cleanest discriminator' });
