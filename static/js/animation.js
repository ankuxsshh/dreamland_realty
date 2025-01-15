
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll('.animate-section');

    const observerOptions = {
        root: null, // Use the viewport as the root
        rootMargin: '0px',
        threshold: 0.5 // Trigger animation when 50% of the section is visible
    };

    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Trigger animation
                observer.unobserve(entry.target); // Stop observing once the section is visible
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach(section => {
        observer.observe(section); // Start observing each section
    });
});
