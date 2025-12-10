
document.addEventListener('DOMContentLoaded', function() {
       // Portfolio items loader
       function initPortfolioItems() {
        const container = document.getElementById('portfolio-items-container');
        if (!container) return;

        fetch('data/portfolio.json')
            .then(response => response.json())
            .then(data => {
                data.forEach((item, index) => {
                    const portfolioItem = createPortfolioItem(item, index);
                    container.appendChild(portfolioItem);
                });
                // Initialize carousels after items are created
                initPortfolioCarousels();
            })
            .catch(error => {
                console.error('Error loading portfolio data:', error);
            });
    }

    function createPortfolioItem(item, index) {
        const section = document.createElement('section');
        section.className = 'about-us portfolio-item';
        section.id = `portfolio-item-${index}`;

        section.innerHTML = `
            <div class="about-background"></div>
            <div class="about-image-container">
                <div class="portfolio-image-carousel" id="carousel-${index}">
                    <button class="portfolio-carousel-arrow portfolio-carousel-arrow-left" data-carousel="${index}" data-direction="prev">
                        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M15 18L9 13L15 8" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                    <div class="portfolio-image-track" id="track-${index}">
                        ${item.images.map((img, imgIndex) => `
                            <div class="portfolio-image-slide ${imgIndex === 0 ? 'active' : ''}">
                                <img loading="lazy" src="${img}" alt="${item.name} - Image ${imgIndex + 1}">
                            </div>
                        `).join('')}
                    </div>
                    <button class="portfolio-carousel-arrow portfolio-carousel-arrow-right" data-carousel="${index}" data-direction="next">
                        <svg width="24" height="26" viewBox="0 0 24 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 18L15 13L9 8" stroke="#09090B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
            <div class="about-content">
                <h2 class="about-title">${item.name}</h2>
                <div class="about-text">
                    <p>${item.description}</p>
                </div>
            </div>
        `;

        return section;
    }

    function initPortfolioCarousels() {
        const carousels = document.querySelectorAll('.portfolio-image-carousel');
        
        carousels.forEach((carousel, carouselIndex) => {
            const track = carousel.querySelector('.portfolio-image-track');
            const slides = carousel.querySelectorAll('.portfolio-image-slide');
            const prevBtn = carousel.querySelector('.portfolio-carousel-arrow-left');
            const nextBtn = carousel.querySelector('.portfolio-carousel-arrow-right');
            
            if (!track || slides.length === 0) return;
            
            if (slides.length <= 1) {
                if (prevBtn) prevBtn.style.display = "none";
                if (nextBtn) nextBtn.style.display = "none";
            }
            
            let currentSlide = 0;
            let autoScrollInterval;
            let isPaused = false;
            
            function updateCarousel() {
                const slideWidth = track.offsetWidth;
                track.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
                
                // Update button states
                if (prevBtn) prevBtn.disabled = currentSlide === 0;
                if (nextBtn) nextBtn.disabled = currentSlide === slides.length - 1;
            }
            
            function nextSlide() {
                if (currentSlide < slides.length - 1) {
                    currentSlide++;
                } else {
                    // Volver al inicio si está al final
                    currentSlide = 0;
                }
                updateCarousel();
            }
            
            function prevSlide() {
                if (currentSlide > 0) {
                    currentSlide--;
                } else {
                    // Ir al final si está al inicio
                    currentSlide = slides.length - 1;
                }
                updateCarousel();
            }
            
            function autoScroll() {
                if (isPaused) return;
                nextSlide();
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
            
            if (prevBtn) {
                prevBtn.addEventListener('click', () => {
                    prevSlide();
                    pauseAutoScroll();
                    setTimeout(resumeAutoScroll, 5000); // Reanudar después de 5 segundos
                });
            }
            
            if (nextBtn) {
                nextBtn.addEventListener('click', () => {
                    nextSlide();
                    pauseAutoScroll();
                    setTimeout(resumeAutoScroll, 5000); // Reanudar después de 5 segundos
                });
            }
            
            // Pausar auto-scroll al hacer hover
            carousel.addEventListener('mouseenter', pauseAutoScroll);
            carousel.addEventListener('mouseleave', resumeAutoScroll);
            
            // Initial state
            updateCarousel();
            
            // Iniciar auto-scroll
            startAutoScroll();
        });
    }

    initPortfolioItems();
})