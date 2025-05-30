// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', () => {
    console.log('Menu script loaded');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navList = document.querySelector('.nav-list');
    
    if (!mobileMenuBtn || !navList) {
        console.error('Menu elements not found:', { mobileMenuBtn, navList });
        return;
    }

    console.log('Menu elements found:', { mobileMenuBtn, navList });

    // Toggle menu function
    const toggleMenu = () => {
        console.log('Toggle menu clicked');
        navList.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        console.log('Menu state:', {
            navListActive: navList.classList.contains('active'),
            btnActive: mobileMenuBtn.classList.contains('active')
        });
    };

    // Event listener for mobile menu button
    mobileMenuBtn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleMenu();
    });

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (navList.classList.contains('active')) {
                toggleMenu();
            }
        });
    });

    // Close menu on window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && navList.classList.contains('active')) {
            toggleMenu();
        }
    });
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
            document.querySelectorAll('.nav-link').forEach(link => {
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