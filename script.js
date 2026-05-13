
// DormiSpace media slider
var dormiImages = {
    app: [
        'assets/dormi1.png',
        'assets/dormi2.png',
        'assets/dormi3.png',
        'assets/dormi4.png',
        'assets/dormi5.png',
        'assets/dormi6.png',
        'assets/dormi7.png'
    ],
    func: ['assets/func.jpg'],
    erd: ['assets/erd.jpg']
};
var dormiIdx = 0;
var dormiCurrentTab = 'app';

function renderDormiSlides() {
    var track = document.getElementById('track-dormi');
    var images = dormiImages[dormiCurrentTab];
    track.innerHTML = images.map(function (src, i) {
        var label = dormiCurrentTab === 'app'
            ? 'DormiSpace App Screen ' + (i + 1) + ' - NEED_PIC'
            : 'DormiSpace ' + dormiCurrentTab + ' - NEED_PIC';
        return '<div class="slide"><img src="' + src + '" alt="' + label + '"></div>';
    }).join('');
    track.style.transform = 'translateX(-' + (dormiIdx * 100) + '%)';
    renderDots('dormi', images.length);
}

function switchDormiTab(tab, btn) {
    var bar = btn.closest('.media-tab-bar');
    bar.querySelectorAll('.media-tab').forEach(function (t) { t.classList.remove('active'); });
    btn.classList.add('active');
    dormiCurrentTab = tab;
    dormiIdx = 0;
    renderDormiSlides();
}

function slideDir(id, dir) {
    var total = dormiImages[dormiCurrentTab].length;
    dormiIdx = (dormiIdx + dir + total) % total;
    document.getElementById('track-' + id).style.transform = 'translateX(-' + (dormiIdx * 100) + '%)';
    updateDots(id, dormiIdx);
}

function goTo(id, i) {
    dormiIdx = i;
    document.getElementById('track-' + id).style.transform = 'translateX(-' + (i * 100) + '%)';
    updateDots(id, i);
}

function renderDots(id, total) {
    var dotsEl = document.getElementById('dots-' + id);
    dotsEl.innerHTML = '';
    for (var i = 0; i < total; i++) {
        var dot = document.createElement('button');
        dot.className = 'dot' + (i === dormiIdx ? ' active' : '');
        dot.setAttribute('aria-label', 'Show DormiSpace image ' + (i + 1));
        dot.onclick = (function (index) { return function () { goTo(id, index); }; })(i);
        dotsEl.appendChild(dot);
    }
}

function updateDots(id, active) {
    var dotsEl = document.getElementById('dots-' + id);
    var dots = dotsEl.querySelectorAll('.dot');
    dots.forEach(function (d, i) { d.classList.toggle('active', i === active); });
}

renderDormiSlides();
