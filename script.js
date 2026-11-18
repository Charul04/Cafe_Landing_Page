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

  /* ---------- Menu item popup ---------- */
  // Edit names, descriptions and prices (in ₹) here.
  // "image" is optional — items without one show the emoji instead.
  const foodItems = {
    'espresso': {
      name: 'Espresso',
      image: 'images/espresso.jpg',
      emoji: '☕',
      desc: 'A bold, concentrated shot with a rich golden crema, pulled from freshly ground single-origin beans.',
      note: 'Single shot · Hot',
      price: 79
    },
    'cappuccino': {
      name: 'Cappuccino',
      image: 'images/cappuccino.jpg',
      emoji: '☕',
      desc: 'Espresso topped with silky steamed milk and a thick layer of velvety foam, dusted with cocoa.',
      note: 'Regular · Hot',
      price: 119
    },
    'cafe-latte': {
      name: 'Café Latte',
      image: 'images/cafe-latte.jpg',
      emoji: '☕',
      desc: 'Smooth espresso blended with steamed milk and finished with delicate latte art.',
      note: 'Regular · Hot',
      price: 129
    },
    'iced-latte': {
      name: 'Iced Latte',
      image: 'images/iced-latte.jpg',
      emoji: '🧊',
      desc: 'Bold espresso poured over cold milk and ice, lightly sweetened and swirled to order.',
      note: 'Regular · Cold',
      price: 139
    },
    'cold-coffee': {
      name: 'Cold Coffee',
      image: 'images/cold-coffee.jpg',
      emoji: '🥤',
      desc: 'Creamy, chilled coffee shaken with milk and ice for a refreshing pick-me-up.',
      note: 'Regular · Cold',
      price: 129
    },
    'masala-chai': {
      name: 'Masala Chai',
      image: 'images/masala-chai.jpg',
      emoji: '🫖',
      desc: 'Our classic kadak chai simmered with ginger, cardamom and warming spices, served in a kulhad-style cup.',
      note: 'Regular · Hot',
      price: 59
    },
    'lemon-iced-tea': {
      name: 'Lemon Iced Tea',
      image: 'images/lemon-iced-tea.jpg',
      emoji: '🍋',
      desc: 'Chilled black tea with fresh lemon slices and mint, perfect for a hot afternoon.',
      note: 'Tall glass · Cold',
      price: 99
    },
    'chocolate-cake': {
      name: 'Chocolate Cake',
      image: 'images/chocolate-cake.jpg',
      emoji: '🍫',
      desc: 'Rich, dark cocoa layers with a glossy chocolate ganache and a drizzle of warm sauce.',
      note: '1 slice',
      price: 149
    },
    'red-velvet-cake': {
      name: 'Red Velvet Cake',
      image: 'images/red-velvet-cake.jpg',
      emoji: '❤️',
      desc: 'Soft crimson sponge layered with smooth cream cheese frosting.',
      note: '1 slice',
      price: 159
    },
    'cheesecake': {
      name: 'Cheesecake',
      image: 'images/cheesecake.jpg',
      emoji: '🍰',
      desc: 'Creamy baked cheesecake on a buttery biscuit base, served with fresh berries.',
      note: '1 slice',
      price: 169
    },
    'black-forest': {
      name: 'Black Forest',
      image: 'images/black-forest.jpg',
      emoji: '🍒',
      desc: 'Chocolate sponge, whipped cream and dark chocolate shavings, topped with a cherry.',
      note: '1 slice',
      price: 149
    },
    'butter-croissant': {
      name: 'Butter Croissant',
      image: 'images/butter-croissant.jpg',
      emoji: '🥐',
      desc: 'Flaky, golden layers baked fresh every morning, with a rich buttery centre.',
      note: '1 piece',
      price: 89
    },
    'blueberry-muffin': {
      name: 'Blueberry Muffin',
      image: 'images/blueberry-muffin.jpg',
      emoji: '🫐',
      desc: 'A soft, fluffy muffin bursting with juicy blueberries and a golden crown.',
      note: '1 piece',
      price: 79
    },
    'fudgy-brownie': {
      name: 'Fudgy Brownie',
      image: 'images/fudgy-brownie.jpg',
      emoji: '🍫',
      desc: 'Gooey, fudgy brownie served warm with a scoop of vanilla ice cream and chocolate sauce.',
      note: '1 piece',
      price: 129
    },
    'veg-sandwich': {
      name: 'Veg Sandwich',
      image: 'images/veg-sandwich.jpg',
      emoji: '🥪',
      desc: 'Toasted multigrain bread stuffed with sautéed capsicum, onion, carrot and melted cheese. Served with ketchup.',
      note: '2 triangles',
      price: 99
    },
    'grilled-cheese-sandwich': {
      name: 'Grilled Cheese Sandwich',
      image: 'images/grilled-cheese-sandwich.jpg',
      emoji: '🧀',
      desc: 'Golden, buttery toast with a gooey cheese pull, finished with fresh herbs.',
      note: '2 triangles',
      price: 129
    },
    'choco-chip-cookies': {
      name: 'Choco Chip Cookies',
      image: 'images/choco-chip-cookies.jpg',
      emoji: '🍪',
      desc: 'Soft-centred, crisp-edged cookies loaded with dark chocolate chips, baked fresh daily.',
      note: 'Pack of 3',
      price: 79
    },
    'garlic-bread': {
      name: 'Garlic Bread',
      image: 'images/garlic-bread.jpg',
      emoji: '🥖',
      desc: 'Crusty slices brushed with garlic butter, sprinkled with parmesan and parsley, and toasted till golden.',
      note: '4 slices',
      price: 99
    },
    'french-fries': {
      name: 'French Fries',
      emoji: '🍟',
      desc: 'Crispy golden fries tossed in salt and served hot with ketchup.',
      note: 'Regular',
      price: 89
    },
    'veg-burger': {
      name: 'Veg Burger',
      image: 'images/veg-burger.jpg',
      emoji: '🍔',
      desc: 'A hearty veggie patty with melted cheese, lettuce, tomato, onion and avocado in a toasted multigrain bun.',
      note: '1 burger',
      price: 139
    },
    'pasta': {
      name: 'Pasta',
      emoji: '🍝',
      desc: 'Penne tossed in a rich, creamy sauce with vegetables and herbs.',
      note: 'Serves 1',
      price: 169
    }
  };

  const modal = document.getElementById('foodModal');
  const modalBox = modal.querySelector('.food-modal-box');
  const foodImgWrap = document.getElementById('foodImgWrap');
  const foodImg = document.getElementById('foodImg');
  const foodEmoji = document.getElementById('foodEmoji');
  const foodTitle = document.getElementById('foodTitle');
  const foodDesc = document.getElementById('foodDesc');
  const foodNote = document.getElementById('foodNote');
  const foodPrice = document.getElementById('foodPrice');

  const rupee = new Intl.NumberFormat('en-IN', {
    style: 'currency', currency: 'INR', maximumFractionDigits: 0
  });

  let lastTrigger = null;

  function openFood(key, trigger) {
    const item = foodItems[key];
    if (!item) return;

    lastTrigger = trigger;

    foodTitle.textContent = item.name;
    foodDesc.textContent = item.desc;
    foodNote.textContent = item.note || '';
    foodPrice.textContent = rupee.format(item.price);

    if (item.image) {
      foodImg.src = item.image;
      foodImg.alt = item.name;
      foodImgWrap.classList.remove('no-photo');
    } else {
      foodImg.removeAttribute('src');
      foodImg.alt = '';
      foodEmoji.textContent = item.emoji || '🍽️';
      foodImgWrap.classList.add('no-photo');
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    modalBox.scrollTop = 0;
    modalBox.focus();
  }

  function closeFood() {
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    if (lastTrigger) lastTrigger.focus();
  }

  document.querySelectorAll('.menu-item').forEach(btn => {
    btn.addEventListener('click', () => openFood(btn.dataset.item, btn));
  });

  modal.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', closeFood);
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('open')) return;
    if (e.key === 'Escape') closeFood();
    // keep Tab focus inside the popup
    if (e.key === 'Tab') {
      const focusable = modal.querySelectorAll('button');
      const first = focusable[0], last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }
  });


});
