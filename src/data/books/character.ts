import type { PlayNode } from '../../types';
import { L, q } from './_helpers';

// ================================================================
// CHARACTER BOOK — fictional humanoid characters
// Strategy: ต้นฉบับ (anime/comic/disney/live-action/game) → drill
// ================================================================

// ---- ANIME ----
const shonenProtagonist = L('ตัวเอก/ตัวร้าย Shonen',
  ['Naruto Uzumaki','Sasuke Uchiha','Goku','Vegeta','Luffy','Zoro','Ichigo Kurosaki','Natsu','Tanjiro','Nezuko','Zenitsu','Inosuke','Eren Yeager','Mikasa','Levi','Deku','Bakugo','Todoroki','Saitama','Yuji Itadori','Gojo Satoru','Sukuna','Edward Elric','Gon','Killua','Light Yagami','L','Thorfinn','Guts','Asta','Yuno','Rimuru'],
  { subQuestions: ['เรื่องอะไร?','พระเอกหรือตัวร้าย?','มีพลังวิเศษ?'] });

const cuteAnimeChar = L('ตัวการ์ตูนญี่ปุ่นน่ารัก/เด็กดู',
  ['Doraemon','Pikachu','Charizard','Eevee','Nobita','Shizuka','Shin-chan','Totoro','Chihiro','Kiki','Ponyo','Hello Kitty','Kuromi','Melody','Pompompurin','Cinnamoroll','Anpanman','Sailor Moon','Conan (Edogawa)','Crayon Shin-chan','Rilakkuma','Sumikko Gurashi','Chiikawa','Mofusand'],
  { subQuestions: ['Pokemon หรือ Sanrio?','เป็นสัตว์/หุ่นยนต์/เทพ?'] });

const otherAnime = L('ตัวละครอนิเมะอื่น',
  ['Sailor Moon (Usagi)','Shinji Ikari','Asuka','Rei Ayanami','Anya Forger','Loid Forger','Yor','Light Yagami','L','Violet Evergarden','Your Name (Taki/Mitsuha)','Kaguya-sama','Rem','Emilia','Kirito','Asuna','Megumin','Aqua','Gabimaru','Hinata','Kageyama','Aqua/Ruby (Oshi no Ko)'],
  { subQuestions: ['มาจากเรื่อง romance/isekai/sci-fi?'] });

const animeBranch = q('เป็นแนวต่อสู้ Shonen (Naruto/One Piece/Dragon Ball)?',
  shonenProtagonist,
  q('เป็นแนวน่ารัก/เด็กดู (Doraemon/Pokemon/Sanrio)?',
    cuteAnimeChar,
    otherAnime),
  { hint: 'Shonen ครอบคลุมเยอะสุด (40%+ ของอนิเมะดัง)' });

// ---- DISNEY / PIXAR ----
const disneyPrincess = L('เจ้าหญิงดิสนีย์',
  ['Elsa','Anna','Belle','Cinderella','Snow White','Rapunzel','Moana','Mulan','Ariel','Jasmine','Tiana','Aurora','Pocahontas','Merida (Brave)','Raya','Asha (Wish)','Princess Giselle (Enchanted)'],
  { subQuestions: ['มี sequel?','มีเพลงดังจำได้?','มี prince คู่กัน?'] });

const disneyOther = L('ตัวการ์ตูนดิสนีย์/พิกซาร์ (อื่น)',
  ['Mickey Mouse','Minnie Mouse','Donald Duck','Goofy','Simba','Mufasa','Scar','Woody','Buzz Lightyear','Nemo','Dory','Mike Wazowski','Sully','Lightning McQueen','Mater','WALL-E','Remy','Carl (Up)','Joy (Inside Out)','Miguel (Coco)','Mei (Turning Red)','Bruno (Encanto)','Mirabel','Baymax','Stitch','Lilo','Pumbaa','Timon','Olaf','Tinkerbell','Peter Pan'],
  { subQuestions: ['Pixar หรือ Disney classic?','เป็นสัตว์หรือหุ่นยนต์?'] });

const disneyBranch = q('เป็นเจ้าหญิง?', disneyPrincess, disneyOther);

// ---- WESTERN CARTOON (non-Disney) ----
const westernCartoon = L('การ์ตูนตะวันตก (Non-Disney)',
  ['SpongeBob','Patrick Star','Squidward','Scooby-Doo','Shaggy','Velma','Tom & Jerry','Bugs Bunny','Daffy Duck','Homer Simpson','Bart Simpson','Peter Griffin','Stewie','Rick Sanchez','Morty','Pink Panther','Garfield','Snoopy','Charlie Brown','Popeye','Shrek','Fiona','Donkey','Kung Fu Panda (Po)','Avatar Aang','Katara','Zuko','Korra','Ben 10','Finn (Adventure Time)','Jake','Gumball','Steven Universe','Peppa Pig','Bluey','Paw Patrol (Chase/Marshall)','Dora','Barney','Elmo','Cookie Monster'],
  { subQuestions: ['Nick/CN/HBO/PBS?','เด็กเล็กดู?','90s หรือใหม่?'] });

// ---- SUPERHERO ----
const marvelHero = L('Marvel Hero',
  ['Iron Man (Tony Stark)','Spider-Man (Peter Parker)','Miles Morales','Captain America','Thor','Hulk','Black Widow','Hawkeye','Doctor Strange','Black Panther','Wolverine','Deadpool','Scarlet Witch','Vision','Ant-Man','Captain Marvel','Star-Lord','Gamora','Groot','Rocket Raccoon','Daredevil','Moon Knight','Ms. Marvel','Shang-Chi'],
  { subQuestions: ['Avengers หรือ X-Men?','เดี่ยวหรือทีม?','เล่นในหนัง MCU?'] });

const marvelVillain = L('Marvel Villain',
  ['Thanos','Loki','Venom','Magneto','Ultron','Green Goblin','Dr. Doom','Kang','Hela','Red Skull','Mysterio','Vulture','Doc Ock','Killmonger','Dormammu','Galactus','Carnage','Sandman','Kingpin','Gorr','Namor (ร้าย)','High Evolutionary'],
  { subQuestions: ['เจอใน Avengers หนังไหน?'] });

const dcHero = L('DC (Hero & Villain)',
  ['Batman','Superman','Wonder Woman','Flash','Aquaman','Green Lantern','Joker','Harley Quinn','Catwoman','Cyborg','Nightwing','Lex Luthor','Penguin','Riddler','Two-Face','Bane','Poison Ivy','Shazam','Black Adam','Supergirl','Raven','Starfire','Robin','Batgirl'],
  { subQuestions: ['Batman universe หรือ Justice League?','Hero หรือ Villain?'] });

const superheroBranch = q('เป็น Marvel?',
  q('เป็นตัวร้าย?', marvelVillain, marvelHero),
  dcHero,
  { hint: 'Marvel ≈ DC ในความดัง แต่ Marvel มักถูกเดาก่อน',
    trap: 'Deadpool เป็น anti-hero — ใช้ "อาจจะ" ถ้าถามว่าร้าย' });

// ---- LIVE ACTION (movies/series) ----
const liveActionChar = L('ตัวละครจากหนัง/ซีรีส์ (คนจริงเล่น)',
  ['Harry Potter','Hermione','Ron','Dumbledore','Snape','Voldemort','Darth Vader','Yoda','Luke Skywalker','Han Solo','Princess Leia','Rey','Obi-Wan','Anakin','The Mandalorian','Baby Yoda (Grogu)','Gandalf','Frodo','Aragorn','Legolas','Gollum','Jack Sparrow','James Bond','Indiana Jones','Walter White','Jesse Pinkman','Saul Goodman','Michael Scott (The Office)','Jim Halpert','Sheldon Cooper','Eleven (Stranger Things)','Jon Snow','Daenerys','Tyrion','Geralt','Yennefer','Ted Lasso','Carrie Bradshaw','Don Draper','Dexter Morgan','Sherlock Holmes','Tony Soprano','Arthur Morgan'],
  { subQuestions: ['หนังหรือซีรีส์?','Fantasy/Drama/Crime?','มี sequel/ซีซั่นเยอะ?'] });

// ---- VIDEO GAME ----
const gameChar = L('ตัวละครเกม',
  ['Mario','Luigi','Peach','Bowser','Yoshi','Toad','Sonic','Tails','Knuckles','Link','Zelda','Ganondorf','Master Chief','Kratos','Lara Croft','Solid Snake','Cloud Strife','Tifa','Sephiroth','Aerith','Geralt (Witcher)','Ciri','Kirby','Pac-Man','Ryu','Ken','Chun-Li','Scorpion (MK)','Sub-Zero','Joel (TLOU)','Ellie','Nathan Drake','Aloy (Horizon)','Arthur Morgan (RDR2)','John Marston','Steve (Minecraft)','Creeper','Pikachu (game)','Isabelle','Agent 47','Leon Kennedy','Jill Valentine','Chris Redfield','Gordon Freeman','Chell (Portal)','GLaDOS','Peely (Fortnite)'],
  { subQuestions: ['เกมแนวอะไร?','Nintendo/PlayStation/Xbox?','90s/2000s/ปัจจุบัน?'] });

// ---- FOLKLORE / MYTH ----
const folkloreChar = L('ตัวละครนิทาน/ตำนาน',
  ['Santa Claus','Easter Bunny','Tooth Fairy','Jack Frost','Cupid','Pinocchio','Little Red Riding Hood','Goldilocks','Hansel & Gretel','Robin Hood','King Arthur','Merlin','Thor (myth)','Zeus','Hades','Medusa','Hercules','Odin','Loki (myth)','Athena','Dracula','Frankenstein','Mummy','Werewolf','Grim Reaper','The Grinch','Ebenezer Scrooge','Mermaid','Fairy','Leprechaun','Unicorn','Dragon','Phoenix'],
  { subQuestions: ['ตำนานกรีก/นอร์ส/ยุโรป?','เทพหรือสัตว์ในตำนาน?'] });

// ---- CHARACTER BOOK root ----
export const CHARACTER_BOOK_ROOT: PlayNode = q('เป็นการ์ตูน/อนิเมะญี่ปุ่น?',
  animeBranch,
  q('เป็นดิสนีย์/พิกซาร์?',
    disneyBranch,
    q('เป็นซูเปอร์ฮีโร่ (Marvel/DC)?',
      superheroBranch,
      q('เป็นการ์ตูนตะวันตกอื่น (Simpsons/SpongeBob)?',
        westernCartoon,
        q('เป็นตัวละครจากหนัง/ซีรีส์ (คนจริงเล่น)?',
          liveActionChar,
          q('เป็นตัวละครจากเกม?',
            gameChar,
            folkloreChar))))),
  { hint: 'ไล่ medium ต้นฉบับ: อนิเมะ → Disney → Marvel/DC → cartoon → live-action → game → ตำนาน',
    trap: 'Thor เป็นทั้ง Marvel comic + live-action + myth → ใช้ "อาจจะ" ที่ level แรกๆ' });
