// ===================================
// NAVIGATION TOGGLE
// ===================================
const navToggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');
const header = document.getElementById('header');

if (navToggle && nav) {
  navToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    navToggle.classList.toggle('active');
  });

  // Close menu when clicking a link
  const navLinks = nav.querySelectorAll('.nav-link');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('active');
      navToggle.classList.remove('active');
    });
  });

  // Close menu when clicking outside
  document.addEventListener('click', (e) => {
    if (!nav.contains(e.target) && !navToggle.contains(e.target)) {
      nav.classList.remove('active');
      navToggle.classList.remove('active');
    }
  });
}

// ===================================
// HEADER SCROLL EFFECT
// ===================================
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (header) {
    if (currentScroll > 100) {
      header.style.padding = '0.5rem 0';
      header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.15)';
    } else {
      header.style.padding = '1rem 0';
      header.style.boxShadow = '0 2px 12px rgba(0, 0, 0, 0.1)';
    }
  }

  lastScroll = currentScroll;
});

// ===================================
// CONTACT FORM HANDLING
// ===================================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);

    console.log('Form submitted:', data);

    // Show success message
    const successMessage = document.createElement('div');
    successMessage.style.cssText = `
      position: fixed;
      top: 100px;
      left: 50%;
      transform: translateX(-50%);
      background: #2d8659;
      color: white;
      padding: 1rem 2rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
      z-index: 10000;
      font-family: 'Archivo', sans-serif;
      font-weight: 600;
      animation: slideDown 0.3s ease;
    `;
    successMessage.textContent = 'Message sent! We\'ll get back to you soon.';

    document.body.appendChild(successMessage);

    // Reset form
    contactForm.reset();

    // Remove message after 4 seconds
    setTimeout(() => {
      successMessage.style.animation = 'slideUp 0.3s ease';
      setTimeout(() => {
        successMessage.remove();
      }, 300);
    }, 4000);
  });
}

// ===================================
// SMOOTH SCROLL FOR ANCHOR LINKS
// ===================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    
    if (href !== '#' && href.length > 1) {
      e.preventDefault();
      const target = document.querySelector(href);
      
      if (target) {
        const headerHeight = header ? header.offsetHeight : 80;
        const targetPosition = target.offsetTop - headerHeight - 20;
        
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }
  });
});

// ===================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ===================================
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = 'fadeInUp 0.6s ease forwards';
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe service cards
document.querySelectorAll('.service-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.animationDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// Observe value cards
document.querySelectorAll('.value-card').forEach((card, index) => {
  card.style.opacity = '0';
  card.style.animationDelay = `${index * 0.1}s`;
  observer.observe(card);
});

// Observe feature items
document.querySelectorAll('.feature-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.animationDelay = `${index * 0.1}s`;
  observer.observe(item);
});

// Observe offering items
document.querySelectorAll('.offering-item').forEach((item, index) => {
  item.style.opacity = '0';
  item.style.animationDelay = `${index * 0.1}s`;
  observer.observe(item);
});

// ===================================
// ADD ANIMATION STYLES
// ===================================
const style = document.createElement('style');
style.textContent = `
  @keyframes slideDown {
    from {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
  }
  
  @keyframes slideUp {
    from {
      transform: translateX(-50%) translateY(0);
      opacity: 1;
    }
    to {
      transform: translateX(-50%) translateY(-100%);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// ===================================
// PHONE NUMBER FORMATTING (OPTIONAL)
// ===================================
const phoneInput = document.getElementById('phone');

if (phoneInput) {
  phoneInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length > 0) {
      if (value.length <= 3) {
        value = value;
      } else if (value.length <= 6) {
        value = value.slice(0, 3) + '-' + value.slice(3);
      } else {
        value = value.slice(0, 3) + '-' + value.slice(3, 6) + '-' + value.slice(6, 10);
      }
    }
    
    e.target.value = value;
  });
}

// ===================================
// LOG PAGE LOAD
// ===================================
console.log('Donaldson Plumbing & Heating website loaded successfully');
console.log('Modern design system active');
