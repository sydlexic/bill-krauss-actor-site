document.getElementById('year').textContent = new Date().getFullYear();

const navToggle = document.getElementById('navToggle');
const mainNav = document.getElementById('mainNav');

navToggle.addEventListener('click', () => {
  const open = mainNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', open);
});

mainNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mainNav.classList.remove('open'));
});

const figures = Array.from(document.querySelectorAll('#galleryGrid figure'));
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentIndex = 0;

function showImage(index) {
  currentIndex = (index + figures.length) % figures.length;
  const fig = figures[currentIndex];
  lightboxImg.src = fig.dataset.full;
  lightboxImg.alt = fig.querySelector('img').alt;
  lightboxCaption.textContent = fig.dataset.caption || '';
}

function openLightbox(index) {
  showImage(index);
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  document.body.style.overflow = '';
}

figures.forEach((fig, i) => {
  fig.addEventListener('click', () => openLightbox(i));
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', () => showImage(currentIndex - 1));
lightboxNext.addEventListener('click', () => showImage(currentIndex + 1));

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('open')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') showImage(currentIndex - 1);
  if (e.key === 'ArrowRight') showImage(currentIndex + 1);
});
