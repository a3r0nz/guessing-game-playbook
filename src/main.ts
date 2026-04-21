import './style.css';
import { mountPlay } from './ui/play';
import { mountBrowse } from './ui/browse';
import { mountTips } from './ui/tips';

type PaneName = 'quiz' | 'tree' | 'tips';

const TABS: Array<{ id: PaneName; label: string }> = [
  { id: 'quiz', label: 'เล่นเกม' },
  { id: 'tree', label: 'ต้นไม้' },
  { id: 'tips', label: 'เทคนิค' }
];

function bootstrap() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <header>
      <h1>อะไรอยู่บนหัวกูวะ</h1>
      <div class="tag">คู่มือตั้งคำถามแบบ Binary Search</div>
      <nav class="tabs" role="tablist">
        ${TABS.map(t => `<button class="tab" data-pane="${t.id}" role="tab">${t.label}</button>`).join('')}
      </nav>
    </header>
    <main>
      <section id="quiz" class="pane"></section>
      <section id="tree" class="pane"></section>
      <section id="tips" class="pane"></section>
    </main>
  `;

  document.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchTo(btn.dataset.pane as PaneName));
  });

  mountPlay(document.getElementById('quiz')!, () => switchTo('tree'));
  mountBrowse(document.getElementById('tree')!);
  mountTips(document.getElementById('tips')!);
  switchTo('quiz');
}

function switchTo(name: PaneName) {
  document.querySelectorAll<HTMLButtonElement>('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.pane === name)
  );
  document.querySelectorAll<HTMLElement>('.pane').forEach(p =>
    p.classList.toggle('active', p.id === name)
  );
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

bootstrap();
