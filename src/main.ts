import './style.css';
import { mountPlay } from './ui/play';
import { mountBrowse } from './ui/browse';
import { mountTips } from './ui/tips';

type PaneName = 'play' | 'browse' | 'tips';

const TABS: Array<{ id: PaneName; label: string }> = [
  { id: 'play', label: 'เล่นเกม' },
  { id: 'browse', label: 'คลัง' },
  { id: 'tips', label: 'เทคนิค' }
];

let active: PaneName = 'play';

function bootstrap() {
  const app = document.getElementById('app')!;
  app.innerHTML = `
    <header>
      <h1>อะไรอยู่บนหัวกูวะ</h1>
      <div class="tag">คู่มือตั้งคำถาม • Tag-based filtering</div>
      <nav class="tabs" role="tablist">
        ${TABS.map(t => `<button class="tab" data-pane="${t.id}" role="tab">${t.label}</button>`).join('')}
      </nav>
    </header>
    <main>
      <section id="play" class="pane"></section>
      <section id="browse" class="pane"></section>
      <section id="tips" class="pane"></section>
    </main>
  `;

  document.querySelectorAll<HTMLButtonElement>('.tab').forEach(btn => {
    btn.addEventListener('click', () => switchTo(btn.dataset.pane as PaneName));
  });

  mountPlay(document.getElementById('play')!);
  mountTips(document.getElementById('tips')!);
  mountBrowse(document.getElementById('browse')!);
  switchTo('play');
}

function switchTo(name: PaneName) {
  active = name;
  document.querySelectorAll<HTMLButtonElement>('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.pane === name)
  );
  document.querySelectorAll<HTMLElement>('.pane').forEach(p =>
    p.classList.toggle('active', p.id === name)
  );
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// silence
void active;

bootstrap();
