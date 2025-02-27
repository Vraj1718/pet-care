// Initialize Swiper
const initializeSlider = () => {
  return new Swiper('.tranding-slider', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 'auto',
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
};


// Initialize slider and setup mobile navigation when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const slider = initializeSlider();
  setupMobileNavigation();
  setupForms();
});

// Mobile Navigation Setup
function setupMobileNavigation() {
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (mobileNavToggle && navLinks) {
    mobileNavToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      mobileNavToggle.classList.toggle('active');
    });
  }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const slider = initializeSlider();
});

document.addEventListener('DOMContentLoaded', function () {
  const loginForm = document.querySelector('.form-box.login');
  const registerForm = document.querySelector('.form-box.register');
  const showRegisterLink = document.getElementById('showRegister');
  const showLoginLink = document.getElementById('showLogin');

  function showRegister() {
    loginForm.classList.remove('active');
    registerForm.classList.add('active');
  }

  function showLogin() {
    registerForm.classList.remove('active');
    loginForm.classList.add('active');
  }

  showRegisterLink.addEventListener('click', function (e) {
    e.preventDefault();
    showRegister();
  });

  showLoginLink.addEventListener('click', function (e) {
    e.preventDefault();
    showLogin();
  });

  // Form submission handlers (for demonstration purposes)
  document.getElementById('loginForm').addEventListener('submit', function (e) {
    e.preventDefault();
    alert('Login functionality would be implemented here.');
  });

  document
    .getElementById('registerForm')
    .addEventListener('submit', function (e) {
      e.preventDefault();
      alert('Registration functionality would be implemented here.');
    });
});

