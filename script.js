document.addEventListener('DOMContentLoaded', function() {

    // --- 1. Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('.mobile-menu');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    }


    // --- 2. Scroll-Triggered Animations (Intersection Observer) ---
    // Select elements that should animate when scrolled into view
    // These are elements that have initial 'opacity: 0;' and a CSS 'animation' property defined.
const animatedElements = document.querySelectorAll(
        '.hero-title, .hero-subtitle, .hero-description, .hero-btn, ' + // <-- UPDATED LINE HERE
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
                // When element comes into view, its opacity becomes 1 due to CSS animation 'forwards'
                // No need to add a separate class, the CSS animation takes over.
                // We just need to stop observing it after it's animated.
                entry.target.style.opacity = 1; // Ensure opacity is set to 1 for animated items
                // This forces the animation to play once in view, as the initial 0 opacity is overwritten by the animation's 'forwards' state.
                // For a more robust solution that actively 'plays' the animation, we'd add/remove a class.
                // Given the current CSS structure, simply observing and letting CSS handle it is fine.
                observer.unobserve(entry.target); // Stop observing after animation
            }
        });
    }, observerOptions);

    animatedElements.forEach(element => {
        observer.observe(element);
    });

    // --- Optional: Fix for initial animations on page load for elements already in view ---
    // Some elements might be in view immediately on page load.
    // The Intersection Observer might not fire for them instantly or reliably.
    // We can manually trigger their animation if they are already in viewport.
    const initialCheck = () => {
        animatedElements.forEach(element => {
            const rect = element.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                element.style.opacity = 1;
                // Optional: if you had a class like 'animate-in' to trigger, add it here
                // element.classList.add('animate-in');
            }
        });
    };
    initialCheck(); // Run on DOMContentLoaded

    // You might also want to run initialCheck on window.load to ensure images are loaded etc.
    window.addEventListener('load', initialCheck);


    // --- 3. Back-to-Top Button ---
    const backToTopButton = document.createElement('button');
    backToTopButton.classList.add('back-to-top');
    backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>'; // Requires Font Awesome
    document.body.appendChild(backToTopButton);

    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) { // Show button after scrolling 300px down
            backToTopButton.classList.add('show');
        } else {
            backToTopButton.classList.remove('show');
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth' // Smooth scroll to top
        });
    });

});