
// ── SVG Fish factory ─────────────────────────────────────
const FISH_SCHEMES = [
  { body:'#FF6B35', stripe:'#FFFFFF', fin:'#CC3300', outline:'#7A1500' },
  { body:'#1565C0', stripe:'#FFD740', fin:'#0D47A1', outline:'#062060' },
  { body:'#FFD600', stripe:'#1A1A1A', fin:'#E65100', outline:'#5c3d00' },
  { body:'#8E24AA', stripe:'#FCE4EC', fin:'#6A1B9A', outline:'#3d0070' },
  { body:'#00897B', stripe:'#FFA726', fin:'#00695C', outline:'#003830' },
];

function makeFishSVG(c) {
  return `<svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;overflow:visible">
  <g>
    <path d="M26,28 L5,12 L21,27 Z" fill="${c.fin}"/>
    <path d="M26,32 L5,48 L21,33 Z" fill="${c.fin}"/>
    <animateTransform attributeName="transform" type="rotate" values="-13,26,30;13,26,30;-13,26,30" dur="0.48s" repeatCount="indefinite"/>
  </g>
  <ellipse cx="54" cy="30" rx="30" ry="19" fill="${c.body}"/>
  <ellipse cx="80" cy="30" rx="9" ry="15" fill="${c.body}"/>
  <ellipse cx="49" cy="30" rx="5.5" ry="17" fill="${c.stripe}"/>
  <ellipse cx="66" cy="30" rx="4.5" ry="14" fill="${c.stripe}"/>
  <path d="M38,12 C47,2 62,0 70,11" fill="${c.fin}"/>
  <g>
    <ellipse cx="60" cy="37" rx="13" ry="5.5" fill="${c.fin}" opacity="0.8"/>
    <animateTransform attributeName="transform" type="rotate" values="-25,60,37;-5,60,37;-25,60,37" dur="0.85s" repeatCount="indefinite"/>
  </g>
  <path d="M43,48 C50,56 59,55 62,49" fill="${c.fin}"/>
  <circle cx="81" cy="25" r="5.5" fill="white"/>
  <circle cx="81" cy="25" r="3.5" fill="#111"/>
  <circle cx="82.5" cy="23.5" r="1.2" fill="white"/>
  <path d="M88,31 Q90,33 88,36" fill="none" stroke="${c.outline}" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;
}

// Pair scheme: fish-1 & fish-3 share scheme 0 (orange twins),
//              fish-2 & fish-4 share scheme 1 (blue twins), fish-5 is scheme 2 (singleton)
const TROPICAL_PAIRS = [0, 1, 0, 1, 2];
document.querySelectorAll('.fish:not(.fish-angel)').forEach((el, i) => {
  const s = TROPICAL_PAIRS[i] ?? 0;
  el.innerHTML = makeFishSVG(FISH_SCHEMES[s]);
  el.dataset.species = 'tropical';
  el.dataset.scheme  = String(s);
});

// ── Angelfish SVG ─────────────────────────────────────────
const ANGEL_SCHEMES = [
  { body:'#C8CDB8', head:'#D8DDCA', stripe:'#1C1C2E', fin:'#7898B8', finEdge:'#4E6A8A' }, // silver
  { body:'#E8C84A', head:'#F2D860', stripe:'#5A2800', fin:'#C87810', finEdge:'#8A4A00' }, // gold
  { body:'#C0A8D8', head:'#D0BCE8', stripe:'#2A1448', fin:'#9068C8', finEdge:'#5A3A90' }, // lavender
  { body:'#E89878', head:'#F0A888', stripe:'#4A1400', fin:'#C85038', finEdge:'#8A2820' }, // coral
  { body:'#88C4A0', head:'#9AD4B2', stripe:'#1A3828', fin:'#2A9068', finEdge:'#186040' }, // jade
];

function makeAngelfishSVG(c) {
  const body    = c.body;
  const fin     = c.fin;
  const finEdge = c.finEdge;
  const stripe  = c.stripe;

  // Dorsal fin path — two states for gentle flutter animation
  const dorsalA = 'M 22,33 C 24,11 32,1 40,0 C 47,0 54,9 58,31 L 58,33 L 22,33 Z';
  const dorsalB = 'M 22,33 C 25,17 34,8 40,5 C 47,5 55,15 58,32 L 58,33 L 22,33 Z';

  // Anal fin path — mirrors dorsal
  const analA   = 'M 22,77 C 24,99 32,109 40,110 C 47,110 54,101 58,79 L 58,77 L 22,77 Z';
  const analB   = 'M 22,77 C 25,95 34,104 40,106 C 47,106 55,97 58,78 L 58,77 L 22,77 Z';

  return `<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;overflow:visible">
  <!-- Tail fin (wag) -->
  <g>
    <path d="M22,50 L4,38 L18,52 Z" fill="${fin}"/>
    <path d="M22,60 L4,72 L18,58 Z" fill="${fin}"/>
    <animateTransform attributeName="transform" type="rotate" values="-11,22,55;11,22,55;-11,22,55" dur="0.55s" repeatCount="indefinite"/>
  </g>
  <!-- Dorsal fin (flutter) -->
  <path fill="${fin}" fill-opacity="0.78" stroke="${finEdge}" stroke-width="0.7">
    <animate attributeName="d" values="${dorsalA};${dorsalB};${dorsalA}" dur="2.2s" repeatCount="indefinite"/>
  </path>
  <!-- Anal fin (flutter) -->
  <path fill="${fin}" fill-opacity="0.78" stroke="${finEdge}" stroke-width="0.7">
    <animate attributeName="d" values="${analA};${analB};${analA}" dur="2.6s" repeatCount="indefinite"/>
  </path>
  <!-- Body -->
  <ellipse cx="42" cy="55" rx="20" ry="28" fill="${body}" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
  <!-- Head -->
  <ellipse cx="61" cy="55" rx="9"  ry="13" fill="${c.head}" stroke="rgba(0,0,0,0.3)" stroke-width="0.8"/>
  <!-- Body stripes -->
  <ellipse cx="33" cy="55" rx="2.5" ry="20" fill="${stripe}" opacity="0.82"/>
  <ellipse cx="47" cy="55" rx="2.5" ry="24" fill="${stripe}" opacity="0.82"/>
  <!-- Pectoral fin (flap) -->
  <g>
    <ellipse cx="53" cy="64" rx="10" ry="4" fill="${fin}" opacity="0.65"/>
    <animateTransform attributeName="transform" type="rotate" values="-20,53,64;0,53,64;-20,53,64" dur="0.9s" repeatCount="indefinite"/>
  </g>
  <!-- Ventral streamers (sway) -->
  <g>
    <path d="M44,81 C42,91 40,101 39,109" fill="none" stroke="${fin}" stroke-width="3" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="-8,44,81;8,44,81;-8,44,81" dur="1.9s" repeatCount="indefinite"/>
  </g>
  <g>
    <path d="M50,82 C48,92 47,102 46,109" fill="none" stroke="${finEdge}" stroke-width="2.5" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="-5,50,82;9,50,82;-5,50,82" dur="2.3s" repeatCount="indefinite"/>
  </g>
  <!-- Eye -->
  <circle cx="64" cy="51" r="5.5" fill="white"/>
  <circle cx="64" cy="51" r="3.5" fill="#111"/>
  <circle cx="65.5" cy="49.5" r="1.2" fill="white"/>
  <!-- Mouth -->
  <path d="M69,57 Q71,59 69,61" fill="none" stroke="rgba(0,0,0,0.4)" stroke-width="1.2" stroke-linecap="round"/>
</svg>`;
}

// Pair scheme: angel-1 & angel-5 share scheme 0 (silver twins),
//              angel-2 & angel-4 share scheme 1 (gold twins), angel-3 is scheme 2 (singleton)
const ANGEL_PAIRS = [0, 1, 2, 1, 0];
document.querySelectorAll('.fish-angel').forEach((el, i) => {
  const s = ANGEL_PAIRS[i] ?? 0;
  el.innerHTML = makeAngelfishSVG(ANGEL_SCHEMES[s]);
  el.dataset.species = 'angel';
  el.dataset.scheme  = String(s);
});

// ── Jellyfish SVG ─────────────────────────────────────────
const JELLY_SCHEMES = [
  { bell:'#00ACC1', rim:'#40E0FF', arms:'#4FC3F7', glow:'#00E5FF' }, // cyan
  { bell:'#C2185B', rim:'#FF4081', arms:'#F48FB1', glow:'#FF4081' }, // pink
  { bell:'#6A1B9A', rim:'#CE93D8', arms:'#AB47BC', glow:'#CE93D8' }, // purple
  { bell:'#E65100', rim:'#FFAB40', arms:'#FFB74D', glow:'#FFAB40' }, // amber
  { bell:'#37474F', rim:'#B0BEC5', arms:'#90A4AE', glow:'#B0BEC5' }, // ghost
];

function makeJellyfishSVG(c) {
  const bellA   = 'M 8,45 C 4,22 4,5 40,5 C 76,5 76,22 72,45';
  const bellB   = 'M 13,41 C 10,22 10,9 40,9 C 70,9 70,22 67,41';
  const fringeA = 'M 8,45 Q 20,50 32,44 Q 40,48 50,44 Q 62,50 72,45';
  const fringeB = 'M 13,41 Q 23,46 33,40 Q 40,44 47,40 Q 57,46 67,41';
  const armL_A  = 'M 33,45 C 28,58 36,68 30,80 C 24,90 32,97 27,106';
  const armL_B  = 'M 33,45 C 38,58 30,68 36,80 C 42,90 34,97 38,106';
  const armR_A  = 'M 47,45 C 52,58 44,68 50,80 C 56,90 48,97 53,106';
  const armR_B  = 'M 47,45 C 42,58 50,68 44,80 C 38,90 46,97 42,106';
  // Electric arc paths — 3 states per arc, same command sequence for morphing
  const arcL_A  = 'M 11,46 L 7,57 L 14,65 L 8,75 L 13,86 L 7,96';
  const arcL_B  = 'M 11,46 L 15,57 L 9,65 L 14,75 L 8,86 L 15,96';
  const arcL_C  = 'M 11,46 L 9,55 L 16,64 L 7,74 L 14,84 L 9,96';
  const arcC_A  = 'M 40,46 L 36,57 L 43,65 L 37,76 L 42,88';
  const arcC_B  = 'M 40,46 L 44,57 L 38,65 L 43,76 L 38,88';
  const arcC_C  = 'M 40,46 L 38,55 L 45,64 L 36,74 L 41,88';
  const arcR_A  = 'M 69,46 L 73,57 L 66,65 L 72,75 L 67,86 L 73,96';
  const arcR_B  = 'M 69,46 L 65,57 L 71,65 L 66,75 L 71,86 L 65,96';
  const arcR_C  = 'M 69,46 L 67,55 L 74,64 L 65,74 L 71,84 L 67,96';

  return `<svg viewBox="0 0 80 110" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;overflow:visible">
  <!-- Pulsing aura (drawn first, behind everything) -->
  <ellipse cx="40" cy="28" rx="40" ry="50" fill="${c.rim}" fill-opacity="0.04">
    <animate attributeName="fill-opacity" values="0.02;0.14;0.02" dur="1.3s" repeatCount="indefinite"/>
    <animate attributeName="rx" values="38;52;38" dur="1.3s" repeatCount="indefinite"/>
    <animate attributeName="ry" values="46;62;46" dur="1.3s" repeatCount="indefinite"/>
  </ellipse>
  <!-- Tentacles (sway) -->
  <g><path d="M 11,45 C 9,58 13,68 10,78 C 7,88 11,96 9,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-12,11,45;12,11,45;-12,11,45" dur="2.2s" repeatCount="indefinite"/></g>
  <g><path d="M 21,45 C 19,58 23,68 20,78 C 17,88 21,96 19,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-9,21,45;9,21,45;-9,21,45" dur="1.9s" repeatCount="indefinite"/></g>
  <g><path d="M 32,45 C 30,58 34,68 31,78 C 28,88 32,96 30,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-7,32,45;7,32,45;-7,32,45" dur="2.5s" repeatCount="indefinite"/></g>
  <g><path d="M 48,45 C 46,58 50,68 47,78 C 44,88 48,96 46,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-7,48,45;7,48,45;-7,48,45" dur="2.1s" repeatCount="indefinite"/></g>
  <g><path d="M 59,45 C 57,58 61,68 58,78 C 55,88 59,96 57,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-9,59,45;9,59,45;-9,59,45" dur="1.8s" repeatCount="indefinite"/></g>
  <g><path d="M 69,45 C 67,58 71,68 68,78 C 65,88 69,96 67,105" fill="none" stroke="${c.arms}" stroke-width="1.2" stroke-linecap="round" stroke-opacity="0.7"/><animateTransform attributeName="transform" type="rotate" values="-12,69,45;12,69,45;-12,69,45" dur="2.4s" repeatCount="indefinite"/></g>
  <!-- Oral arms (wavy path-morph) -->
  <path fill="none" stroke="${c.arms}" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.9"><animate attributeName="d" values="${armL_A};${armL_B};${armL_A}" dur="2.4s" repeatCount="indefinite"/></path>
  <path fill="none" stroke="${c.arms}" stroke-width="2.5" stroke-linecap="round" stroke-opacity="0.9"><animate attributeName="d" values="${armR_A};${armR_B};${armR_A}" dur="2.8s" repeatCount="indefinite"/></path>
  <!-- Bell fill (pulsing) -->
  <path fill="${c.bell}" fill-opacity="0.4"><animate attributeName="d" values="${bellA};${bellB};${bellA}" dur="1.8s" repeatCount="indefinite"/></path>
  <!-- Bell interior electricity flash -->
  <path fill="${c.rim}" fill-opacity="0"><animate attributeName="d" values="${bellA};${bellB};${bellA}" dur="1.8s" repeatCount="indefinite"/><animate attributeName="fill-opacity" values="0;0;0.14;0;0;0.2;0;0.1;0;0" dur="0.5s" repeatCount="indefinite"/></path>
  <!-- Bell ribs -->
  <line x1="40" y1="8" x2="15" y2="42" stroke="white" stroke-opacity="0.12" stroke-width="1"/>
  <line x1="40" y1="8" x2="26" y2="44" stroke="white" stroke-opacity="0.10" stroke-width="1"/>
  <line x1="40" y1="8" x2="40" y2="45" stroke="white" stroke-opacity="0.12" stroke-width="1"/>
  <line x1="40" y1="8" x2="54" y2="44" stroke="white" stroke-opacity="0.10" stroke-width="1"/>
  <line x1="40" y1="8" x2="65" y2="42" stroke="white" stroke-opacity="0.12" stroke-width="1"/>
  <!-- Bell rim stroke (pulsing in sync) -->
  <path fill="none" stroke="${c.rim}" stroke-width="2" stroke-linecap="round"><animate attributeName="d" values="${bellA};${bellB};${bellA}" dur="1.8s" repeatCount="indefinite"/></path>
  <!-- Bell fringe (pulsing in sync) -->
  <path fill="none" stroke="${c.rim}" stroke-width="1.5" stroke-linecap="round" stroke-opacity="0.7"><animate attributeName="d" values="${fringeA};${fringeB};${fringeA}" dur="1.8s" repeatCount="indefinite"/></path>
  <!-- Bell highlight -->
  <ellipse cx="36" cy="18" rx="11" ry="6" fill="white" fill-opacity="0.15" transform="rotate(-15,36,18)"/>
  <ellipse cx="30" cy="12" rx="5"  ry="3" fill="white" fill-opacity="0.20" transform="rotate(-20,30,12)"/>
  <!-- Electric arcs — outer glow layer -->
  <path fill="none" stroke="${c.rim}" stroke-width="5" stroke-linecap="round"><animate attributeName="d" values="${arcL_A};${arcL_B};${arcL_C};${arcL_A}" dur="0.09s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.5;0;0.4;0;0.5" dur="0.38s" repeatCount="indefinite"/></path>
  <path fill="none" stroke="${c.rim}" stroke-width="5" stroke-linecap="round"><animate attributeName="d" values="${arcC_A};${arcC_B};${arcC_C};${arcC_A}" dur="0.09s" begin="-0.05s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0;0.45;0;0.35;0" dur="0.31s" repeatCount="indefinite"/></path>
  <path fill="none" stroke="${c.rim}" stroke-width="5" stroke-linecap="round"><animate attributeName="d" values="${arcR_A};${arcR_B};${arcR_C};${arcR_A}" dur="0.09s" begin="-0.03s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.4;0;0;0.5;0.3;0" dur="0.44s" repeatCount="indefinite"/></path>
  <!-- Electric arcs — bright core -->
  <path fill="none" stroke="#E0F8FF" stroke-width="1.5" stroke-linecap="round"><animate attributeName="d" values="${arcL_A};${arcL_B};${arcL_C};${arcL_A}" dur="0.09s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.9;0;0.7;0;0.9" dur="0.38s" repeatCount="indefinite"/></path>
  <path fill="none" stroke="#E0F8FF" stroke-width="1.5" stroke-linecap="round"><animate attributeName="d" values="${arcC_A};${arcC_B};${arcC_C};${arcC_A}" dur="0.09s" begin="-0.05s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0;0.85;0;0.75;0" dur="0.31s" repeatCount="indefinite"/></path>
  <path fill="none" stroke="#E0F8FF" stroke-width="1.5" stroke-linecap="round"><animate attributeName="d" values="${arcR_A};${arcR_B};${arcR_C};${arcR_A}" dur="0.09s" begin="-0.03s" repeatCount="indefinite"/><animate attributeName="stroke-opacity" values="0.8;0;0;0.9;0.6;0" dur="0.44s" repeatCount="indefinite"/></path>
</svg>`;
}

document.querySelectorAll('.jellyfish').forEach((el, i) => {
  el.innerHTML = makeJellyfishSVG(JELLY_SCHEMES[i % JELLY_SCHEMES.length]);
});

// ── Crab spawner ──────────────────────────────────────────
function makeCrabSVG(flip) {
  const g = flip ? ' transform="translate(100,0) scale(-1,1)"' : '';
  return `<svg viewBox="0 0 100 65" xmlns="http://www.w3.org/2000/svg" style="display:block;width:100%;height:auto;overflow:visible">
<g${g}>
  <!-- Left legs (alternate with right) -->
  <g>
    <path d="M28,40 L14,52" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M27,44 L12,58" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M26,48 L11,62" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="-18,27,44;18,27,44;-18,27,44" dur="0.12s" repeatCount="indefinite"/>
  </g>
  <!-- Right legs (opposite phase) -->
  <g>
    <path d="M72,40 L86,52" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M73,44 L88,58" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <path d="M74,48 L89,62" stroke="#8B0000" stroke-width="3.5" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="18,73,44;-18,73,44;18,73,44" dur="0.12s" repeatCount="indefinite"/>
  </g>
  <!-- Left claw -->
  <path d="M26,36 C16,28 10,24 8,22" fill="none" stroke="#D32F2F" stroke-width="6" stroke-linecap="round"/>
  <path d="M8,22 C5,17 3,13 6,11"   fill="none" stroke="#D32F2F" stroke-width="4" stroke-linecap="round"/>
  <g>
    <path d="M8,22 C5,26 5,30 8,28" fill="none" stroke="#D32F2F" stroke-width="4" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="0,8,22;12,8,22;0,8,22" dur="0.7s" repeatCount="indefinite"/>
  </g>
  <!-- Right claw (slightly larger — the leading claw) -->
  <path d="M74,36 C84,28 90,24 92,22" fill="none" stroke="#D32F2F" stroke-width="7" stroke-linecap="round"/>
  <path d="M92,22 C95,17 97,13 94,11" fill="none" stroke="#D32F2F" stroke-width="4.5" stroke-linecap="round"/>
  <g>
    <path d="M92,22 C95,26 95,30 92,28" fill="none" stroke="#D32F2F" stroke-width="4.5" stroke-linecap="round"/>
    <animateTransform attributeName="transform" type="rotate" values="0,92,22;-12,92,22;0,92,22" dur="0.8s" begin="-0.3s" repeatCount="indefinite"/>
  </g>
  <!-- Carapace -->
  <ellipse cx="50" cy="36" rx="24" ry="16" fill="#D32F2F" stroke="#8B0000" stroke-width="1.5"/>
  <!-- Carapace detail -->
  <path d="M30,30 C36,24 44,22 50,22 C56,22 64,24 70,30" fill="none" stroke="#8B0000" stroke-width="1" stroke-opacity="0.45"/>
  <line x1="50" y1="22" x2="50" y2="50" stroke="#8B0000" stroke-width="1" stroke-opacity="0.3"/>
  <!-- Eye stalks -->
  <line x1="40" y1="24" x2="34" y2="14" stroke="#8B0000" stroke-width="3" stroke-linecap="round"/>
  <line x1="60" y1="24" x2="66" y2="14" stroke="#8B0000" stroke-width="3" stroke-linecap="round"/>
  <!-- Eyes -->
  <circle cx="32" cy="12" r="6"   fill="white" stroke="#8B0000" stroke-width="1"/>
  <circle cx="68" cy="12" r="6"   fill="white" stroke="#8B0000" stroke-width="1"/>
  <circle cx="33" cy="12" r="3.5" fill="#111"/>
  <circle cx="69" cy="12" r="3.5" fill="#111"/>
  <circle cx="34" cy="11" r="1.2" fill="white"/>
  <circle cx="70" cy="11" r="1.2" fill="white"/>
</g>
</svg>`;
}

let crabActive = false;
let crabDelay  = 0; // extra seconds added to spawn window each time crab is caught

function spawnCrab() {
  if (crabActive) return;
  crabActive = true;

  const goRight = Math.random() < 0.5;
  const dur     = (1.4 + Math.random() * 0.5).toFixed(2);

  const crab = document.createElement('div');
  crab.className = 'creature crab-creature';
  crab.dataset.points = '15';
  crab.dataset.name   = 'Crab';
  crab.innerHTML = makeCrabSVG(!goRight);
  crab.style.animation = `${goRight ? 'crab-run-right' : 'crab-run-left'} ${dur}s linear forwards`;

  function done() {
    if (!crabActive) return;
    crabActive = false;
    crab.remove();
    scheduleCrab();
  }

  crab.addEventListener('click',      (e) => { awardCrab(e); done(); }, { once: true });
  crab.addEventListener('touchstart', (e) => { awardCrab(e); done(); }, { once: true, passive: true });
  crab.addEventListener('animationend', done, { once: true });

  document.getElementById('creatures').appendChild(crab);
}

function scheduleCrab() {
  setTimeout(spawnCrab, (10 + crabDelay + Math.random() * 10) * 1000);
}

// (scheduleCrab is called by startGame once the splash is dismissed)

// ── Storage & state ───────────────────────────────────────
const STORAGE_KEY = 'ocean_best';

let score = 0;
let best = parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10);

const scoreEl = document.getElementById('score');
const bestEl  = document.getElementById('best');
const popupsEl = document.getElementById('popups');

bestEl.textContent = best;

// ── Bubble spawner ────────────────────────────────────────
function spawnBubbles() {
  const container = document.getElementById('bubbles');
  const count = 18;
  for (let i = 0; i < count; i++) {
    const b = document.createElement('div');
    b.className = 'bubble';
    const size = 4 + Math.random() * 10;
    const left = 5 + Math.random() * 90;
    const dur  = 8 + Math.random() * 14;
    const delay = -(Math.random() * dur);
    const drift = (Math.random() - 0.5) * 60;
    b.style.cssText = `
      width:${size}px; height:${size}px;
      left:${left}%;
      bottom:${10 + Math.random() * 5}%;
      --drift:${drift}px;
      animation-duration:${dur}s;
      animation-delay:${delay}s;
    `;
    container.appendChild(b);
  }
}
spawnBubbles();

// ── Score popup ───────────────────────────────────────────
function showPopup(x, y, text) {
  const el = document.createElement('div');
  el.className = 'popup';
  el.textContent = text;
  el.style.left = `${x}px`;
  el.style.top  = `${y}px`;
  popupsEl.appendChild(el);
  el.addEventListener('animationend', () => el.remove());
}

// ── Crab scorer (crab is still tap-to-score) ──────────────
function awardCrab(e) {
  score += 10;
  scoreEl.textContent = score;
  if (score > best) {
    best = score;
    bestEl.textContent = best;
    localStorage.setItem(STORAGE_KEY, best);
  }
  crabDelay += 10; // next crab takes 10 s longer to appear
  const cx = e.touches ? e.touches[0].clientX : e.clientX;
  const cy = e.touches ? e.touches[0].clientY : e.clientY;
  showPopup(cx - 24, cy - 10, '+10 Crab');
  spawnRipple(cx, cy);
}

// ── Drag-to-match system ──────────────────────────────────
let gameStarted  = false;
let dragState    = null; // { el, offsetX, offsetY, species, scheme }
let shockActive  = false;
let frozenJelly  = null; // the jellyfish frozen on collision
let shockTimeout = null;

function oceanScale() {
  const ocean = document.getElementById('ocean');
  const r = ocean.getBoundingClientRect();
  return {
    r,
    sx: r.width  / ocean.offsetWidth,
    sy: r.height / ocean.offsetHeight,
  };
}

function clientToOcean(clientX, clientY) {
  const { r, sx, sy } = oceanScale();
  return { x: (clientX - r.left) / sx, y: (clientY - r.top) / sy };
}

function onFishGrab(e) {
  if (!gameStarted || dragState) return;
  const el = e.currentTarget;
  if (el.classList.contains('matched')) return;
  e.preventDefault();
  e.stopPropagation();

  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const { r, sx, sy } = oceanScale();
  const elRect = el.getBoundingClientRect();

  // Position in ocean-coordinate space
  const elX = (elRect.left - r.left) / sx;
  const elY = (elRect.top  - r.top)  / sy;
  const fpX = (clientX     - r.left) / sx;
  const fpY = (clientY     - r.top)  / sy;

  // Freeze the fish at its current visual position
  el.style.animation = 'none';
  el.style.left      = elX + 'px';
  el.style.top       = elY + 'px';
  el.style.transform = '';
  el.style.zIndex    = '50';
  el.classList.add('dragging');

  dragState = { el, offsetX: fpX - elX, offsetY: fpY - elY,
                species: el.dataset.species, scheme: el.dataset.scheme };
}

function onFishMove(e) {
  if (!dragState) return;
  if (e.cancelable) e.preventDefault();
  const clientX = e.touches ? e.touches[0].clientX : e.clientX;
  const clientY = e.touches ? e.touches[0].clientY : e.clientY;
  const pos = clientToOcean(clientX, clientY);
  dragState.el.style.left = (pos.x - dragState.offsetX) + 'px';
  dragState.el.style.top  = (pos.y - dragState.offsetY) + 'px';

  const hitJelly = hitsJellyfish();
  if (hitJelly) triggerShock(hitJelly);
}

function triggerShock(hitJelly) {
  if (shockActive || !dragState) return;
  shockActive = true;

  // Freeze the jellyfish: pause all its CSS animations at the current frame
  frozenJelly = hitJelly;
  hitJelly.style.animationPlayState = 'paused';

  // The fish is already position-frozen from the drag grab (animation:none,
  // inline left/top). Just add the yellow tint.
  dragState.el.classList.add('zapped');

  // Lightning bolt emoji floating above the fish
  const r = dragState.el.getBoundingClientRect();
  const bolt = document.createElement('div');
  bolt.id = 'shock-bolt';
  bolt.textContent = '⚡';
  bolt.style.cssText = `
    position:fixed;
    font-size:clamp(64px,10vw,120px);
    line-height:1;
    pointer-events:none;
    z-index:500;
    left:${r.left + r.width / 2}px;
    top:${r.top - 10}px;
    transform:translateX(-50%) translateY(-100%);
    filter:drop-shadow(0 0 18px rgba(255,230,50,0.95));
    animation:bolt-flash 0.22s ease-in-out infinite alternate;
  `;
  document.body.appendChild(bolt);

  // 6 lightning bolts arranged in a circle around the jellyfish
  const jr      = hitJelly.getBoundingClientRect();
  const jCx     = jr.left + jr.width  / 2;
  const jCy     = jr.top  + jr.height / 2;
  const radius  = Math.max(jr.width, jr.height) * 0.72;
  for (let i = 0; i < 6; i++) {
    const angle = (i / 6) * Math.PI * 2 - Math.PI / 2; // start at top
    const rb = document.createElement('div');
    rb.className = 'shock-bolt-ring';
    rb.textContent = '⚡';
    rb.style.cssText = `
      position:fixed;
      font-size:clamp(44px,7vw,76px);
      line-height:1;
      pointer-events:none;
      z-index:500;
      left:${jCx + radius * Math.cos(angle)}px;
      top:${jCy + radius * Math.sin(angle)}px;
      transform:translate(-50%,-50%);
      filter:drop-shadow(0 0 10px rgba(255,230,50,0.9));
      animation:bolt-flash 0.22s ease-in-out ${(i * 0.037).toFixed(3)}s infinite alternate;
    `;
    document.body.appendChild(rb);
  }

  shockTimeout = setTimeout(() => {
    bolt.remove();
    document.querySelectorAll('.shock-bolt-ring').forEach(b => b.remove());
    shockTimeout = null;
    shockActive  = false;
    endGame();
  }, 3000);
}

// Returns the first jellyfish whose body the dragged fish overlaps, or null.
// The element's CSS layout box covers the dome + arms/tentacles but naturally
// excludes the pulsing aura (which overflows outside the CSS layout box).
function hitsJellyfish() {
  if (!dragState) return null;
  const dr = dragState.el.getBoundingClientRect();
  for (const jelly of document.querySelectorAll('.jellyfish')) {
    const jr = jelly.getBoundingClientRect();
    if (dr.right > jr.left && dr.left < jr.right &&
        dr.bottom > jr.top  && dr.top  < jr.bottom) return jelly;
  }
  return null;
}

function onFishRelease() {
  if (!dragState || shockActive) return;
  const twin = findTwin();
  if (twin) {
    handleMatch(dragState.el, twin);
  } else {
    // No match — restore swim animation (fish swims away from start)
    const el = dragState.el;
    el.style.animation = '';
    el.style.left      = '';
    el.style.top       = '';
    el.style.transform = '';
    el.style.zIndex    = '';
    el.classList.remove('dragging');
  }
  dragState = null;
}

function findTwin() {
  if (!dragState) return null;
  const { el, species, scheme } = dragState;
  const dr = el.getBoundingClientRect();
  const candidates = document.querySelectorAll(
    `.creature[data-species="${species}"][data-scheme="${scheme}"]`
  );
  for (const c of candidates) {
    if (c === el || c.classList.contains('matched')) continue;
    const cr = c.getBoundingClientRect();
    // Require 25% overlap of the smaller fish's area
    const iw = Math.min(dr.right, cr.right)   - Math.max(dr.left, cr.left);
    const ih = Math.min(dr.bottom, cr.bottom)  - Math.max(dr.top,  cr.top);
    if (iw <= 0 || ih <= 0) continue;
    const smaller = Math.min((dr.right-dr.left)*(dr.bottom-dr.top),
                             (cr.right-cr.left)*(cr.bottom-cr.top));
    if (iw * ih >= smaller * 0.25) return c;
  }
  return null;
}

function handleMatch(a, b) {
  score += 1;
  scoreEl.textContent = score;
  if (score > best) {
    best = score;
    bestEl.textContent = best;
    localStorage.setItem(STORAGE_KEY, best);
  }
  const ar = a.getBoundingClientRect();
  showPopup(ar.left + ar.width / 2 - 28, ar.top - 10, '✦ Match! +1');
  spawnRipple(ar.left + ar.width / 2, ar.top + ar.height / 2);

  [a, b].forEach(el => {
    el.style.animation = '';
    el.style.left = ''; el.style.top = '';
    el.style.transform = ''; el.style.zIndex = '';
    el.classList.remove('dragging');
    el.classList.add('matched');
    el.addEventListener('animationend', () => {
      // Return fish to its normal swim cycle
      el.classList.remove('matched');
    }, { once: true });
  });
}

// Attach grab listeners to all draggable fish
document.querySelectorAll('.fish').forEach(el => {
  el.addEventListener('mousedown',  onFishGrab, { passive: false });
  el.addEventListener('touchstart', onFishGrab, { passive: false });
});

// Global move/release (so drag works even when finger leaves the fish)
document.addEventListener('mousemove',   onFishMove,    { passive: false });
document.addEventListener('touchmove',   onFishMove,    { passive: false });
document.addEventListener('mouseup',     onFishRelease);
document.addEventListener('touchend',    onFishRelease);
document.addEventListener('touchcancel', onFishRelease);

// ── Game over ─────────────────────────────────────────────
function endGame() {
  if (!dragState) return;

  // Release the dragged fish back to its swim
  const el = dragState.el;
  el.style.animation = '';
  el.style.left = ''; el.style.top = '';
  el.style.transform = ''; el.style.zIndex = '';
  el.classList.remove('dragging', 'zapped');
  dragState = null;

  // Show overlay
  document.getElementById('final-score').textContent = score;
  document.getElementById('final-best').textContent  = best;
  document.getElementById('game-over').classList.remove('hidden');
}

function restartGame() {
  // Clear any pending shock timer
  if (shockTimeout) { clearTimeout(shockTimeout); shockTimeout = null; }
  shockActive = false;

  // Unfreeze the jellyfish that caused the collision
  if (frozenJelly) {
    frozenJelly.style.animationPlayState = '';
    frozenJelly = null;
  }

  score      = 0;
  crabDelay  = 0;
  scoreEl.textContent = 0;
  dragState  = null;

  // Restore all fish to their CSS swim animations
  document.querySelectorAll('.fish').forEach(el => {
    el.classList.remove('dragging', 'matched', 'zapped');
    el.style.cssText = '';
  });

  // Clean up any lingering crab and restart its spawn cycle
  const activeCrab = document.querySelector('.crab-creature');
  if (activeCrab) activeCrab.remove();
  crabActive = false;
  scheduleCrab();

  document.getElementById('game-over').classList.add('hidden');
}

document.getElementById('play-again-btn')
  .addEventListener('click', restartGame);

// ── Splash screen ─────────────────────────────────────────
function startGame() {
  gameStarted = true;
  document.getElementById('splash').classList.add('hidden');
  scheduleCrab();
}

document.getElementById('start-btn').addEventListener('click', startGame);

// ── Water ripple on tap ───────────────────────────────────
function spawnRipple(x, y) {
  const el = document.createElement('div');
  el.style.cssText = `
    position:absolute;
    left:${x}px; top:${y}px;
    width:10px; height:10px;
    margin:-5px;
    border-radius:50%;
    border:2px solid rgba(100,200,255,0.7);
    pointer-events:none;
    z-index:15;
    animation:ripple-out 0.6s ease-out forwards;
  `;
  document.getElementById('ocean').appendChild(el);

  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = `@keyframes ripple-out {
      0%   { transform:scale(0); opacity:1; }
      100% { transform:scale(6); opacity:0; }
    }`;
    document.head.appendChild(s);
  }

  el.addEventListener('animationend', () => el.remove());
}

document.getElementById('ocean').addEventListener('click', e => {
  if (!e.target.classList.contains('creature') && !e.target.closest('.creature')) {
    spawnRipple(e.clientX, e.clientY);
  }
});
