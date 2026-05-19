// Generic slider system
var sliderState = {
  dormi: { idx: 0 },
  poliz: { idx: 0 },
  gemini: { idx: 0 }
};

function slideDir(id, dir) {
  var track = document.getElementById('track-' + id);
  var slides = track.querySelectorAll('.slide');
  var total = slides.length;
  sliderState[id].idx = (sliderState[id].idx + dir + total) % total;
  track.style.transform = 'translateX(-' + (sliderState[id].idx * 100) + '%)';
  updateDots(id, sliderState[id].idx);
}

function goTo(id, i) {
  sliderState[id].idx = i;
  document.getElementById('track-' + id).style.transform = 'translateX(-' + (i * 100) + '%)';
  updateDots(id, i);
}

function updateDots(id, active) {
  var dotsEl = document.getElementById('dots-' + id);
  if (!dotsEl) return;
  dotsEl.querySelectorAll('.dot').forEach(function (d, i) {
    d.classList.toggle('active', i === active);
  });
}

// DormiSpace tab switcher
var dormiImages = {
  app: [
    'assets/dormispace/dormi1.png','assets/dormispace/dormi2.png','assets/dormispace/dormi3.png',
    'assets/dormispace/dormi4.png','assets/dormispace/dormi5.png','assets/dormispace/dormi6.png',
    'assets/dormispace/dormi7.png','assets/dormispace/dormi8.png'
  ],
  func: ['assets/dormispace/func.jpg'],
  erd: ['assets/dormispace/erd.jpg']
};
var dormiCurrentTab = 'app';

function renderDormiSlides() {
  var track = document.getElementById('track-dormi');
  var images = dormiImages[dormiCurrentTab];
  track.innerHTML = images.map(function (src, i) {
    return '<div class="slide"><img src="' + src + '" alt="DormiSpace screen ' + (i + 1) + '"></div>';
  }).join('');
  sliderState.dormi.idx = 0;
  track.style.transform = 'translateX(0%)';
  updateDots('dormi', 0);
  // rebuild dots to match new count
  var dotsEl = document.getElementById('dots-dormi');
  dotsEl.innerHTML = '';
  images.forEach(function (_, i) {
    var dot = document.createElement('button');
    dot.className = 'dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Show DormiSpace image ' + (i + 1));
    dot.onclick = (function (index) { return function () { goTo('dormi', index); }; })(i);
    dotsEl.appendChild(dot);
  });
}

function switchDormiTab(tab, btn) {
  var bar = btn.closest('.media-tab-bar');
  bar.querySelectorAll('.media-tab').forEach(function (t) { t.classList.remove('active'); });
  btn.classList.add('active');
  dormiCurrentTab = tab;
  renderDormiSlides();
}

renderDormiSlides();