// Scroll reveal
const els = document.querySelectorAll('.rv');
const obs = new IntersectionObserver(entries => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => {
        e.target.classList.add('in');
        obs.unobserve(e.target);
      }, i * 40);
    }
  });
}, { threshold: 0.06 });
els.forEach(el => obs.observe(el));

// Splash click → fade out
const splashLink = document.querySelector('.splash-link');
if (splashLink) {
  splashLink.addEventListener('click', e => {
    e.preventDefault();
    const sp = splashLink.closest('.splash-page');
    sp.style.transition = 'opacity 0.5s ease';
    sp.style.opacity = '0';
    setTimeout(() => { window.location.href = 'index.html'; }, 500);
  });
}

// 360° viewer — mouse X position across viewer = rotation angle
(function() {
  const v = document.getElementById('ph360');
  if (!v) return;
  const img = v.querySelector('.ph-360-img');
  const total = parseInt(v.dataset.frames, 10) || 12;
  const src = v.dataset.src;
  const pad = n => String(n * 30).padStart(3, '0');
  const frames = Array.from({length: total}, (_, i) => `${src}${pad(i)}.jpg`);
  frames.forEach(f => { const im = new Image(); im.src = f; });
  let current = -1;
  const setFrame = f => {
    const n = ((f % total) + total) % total;
    if (n === current) return;
    current = n;
    img.src = frames[n];
  };
  const handle = e => {
    const rect = v.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const pct = Math.max(0, Math.min(1, x / rect.width));
    setFrame(Math.floor(pct * total));
  };
  v.addEventListener('mousemove', handle);
  v.addEventListener('touchstart', handle, { passive: true });
  v.addEventListener('touchmove', handle, { passive: true });
})();

// Product hero carousel
(function() {
  const slides = document.querySelectorAll('.ph-slide');
  if (!slides.length) return;
  let idx = 0;
  const go = n => {
    idx = (n + slides.length) % slides.length;
    slides.forEach((s, i) => s.classList.toggle('active', i === idx));
  };
  const prev = document.querySelector('.ph-prev');
  const next = document.querySelector('.ph-next');
  if (prev) prev.addEventListener('click', () => go(idx - 1));
  if (next) next.addEventListener('click', () => go(idx + 1));
})();

// FAQ toggle
document.querySelectorAll('.fq').forEach(fq => {
  const q = fq.querySelector('.fq-q');
  if (q) q.addEventListener('click', () => fq.classList.toggle('open'));
});

// Nav devient opaque au scroll (pages avec hero plein écran)
const navOver = document.querySelector('nav.nav-over');
if (navOver) {
  const onScroll = () => {
    navOver.classList.toggle('nav-solid', window.scrollY > 60);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// Hamburger menu
const burger = document.getElementById('navBurger');
if (burger) {
  burger.addEventListener('click', () => {
    burger.closest('nav').classList.toggle('open');
  });
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.addEventListener('click', () => burger.closest('nav').classList.remove('open'));
  });
}
