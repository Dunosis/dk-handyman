
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
    
        carousels.forEach((carousel) => {
            const track = carousel.querySelector('.portfolio-image-track');
            const slides = carousel.querySelectorAll('.portfolio-image-slide');
            const prevBtn = carousel.querySelector('.portfolio-carousel-arrow-left');
            const nextBtn = carousel.querySelector('.portfolio-carousel-arrow-right');
    
            if (!track || slides.length === 0) return;
    
            // ============================================================
            // 🚫 If there is only one image → do not show arrows or animation
            // ============================================================
            if (slides.length === 1) {
                if (prevBtn) prevBtn.style.display = "none";
                if (nextBtn) nextBtn.style.display = "none";
    
                // Do not clone, do not move, do not auto-scroll
                track.style.transform = "translateX(0)";
                return;
            }
            const firstClone = slides[0].cloneNode(true);
            const lastClone = slides[slides.length - 1].cloneNode(true);
    
            firstClone.classList.add("clone");
            lastClone.classList.add("clone");
    
            // Insert clones
            track.appendChild(firstClone);
            track.insertBefore(lastClone, slides[0]);
    
            const allSlides = carousel.querySelectorAll('.portfolio-image-slide');
            let index = 1;
    
            function setInitialPosition() {
                const slideWidth = track.offsetWidth;
                track.style.transition = "none";
                track.style.transform = `translateX(-${index * slideWidth}px)`;
            }
    
            window.addEventListener("resize", setInitialPosition);
            setInitialPosition();
    
            function moveToIndex() {
                const slideWidth = track.offsetWidth;
                track.style.transition = "transform 0.45s ease-in-out";
                track.style.transform = `translateX(-${index * slideWidth}px)`;
            }
    
            if (nextBtn) {
                nextBtn.addEventListener("click", () => {
                    index++;
                    moveToIndex();
                    restartAutoScroll();
                });
            }
    
            if (prevBtn) {
                prevBtn.addEventListener("click", () => {
                    index--;
                    moveToIndex();
                    restartAutoScroll();
                });
            }
    
            // ============================================================
            // SMOOTH LOOP WITHOUT JUMPING
            // ============================================================
            track.addEventListener("transitionend", () => {
                if (allSlides[index].classList.contains("clone")) {
                    track.style.transition = "none";
    
                    if (index === allSlides.length - 1) {
                        index = 1; // go back to the first real slide
                    } else if (index === 0) {
                        index = allSlides.length - 2; // go back to the last real slide
                    }
    
                    const slideWidth = track.offsetWidth;
                    track.style.transform = `translateX(-${index * slideWidth}px)`;
                }
            });
    
            // ============================================================
            // AUTO SCROLL
            // ============================================================
            let autoScroll = setInterval(() => {
                index++;
                moveToIndex();
            }, 4000);
    
            function restartAutoScroll() {
                clearInterval(autoScroll);
                autoScroll = setInterval(() => {
                    index++;
                    moveToIndex();
                }, 4000);
            }
    
            // Pause on hover
            carousel.addEventListener("mouseenter", () => clearInterval(autoScroll));
            carousel.addEventListener("mouseleave", restartAutoScroll);
        });
    }

    initPortfolioItems();
})