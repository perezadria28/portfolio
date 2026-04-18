// Smooth scroll navigation
document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('.nav__link');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');

    // Handle navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            // Only handle hash links
            if (href && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetSection = document.getElementById(targetId);

                if (targetSection) {
                    // Close mobile menu if open
                    if (navMenu.classList.contains('active')) {
                        navMenu.classList.remove('active');
                        navToggle.classList.remove('active');
                    }

                    // Scroll to section
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });

                    // Update active link
                    updateActiveLink(href);
                }
            }
        });
    });

    // Update active link based on scroll position
    function updateActiveLink(targetHash) {
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === targetHash) {
                link.classList.add('active');
            }
        });
    }

    // Intersection Observer for auto-updating active link on scroll
    const sections = document.querySelectorAll('section[id]');

    const observerOptions = {
        threshold: 0.3,
        rootMargin: '-80px 0px -66% 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                updateActiveLink('#' + id);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Mobile menu toggle (if you have a hamburger menu)
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
});
