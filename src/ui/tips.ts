export function mountTips(root: HTMLElement) {
  root.innerHTML = `
    <h2>5 คำถามทองเปิดเกม</h2>
    <div class="strat-card"><h4><span class="num">1</span>เป็นสิ่งมีชีวิต/ตัวละครมั้ย?</h4><p>แบ่งโลกออกเป็น entity (คน/สัตว์/ตัวการ์ตูน) vs thing (ของ/สถานที่/นามธรรม)</p></div>
    <div class="strat-card"><h4><span class="num">2</span>เป็นคนมั้ย?</h4><p>ถ้าใช่ → ไปสายบุคคล/ตัวละคร; ถ้าไม่ → สัตว์/พืช (ถ้าเป็น entity)</p></div>
    <div class="strat-card"><h4><span class="num">3</span>เป็นของไทยมั้ย?</h4><p>ตัดฝั่งต่างประเทศออก 50%+ — รายการไทยมักเอียงไปทางคนไทย/สิ่งที่คนไทยรู้จัก</p></div>
    <div class="strat-card"><h4><span class="num">4</span>เป็นเรื่องจริง หรือ สมมติ?</h4><p>คนจริง vs การ์ตูน/ตัวละคร — ใช้แยกเร็วก่อนเจาะลึก</p></div>
    <div class="strat-card"><h4><span class="num">5</span>คนทั่วไปรู้จักมั้ย?</h4><p>ถ้าใช่ → เดาจากคนดังระดับชาติได้เลย ไม่ต้องเดา niche</p></div>

    <h2>เทคนิคขั้นสูง</h2>
    <div class="strat-card"><h4>Binary Search</h4><p>คำถามที่ดีต้องตัดออก 50/50 อย่าถามสิ่งที่คำตอบแทบชัวร์อยู่แล้ว</p></div>
    <div class="strat-card"><h4>กว้าง → แคบ</h4><p>ถามหมวดใหญ่ก่อน ค่อยเจาะ อย่ากระโดดเดาชื่อเร็ว</p></div>
    <div class="strat-card"><h4>Rule of Three</h4><p>ได้ "ไม่" 3 ครั้งติด → สมมติฐานน่าจะผิด เปลี่ยนกิ่ง</p></div>
    <div class="strat-card"><h4>Age/Era Filter</h4><p>"อยู่ในยุคปัจจุบัน?" / "อายุเกิน 40 มั้ย?" ตัดประวัติศาสตร์/รุ่นเก่าออกไว</p></div>
    <div class="strat-card"><h4>Anchor Example</h4><p>โยนตัวอย่างใกล้ๆ "คล้าย X มั้ย?" ให้ยืนยัน/ปฏิเสธเร็วกว่าอธิบายคุณสมบัติ</p></div>
    <div class="strat-card"><h4>Elimination Memory</h4><p>จำ "สิ่งที่ไม่ใช่" ทุกข้อ — อย่าถามซ้ำ และจะวาดภาพคำตอบจริงจาก by-product ได้</p></div>
    <div class="strat-card"><h4>อ่านสีหน้า</h4><p>สังเกตคนตอบ หัวเราะ/ลังเล = มาถูก, เงียบ = หลงทาง</p></div>
    <div class="strat-card"><h4>Compound Question</h4><p>ถ้ากติกาอนุญาต ถาม 2-in-1 เช่น "ผู้ชายไทยในบันเทิง?" — ระวังคำตอบกำกวม</p></div>
    <div class="strat-card"><h4>Time Pressure</h4><p>เวลาเหลือน้อย → เดาชื่อ popular สุดในกิ่งที่เหลือ ดีกว่าคิดต่อ</p></div>

    <h2>กับดักที่ต้องระวัง</h2>
    <div class="trap-card"><b>ถามเจาะเร็วเกินไป</b><small>"เป็นนักร้องมั้ย?" ตั้งแต่คำถามแรก — ยังไม่รู้เลยว่าเป็นคนจริงรึเปล่า</small></div>
    <div class="trap-card"><b>เดาชื่อเร็วเกินไป</b><small>เหลือความเป็นไปได้ 10+ คน แล้วเดาสุ่ม โอกาสผิดสูงมาก</small></div>
    <div class="trap-card"><b>คำถามกำกวม</b><small>"สีน้ำเงินมั้ย?" — ตีความได้หลายแบบ คนตอบอาจลังเล</small></div>
    <div class="trap-card"><b>ล็อกสมองกับ mindset เดียว</b><small>คิดว่า "ต้องเป็นดารา" ทั้งที่จริงเป็นของกิน</small></div>
    <div class="trap-card"><b>ไม่ฟังเบาะแสข้างเคียง</b><small>คนอื่นให้ hint นอกคำถาม (ยิ้ม, ท่าทาง) แต่มัวถามไม่สังเกต</small></div>
    <div class="trap-card"><b>ถามซ้ำโดยไม่รู้ตัว</b><small>ลืมว่าเพิ่งถามคล้ายๆ กัน เสียเทิร์นฟรี — จำ breadcrumb ให้ดี</small></div>
  `;
}
