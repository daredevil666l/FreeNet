/*
  FreeNet — онбординг + офлайн‑карта Уфы
  Что добавлено:
  - Регистрация service worker (офлайн‑кеш)
  - Режимы: onboarding (по умолчанию) и mapView (в standalone)
  - Leaflet карта, маркеры из переданных координат (вход: [lon,lat] → Leaflet: [lat,lon])
  - Тонкое кеширование тайлов (stale‑while‑revalidate) + ограниченный предпрогрев окрестности Уфы
*/

const qs = (sel, root = document) => root.querySelector(sel);
const qsa = (sel, root = document) => [...root.querySelectorAll(sel)];

const state = {
  deferredPrompt: null,
  currentStep: 0,
  map: null,
};

// ДАННЫЕ ТОЧЕК (ваш массив)
const internet = [[55.945472, 54.732598], [55.953204, 54.713031], [55.954729, 54.718659], [55.928454, 54.720758], [55.944400, 54.719304], [55.949871, 54.740612], [55.950230, 54.740870], [56.035764, 54.805637], [56.035764, 54.805637], [56.035764, 54.805637], [56.036718, 54.806029], [56.035764, 54.805637], [55.830441, 54.703215], [56.022061, 54.775491], [55.972770, 54.736447], [55.971441, 54.737843], [56.059353, 54.772961], [56.059466, 54.773139], [56.059559, 54.773003], [56.062602, 54.773407], [56.062602, 54.773407], [56.058560, 54.772096], [55.924017, 54.716733], [55.935595, 54.714391], [55.927183, 54.716133], [55.935595, 54.714391], [55.934750, 54.714733], [55.935595, 54.714391], [55.925883, 54.716600], [55.935595, 54.714391], [55.935595, 54.714391], [55.935595, 54.714391], [55.935595, 54.714391], [55.928400, 54.715467], [55.935595, 54.714391], [55.933120, 54.714760], [55.922733, 54.717267], [55.935595, 54.714391], [55.931567, 54.714867], [55.935595, 54.714391], [55.935595, 54.714391], [55.935595, 54.714391], [56.130179, 54.778305], [56.013399, 54.721999], [55.987626, 54.697771], [56.078769, 54.777666], [56.081841, 54.768214], [55.996402, 54.751741], [56.072337, 54.774156], [56.124978, 54.777355], [56.067208, 54.764381], [56.127655, 54.774774], [55.989485, 54.719368], [56.048056, 54.763794], [56.068375, 54.771175], [55.990447, 54.753259], [56.073954, 54.769347], [56.059859, 54.763586], [55.998621, 54.711879], [56.067702, 54.774592], [55.991183, 54.693681], [56.070819, 54.768999], [56.081841, 54.768214], [56.077772, 54.776051], [55.992019, 54.723054], [55.983556, 54.705044], [56.130386, 54.777298], [56.124978, 54.777355], [56.137986, 54.782838], [56.130494, 54.778918], [56.114719, 54.780891], [56.022831, 54.747361], [55.996025, 54.702916], [56.068492, 54.763332], [56.076586, 54.771834], [56.050786, 54.760709], [56.061324, 54.767763], [56.075158, 54.77641], [56.067621, 54.761], [56.077547, 54.770728], [56.049924, 54.767461], [56.083871, 54.773958], [56.074161, 54.778429], [56.079002, 54.774364], [56.009105, 54.719331], [56.079973, 54.823885], [56.006257, 54.707156], [56.006868, 54.704872], [56.00331, 54.707957], [56.006904, 54.726003], [56.016516, 54.766236], [56.005179, 54.750224], [56.005242, 54.696017], [56.00623, 54.698577], [55.994453, 54.699847], [55.998352, 54.703821], [56.056068, 54.764049], [55.992576, 54.703114], [56.013399, 54.721999], [55.995172, 54.710693], [56.120999, 54.776944], [55.996681, 54.701335], [56.064477, 54.766848], [56.053814, 54.768827], [56.077457, 54.76595], [56.069301, 54.773252], [56.007407, 54.705533], [55.917857, 54.674606], [55.917857, 54.674606], [55.917857, 54.674606], [55.825098, 54.705242], [55.997098, 54.725348], [55.997098, 54.725348], [55.997098, 54.725348], [55.997098, 54.725348], [55.918516, 54.675507], [56.081868, 54.771538], [56.000103, 54.757269], [55.98146, 54.735315], [56.026918, 54.741416], [55.884307, 54.564866], [55.901747, 54.569852], [55.963371, 54.714588], [55.954065, 54.717444], [56.067297, 54.815218], [56.006203, 54.712149], [55.832613, 54.70224], [56.131141, 54.788564], [56.123532, 54.787671], [56.040366, 54.785169], [56.107138, 54.820955], [56.021025, 54.780288], [55.967836, 54.735163], [55.949187, 54.726158], [55.997651, 54.738604], [56.087042, 54.817578], [55.962015, 54.733047], [55.994552, 54.70816], [55.946681, 54.729985], [56.011404, 54.758168], [56.002017, 54.711156], [55.938982, 54.731482], [55.937958, 54.73117], [56.007245, 54.708305], [55.928795, 54.721052], [55.993851, 54.711385], [55.826845, 54.712846], [56.02878, 54.752001], [55.946267, 54.72293], [56.022265, 54.761638], [55.924892, 54.724921], [56.087402, 54.814362], [56.021025, 54.780288], [55.994309, 54.710215], [55.96868, 54.740667], [55.959239, 54.742554], [56.067297, 54.815218], [55.959159, 54.71863], [55.951172, 54.733026], [55.993204, 54.745906], [56.00976, 54.716871], [55.9406, 54.7186], [56.073047, 54.813858], [55.952511, 54.721349], [56.030422, 54.781218], [56.059599, 54.770162], [55.912518, 54.670259], [55.8382, 54.711582], [55.942297, 54.724931], [56.031557, 54.777412], [56.031276, 54.776315], [55.967517, 54.74076], [55.942297, 54.724931], [56.015935, 54.767879], [55.918114, 54.672195], [55.842912, 54.70389], [56.05287, 54.766734], [56.140616, 54.791755], [56.011575, 54.76394], [56.00745, 54.716642], [55.934086, 54.733317], [56.011582, 54.753233], [55.836341, 54.704113], [55.982095, 54.697631], [55.946267, 54.722930], [55.956347, 54.734513], [55.959841, 54.733832], [55.959841, 54.733832], [55.959473, 54.735719], [55.956329, 54.738058], [55.959280, 54.736944], [55.960173, 54.738942], [55.959293, 54.740501], [55.986135, 54.751237], [55.994829, 54.758924], [56.019893, 54.766100], [56.114567, 54.779598], [56.114567, 54.779598], [56.126245, 54.781311], [56.058790, 54.821484], [56.059770, 54.822246], [56.071906, 54.818942], [56.072831, 54.817697], [56.116651, 54.804394], [56.116651, 54.804394], [55.955143, 54.738838], [56.110144, 54.622777], [55.994685, 54.761231], [55.852914, 54.697635], [55.996959, 54.687572]];

// Утилиты
function isStandalone() {
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}

function swapToMapView() {
  qs('#onboarding').hidden = true;
  qs('#mapView').hidden = false;
}

// Служебное: год в подвале
qs('#year').textContent = new Date().getFullYear();

// Показ кнопки «Открыть приложение», если уже standalone
if (isStandalone()) {
  swapToMapView();
}

// beforeinstallprompt (Chrome/Android)
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  state.deferredPrompt = e;
  qs('#installBtn').hidden = false;
});

qs('#howBtn').addEventListener('click', () => qs('#overlay').hidden = false);
qs('#overlay .close').addEventListener('click', () => qs('#overlay').hidden = true);

const openAppBtn = qs('#openAppBtn');
if (openAppBtn) {
  openAppBtn.hidden = isStandalone();
  openAppBtn.addEventListener('click', () => swapToMapView());
}

qs('#installBtn').addEventListener('click', async () => {
  const prompt = state.deferredPrompt;
  if (!prompt) { qs('#overlay').hidden = false; return; }
  prompt.prompt();
  const { outcome } = await prompt.userChoice;
  if (outcome === 'accepted') {
    qs('#installState').hidden = false;
  }
  state.deferredPrompt = null;
  qs('#installBtn').hidden = true;
});

// Табы и степпер (как раньше)
const tabs = qsa('.tab');
const panels = qsa('.stepper');

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    panels.forEach(p => p.classList.remove('active'));
    const target = qs(tab.dataset.target);
    target.classList.add('active');

    state.currentStep = 0;
    renderDots();
    updateSteps();
  });
});

const controls = { prev: qs('.controls .prev'), next: qs('.controls .next'), dots: qs('.controls .dots') };
function activePanel() { return qs('.stepper.active'); }
function steps() { return qsa('.step', activePanel()); }
function renderDots() {
  const count = steps().length;
  controls.dots.innerHTML = '';
  for (let i = 0; i < count; i++) {
    const b = document.createElement('button');
    b.setAttribute('aria-label', `Шаг ${i + 1}`);
    if (i === state.currentStep) b.classList.add('active');
    b.addEventListener('click', () => { state.currentStep = i; updateSteps(); });
    controls.dots.appendChild(b);
  }
}
function updateSteps() {
  const $steps = steps();
  const max = $steps.length - 1;
  state.currentStep = Math.min(Math.max(0, state.currentStep), max);
  $steps.forEach((el, idx) => { el.style.display = idx === state.currentStep ? 'grid' : 'none'; });
  qsa('.dots button', controls.dots).forEach((b, idx) => b.classList.toggle('active', idx === state.currentStep));
}
controls.prev.addEventListener('click', () => { state.currentStep--; updateSteps(); });
controls.next.addEventListener('click', () => { state.currentStep++; updateSteps(); });
let autoplay = setInterval(() => { state.currentStep++; updateSteps(); }, 3800);
['click','touchstart','keydown','pointerdown'].forEach(evt => { window.addEventListener(evt, () => { clearInterval(autoplay); autoplay = null; }, { once: true }); });
renderDots();
updateSteps();

// ===== Карта (Leaflet) =====
const UFA_CENTER = [54.734773, 55.957828]; // центр Уфы (lat, lon)

function dedupeAndSwap(arr) {
  const seen = new Set();
  const res = [];
  for (const [lon, lat] of arr) {
    const key = `${lat.toFixed(6)},${lon.toFixed(6)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    res.push([lat, lon]);
  }
  return res;
}

function initMap() {
  if (state.map) return; // уже инициализирована
  state.map = L.map('map', { zoomControl: false }).setView(UFA_CENTER, 12);

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
  }).addTo(state.map);

  // Свой минималистичный зум (в стиле iOS)
  L.control.zoom({ position: 'bottomright' }).addTo(state.map);

  const pts = dedupeAndSwap(internet);
  const group = L.featureGroup();
  pts.forEach(([lat, lon]) => {
    L.circleMarker([lat, lon], {
      radius: 6,
      weight: 2,
      opacity: 0.9,
      fillOpacity: 0.7
    }).addTo(group);
  });
  group.addTo(state.map);

  try { state.map.fitBounds(group.getBounds().pad(0.15)); } catch (_) {}

  // Лёгкий предпрогрев тайлов вокруг центра (неагрессивно)
  warmupTiles(state.map, 12, 13);
}

function warmupTiles(map, ...zooms) {
  if (!('serviceWorker' in navigator)) return;
  const bounds = map.getBounds();
  // чуть расширим
  const b = bounds.pad(0.3);
  for (const z of zooms) {
    const urls = tileUrlsForBounds(b, z);
    // Небольшая задержка, чтобы не мешать UI
    setTimeout(() => urls.slice(0, 60).forEach(u => fetch(u).catch(() => {})), 500);
  }
}

function tileUrlsForBounds(bounds, z) {
  // Помощники конвертации (Spherical Mercator)
  const lon2x = (lon) => Math.floor((lon + 180) / 360 * Math.pow(2, z));
  const lat2y = (lat) => {
    const r = Math.log(Math.tan(Math.PI / 4 + (lat * Math.PI / 180) / 2));
    return Math.floor((1 - r / Math.PI) / 2 * Math.pow(2, z));
  };
  const minX = lon2x(bounds.getWest());
  const maxX = lon2x(bounds.getEast());
  const minY = lat2y(bounds.getNorth());
  const maxY = lat2y(bounds.getSouth());
  const urls = [];
  for (let x = minX; x <= maxX; x++) {
    for (let y = minY; y <= maxY; y++) {
      urls.push(`https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`);
      urls.push(`https://b.tile.openstreetmap.org/${z}/${x}/${y}.png`);
      urls.push(`https://c.tile.openstreetmap.org/${z}/${x}/${y}.png`);
    }
  }
  return urls;
}

// Переход к карте, когда приложение запущено как standalone
window.addEventListener('DOMContentLoaded', () => {
  if (isStandalone()) {
    swapToMapView();
    initMap();
  }
});

// Если пользователь нажал «Открыть приложение»
if (!isStandalone()) {
  qs('#openAppBtn')?.addEventListener('click', () => {
    initMap();
  });
}

// ===== Service Worker =====
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-work.js').catch(console.error);
  });
}