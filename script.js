AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: false,
    offset: 100
});

const themeToggles = document.querySelectorAll('.theme-toggle');
const html = document.documentElement;

const currentTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', currentTheme);

themeToggles.forEach(btn => {
    btn.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';

        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);

        themeToggles.forEach(b => {
            b.style.transform = 'rotate(360deg)';
            setTimeout(() => { b.style.transform = ''; }, 300);
        });
    });
});


const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
});


const navLinks = document.querySelectorAll('.nav__link');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    });
});


document.addEventListener('click', (e) => {
    if (!navMenu.contains(e.target) && !navToggle.contains(e.target) && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
        document.body.style.overflow = '';
    }
});


const header = document.getElementById('header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

const sections = document.querySelectorAll('.section');
const navItems = document.querySelectorAll('.nav__link');

const observerOptions = {
    root: null,
    rootMargin: '-50% 0px -50% 0px',
    threshold: 0
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const currentId = entry.target.getAttribute('id');
            
            navItems.forEach(item => {
                item.classList.remove('active');
                if (item.getAttribute('href') === `#${currentId}`) {
                    item.classList.add('active');
                }
            });
        }
    });
}, observerOptions);

sections.forEach(section => observer.observe(section));

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        
        if (href === '#' || href === '') return;
        
        e.preventDefault();
        
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight - 20;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

const fadeElements = document.querySelectorAll('.project-card, .tech__category, .highlight-card, .contact-method, .stat-card');

const fadeObserverOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const fadeObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                entry.target.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                
                requestAnimationFrame(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                });
            }, index * 100);
            
            fadeObserver.unobserve(entry.target);
        }
    });
}, fadeObserverOptions);

fadeElements.forEach(element => {
    element.style.opacity = '0';
    fadeObserver.observe(element);
});


const visualShapes = document.querySelectorAll('.visual__shape');

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    
    visualShapes.forEach((shape, index) => {
        const speed = 0.1 + (index * 0.05);
        const yPos = -(scrolled * speed);
        shape.style.transform = `translateY(${yPos}px)`;
    });
});


const footerYear = document.querySelector('.footer__copyright');
if (footerYear) {
    const currentYear = new Date().getFullYear();
    footerYear.textContent = footerYear.textContent.replace('2025', currentYear);
}

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.3s ease-out';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });
});

document.documentElement.style.visibility = 'visible';

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiIndex = 0;

document.addEventListener('keydown', (e) => {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            
            const style = document.createElement('style');
            style.textContent = `
                @keyframes rainbow {
                    0% { filter: hue-rotate(0deg); }
                    100% { filter: hue-rotate(360deg); }
                }
            `;
            document.head.appendChild(style);
            
            setTimeout(() => {
                document.body.style.animation = '';
                style.remove();
            }, 5000);
            
            konamiIndex = 0;
        }
    } else {
        konamiIndex = 0;
    }
});

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.setProperty('--scale', '1.02');
    });

    card.addEventListener('mouseleave', () => {
        card.style.setProperty('--scale', '1');
    });
});

const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', (e) => {
        const ripple = document.createElement('span');
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const size = Math.max(rect.width, rect.height);

        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            left: ${x - size / 2}px;
            top: ${y - size / 2}px;
            pointer-events: none;
            animation: ripple 0.6s ease-out;
        `;

        button.style.position = 'relative';
        button.style.overflow = 'hidden';
        button.appendChild(ripple);

        setTimeout(() => ripple.remove(), 600);
    });
});

const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        from {
            transform: scale(0);
            opacity: 1;
        }
        to {
            transform: scale(1);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);


console.log('%c👋 Hola, ', 'font-size: 20px; font-weight: bold; color: #0066ff;');
console.log('%cEste es mi correo: perezadria00@gmail.com', 'font-size: 14px; color: #00d4aa;');
console.log('%c¡Gracias por visitar mi web!', 'font-size: 20px; font-weight: bold; color: #0066ff;');

const skipLink = document.createElement('a');
skipLink.href = '#proyectos';
skipLink.textContent = 'Saltar al contenido principal';
skipLink.className = 'skip-link';
skipLink.style.cssText = `
    position: absolute;
    top: -40px;
    left: 0;
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    text-decoration: none;
    border-radius: 0 0 4px 0;
    z-index: 10000;
    transition: top 0.2s;
`;
skipLink.addEventListener('focus', () => {
    skipLink.style.top = '0';
});
skipLink.addEventListener('blur', () => {
    skipLink.style.top = '-40px';
});
document.body.prepend(skipLink);