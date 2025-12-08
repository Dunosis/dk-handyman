document.addEventListener('DOMContentLoaded', function() {

    // Hero Carousel Functionality
    const carouselContainer = document.querySelector('.carousel-container');
    const carouselSlides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    let carouselInterval;

    function initCarousel() {
        if (!carouselContainer || carouselSlides.length === 0) return;

        // Update carousel track width based on number of slides
        function updateTrackWidth() {
            const track = document.querySelector('.carousel-track');
            if (track) {
                const slideCount = carouselSlides.length;
                track.style.width = `${slideCount * 100}vw`;
            }
        }

        // Initial track width setup
        updateTrackWidth();
        
        // Update on window resize
        window.addEventListener('resize', updateTrackWidth);

        // Auto-scroll carousel
        function nextSlide() {
            currentSlide = (currentSlide + 1) % carouselSlides.length;
            scrollToSlide(currentSlide);
        }

        function scrollToSlide(index) {
            if (carouselContainer) {
                const slideWidth = window.innerWidth; // Use viewport width
                carouselContainer.scrollTo({
                    left: slideWidth * index,
                    behavior: 'smooth'
                });
            }
        }

        // Start auto-scroll
        carouselInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds

        // Pause on hover
        carouselContainer.addEventListener('mouseenter', () => {
            clearInterval(carouselInterval);
        });

        carouselContainer.addEventListener('mouseleave', () => {
            carouselInterval = setInterval(nextSlide, 5000);
        });

        // Update current slide on scroll
        carouselContainer.addEventListener('scroll', () => {
            const slideWidth = window.innerWidth;
            const scrollPosition = carouselContainer.scrollLeft;
            currentSlide = Math.round(scrollPosition / slideWidth);
        });
    }


    initCarousel();
});