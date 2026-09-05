document.addEventListener("DOMContentLoaded", () => {
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const fadeInElements = document.querySelectorAll('.fade-in');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        fadeInElements.forEach(element => element.classList.add('visible'));
    } else if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        fadeInElements.forEach(element => observer.observe(element));
    } else {
        fadeInElements.forEach(element => element.classList.add('visible'));
    }

    // --- Contact Form Mock ---
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm && formMessage) {
        formMessage.setAttribute('role', 'status');
        formMessage.setAttribute('aria-live', 'polite');

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            formMessage.style.display = "block";
            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = "none";
            }, 5000);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        }, { passive: true });
    }
});
