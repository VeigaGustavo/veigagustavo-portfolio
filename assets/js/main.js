// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header_nav')) {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', () => {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    });
});

// Smooth scroll for anchor links
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

// Intersection Observer for animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.service-card, .portfolio-item, .feature').forEach(el => {
    observer.observe(el);
});

// Form validation
const form = document.querySelector('.contact-form');
if (form) {
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        const requiredFields = form.querySelectorAll('[required]');
        
        requiredFields.forEach(field => {
            if (!field.value.trim()) {
                isValid = false;
                field.classList.add('error');
            } else {
                field.classList.remove('error');
            }
        });
        
        if (isValid) {
            // Here you would typically send the form data to your server
            alert('Mensagem enviada com sucesso!');
            form.reset();
        }
    });
}

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
});

// Add touch feedback for mobile devices
document.querySelectorAll('.btn, .service-card, .portfolio-item').forEach(element => {
    element.addEventListener('touchstart', function() {
        this.classList.add('touch-active');
    });
    
    element.addEventListener('touchend', function() {
        this.classList.remove('touch-active');
    });
});

// Quote Form Handling
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(quoteForm);
        const data = Object.fromEntries(formData.entries());

        // Get selected features
        const features = formData.getAll('features');
        data.features = features;

        // Get selected systems (for automation form)
        const systems = formData.getAll('systems');
        if (systems.length > 0) {
            data.systems = systems;
        }

        try {
            // Here you would typically send the data to your backend
            // For now, we'll just show a success message
            alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
            quoteForm.reset();
        } catch (error) {
            console.error('Error submitting quote:', error);
            alert('Ocorreu um erro ao enviar o orçamento. Por favor, tente novamente.');
        }
    });
}

// Form validation
const validateForm = (form) => {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.classList.add('error');
        } else {
            field.classList.remove('error');
        }
    });

    return isValid;
};

// Add error styles
const style = document.createElement('style');
style.textContent = `
    .error {
        border-color: #ff4444 !important;
    }
    .error:focus {
        box-shadow: 0 0 0 2px rgba(255, 68, 68, 0.1) !important;
    }
`;
document.head.appendChild(style); 