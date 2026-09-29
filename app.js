const CORE = { primary: '#F5C400', background: '#0B0B0B', surface: '#171717', surface2: '#252525', text: '#F7F3E8', muted: '#C9C3B5' };

export const DAYS = [
  { day: 'Monday', name: 'DOMINION STATE', accent: '#6D28D9', secondaryAccent: '#F5C400', motif: 'crown / stamp', mood: 'Power, ownership, arrival.', energy: 'Commanding', description: 'Own the room. Enter like the timeline owes you rent.', motionPreset: 'stamp' },
  { day: 'Tuesday', name: 'NO FILTER ENERGY', accent: '#FF3B30', secondaryAccent: '#F5C400', motif: 'receipt / strike', mood: 'Uncensored, raw, loud.', energy: 'Unfiltered', description: 'Say it with your chest. The internet has receipts.', motionPreset: 'strike' },
  { day: 'Wednesday', name: 'SHE MOVES DIFFERENT', accent: '#FF4FD8', secondaryAccent: '#F7F3E8', motif: 'motion ribbons', mood: 'Feminine power, elegance, motion.', energy: 'Fluid', description: 'She does not chase the moment. She becomes it.', motionPreset: 'ribbon' },
  { day: 'Thursday', name: 'ECHO ERA', accent: '#2F80ED', secondaryAccent: '#F5C400', motif: 'echo trails', mood: 'Sound, influence, repetition, virality.', energy: 'Amplified', description: 'One post. Ten thousand echoes.', motionPreset: 'echo' },
  { day: 'Friday', name: 'PLAY YOUR VIBE', accent: '#22C55E', secondaryAccent: '#F5C400', motif: 'score strips', mood: 'Games, expression, community competition.', energy: 'Playful', description: 'Pick your vibe. Play like you have receipts.', motionPreset: 'bounce' },
  { day: 'Saturday', name: 'READ BETWEEN THE LINES', accent: '#F7F3E8', secondaryAccent: '#F5C400', motif: 'redaction bars', mood: 'Subtext, screenshots, quotes, hidden meaning.', energy: 'Observant', description: 'The text said one thing. The vibe said another.', motionPreset: 'wipe' },
  { day: 'Sunday', name: 'CHAOS CULTURE', accent: '#FF7A00', secondaryAccent: '#F5C400', motif: 'offset badge / chaos marks', mood: 'Final boss energy, full community madness.', energy: 'Uncontainable', description: 'Controlled chaos. Unfiltered culture. BIG CRUISE〽️', motionPreset: 'shake' }
];

const todayIndex = () => (new Date().getDay() + 6) % 7;
const contrast = (hex) => hex === '#F7F3E8' ? CORE.background : CORE.text;

function createController() {
  const section = document.querySelector('#days');
  if (!section) return null;
  const panel = document.createElement('div');
  panel.className = 'theme-controller';
  panel.innerHTML = `<div><span class="eyebrow">Theme engine</span><strong id="theme-status">TODAY / ${DAYS[todayIndex()].name}</strong></div><div class="theme-mode" role="group" aria-label="7 Days preview mode"><button type="button" data-theme-auto aria-pressed="true">AUTO / TODAY</button>${DAYS.map((theme, index) => `<button type="button" data-theme-index="${index}" aria-pressed="false">${theme.day}</button>`).join('')}</div>`;
  section.querySelector('.wrap').insertBefore(panel, section.querySelector('.days'));
  return panel;
}

function applyTheme(theme, index, mode, panel) {
  const root = document.documentElement;
  root.dataset.theme = theme.day.toLowerCase();
  root.dataset.motion = theme.motionPreset;
  root.style.setProperty('--bc-primary', CORE.primary);
  root.style.setProperty('--bc-background', CORE.background);
  root.style.setProperty('--bc-surface', CORE.surface);
  root.style.setProperty('--bc-surface-2', CORE.surface2);
  root.style.setProperty('--bc-text', CORE.text);
  root.style.setProperty('--bc-muted', CORE.muted);
  root.style.setProperty('--bc-accent', theme.accent);
  root.style.setProperty('--bc-accent-secondary', theme.secondaryAccent);
  root.style.setProperty('--bc-border', `${theme.accent}66`);
  root.style.setProperty('--bc-glow', `${theme.accent}44`);
  root.style.setProperty('--bc-accent-contrast', contrast(theme.accent));
  panel.querySelector('#theme-status').textContent = `${mode === 'auto' ? 'TODAY' : 'PREVIEW'} / ${theme.day} — ${theme.name}`;
  panel.querySelector('[data-theme-auto]').setAttribute('aria-pressed', String(mode === 'auto'));
  panel.querySelectorAll('[data-theme-index]').forEach((button) => button.setAttribute('aria-pressed', String(mode === 'manual' && Number(button.dataset.themeIndex) === index)));
  document.querySelectorAll('.day-card').forEach((card, cardIndex) => {
    card.dataset.active = String(cardIndex === index);
    card.style.setProperty('--day-accent', DAYS[cardIndex].accent);
  });
}

function init() {
  const panel = createController();
  if (!panel) return;
  let mode = 'auto';
  let index = todayIndex();
  applyTheme(DAYS[index], index, mode, panel);
  panel.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button) return;
    if (button.hasAttribute('data-theme-auto')) { mode = 'auto'; index = todayIndex(); }
    else { mode = 'manual'; index = Number(button.dataset.themeIndex); }
    applyTheme(DAYS[index], index, mode, panel);
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
