
document.addEventListener('DOMContentLoaded', function() {

    // Testimonials Carousel
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const testimonialPrev = document.getElementById('testimonialPrev');
    const testimonialNext = document.getElementById('testimonialNext');
    let currentTestimonial = 0;

    function initTestimonials() {
        if (testimonialSlides.length === 0) return;

        function showTestimonial(index) {
            testimonialSlides.forEach((slide, i) => {
                slide.classList.toggle('active', i === index);
            });
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }

        function prevTestimonial() {
            currentTestimonial = (currentTestimonial - 1 + testimonialSlides.length) % testimonialSlides.length;
            showTestimonial(currentTestimonial);
        }

        if (testimonialNext) {
            testimonialNext.addEventListener('click', nextTestimonial);
        }

        if (testimonialPrev) {
            testimonialPrev.addEventListener('click', prevTestimonial);
        }

        // Auto-rotate testimonials
        setInterval(nextTestimonial, 6000); // Change every 8 seconds
    }

    initTestimonials();
})