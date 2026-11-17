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


  // Sections that drive the active nav link. A section can borrow another
  // link via data-nav (e.g. the "visit" block counts as Gallery).
  const sections = document.querySelectorAll('section[id], footer[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const highlightNav = () => {

    let current = sections[0].dataset.nav || sections[0].id;

    const offset = 140;

    sections.forEach(section => {

      const top = section.offsetTop - offset;

      if (window.scrollY >= top) {
        current = section.dataset.nav || section.id;
      }

    });

    // at the very bottom of the page, the footer (Contact) is active
    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
      current = 'contact';
    }

    navLinks.forEach(link => {

      link.classList.toggle(
        'active',
        link.getAttribute('href') === `#${current}`
      );

    });

  };

  window.addEventListener('scroll', highlightNav, { passive: true });
  window.addEventListener('resize', highlightNav);

  highlightNav();

  // close the mobile menu if the screen grows to desktop size
  window.addEventListener('resize', () => {
    if (window.innerWidth > 760) {
      mainNav.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });


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