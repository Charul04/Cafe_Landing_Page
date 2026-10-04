document.addEventListener('DOMContentLoaded', () => {

  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');

  navToggle.addEventListener('click', () => {

    const isOpen = mainNav.classList.toggle('open');

    navToggle.classList.toggle('open', isOpen);

    navToggle.setAttribute('aria-expanded', isOpen);
  });


  mainNav.querySelectorAll('.nav-link').forEach(link => {

    link.addEventListener('click', () => {

      mainNav.classList.remove('open');

      navToggle.classList.remove('open');

      navToggle.setAttribute('aria-expanded', 'false');
    });

  });


  const header = document.getElementById('siteHeader');
  const backToTop = document.getElementById('backToTop');

  const onScroll = () => {

    header.classList.toggle(
      'scrolled',
      window.scrollY > 10
    );

    backToTop.classList.toggle(
      'show',
      window.scrollY > 500
    );

  };

  window.addEventListener('scroll', onScroll);


  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {

    let current = sections[0].id;

    const offset = 140;

    sections.forEach(section => {

      const top = section.offsetTop - offset;

      if (window.scrollY >= top) {
        current = section.id;
      }

    });


    navLinks.forEach(link => {

      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );

    });

  };

  window.addEventListener('scroll', highlightNav);

  highlightNav();


  backToTop.addEventListener('click', () => {

    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });

  });


  const form = document.getElementById('newsletterForm');
  const email = document.getElementById('newsletterEmail');
  const msg = document.getElementById('formMsg');

  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


  form.addEventListener('submit', (e) => {

    e.preventDefault();

    const value = email.value.trim();


    if (!value) {

      showMessage(
        'Please enter your email address.',
        true
      );

    } else if (!emailPattern.test(value)) {

      showMessage(
        'That email address doesn’t look right — please check it.',
        true
      );

    } else {

      showMessage(
        'Thanks for subscribing! Check your inbox soon.',
        false
      );

      form.reset();

    }

  });


  function showMessage(text, isError) {

    msg.textContent = text;

    msg.style.color = isError
      ? '#e08a6b'
      : '#d8a24a';

  }

});