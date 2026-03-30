'use strict';

/* ---------- SCROLL ANIMATIONS ---------- */

/*Observa los elementos con clase .fade-up y les agrega la clase .visible cuando entran al viewport.*/
function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-up');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

/* ---------- SMOOTH SCROLL ---------- */

/**
 * Intercepta los clicks en links internos (#seccion)
 * y hace scroll suave hacia el destino.
 */
function initSmoothScroll() {
  const internalLinks = document.querySelectorAll('a[href^="#"]');

  internalLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

/* ---------- NAVBAR SCROLL EFFECT ---------- */

/**
 * Agrega una clase a la navbar cuando el usuario
 * hace scroll, para reforzar el fondo.
 */
function initNavbarScroll() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;

  const SCROLL_THRESHOLD = 50;

  window.addEventListener('scroll', () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      navbar.classList.add('navbar--scrolled');
    } else {
      navbar.classList.remove('navbar--scrolled');
    }
  });
}


/**
 * Efecto de entrada escalonada para los items del stack
 * cuando su sección se hace visible.
 */
function initStackAnimation() {
  const stackItems = document.querySelectorAll('.stack-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          stackItems.forEach((item, index) => {
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'translateY(0)';
            }, index * 40);
          });
          observer.disconnect();
        }
      });
    },
    { threshold: 0.2 }
  );

  const stackGrid = document.querySelector('.stack-grid');
  if (stackGrid) {
    stackItems.forEach((item) => {
      item.style.opacity = '0';
      item.style.transform = 'translateY(12px)';
      item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
    });
    observer.observe(stackGrid);
  }
}

/**
 * Actualiza automáticamente el año en el footer.
 */
function initFooterYear() {
  const footerLeft = document.querySelector('.footer-left');
  if (!footerLeft) return;

  const currentYear = new Date().getFullYear();
  footerLeft.textContent = `© ${currentYear} Sofía Gajardo — Full Stack Developer`;
}

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initSmoothScroll();
  initNavbarScroll();
  initStackAnimation();
  initFooterYear();
});