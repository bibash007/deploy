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
    const submitButton = contactForm?.querySelector('button[type="submit"]');

    if (contactForm && formMessage) {
        formMessage.setAttribute('role', 'status');
        formMessage.setAttribute('aria-live', 'polite');

        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();
            formMessage.style.display = "block";

            if (submitButton) {
                submitButton.disabled = true;
                submitButton.textContent = "Sent!";
            }

            contactForm.reset();

            setTimeout(() => {
                formMessage.style.display = "none";
                if (submitButton) {
                    submitButton.disabled = false;
                    submitButton.textContent = "Send Message";
                }
            }, 5000);
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        const updateNavbarState = () => {
            navbar.classList.toggle('scrolled', window.scrollY > 20);
        };

        updateNavbarState();
        window.addEventListener('scroll', updateNavbarState, { passive: true });
    }

    // --- Smooth Anchor Navigation ---
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', event => {
            const targetId = link.getAttribute('href');
            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();
            target.scrollIntoView({
                behavior: prefersReducedMotion ? 'auto' : 'smooth',
                block: 'start'
            });
        });
    });

    // --- Dynamic Footer Year ---
    const footerCopy = document.querySelector('.footer-copy');
    if (footerCopy) {
        const currentYear = new Date().getFullYear();
        footerCopy.textContent = `© ${currentYear} Bibash Pandey.`;
    }
});
