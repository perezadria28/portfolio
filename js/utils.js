export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
}

export function initUtils() {
    const footerYear = document.querySelector('.footer__copyright');
    if (footerYear) {
        footerYear.textContent = footerYear.textContent.replace('2025', new Date().getFullYear());
    }

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
    skipLink.addEventListener('focus', () => { skipLink.style.top = '0'; });
    skipLink.addEventListener('blur', () => { skipLink.style.top = '-40px'; });
    document.body.prepend(skipLink);

    const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
    let konamiIndex = 0;
    document.addEventListener('keydown', (e) => {
        konamiIndex = e.key === konamiCode[konamiIndex] ? konamiIndex + 1 : 0;
        if (konamiIndex === konamiCode.length) {
            document.body.style.animation = 'rainbow 2s linear infinite';
            const style = document.createElement('style');
            style.textContent = `@keyframes rainbow { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }`;
            document.head.appendChild(style);
            setTimeout(() => { document.body.style.animation = ''; style.remove(); }, 5000);
            konamiIndex = 0;
        }
    });

    console.log('%c👋 Hola, ', 'font-size: 20px; font-weight: bold; color: #0066ff;');
    console.log('%cEste es mi correo: perez00adria@gmail.com', 'font-size: 14px; color: #00d4aa;');
    console.log('%c¡Gracias por visitar mi web!', 'font-size: 20px; font-weight: bold; color: #0066ff;');
}
