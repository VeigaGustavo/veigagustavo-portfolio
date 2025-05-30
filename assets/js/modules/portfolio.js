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