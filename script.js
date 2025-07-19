document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');

    // **IMPORTANT CHANGE HERE:**
    // Select the <nav> element directly, as you want to toggle the 'active' class on it.
    const nav = document.querySelector('header nav'); 
    // This is specific enough to target the main navigation within your header.
    // If you only have one <nav> element on the page, you could also use:
    // const nav = document.querySelector('nav');


    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active'); // Toggles 'active' class on the <nav> element
            menuToggle.classList.toggle('active'); // Toggles 'active' class on the toggle button (for X animation)
        });

        // Close menu when a nav link is clicked
        // This targets all <a> tags *within* the selected 'nav' element.
        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (nav.classList.contains('active')) {
                    nav.classList.remove('active');
                    menuToggle.classList.remove('active');
                }
            });
        });
    }


    // --- 2. Scroll-Triggered Animations (Intersection Observer) ---
    // (Your existing animation code remains the same as it's separate from the menu logic)
    const animatedElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-description, .hero-btn, ' + 
        '.mission-item, .event-card, .quick-link-item, ' +
        '#our-story .content-wrapper .text-content, #our-story .content-wrapper .image-content, ' +
        '#mission-vision-values .m-v-v-item, #meet-the-team .team-member, ' +
        '#service-overview .service-item, #how-we-serve .serve-item, ' +
        '.gallery-item, .video-item, ' +
        '#upcoming-events .event-item, #past-events .past-event-card, ' +
        '#latest-sermons .latest-sermon-highlight, #sermon-archive .sermon-card, ' +
        '#why-join .content-wrapper .text-content, #why-join .content-wrapper .image-content, ' +
        '#roles-needed .role-item, #application-form .join-us-form, ' +
        '#why-give .content-wrapper .text-content, #why-give .content-wrapper .image-content, ' +
        '#giving-options .giving-option-item, ' +
        '#contact-info .contact-card, #contact-form-section .contact-form, #google-map .map-container'
    );

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.1 // Trigger when 10% of the element is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1; 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    const initialCheck = () => {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.opacity = 1;
            }
        });
    };
    initialCheck(); 
    window.addEventListener('load', initialCheck);


    // --- 3. Back-to-Top Button ---
    // (Your existing back-to-top button code remains the same)
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Requires Font Awesome
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { 
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

});
