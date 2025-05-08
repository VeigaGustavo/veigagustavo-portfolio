// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

mobileMenuBtn.addEventListener('click', () => {
    navList.classList.toggle('active');
    mobileMenuBtn.classList.toggle('active');
});

// Close menu when clicking outside or on a link
document.addEventListener('click', (e) => {
    if (!e.target.closest('.header_nav') || e.target.closest('.nav-list a')) {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
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

// Initialize EmailJS
emailjs.init("SU2IYyfy-QkYjeCmC");

// Contact Form Handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        if (validateForm(contactForm)) {
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            // Show loading state
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            try {
                const formData = {
                    name: contactForm.querySelector('#name').value,
                    email: contactForm.querySelector('#email').value,
                    message: contactForm.querySelector('#message').value
                };

                await emailjs.send('service_pq7j65b', 'template_1cuknmt', formData);
                
                // Show success message
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                contactForm.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            } finally {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        }
    });
}

// Quote Form Handling
const quoteForm = document.getElementById('quoteForm');
if (quoteForm) {
    quoteForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        if (validateForm(quoteForm)) {
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
                alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
                quoteForm.reset();
            } catch (error) {
                console.error('Error submitting quote:', error);
                alert('Ocorreu um erro ao enviar o orçamento. Por favor, tente novamente.');
            }
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

// Portfolio GitHub Integration
const projetosDestacados = [
    "Dicasa",
    "ListaTarefas",
    "tabuada",
    "linux-projeto2-iac",
    "universidade-atividade",
    "ProgCientifica"
];

function renderPortfolioCards(repos) {
    const container = document.getElementById('portfolio-cards');
    if (!container) return;
    container.innerHTML = '';
    // Filtrar apenas os repositórios da lista
    const destacados = projetosDestacados
        .map(nome => repos.find(repo => repo.name === nome))
        .filter(Boolean);
    destacados.forEach(repo => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer" class="portfolio-card-link">
                <div class="portfolio-card-content">
                    <h3>${repo.name}</h3>
                    <p>${repo.description || 'Sem descrição.'}</p>
                    <div class="portfolio-card-footer">
                        <span class="btn btn-primary">
                            Ver no GitHub <i class="fab fa-github"></i>
                        </span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

fetch('https://api.github.com/users/VeigaGustavo/repos')
    .then(res => res.json())
    .then(repos => {
        renderPortfolioCards(repos);
    })
    .catch(error => {
        console.error('Error loading portfolio:', error);
    });

