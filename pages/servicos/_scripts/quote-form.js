document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('quoteForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    const feedback = form.querySelector('.form-feedback');

    // Validação em tempo real
    inputs.forEach(input => {
        input.addEventListener('blur', validateField);
        input.addEventListener('input', validateField);
    });

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length > 11) value = value.slice(0, 11);
            
            if (value.length > 2) {
                value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
            }
            if (value.length > 9) {
                value = `${value.slice(0, 9)}-${value.slice(9)}`;
            }
            
            e.target.value = value;
        });
    }

    // Envio do formulário
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        if (validateForm()) {
            const submitButton = form.querySelector('button[type="submit"]');
            const originalText = submitButton.innerHTML;
            
            try {
                submitButton.disabled = true;
                submitButton.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';

                // Simulação de envio
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                showFeedback('success', 'Orçamento solicitado com sucesso! Entraremos em contato em breve.');
                form.reset();
            } catch (error) {
                showFeedback('error', 'Erro ao enviar o formulário. Por favor, tente novamente.');
            } finally {
                submitButton.disabled = false;
                submitButton.innerHTML = originalText;
            }
        }
    });
});

function validateField(e) {
    const field = e.target;
    const value = field.value.trim();
    let isValid = true;
    let errorMessage = '';

    switch (field.type) {
        case 'email':
            isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            errorMessage = 'Por favor, insira um e-mail válido';
            break;
        case 'tel':
            isValid = /^\(\d{2}\) \d{5}-\d{4}$/.test(value);
            errorMessage = 'Por favor, insira um telefone válido';
            break;
        case 'checkbox':
            const checkboxes = document.querySelectorAll('input[name="' + field.name + '"]:checked');
            isValid = checkboxes.length > 0;
            errorMessage = 'Selecione pelo menos uma opção';
            break;
        default:
            isValid = value.length > 0;
            errorMessage = 'Este campo é obrigatório';
    }

    updateFieldValidation(field, isValid, errorMessage);
    return isValid;
}

function validateForm() {
    const form = document.getElementById('quoteForm');
    const inputs = form.querySelectorAll('input, select, textarea');
    let isValid = true;

    inputs.forEach(input => {
        if (!validateField({ target: input })) {
            isValid = false;
        }
    });

    return isValid;
}

function updateFieldValidation(field, isValid, errorMessage) {
    const errorElement = field.parentElement.querySelector('.error-message');
    
    if (!isValid) {
        field.classList.add('error');
        if (!errorElement) {
            const error = document.createElement('div');
            error.className = 'error-message';
            error.textContent = errorMessage;
            field.parentElement.appendChild(error);
        }
    } else {
        field.classList.remove('error');
        if (errorElement) {
            errorElement.remove();
        }
    }
}

function showFeedback(type, message) {
    const feedback = document.querySelector('.form-feedback');
    feedback.className = `form-feedback ${type}`;
    feedback.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>
        <span>${message}</span>
    `;
    feedback.style.display = 'flex';
    
    // Scroll para o feedback
    feedback.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Esconder após 5 segundos
    setTimeout(() => {
        feedback.style.display = 'none';
    }, 5000);
} 