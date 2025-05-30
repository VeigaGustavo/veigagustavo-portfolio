// Add touch feedback styles
const style = document.createElement('style');
style.textContent = `
    .touch-active {
        opacity: 0.8;
        transform: scale(0.98);
        transition: all 0.2s ease-in-out;
    }
`;
document.head.appendChild(style);

// Touch feedback with event delegation
document.addEventListener('touchstart', (e) => {
    const element = e.target.closest('.btn, .service-card, .portfolio-item');
    if (element) {
        element.classList.add('touch-active');
    }
});

document.addEventListener('touchend', (e) => {
    const element = e.target.closest('.btn, .service-card, .portfolio-item');
    if (element) {
        element.classList.remove('touch-active');
    }
}); 