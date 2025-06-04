// Primeiro: carrega projetos do GitHub com homepage
function carregarGitHubProjects() {
    return fetch('https://api.github.com/users/VeigaGustavo/repos')
        .then(res => res.json())
        .then(repos => {
            return repos
                .filter(repo => repo.homepage && repo.homepage.includes('http'))
                .map(repo => ({
                    nome: repo.name,
                    descricao: repo.description || 'Sem descrição.',
                    url: repo.homepage,
                    preview: repo.homepage
                }));
        });
}

// Segundo: carrega os projetos extras de um JSON
function carregarProjetosExtras() {
    return fetch('https://veigagustavo.github.io/meusProjetosExtras.json')
        .then(res => res.json());
}

// Junta tudo e renderiza
Promise.all([carregarGitHubProjects(), carregarProjetosExtras()])
    .then(([githubProjects, projetosExtras]) => {
        const todosProjetos = [...githubProjects, ...projetosExtras];

        const container = document.getElementById('portfolio-cards');
        if (!container) return;
        container.innerHTML = '';

        todosProjetos.forEach(proj => {
            const card = document.createElement('div');
            card.className = 'portfolio-card';
            card.innerHTML = `
        <a href="${proj.url}" target="_blank" rel="noopener noreferrer" class="portfolio-card-link">
          <div class="portfolio-card-content">
            <div class="portfolio-card-preview">
              <iframe 
                src="${proj.preview}" 
                title="${proj.nome}"
                loading="lazy"
                class="portfolio-preview-frame"
              ></iframe>
            </div>
            <h3>${proj.nome}</h3>
            <p>${proj.descricao}</p>
            <div class="portfolio-card-footer">
              <span class="btn btn-primary pulse">
                Ver Projeto <i class="fas fa-external-link-alt"></i>
              </span>
            </div>
          </div>
        </a>
      `;
            container.appendChild(card);
        });

        initPortfolioCarousel(container);
    })
    .catch(error => {
        console.error('Erro ao carregar portfólio:', error);
    });
