import type { PlayNode } from '../../types';
import { L, q } from './_helpers';

// ================================================================
// PERSON BOOK — real human beings
// Strategy: ภูมิภาค → สถานะชีวิต → อาชีพ → เพศ/รุ่น
// ================================================================

// ---- THAI · ALIVE · ENTERTAINMENT ----
const actorMaleNew = L('ดาราชายไทย · รุ่นใหม่',
  ['ไบร์ท วชิรวิชญ์','วิน เมธวิน','มิว ศุภศิษฏ์','บิวกิ้น พุฒิพงศ์','พีพี กฤษฏ์','นุนิว ชวรินทร์','ต่อ ธนภพ','นาย ณภัทร','ฟิล์ม ธนภัทร','ก๊อต จิรายุ','ออฟ จุมพล','ซี พฤกษ์','โอบ โอบนิธิ','เจฟ ซาเตอร์','เอฟ ฐิติพงศ์'],
  { subQuestions: ['เคยเล่นซีรีส์วาย?','อยู่ค่าย GMM/Kantana/One?','อายุต่ำกว่า 25?','มาจากเวที The Star/AF?'] });

const actorMaleOld = L('ดาราชายไทย · รุ่นใหญ่',
  ['ศรราม เทพพิทักษ์','ธีรเดช วงศ์พัวพันธ์','ติ๊ก เจษฎาภรณ์','เวียร์ ศุกลวัฒน์','อั้ม อธิชาติ','มาริโอ้ เมาเร่อ','หมาก ปริญ','ณเดชน์ คูกิมิยะ','โป๊ป ธนวรรธน์','เจมส์ จิรายุ','บอย พิษณุ','พีเค ปิยะวัฒน์','ปีเตอร์ คอร์ป','ดอม เหตระกูล','ฟลุค เกริกพล'],
  { subQuestions: ['ดังสมัย 2000s?','เล่นละครช่อง 3?','เคยเป็นพระเอกคู่กับ...?'] });

const actorFemaleNew = L('ดาราหญิงไทย · รุ่นใหม่',
  ['ญาญ่า อุรัสยา','เบลล่า ราณี','ใหม่ ดาวิกา','มิว นิษฐา','เจนี่ เทียนโพธิ์สุวรรณ','มิ้นต์ ชาลิดา','คิม คิมเบอร์ลี่','เบเบ้ ธันย์ชนก','ไอซ์ ปรีชญา','แต้ว ณฐพร','เอสเธอร์ สุปรีย์ลีลา','วิโอเลต วอเทียร์','แพรวา สุธรรมพงษ์','ซาร่า เล็กจ์','ออม กรณ์นภัส'],
  { subQuestions: ['เคยเล่นคู่กับพระเอกคนดัง?','เป็นลูกครึ่งหรือเปล่า?','เริ่มงานจาก MV/โฆษณา?'] });

const actorFemaleOld = L('ดาราหญิงไทย · รุ่นใหญ่',
  ['อั้ม พัชราภา','แอน ทองประสม','นุ่น วรนุช','อารยา (ชมพู่)','เจี๊ยบ โสภิตนภา','แพนเค้ก เขมนิจ','ลูกเกด เมทินี','แพท ณปภา','หลิงหลิง','พลอย เฌอมาลย์','ปุ๊กลุก ฝนทิพย์','ทราย เจริญปุระ','กุ๊บกิ๊บ สุมณทิพย์','ซาบีน่า ริชมันด์','หนูน้อย กานต์พิชชา'],
  { subQuestions: ['เคยเป็นนางเอกช่อง 3/7?','มีลูกแล้ว?','นางเอกยุค มาริโอ้/ณเดชน์?'] });

const singerMale = L('นักร้อง/แร็ปเปอร์ชายไทย',
  ['ตูน บอดี้สแลม','เบิร์ด ธงไชย','ป๊อด โมเดิร์นด็อก','ป้าง นครินทร์','แอ๊ด คาราบาว','เสก โลโซ','YOUNGOHM','UrboyTJ','F.HERO','สิงโต นำโชค','Stamp อภิวัชร์','ปู่จ๋าน ลองไมค์','เป๊ก ผลิตโชค','ก้อง สหรัถ','NONT TANONT','เจ เจตริน','บี้ สุกฤษฎิ์','มอส ปฏิภาณ','ตู่ ภพธร','เบน ชลาทิศ'],
  { subQuestions: ['วง rock หรือศิลปินเดี่ยว?','Rap/Hip-hop เป็นหลัก?','ยุค 90s หรือใหม่?'],
    traps: ['ตูน บอดี้สแลม = ทั้งนักร้องและแสดงหนัง (ใช้ "อาจจะ" เมื่อเจอ)'] });

const singerFemale = L('นักร้องหญิงไทย',
  ['ดา เอ็นโดรฟิน','ปาล์มมี่','อิ้งค์ วรันธร','MILLI','ต่าย อรทัย','พลอยชมพู','โบ สุนิตา','แก้ม วิชญาณี','มาช่า วัฒนพานิช','ลุลา','Ink Waruntorn','เจนนิเฟอร์ คิ้ม','ตู่ นันทิดา','ปนัดดา เรืองวุฒิ','PUN','ลิลลี่ ได้หมดถ้าสดชื่น','พลอยใส จันทกานต์','Violette Wautier','Jannine Weigel','ใหม่ เจริญปุระ'],
  { subQuestions: ['เพลงลูกทุ่ง/ป๊อป/อินดี้?','วงหรือศิลปินเดี่ยว?','ดังใน TikTok?'] });

const influencerFemale = L('อินฟลูฯ/YouTuber หญิงไทย',
  ['พิมรี่พาย','กาละแมร์','ซารต์ ทรัยย์ภูมิ','ฮาย ปวีณสุดา','พาย ณฐมน','ไข่มุก รุ่งรัตน์','ซอ พิชชานันท์','โอปอล์ สุชาตา','ซาร่า คาซิงกินี','ทับทิม','น้องฉัตร','มีน นิชา','เหมือนฝัน','มะเหมี่ยว','ฟิล์ม ธนภัทร'],
  { subQuestions: ['สายไลฟ์ขายของ?','สาย travel/lifestyle?','เป็นนางงามด้วย?'] });

const influencerMale = L('YouTuber/อินฟลูฯ ชายไทย',
  ['บี้ เดอะสกา','เอิ๊ก เอ็ด','บังฮาซัน','My Mate Nate','พี่เอ็ด 7 วิ','หลวงพี่แจ็ส','พีช พชร','Heartrocker','Cholito','พี่จอง คัลแลน','ZBING Z.','วงศ์ทนง','ดิว อริสรา','ท็อป ณัฐเศรษฐ','เสี่ยโป้ อานนท์'],
  { subQuestions: ['สายเกม/รีวิว/กิน?','มีคาแรกเตอร์ตลก?'] });

const idolThai = L('ไอดอล T-Pop',
  ['BNK48 (เฌอปราง, มิวสิค, ปัญ, จ๋า, เจนนิษฐ์, ไข่มุก, น้ำหนึ่ง)','CGM48','4EVE (Lita, BamBi)','PiXXiE','Pretzelle','Trinity','ATLAS','LYRA','DVI','Brandnew (BBIIBB)','LAZ1','Rookie BKK','FEARS','CANDY'],
  { subQuestions: ['วงหญิงหรือชาย?','มีชื่อเล่นสองพยางค์?','ดังจากรายการ AF/The Star?'] });

const hostVarietyThai = L('พิธีกร/ตลก/คอเมดี้ ไทย',
  ['หนุ่ม กรรชัย','สรยุทธ','วู้ดดี้','ปัญญา นิรันดร์กุล','หม่ำ จ๊กมก','เท่ง เถิดเทิง','โน้ส อุดม','ดู๋ สัญญา','ตั๊ก บริบูรณ์','ไตรภพ ลิมปพัทธ์','ป๋อมแป๋ม','หนูเล็ก ก่อนบ่าย','แจ๊ส ชวนชื่น','อ๋อม สกาวใจ','กี้ อริสรา','ชมพู่ ก่อนบ่าย'],
  { subQuestions: ['เล่าข่าวหรือวาไรตี้?','เพศชายหรือหญิง?','สังกัด Workpoint/ช่อง 3?'] });

const thaiEnt = q('เป็นนักแสดงเป็นหลัก?',
  q('เป็นผู้หญิง?',
    q('อายุเกิน 35?', actorFemaleOld, actorFemaleNew,
      { hint: '35 = จุดตัดคร่าวๆ ของรุ่นใหญ่ vs รุ่นใหม่' }),
    q('อายุเกิน 35?', actorMaleOld, actorMaleNew),
    { hint: 'ชาย/หญิง ในวงการนี้ discriminator ง่ายสุด' }),
  q('เป็นนักร้อง/แร็ปเปอร์?',
    q('เป็นผู้หญิง?', singerFemale, singerMale),
    q('เป็น Influencer/YouTuber?',
      q('เป็นผู้หญิง?', influencerFemale, influencerMale),
      q('เป็นไอดอล T-Pop?',
        idolThai,
        hostVarietyThai))),
  { hint: 'สายแสดง = 50% ของบันเทิงไทย ถามอันนี้เปิดก่อนได้',
    trap: 'ศิลปิน multi-role (ตูน บอดี้สแลม/ไบร์ท) ใช้ "อาจจะ"' });

// ---- THAI · ALIVE · NON-ENTERTAINMENT ----
const footballerThai = L('นักฟุตบอลไทย',
  ['ชนาธิป สรงกระสินธ์','ธีราทร บุญมาทัน','ธีรศิลป์ แดงดา','ศศลักษณ์ ไหประโคน','ชนาเมธ จันทา','กวินทร์ ธรรมสัจจานันท์','ฐิติพันธ์ พ่วงจันทร์','ศุภณัฐ เหมือนตา','สุภโชค สารชาติ','พีระพัฒน์ โน้ตชัยยา','โค้ชเฮง วิทยา','มาโน่ โพลกิ้ง (โค้ช)'],
  { subQuestions: ['เคยไปเล่นลีกญี่ปุ่น/ยุโรป?','เคยเป็นกัปตันทีมชาติ?'] });

const boxerThai = L('นักมวย/ศิลปะต่อสู้ ไทย',
  ['บัวขาว บัญชาเมฆ','สมรักษ์ คำสิงห์','เขาทราย แกแล็คซี่','เทนนิส พาณิภัค','สมจิตร จงจอหอ','มนัส บุญจำนงค์','วิจารณ์ พลฤทธิ์','รถถัง จิตรเมืองนนท์','ก้องศักดิ์ ศิษย์บุญยง','ซุปเปอร์เล็ก','พิชิต ศิษย์บางพระจันทร์'],
  { subQuestions: ['แชมป์โลกสมาคมไหน?','เป็นเหรียญโอลิมปิก?'] });

const athleteOtherThai = L('นักกีฬาไทยอื่นๆ',
  ['วิว กุลวุฒิ (แบด)','เมย์ รัชนก (แบด)','โปรเม เอรียา (กอล์ฟ)','โปรโม โมรียา (กอล์ฟ)','ต๋อง ศิษย์ฉ่อย (สนุ๊กเกอร์)','อัจฉราพร คงยศ (วอลเลย์)','ปลื้มจิตร์ ถินขาว (วอลเลย์)','นุศรา ต้อมคำ (วอลเลย์)','พรานหยิบ ปรเมษฐ์','ทรายทิพย์ (เทควันโด)'],
  { subQuestions: ['กีฬาอะไร?','เคยได้เหรียญโอลิมปิก/ซีเกมส์?'] });

const politicianThai = L('นักการเมืองไทย',
  ['เศรษฐา ทวีสิน','แพทองธาร ชินวัตร','พิธา ลิ้มเจริญรัตน์','ชัชชาติ สิทธิพันธุ์','ธนาธร จึงรุ่งเรืองกิจ','ปิยบุตร แสงกนกกุล','อนุทิน ชาญวีรกูล','ทักษิณ ชินวัตร','ยิ่งลักษณ์ ชินวัตร','อภิสิทธิ์ เวชชาชีวะ','ประยุทธ์ จันทร์โอชา','สุริยะ จึงรุ่งเรืองกิจ','รังสิมันต์ โรม','ศิริกัญญา ตันสกุล'],
  { subQuestions: ['เคยเป็นนายก?','พรรคไหน?','อดีต ส.ส./รัฐมนตรี?'] });

const richThai = L('มหาเศรษฐี/นักธุรกิจไทย',
  ['ธนินท์ เจียรวนนท์ (CP)','เจริญ สิริวัฒนภักดี','ตัน ภาสกรนที','ทศ จิราธิวัฒน์','สารัชถ์ รัตนาวะดี','วิชัย ศรีวัฒนประภา','อิสระ ว่องกุศลกิจ','ท๊อป จิรายุส (บิทคับ)','สมโภชน์ อาหุนัย','นวลพรรณ ล่ำซำ','แดน เอ็ม (บิทคับ)'],
  { subQuestions: ['ธุรกิจอะไร?','เป็นเจ้าของแบรนด์/ห้างดัง?'] });

const otherPublicThai = L('บุคคลไทยอื่นๆ (หมอ/พระ/นักวิชาการ)',
  ['หมอโอ๊ค','หมอเหรียญทอง','หมอแล็บแพนด้า','หมอปลา','ดร.เจษฎา เด่นดวงบริพันธ์','พระมหาสมปอง','ว.วชิรเมธี','หลวงพ่อสุรศักดิ์','ทนายแก้วตา','สุทธิชัย หยุ่น','อาจารย์ยักษ์','หมอวรงค์'],
  { subQuestions: ['หมอ/พระ/นักกฎหมาย?'] });

const thaiAliveNonEnt = q('เป็นนักกีฬา?',
  q('เป็นนักฟุตบอล?',
    footballerThai,
    q('เป็นนักมวย/ศิลปะต่อสู้?', boxerThai, athleteOtherThai)),
  q('เป็นนักการเมือง?',
    politicianThai,
    q('เป็นนักธุรกิจ/มหาเศรษฐี?', richThai, otherPublicThai)),
  { hint: 'คนไทยที่ไม่ใช่ดาราบันเทิง ส่วนใหญ่ = กีฬา/การเมือง/ธุรกิจ' });

// ---- THAI · DECEASED ----
const royaltyThai = L('กษัตริย์/ราชวงศ์ไทย',
  ['รัชกาลที่ 5 (จุฬาลงกรณ์)','รัชกาลที่ 9 (ภูมิพล)','รัชกาลที่ 10 (วชิราลงกรณ)','สมเด็จพระนางเจ้าสิริกิติ์','สมเด็จพระเทพฯ','รัชกาลที่ 4 (มงกุฎ)','รัชกาลที่ 6 (วชิราวุธ)','พ่อขุนรามคำแหง','พระเจ้าตากสิน','สมเด็จพระนเรศวร','สมเด็จพระนารายณ์','ท้าวสุรนารี (ย่าโม)','พระศรีสุริโยทัย'],
  { subQuestions: ['สุโขทัย/อยุธยา/รัตนโกสินทร์?','รัชกาลที่เท่าไหร่?'] });

const historicalThai = L('บุคคลสำคัญไทย (ล่วงลับ)',
  ['สุนทรภู่','ปรีดี พนมยงค์','หลวงปู่ทวด','ป๋วย อึ๊งภากรณ์','พุ่มพวง ดวงจันทร์','มิตร ชัยบัญชา','สุรพล สมบัติเจริญ','เสก โลโซ (ล่วงลับ)','ครูสลา คุณวุฒิ','หลวงพ่อคูณ','สมเด็จพุฒาจารย์ (โต)','จิตร ภูมิศักดิ์','กุหลาบ สายประดิษฐ์','ยอดรัก สลักใจ'],
  { subQuestions: ['สายศาสนา/ศิลปะ/การเมือง?'] });

const thaiDeceased = q('เป็นกษัตริย์/ราชวงศ์?', royaltyThai, historicalThai);

// ---- THAI root ----
const thaiRoot = q('ยังมีชีวิตอยู่?',
  q('อยู่ในวงการบันเทิง?', thaiEnt, thaiAliveNonEnt,
    { hint: 'บันเทิง ≈ 60% ของคนไทยที่คนทั่วไปรู้จัก' }),
  thaiDeceased,
  { hint: 'ถามสถานะชีวิตตัดไปครึ่ง' });

// ---- FOREIGN · ASIAN ----
const kpopFemale = L('K-Pop ไอดอลหญิง',
  ['Lisa (BLACKPINK)','Jennie','Rosé','Jisoo','IU','Taeyeon','Nayeon','Momo','Sana','Tzuyu','Karina (aespa)','Winter','Wonyoung (IVE)','Chaewon (LE SSERAFIM)','Sakura','Hwasa','Hyuna','CL','Minji (NewJeans)','Hanni','Danielle'],
  { subQuestions: ['วงไหน?','รุ่น 3rd/4th gen?','เป็น main vocal/dancer/rapper?'] });

const kpopMale = L('K-Pop ไอดอลชาย',
  ['BTS Jungkook','BTS V','BTS Jimin','RM','Suga','J-Hope','Jin','G-Dragon','Taeyang','Chanyeol','Baekhyun','Sehun','Kai','D.O.','Bang Chan (Stray Kids)','Felix','Hyunjin','Han','Seventeen (Jeonghan/Woozi/Vernon)','Jackson (GOT7)','Taemin (SHINee)'],
  { subQuestions: ['วง solo หรือกลุ่ม?','BTS/EXO/Stray Kids?'] });

const kActor = L('นักแสดงเกาหลี',
  ['Hyun Bin','Song Joong-ki','Gong Yoo','Lee Min-ho','Park Seo-joon','Son Ye-jin','Kim Soo-hyun','Lee Jung-jae (Squid Game)','Park Bo-gum','Park Shin-hye','Jun Ji-hyun','Bae Suzy','Kim Go-eun','Jung Ho-yeon','Kim Tae-hee','Song Hye-kyo','Lee Jong-suk','Park Hae-soo','Ma Dong-seok','Nam Joo-hyuk'],
  { subQuestions: ['ชาย/หญิง?','ดัง Netflix หรือช่องเกาหลี?'] });

const japanesePerson = L('คนญี่ปุ่นดัง',
  ['Hayao Miyazaki','Ohtani Shohei','Eiichiro Oda (One Piece)','Masashi Kishimoto (Naruto)','Akira Toriyama','Makoto Shinkai','Haruki Murakami','Ken Watanabe','Kimura Takuya','Naomi Osaka','Yoshiki (X Japan)','Hideo Kojima','Shigeru Miyamoto','Utada Hikaru','Kenshi Yonezu','YOASOBI (Ikura/Ayase)'],
  { subQuestions: ['สายมังงะ/เกม/กีฬา?','ยังทำงานอยู่?'] });

const chinesePerson = L('คนจีน/ฮ่องกง ดัง',
  ['Jackie Chan','Bruce Lee','Jet Li','Jack Ma','Yao Ming','Andy Lau','Tony Leung','Stephen Chow','Leslie Cheung','Donnie Yen','Fan Bingbing','Liu Yifei','Angelababy','Wang Yibo','Xiao Zhan','Jay Chou','JJ Lin','Michelle Yeoh','Xi Jinping','Jack Ma','Pony Ma (Tencent)'],
  { subQuestions: ['นักแสดง/ธุรกิจ/การเมือง?','จีนแผ่นดินใหญ่หรือฮ่องกง/ไต้หวัน?'] });

const asianOther = L('คนเอเชียอื่น (อินเดีย/อาเซียน)',
  ['Narendra Modi','SRK (Shah Rukh Khan)','Salman Khan','Aamir Khan','Priyanka Chopra','Deepika Padukone','Sachin Tendulkar','Virat Kohli','Lee Kuan Yew','Mahathir Mohamad','Anwar Ibrahim','Joko Widodo','Aung San Suu Kyi','Gandhi (มหาตมะ)'],
  { subQuestions: ['อินเดีย/อาเซียน?','การเมือง/กีฬา/บันเทิง?'] });

const asianForeign = q('เป็นคนเกาหลี?',
  q('เป็นไอดอล K-Pop?',
    q('เป็นผู้หญิง?', kpopFemale, kpopMale),
    kActor),
  q('เป็นคนญี่ปุ่น?',
    japanesePerson,
    q('เป็นคนจีน/ฮ่องกง?', chinesePerson, asianOther)),
  { hint: 'สำรวจทีละชาติ: เกาหลี → ญี่ปุ่น → จีน → อื่น' });

// ---- FOREIGN · WESTERN · ALIVE ----
const hollywoodMale = L('ดาราชายฮอลลีวูด',
  ['Tom Cruise','Leonardo DiCaprio','Brad Pitt','Johnny Depp','Tom Hanks','Dwayne Johnson (The Rock)','Chris Hemsworth','Chris Evans','Robert Downey Jr.','Will Smith','Keanu Reeves','Timothée Chalamet','Ryan Reynolds','Ryan Gosling','Hugh Jackman','Denzel Washington','Matt Damon','Ben Affleck','Tom Holland','Zac Efron','Jason Momoa','Idris Elba'],
  { subQuestions: ['เล่น Marvel?','ยุค 2000s หรือปัจจุบัน?','action/comedy/drama?'] });

const hollywoodFemale = L('ดาราหญิงฮอลลีวูด',
  ['Scarlett Johansson','Angelina Jolie','Jennifer Lawrence','Emma Watson','Margot Robbie','Zendaya','Gal Gadot','Anne Hathaway','Julia Roberts','Natalie Portman','Charlize Theron','Emma Stone','Jennifer Aniston','Sandra Bullock','Jessica Alba','Halle Berry','Kristen Stewart','Sydney Sweeney','Jenna Ortega','Millie Bobby Brown','Selena Gomez'],
  { subQuestions: ['เล่น Marvel/DC?','นักร้องด้วย?'] });

const singerWest = L('นักร้องสากล',
  ['Taylor Swift','Beyoncé','Ed Sheeran','Bruno Mars','Ariana Grande','Adele','Billie Eilish','The Weeknd','Drake','Eminem','Lady Gaga','Rihanna','Justin Bieber','Dua Lipa','Olivia Rodrigo','Post Malone','Bad Bunny','Harry Styles','Kendrick Lamar','Kanye West','Coldplay (Chris Martin)','Bruno Mars'],
  { subQuestions: ['Pop/Rap/Rock?','ยังทำเพลง?','มีชื่อเสียงจาก reality/Disney?'] });

const worldLeader = L('ผู้นำ/นักการเมืองโลก',
  ['Donald Trump','Joe Biden','Barack Obama','Vladimir Putin','Xi Jinping','Kim Jong-un','Emmanuel Macron','Volodymyr Zelensky','Rishi Sunak','Keir Starmer','Justin Trudeau','Anthony Albanese','Narendra Modi','Mohammed bin Salman','Benjamin Netanyahu','Erdogan','Pope Francis','Dalai Lama','Greta Thunberg','Malala','King Charles III','Prince William'],
  { subQuestions: ['ประธานาธิบดี/นายก/ราชวงศ์?','USA หรือยุโรป?'] });

const techMogul = L('Tech Mogul / นักธุรกิจโลก',
  ['Elon Musk','Bill Gates','Jeff Bezos','Mark Zuckerberg','Steve Jobs (ล่วงลับ)','Sam Altman','Tim Cook','Sundar Pichai','Larry Page','Sergey Brin','Warren Buffett','Jensen Huang (NVIDIA)','Satya Nadella','Oprah Winfrey','Richard Branson','Bernard Arnault','Mukesh Ambani'],
  { subQuestions: ['Apple/Google/Tesla/Meta?','USA หรืออินเดีย/จีน?'] });

const globalAthlete = L('นักกีฬาระดับโลก',
  ['Lionel Messi','Cristiano Ronaldo','Neymar','Kylian Mbappé','LeBron James','Michael Jordan','Stephen Curry','Tiger Woods','Serena Williams','Rafael Nadal','Roger Federer','Novak Djokovic','Usain Bolt','Lewis Hamilton','Max Verstappen','Mike Tyson','Conor McGregor','Manny Pacquiao','Simone Biles','Michael Phelps','Tom Brady','Kobe Bryant (ล่วงลับ)','Pelé (ล่วงลับ)'],
  { subQuestions: ['กีฬาอะไร?','ยังเล่นอยู่?','อเมริกัน/ยุโรป/เอเชีย?'] });

const westernAlive = q('อยู่ในวงการบันเทิง?',
  q('เป็นนักแสดง?',
    q('เป็นผู้หญิง?', hollywoodFemale, hollywoodMale),
    singerWest),
  q('เป็นผู้นำ/การเมือง?',
    worldLeader,
    q('เป็นนักธุรกิจ/เทค?', techMogul, globalAthlete)));

// ---- FOREIGN · WESTERN · DECEASED ----
const historicalWorld = L('บุคคลในประวัติศาสตร์โลก',
  ['Albert Einstein','Isaac Newton','Leonardo da Vinci','Napoleon Bonaparte','Adolf Hitler','Mahatma Gandhi','Nelson Mandela','Cleopatra','Martin Luther King','Mother Teresa','Marie Curie','Stephen Hawking','Charles Darwin','Nikola Tesla','William Shakespeare','Vincent van Gogh','Pablo Picasso','Michelangelo','Mozart','Beethoven','Julius Caesar','Alexander the Great','Abraham Lincoln','Princess Diana','Queen Elizabeth II','Marilyn Monroe','Elvis Presley','John Lennon'],
  { subQuestions: ['วิทยาศาสตร์/ศิลปะ/การเมือง?','ก่อน 1900 หรือหลัง?'] });

const western = q('ยังมีชีวิต?', westernAlive, historicalWorld,
  { hint: 'รวมทั้งยุโรป อเมริกา ออสเตรเลีย' });

// ---- FOREIGN root ----
const foreignRoot = q('เป็นเอเชีย (ไม่ใช่ไทย)?', asianForeign, western,
  { hint: 'เอเชีย vs ตะวันตก — ถ้าลูกครึ่ง ใช้ "อาจจะ"' });

// ---- PERSON BOOK root ----
export const PERSON_BOOK_ROOT: PlayNode = q('เป็นคนไทย?', thaiRoot, foreignRoot,
  { hint: 'ไทย/ต่างชาติ = การแบ่งใหญ่สุด discriminator ของ person',
    trap: 'ลูกครึ่งไทย (ลิซ่า, Jannine) → "อาจจะ"' });
