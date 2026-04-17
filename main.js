document.addEventListener('DOMContentLoaded', function() {
    console.log('🎉 High End Clinic Loaded Successfully!');

    initLoader();
    initNavbar();
    initHeroAnimations();
    initScrollAnimations();
    initServiceCards();
    initGalleryTilt();
    initContactForm();
    initParticles();
    initDoctorImage();
    initCounterAnimation();
    initTypingEffect();
});

function initLoader() {
    const loader = document.getElementById('loader');
    
    // Simulate loading
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 2000);

    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const src = img.src;
        const preloadImg = new Image();
        preloadImg.src = src;
    });
}


function initHeroAnimations() {

    const chars = document.querySelectorAll('.char');
    chars.forEach((char, index) => {
        setTimeout(() => {
            char.style.opacity = '1';
            char.style.transform = 'translateY(0)';
            char.style.transition = `all 0.6s ${index * 0.1}s cubic-bezier(0.175, 0.885, 0.32, 1.275)`;
        }, 1000 + index * 80);
    });
    
    const heroText = document.querySelector('.hero p');
    setTimeout(() => {
        heroText.style.opacity = '1';
        heroText.style.transform = 'translateY(0)';
    }, 2200);

    const heroButtons = document.querySelectorAll('.hero-buttons .btn-primary, .hero-buttons .btn-secondary');
    heroButtons.forEach((btn, index) => {
        setTimeout(() => {
            btn.style.opacity = '1';
            btn.style.transform = 'translateY(0) scale(1)';
        }, 2500 + index * 200);
    });
}

function initScrollAnimations() {
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        easing: 'ease-out-cubic'
    });
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.service-card, .about-text, .about-image, .contact-info, .contact-form').forEach(el => {
        observer.observe(el);
    });
}

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {

        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
        });
        
    });
}

function initGalleryTilt() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach((item) => {
        item.addEventListener('mousemove', (e) => {
            const rect = item.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 8;
            const rotateY = (centerX - x) / 8;
            
            item.style.transform = `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.transform = 'perspective(1200px) rotateX(0) rotateY(0) scale(1)';
        });
    });
}

const form = document.querySelector('.contact-form');

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const btn = form.querySelector('button[type="submit"]');

  btn.innerHTML = "جاري الإرسال...";
  btn.disabled = true;

  try {
    const res = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    // ❌ نشيل json تمامًا

    if (res.ok) {
      showSuccessMessage();
      form.reset();
    } else {
      alert("حصل خطأ في الإرسال");
    }

  } catch (err) {
    console.log(err);
    alert("مشكلة في الاتصال");

  } finally {
    btn.innerHTML = "إرسال";
    btn.disabled = false;
  }
});

function initParticles() {
    const particlesContainer = document.querySelector('.hero-particles');
    
    function createParticle() {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDuration = (Math.random() * 3 + 4) + 's';
        particle.style.animationDelay = Math.random() * 2 + 's';
        particlesContainer.appendChild(particle);
        
        setTimeout(() => {
            particle.remove();
        }, 8000);
    }
    
    setInterval(createParticle, 1000);
}

function initDoctorImage() {
    const doctorImg = document.getElementById('doctor-img');
    const imageContainer = doctorImg.closest('.image-container');
    
    imageContainer.addEventListener('mousemove', (e) => {
        const rect = imageContainer.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        doctorImg.style.transform = `translate(${x/20}px, ${y/20}px) scale(1.05)`;
    });
    
    imageContainer.addEventListener('mouseleave', () => {
        doctorImg.style.transform = 'translate(0, 0) scale(1)';
    });
}

function initCounterAnimation() {
    const counters = document.querySelectorAll('.counter');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    animateCounter(counter);
                });
                observer.unobserve(entry.target);
            }
        });
    });
    
    const aboutSection = document.getElementById('about');
    if (aboutSection) observer.observe(aboutSection);
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target'));
    const increment = target / 50;
    let current = 0;
    
    const updateCounter = () => {
        if (current < target) {
            current += increment;
            counter.textContent = Math.floor(current) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            counter.textContent = target + '+';
        }
    };
    updateCounter();
}

function initTypingEffect() {
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        const text = title.textContent;
        title.innerHTML = '';
        title.style.overflow = 'hidden';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                title.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    typeWriter();
                    observer.unobserve(entry.target);
                }
            });
        });
        observer.observe(title);
    });
}

function createRipple(element, event) {
    const circle = document.createElement('span');
    const diameter = Math.max(element.clientWidth, element.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - element.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - element.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = element.getElementsByClassName('ripple')[0];
    if (ripple) ripple.remove();

    element.appendChild(circle);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

const cursor = document.createElement('div');
cursor.className = 'cursor';
document.body.appendChild(cursor);

document.addEventListener('mousemove', (e) => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
});

document.querySelectorAll('a, button, .service-card').forEach(el => {
    el.addEventListener('mouseenter', () => cursor.classList.add('hover'));
    el.addEventListener('mouseleave', () => cursor.classList.remove('hover'));
});

function initNavbar() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        const current = window.scrollY;

        if (current > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

const menu = document.getElementById("menuToggle");
if (menu) {
    menu.addEventListener("click", () => {
        document.getElementById("navLinks").classList.toggle("active");
    });
}

function initGallery() {
    const galleryImages = document.querySelectorAll('.gallery-img');
    
    galleryImages.forEach((img, index) => {
        img.addEventListener('click', () => {
            openLightbox(img.src, index);
        });
    });
}

function openLightbox(src, index) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <img src="${src}" alt="gallery image">
            <button class="lightbox-close" aria-label="Close">&times;</button>
            <button class="lightbox-prev" aria-label="Previous">&#10094;</button>
            <button class="lightbox-next" aria-label="Next">&#10095;</button>
        </div>
    `;
    document.body.appendChild(lightbox);
    
    const closeBtn = lightbox.querySelector('.lightbox-close');
    closeBtn.addEventListener('click', () => lightbox.remove());
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) lightbox.remove();
    });
}

initGallery();