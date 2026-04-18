export function initTheme() {
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const html = document.documentElement;

    const currentTheme = localStorage.getItem('theme') || 'light';
    html.setAttribute('data-theme', currentTheme);

    themeToggles.forEach(btn => {
        btn.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'light' ? 'dark' : 'light';

            html.setAttribute('data-theme', next);
            localStorage.setItem('theme', next);

            themeToggles.forEach(b => {
                b.style.transform = 'rotate(360deg)';
                setTimeout(() => { b.style.transform = ''; }, 300);
            });
        });
    });
}
