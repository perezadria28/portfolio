export function initScroll() {
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        header.classList.toggle('scrolled', window.pageYOffset > 100);
    });

    const visualShapes = document.querySelectorAll('.visual__shape');

    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        visualShapes.forEach((shape, index) => {
            const speed = 0.1 + index * 0.05;
            shape.style.transform = `translateY(${-(scrolled * speed)}px)`;
        });
    });
}
