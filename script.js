document.addEventListener("DOMContentLoaded", () => {
    // --- Scroll Animations (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Stop observing once it's visible
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    // --- Contact Form Mock ---
    const contactForm = document.getElementById("contactForm");
    const formMessage = document.getElementById("formMessage");

    if (contactForm) {
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
        });
    }
});
