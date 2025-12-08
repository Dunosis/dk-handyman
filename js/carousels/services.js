document.addEventListener('DOMContentLoaded', function() {

    // Services Carousel
    function initServicesCarousel() {
        const servicesContainer = document.querySelector('.services-container');
        const servicePrev = document.getElementById('servicePrev');
        const serviceNext = document.getElementById('serviceNext');
        
        if (!servicesContainer) return;
        
        let autoScrollInterval;
        let isPaused = false;
        
        function updateArrowStates() {
            if (!servicePrev || !serviceNext) return;
            
            const scrollLeft = servicesContainer.scrollLeft;
            const scrollWidth = servicesContainer.scrollWidth;
            const clientWidth = servicesContainer.clientWidth;
            
            // Disable/enable arrows based on scroll position
            servicePrev.disabled = scrollLeft === 0;
            serviceNext.disabled = scrollLeft >= scrollWidth - clientWidth - 10; // 10px tolerance
        }
        
        function scrollServices(direction) {
            const cardWidth = servicesContainer.querySelector('.service-card')?.offsetWidth || 400;
            const gap = 35; // gap between cards
            const scrollAmount = cardWidth + gap;
            
            servicesContainer.scrollBy({
                left: direction * scrollAmount,
                behavior: 'smooth'
            });
        }
        
        function autoScroll() {
            if (isPaused) return;
            
            const scrollLeft = servicesContainer.scrollLeft;
            const scrollWidth = servicesContainer.scrollWidth;
            const clientWidth = servicesContainer.clientWidth;
            
            // Si está al final, volver al inicio
            if (scrollLeft >= scrollWidth - clientWidth - 10) {
                servicesContainer.scrollTo({
                    left: 0,
                    behavior: 'smooth'
                });
            } else {
                scrollServices(1);
            }
        }
        
        function startAutoScroll() {
            clearInterval(autoScrollInterval);
            autoScrollInterval = setInterval(autoScroll, 4000); // Auto-scroll cada 4 segundos
        }
        
        function pauseAutoScroll() {
            isPaused = true;
            clearInterval(autoScrollInterval);
        }
        
        function resumeAutoScroll() {
            isPaused = false;
            startAutoScroll();
        }
        
        if (servicePrev) {
            servicePrev.addEventListener('click', () => {
                scrollServices(-1);
                pauseAutoScroll();
                setTimeout(resumeAutoScroll, 5000); // Reanudar después de 5 segundos
            });
        }
        
        if (serviceNext) {
            serviceNext.addEventListener('click', () => {
                scrollServices(1);
                pauseAutoScroll();
                setTimeout(resumeAutoScroll, 5000); // Reanudar después de 5 segundos
            });
        }
        
        // Pausar auto-scroll al hacer hover
        servicesContainer.addEventListener('mouseenter', pauseAutoScroll);
        servicesContainer.addEventListener('mouseleave', resumeAutoScroll);
        
        // Pausar auto-scroll al hacer scroll manual
        let scrollTimeout;
        servicesContainer.addEventListener('scroll', () => {
            updateArrowStates();
            pauseAutoScroll();
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(resumeAutoScroll, 3000); // Reanudar después de 3 segundos sin scroll
        });
        
        // Iniciar auto-scroll
        startAutoScroll();
        
        // Initial state
        updateArrowStates();
    }
    initServicesCarousel();
});