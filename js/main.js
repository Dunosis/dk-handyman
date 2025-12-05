// DK Handyman - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    function initHeaderScroll() {
        const header = document.getElementById('header');
        const heroCarousel = document.getElementById('home');
        
        if (!header || !heroCarousel) return;
        
        function handleScroll() {
            const heroBottom = heroCarousel.offsetTop + heroCarousel.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Cuando el scroll pasa el hero-carousel, fijar el header en la parte superior
            if (scrollPosition >= heroBottom - header.offsetHeight) {
                header.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
            }
        }
        
        // Throttle scroll event
        let ticking = false;
        window.addEventListener('scroll', function() {
            if (!ticking) {
                window.requestAnimationFrame(function() {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        });
        
        // Check initial position
        handleScroll();
    }

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
        setInterval(nextTestimonial, 8000); // Change every 8 seconds
    }

    // Navigation functionality
    function initNavigation() {
        const navButtons = document.querySelectorAll('.nav-btn, .footer-btn');
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        
        // Set active state based on current page
        function setActivePage() {
            navButtons.forEach(btn => {
                btn.classList.remove('active');
                const sectionName = btn.getAttribute('data-section');
                
                if (currentPage === 'index.html' && sectionName === 'home') {
                    btn.classList.add('active');
                } else if (currentPage === 'portfolio.html' && sectionName === 'portfolio') {
                    btn.classList.add('active');
                } else if (currentPage === 'contact.html' && sectionName === 'contact') {
                    btn.classList.add('active');
                }
            });
        }
        
        // Set initial active state
        setActivePage();

        navButtons.forEach(button => {
            button.addEventListener('click', function(e) {
                const sectionName = this.getAttribute('data-section');
                
                // Navigation routing
                if (sectionName === 'home') {
                    if (currentPage !== 'index.html') {
                        window.location.href = 'index.html';
                    } else {
                        // Scroll to top if already on home page
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                } else if (sectionName === 'portfolio') {
                    if (currentPage !== 'portfolio.html') {
                        window.location.href = 'portfolio.html';
                    }
                } else if (sectionName === 'contact') {
                    if (currentPage !== 'contact.html') {
                        window.location.href = 'contact.html';
                    }
                }
            });
        });

        // Update active nav on scroll (only for index.html)
        if (currentPage === 'index.html') {
            const sections = {
                home: document.getElementById('home'),
                portfolio: document.getElementById('portfolio'),
                contact: document.getElementById('contact')
            };

            function updateActiveNav() {
                const scrollPosition = window.scrollY + 200;

                Object.keys(sections).forEach(sectionName => {
                    const section = sections[sectionName];
                    if (section) {
                        const sectionTop = section.offsetTop;
                        const sectionHeight = section.offsetHeight;

                        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                            // Remove active from all buttons
                            document.querySelectorAll('.nav-btn, .footer-btn').forEach(btn => {
                                btn.classList.remove('active');
                            });

                            // Add active to matching buttons
                            document.querySelectorAll(`[data-section="${sectionName}"]`).forEach(btn => {
                                btn.classList.add('active');
                            });
                        }
                    }
                });
            }

            // Throttle scroll event
            let ticking = false;
            window.addEventListener('scroll', function() {
                if (!ticking) {
                    window.requestAnimationFrame(function() {
                        updateActiveNav();
                        ticking = false;
                    });
                    ticking = true;
                }
            });
        }
    }

    // Call to action button
    function initCallButton() {
        const callButton = document.querySelector('.footer-call-btn');
        if (callButton) {
            callButton.addEventListener('click', function() {
                // Replace with actual phone number link
                window.location.href = 'tel:+12543120825';
            });
        }
    }

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
                                <img src="${img}" alt="${item.name} - Image ${imgIndex + 1}">
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

    // Initialize all functionality
    initHeaderScroll();
    initCarousel();
    initServicesCarousel();
    initTestimonials();
    initNavigation();
    initCallButton();
    initPortfolioItems();

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});
