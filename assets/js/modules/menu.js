// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu function
    const toggleMenu = () => {
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.style.overflow = navList.classList.contains('active') ? 'hidden' : '';
    };

    // Event delegation for mobile menu
    document.addEventListener('click', (e) => {
        // Toggle menu when clicking the button
        if (e.target.closest('.mobile-menu-btn')) {
            toggleMenu();
            return;
        }

        // Close menu when clicking outside or on a link
        if (navList.classList.contains('active')) {
            if (!e.target.closest('.nav-list') || e.target.closest('.nav-link')) {
                toggleMenu();
            }
        }
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            toggleMenu();
        }
    });

    // Add active class to current section link
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section[id]').forEach(section => {
        observer.observe(section);
    });
}); 