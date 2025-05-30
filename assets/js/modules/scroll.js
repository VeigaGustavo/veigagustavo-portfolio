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