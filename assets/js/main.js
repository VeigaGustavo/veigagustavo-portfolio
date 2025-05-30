// Importando módulos
import './modules/menu.js';
import './modules/scroll.js';
import './modules/observer.js';
import './modules/forms.js';
import './modules/portfolio.js';
import './modules/touch.js';

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navList = document.querySelector('.nav-list');

// Event delegation for mobile menu
document.addEventListener('click', (e) => {
    if (e.target.closest('.mobile-menu-btn')) {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
    } else if (!e.target.closest('.header_nav') || e.target.closest('.nav-list a')) {
        navList.classList.remove('active');
        mobileMenuBtn.classList.remove('active');
    }
});

// Scroll suave para links âncora
document.addEventListener('click', (e) => {
    if (e.target.matches('a[href^="#"]')) {
        e.preventDefault();
        const target = document.querySelector(e.target.getAttribute('href'));
        if (target) {
            // Altura do cabeçalho fixo
            const headerOffset = 80;
            // Posição atual do elemento em relação à viewport
            const elementPosition = target.getBoundingClientRect().top;
            // Posição absoluta do elemento na página
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            // Scroll suave até o elemento
            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });

            // Atualiza a URL com o hash
            history.pushState(null, null, e.target.getAttribute('href'));
        }
    }
});

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

// Form handling with event delegation
document.addEventListener('submit', async (e) => {
    const form = e.target;
    
    if (form.matches('.contact-form')) {
        e.preventDefault();
        
        if (validateForm(form)) {
            const submitBtn = form.querySelector('button[type="submit"]');
            const btnText = submitBtn.querySelector('.btn-text');
            const btnLoader = submitBtn.querySelector('.btn-loader');
            
            btnText.style.display = 'none';
            btnLoader.style.display = 'inline-block';
            submitBtn.disabled = true;

            try {
                const formData = {
                    name: form.querySelector('#name').value,
                    email: form.querySelector('#email').value,
                    message: form.querySelector('#message').value
                };

                await emailjs.send('service_pq7j65b', 'template_1cuknmt', formData);
                alert('Mensagem enviada com sucesso! Entrarei em contato em breve.');
                form.reset();
            } catch (error) {
                console.error('Error sending email:', error);
                alert('Ocorreu um erro ao enviar a mensagem. Por favor, tente novamente.');
            } finally {
                btnText.style.display = 'inline-block';
                btnLoader.style.display = 'none';
                submitBtn.disabled = false;
            }
        }
    } else if (form.matches('#quoteForm')) {
        e.preventDefault();

        if (validateForm(form)) {
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());

            data.features = formData.getAll('features');
            const systems = formData.getAll('systems');
            if (systems.length > 0) {
                data.systems = systems;
            }

            try {
                alert('Orçamento solicitado com sucesso! Entraremos em contato em breve.');
                form.reset();
            } catch (error) {
                console.error('Error submitting quote:', error);
                alert('Ocorreu um erro ao enviar o orçamento. Por favor, tente novamente.');
            }
        }
    }
});

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

// Portfolio GitHub Integration
const projetosDestacados = [
    "Dicasa",
    "ListaTarefas",
    "TabuadaJS",
    "linux-projeto2-iac",
    "universidade-atividade",
    "ProgCientifica"
];

// Array com as páginas de trabalho
const paginasTrabalho = [
    {
        nome: "E-commerce Dicasa",
        descricao: "Loja virtual completa com gestão de produtos e pagamentos",
        url: "https://dicasa.com.br",
        preview: "https://dicasa.com.br"
    },
    {
        nome: "Lista de Tarefas",
        descricao: "Aplicação web para gerenciamento de tarefas",
        url: "https://listatarefas.com",
        preview: "https://listatarefas.com"
    },
    {
        nome: "Tabuada JS",
        descricao: "Aplicativo interativo para aprendizado de tabuada",
        url: "https://tabuadajs.com",
        preview: "https://tabuadajs.com"
    }
];

function renderWorkPages() {
    const container = document.getElementById('work-pages');
    if (!container) return;
    
    container.innerHTML = '';
    paginasTrabalho.forEach(pagina => {
        const card = document.createElement('div');
        card.className = 'portfolio-card';
        card.innerHTML = `
            <a href="${pagina.url}" target="_blank" rel="noopener noreferrer" class="portfolio-card-link">
                <div class="portfolio-card-content">
                    <div class="portfolio-card-preview">
                        <iframe 
                            src="${pagina.preview}" 
                            title="${pagina.nome}"
                            loading="lazy"
                            class="portfolio-preview-frame"
                        ></iframe>
                    </div>
                    <h3>${pagina.nome}</h3>
                    <p>${pagina.descricao}</p>
                    <div class="portfolio-card-footer">
                        <span class="btn btn-primary pulse">
                            Visitar Site <i class="fas fa-external-link-alt"></i>
                        </span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

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
                        <span class="btn btn-primary pulse">
                            Ver no GitHub <i class="fab fa-github"></i>
                        </span>
                    </div>
                </div>
            </a>
        `;
        container.appendChild(card);
    });
}

// Inicializar as duas seções do portfólio
renderWorkPages();

fetch('https://api.github.com/users/VeigaGustavo/repos')
    .then(res => res.json())
    .then(repos => {
        renderPortfolioCards(repos);
    })
    .catch(error => {
        console.error('Erro ao carregar portfólio:', error);
    });

