const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    @keyframes ripple {
        from { transform: scale(0); opacity: 1; }
        to   { transform: scale(1); opacity: 0; }
    }
`;
document.head.appendChild(rippleStyle);

export function initInteractions() {
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', (e) => {
            const rect = card.getBoundingClientRect();
            card.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
            card.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
            card.style.setProperty('--scale', '1.02');
        });
        card.addEventListener('mouseleave', () => {
            card.style.setProperty('--scale', '1');
        });
    });

    document.querySelectorAll('.btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const rect = button.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const ripple = document.createElement('span');
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${e.clientX - rect.left - size / 2}px;
                top: ${e.clientY - rect.top - size / 2}px;
                pointer-events: none;
                animation: ripple 0.6s ease-out;
            `;
            button.style.position = 'relative';
            button.style.overflow = 'hidden';
            button.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });
}
