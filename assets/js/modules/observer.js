// Add lazy loading styles
const style = document.createElement('style');
style.textContent = `
    .loading {
        opacity: 0.5;
        transition: opacity 0.3s ease-in-out;
    }

    .loaded {
        opacity: 1;
    }

    img[data-src],
    iframe[data-src] {
        transition: opacity 0.3s ease-in-out;
    }
`;
document.head.appendChild(style);

// Unified Intersection Observer
const observerOptions = {
    root: null,
    rootMargin: '50px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const element = entry.target;
            
            // Handle animations
            if (element.matches('.service-card, .portfolio-item, .feature, .process-step, .tool-card, .hero-content, .section-title')) {
                element.classList.add('animate');
            }
            
            // Handle lazy loading
            if (element.matches('img[data-src], iframe[data-src]')) {
                element.classList.add('loading');
                
                if (element.tagName === 'IMG') {
                    if (!element.src) {
                        element.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 200"%3E%3Crect width="300" height="200" fill="%23f0f0f0"/%3E%3C/svg%3E';
                    }
                    
                    const img = new Image();
                    img.onload = () => {
                        element.src = element.dataset.src;
                        element.classList.remove('loading');
                        element.classList.add('loaded');
                    };
                    img.src = element.dataset.src;
                } else if (element.tagName === 'IFRAME') {
                    element.src = element.dataset.src;
                    element.classList.remove('loading');
                    element.classList.add('loaded');
                }
            }
            
            observer.unobserve(element);
        }
    });
}, observerOptions);

// Observe all elements
document.querySelectorAll('.service-card, .portfolio-item, .feature, .process-step, .tool-card, .hero-content, .section-title, img[data-src], iframe[data-src]')
    .forEach(el => observer.observe(el)); 