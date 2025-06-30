// Importando módulos
import './modules/menu.js';
import './modules/scroll.js';
import './modules/observer.js';
import './modules/forms.js';
import './modules/portfolio.js';
import './modules/touch.js';

// Estilos de erro
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

// Inicialização do EmailJS
emailjs.init("SU2IYyfy-QkYjeCmC");

// Manipulação de Formulários
document.addEventListener('submit', async (e) => {
    const form = e.target;
    
    if (form.matches('.contact-form')) {
        e.preventDefault();
        
        if (utils.validateForm(form)) {
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

        if (utils.validateForm(form)) {
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

