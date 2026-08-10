// =========================================================
// Год в футере
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();

// =========================================================
// Скролл: фон навбара + активная ссылка
// =========================================================
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

function onScroll(){
  nav.classList.toggle('is-scrolled', window.scrollY > 10);

  let currentId = '';
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    if (rect.top <= 120 && rect.bottom >= 120){
      currentId = section.id;
    }
  });

  navLinks.forEach(link => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
}
document.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// =========================================================
// Мобильное меню
// =========================================================
const burger = document.getElementById('navBurger');
const navLinksWrap = document.getElementById('navLinks');

burger.addEventListener('click', () => {
  const isOpen = navLinksWrap.classList.toggle('is-open');
  burger.classList.toggle('is-open', isOpen);
  burger.setAttribute('aria-expanded', String(isOpen));
});

navLinksWrap.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinksWrap.classList.remove('is-open');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Плавное появление секций при скролле
// =========================================================
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting){
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.section').forEach(section => {
  revealObserver.observe(section);
});

// =========================================================
// Переключение категорий меню (Кофе / Чай / Выпечка)
// =========================================================
const tabs = document.querySelectorAll('.board__tab');
const menuItems = document.querySelectorAll('.menu-item');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    const category = tab.dataset.category;

    tabs.forEach(t => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });

    menuItems.forEach(item => {
      item.hidden = item.dataset.cat !== category;
    });
  });
});