// Portfolio GitHub Integration
const projetosDestacados = [
    "hospedagemHotelaria",
    "linux_project1_iac",
    "estacionamento",
    "linux-projeto2-iac",
    "universidade-atividade",
    "ProgCientifica"
];

// Array com as páginas de trabalho
const paginasTrabalho = [
    {
        nome: "Web Designer",
        descricao: "Responsável pelo web design e apoio no desenvolvimento do site de divulgação do jogo Ahcha.",
        url: "https://www.ahcha.com.br/",
        preview: "https://www.ahcha.com.br/"
    },
    {
        nome: "Gestor/Dev de Ecommerce",
        descricao: "Responsável pela gestão, desenvolvimento, intregrações e melhororias continuas no ecommerce da Fabiano Parafusos.",
        url: "https://www.fabianoparafusos.com.br/",
        preview: "https://www.fabianoparafusos.com.br/"
    },
    {
        nome: "Estudos",
        descricao: "Jogo educativo da Cifra de Vigenère",
        url: "https://veigagustavo.github.io/jogoCifra/",
        preview: "https://veigagustavo.github.io/jogoCifra/"
    },
    {
        nome: "Estudos",
        descricao: "Aplicativo web de gerenciamento de tarefas no estilo Kanban",
        url: "https://veigagustavo.github.io/ListaTarefas/",
        preview: "https://veigagustavo.github.io/ListaTarefas/"
    }
    /*,
    {
        nome: "",
        descricao: "",
        url: "",
        preview: ""
    }
    */
];

const initPortfolioCarousel = (container) => {
    const cards = container.querySelectorAll('.portfolio-card');
    
    // Sempre ativar o carrossel para garantir o comportamento responsivo
    container.classList.add('swiper', 'swiper-enabled');
    container.innerHTML = `
        <div class="swiper-wrapper">
            ${Array.from(cards).map(card => `
                <div class="swiper-slide">
                    ${card.outerHTML}
                </div>
            `).join('')}
        </div>
        <div class="swiper-button-next"></div>
        <div class="swiper-button-prev"></div>
        <div class="swiper-pagination"></div>
    `;

    new Swiper(container, {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: cards.length > 1,
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        breakpoints: {
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 30,
            },
        },
        grabCursor: true,
        touchRatio: 1,
        touchAngle: 45,
        resistance: true,
        resistanceRatio: 0.85,
        touchStartPreventDefault: false,
        touchMoveStopPropagation: false,
        watchSlidesProgress: true,
        watchOverflow: true,
        preventInteractionOnTransition: true,
        observer: true,
        observeParents: true,
    });
};

const renderWorkPages = () => {
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

    initPortfolioCarousel(container);
};

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
                    <div class="portfolio-card-preview">
                        <div class="github-preview">
                            <i class="fab fa-github"></i>
                            <span>${repo.name}</span>
                        </div>
                    </div>
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

    initPortfolioCarousel(container);
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