/* ============================================
   HIMANSHU RAJPUT — PORTFOLIO SCRIPT
   ============================================ */

// ========================
// Portfolio Data
// ========================
const portfolioItems = [
    { src: 'assets/project/AIR Jordan 1.jpg.jpeg', title: 'Air Jordan 1', category: 'product', filter: 'product' },
    { src: 'assets/project/ARMY SHOES.jpg.jpeg', title: 'Army Shoes', category: 'product', filter: 'product' },
    { src: 'assets/project/Air Force.jpg.jpeg', title: 'Air Force', category: 'product', filter: 'product' },
    { src: 'assets/project/BURGER POINTS.jpg.jpeg', title: 'Burger Points', category: 'food', filter: 'food' },
    { src: 'assets/project/GRAPIC.jpg.jpeg', title: 'Graphic Design', category: 'branding', filter: 'branding' },
    { src: 'assets/project/MOCKUP.jpg.jpeg', title: 'Mockup Design', category: 'branding', filter: 'branding' },
    { src: 'assets/project/NIKE air jordon.jpg.jpeg', title: 'Nike Air Jordan', category: 'product', filter: 'product' },
    { src: 'assets/project/PIZZAHUT.jpg.jpeg', title: 'Pizza Hut', category: 'food', filter: 'food' },
    { src: 'assets/project/RUSHER.jpg.jpeg', title: 'Rusher', category: 'poster', filter: 'poster' },
    { src: 'assets/project/THE RONALDO.jpg.jpeg', title: 'The Ronaldo', category: 'poster', filter: 'poster' },
    { src: 'assets/project/TODAY FFOD.jpg.jpeg', title: 'Today Food', category: 'food', filter: 'food' },
    { src: 'assets/project/ZORO poster.jpg.jpeg', title: 'Zoro Poster', category: 'poster', filter: 'poster' },
    { src: 'assets/project/air jordan jumpman MVP.jpg.jpeg', title: 'Jordan Jumpman MVP', category: 'product', filter: 'product' },
    { src: 'assets/project/air max.jpg.jpeg', title: 'Air Max', category: 'product', filter: 'product' },
    { src: 'assets/project/furniture-Recovered.jpg.jpeg', title: 'Furniture Design', category: '3d', filter: '3d' },
    { src: 'assets/project/kitchen 3.jpg.jpeg', title: 'Kitchen Render 3', category: '3d', filter: '3d' },
    { src: 'assets/project/kitchen.jpg.jpeg', title: 'Kitchen Render', category: '3d', filter: '3d' },
    { src: 'assets/project/kitcken 1.jpg.jpeg', title: 'Kitchen Render 1', category: '3d', filter: '3d' },
    { src: 'assets/project/my poster.jpg.jpeg', title: 'My Poster', category: 'poster', filter: 'poster' },
    { src: 'assets/project/poster.jpg.jpeg', title: 'Poster Design', category: 'poster', filter: 'poster' },
    { src: 'assets/project/super BURGER.jpg.jpeg', title: 'Super Burger', category: 'food', filter: 'food' },
];

// ========================
// DOM Elements
// ========================
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursor-follower');
const loader = document.getElementById('loader');
const loaderCounter = document.getElementById('loader-counter');
const nav = document.getElementById('nav');
const navToggle = document.getElementById('nav-toggle');
const mobileMenu = document.getElementById('mobile-menu');
const portfolioGrid = document.getElementById('portfolio-grid');
const filterBar = document.getElementById('filter-bar');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxTitle = document.getElementById('lightbox-title');
const lightboxCategory = document.getElementById('lightbox-category');
const lightboxClose = document.getElementById('lightbox-close');
const lightboxPrev = document.getElementById('lightbox-prev');
const lightboxNext = document.getElementById('lightbox-next');

let currentLightboxIndex = 0;
let filteredItems = [...portfolioItems];
let mouseX = 0, mouseY = 0;
let cursorX = 0, cursorY = 0;
let followerX = 0, followerY = 0;

// ========================
// LOADER
// ========================
function initLoader() {
    let progress = 0;
    const loaderLine = document.querySelector('.loader-line');
    const interval = setInterval(() => {
        progress += Math.random() * 12 + 3;
        if (progress >= 100) {
            progress = 100;
            clearInterval(interval);
            setTimeout(() => {
                loader.classList.add('hidden');
                document.body.style.overflow = '';
                // Trigger hero animations
                animateCounters();
            }, 400);
        }
        loaderCounter.textContent = Math.floor(progress) + '%';
        loaderLine.style.setProperty('--progress', progress + '%');
        if (loaderLine.querySelector('::after') === null) {
            loaderLine.style.cssText = '';
        }
        // Update loader line width directly
        const after = loaderLine;
        after.style.background = `linear-gradient(90deg, var(--accent-primary) 0%, var(--accent-tertiary) ${progress}%, var(--bg-tertiary) ${progress}%)`;
    }, 80);

    document.body.style.overflow = 'hidden';
}

// ========================
// CUSTOM CURSOR
// ========================
function initCursor() {
    if (window.matchMedia('(max-width: 768px)').matches) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Interactive elements hover effect
    const hoverElements = document.querySelectorAll('a, button, .portfolio-item, .skill-card, .filter-btn');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });

    animateCursor();
}

function animateCursor() {
    // Smooth cursor follow
    cursorX += (mouseX - cursorX) * 0.2;
    cursorY += (mouseY - cursorY) * 0.2;
    followerX += (mouseX - followerX) * 0.08;
    followerY += (mouseY - followerY) * 0.08;

    cursor.style.left = cursorX + 'px';
    cursor.style.top = cursorY + 'px';
    cursorFollower.style.left = followerX + 'px';
    cursorFollower.style.top = followerY + 'px';

    requestAnimationFrame(animateCursor);
}

// ========================
// NAVIGATION
// ========================
function initNav() {
    // Scroll behavior
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.scrollY;
        if (currentScroll > 60) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
        lastScroll = currentScroll;
    });

    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile menu on link click
    document.querySelectorAll('.mobile-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Smooth scroll for all nav links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ========================
// PORTFOLIO GRID
// ========================
function buildPortfolioGrid(items) {
    portfolioGrid.innerHTML = '';
    items.forEach((item, index) => {
        const div = document.createElement('div');
        div.className = 'portfolio-item';
        div.setAttribute('data-filter', item.filter);
        div.setAttribute('data-index', index);

        // Make some items span 2 columns for visual variety
        if (index === 0 || index === 6 || index === 13) {
            div.classList.add('span-2');
        }

        div.innerHTML = `
            <img src="${item.src}" alt="${item.title}" loading="lazy">
            <div class="portfolio-overlay">
                <div class="portfolio-zoom">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        <line x1="11" y1="8" x2="11" y2="14"/><line x1="8" y1="11" x2="14" y2="11"/>
                    </svg>
                </div>
                <span class="portfolio-category">${item.category}</span>
                <h3 class="portfolio-title">${item.title}</h3>
            </div>
        `;

        div.addEventListener('click', () => openLightbox(index, items));
        portfolioGrid.appendChild(div);
    });

    // Re-init scroll animations for new items
    observeElements('.portfolio-item');
    // Re-init cursor hover for new items
    if (!window.matchMedia('(max-width: 768px)').matches) {
        document.querySelectorAll('.portfolio-item').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                cursorFollower.classList.add('hover');
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
                cursorFollower.classList.remove('hover');
            });
        });
    }
}

// ========================
// FILTER
// ========================
function initFilters() {
    filterBar.addEventListener('click', (e) => {
        if (!e.target.classList.contains('filter-btn')) return;

        // Update active
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
        e.target.classList.add('active');

        const filter = e.target.getAttribute('data-filter');

        if (filter === 'all') {
            filteredItems = [...portfolioItems];
        } else {
            filteredItems = portfolioItems.filter(item => item.filter === filter);
        }

        buildPortfolioGrid(filteredItems);
    });
}

// ========================
// LIGHTBOX
// ========================
function openLightbox(index, items) {
    currentLightboxIndex = index;
    const item = items[index];
    lightboxImg.src = item.src;
    lightboxImg.alt = item.title;
    lightboxTitle.textContent = item.title;
    lightboxCategory.textContent = item.category;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

function navigateLightbox(direction) {
    currentLightboxIndex += direction;
    if (currentLightboxIndex < 0) currentLightboxIndex = filteredItems.length - 1;
    if (currentLightboxIndex >= filteredItems.length) currentLightboxIndex = 0;

    const item = filteredItems[currentLightboxIndex];
    lightboxImg.style.opacity = '0';
    lightboxImg.style.transform = 'scale(0.95)';

    setTimeout(() => {
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxCategory.textContent = item.category;
        lightboxImg.style.opacity = '1';
        lightboxImg.style.transform = 'scale(1)';
    }, 200);
}

function initLightbox() {
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', () => navigateLightbox(-1));
    lightboxNext.addEventListener('click', () => navigateLightbox(1));

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        if (e.key === 'Escape') closeLightbox();
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
        if (e.key === 'ArrowRight') navigateLightbox(1);
    });

    // Add transition to lightbox img
    lightboxImg.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
}

// ========================
// 3D INTERACTIVE ID BADGE
// ========================
function init3DCard() {
    const container = document.getElementById('about-card');
    const cardInner = document.getElementById('id-card-inner');
    const card3D = document.getElementById('id-card-3d');
    const holoSheen = document.getElementById('id-holo-sheen');
    
    if (!container || !cardInner || !card3D) return;

    // Generate barcode
    generateBarcode();

    let isFlipped = false;

    // === Click to Flip ===
    card3D.addEventListener('click', (e) => {
        e.stopPropagation();
        isFlipped = !isFlipped;
        if (isFlipped) {
            cardInner.classList.add('flipped');
        } else {
            cardInner.classList.remove('flipped');
        }
    });

    // === 3D Mouse Tilt ===
    if (!window.matchMedia('(max-width: 768px)').matches) {
        container.addEventListener('mousemove', (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = ((y - centerY) / centerY) * -12;
            const rotateY = ((x - centerX) / centerX) * 12;

            // Apply tilt to the entire badge (card + lanyard moves together)
            container.style.transform = `translateY(${container._floatY || 0}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
            container.style.transition = 'transform 0.1s ease';

            // Move holographic sheen based on mouse
            if (holoSheen) {
                const shineX = (x / rect.width) * 100;
                const shineY = (y / rect.height) * 100;
                holoSheen.style.background = `radial-gradient(circle at ${shineX}% ${shineY}%, 
                    rgba(167, 139, 250, 0.12) 0%, 
                    rgba(129, 140, 248, 0.08) 20%, 
                    rgba(192, 132, 252, 0.06) 40%, 
                    transparent 70%)`;
                holoSheen.style.opacity = '1';
            }
        });

        container.addEventListener('mouseleave', () => {
            container.style.transform = '';
            container.style.transition = 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)';
            if (holoSheen) {
                holoSheen.style.opacity = '0';
            }
        });

        // Override the float animation when hovering
        container.addEventListener('mouseenter', () => {
            container.style.animation = 'none';
        });

        container.addEventListener('mouseleave', () => {
            container.style.animation = '';
        });
    }
}

// === BARCODE GENERATOR ===
function generateBarcode() {
    const container = document.getElementById('barcode-bars');
    if (!container) return;

    container.innerHTML = '';
    const barCount = 40;
    for (let i = 0; i < barCount; i++) {
        const bar = document.createElement('div');
        bar.className = 'barcode-bar';
        // Random width for realistic barcode look
        const w = Math.random() > 0.5 ? 2 : (Math.random() > 0.5 ? 3 : 1);
        bar.style.width = w + 'px';
        // Random opacity for visual variety
        bar.style.opacity = (0.6 + Math.random() * 0.4).toString();
        container.appendChild(bar);
    }
}

// ========================
// COUNTER ANIMATION
// ========================
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const duration = 2000;
        const start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            counter.textContent = Math.floor(eased * target);
            if (progress < 1) requestAnimationFrame(animate);
        };
        animate();
    });
}

// ========================
// SCROLL REVEAL (Intersection Observer)
// ========================
function observeElements(selector) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger the animation
                const delay = Array.from(entry.target.parentElement?.children || []).indexOf(entry.target) * 80;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll(selector).forEach(el => {
        observer.observe(el);
    });
}

function initScrollReveal() {
    observeElements('.reveal-text');
    observeElements('.skill-card');
    observeElements('.portfolio-item');
    observeElements('.timeline-item');
    observeElements('.contact-link');
    observeElements('.social-link');

    // Skill bar animation
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.skill-fill');
                fills.forEach(fill => {
                    const width = fill.getAttribute('data-width');
                    setTimeout(() => {
                        fill.style.width = width + '%';
                    }, 300);
                });
                skillObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const expertiseSection = document.querySelector('.expertise-grid');
    if (expertiseSection) {
        skillObserver.observe(expertiseSection);
    }
}

// ========================
// PARALLAX ORBS
// ========================
function initParallax() {
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const orbs = document.querySelectorAll('.gradient-orb');
        orbs.forEach((orb, i) => {
            const speed = (i + 1) * 0.03;
            orb.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ========================
// ACTIVE NAV LINK HIGHLIGHT
// ========================
function initActiveNav() {
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${id}`) {
                        link.style.color = 'var(--text-primary)';
                    }
                });
            }
        });
    }, { threshold: 0.3 });

    sections.forEach(section => observer.observe(section));
}

// ========================
// INIT
// ========================
document.addEventListener('DOMContentLoaded', () => {
    initLoader();
    initCursor();
    initNav();
    buildPortfolioGrid(portfolioItems);
    initFilters();
    initLightbox();
    init3DCard();
    initScrollReveal();
    initParallax();
    initActiveNav();
});
