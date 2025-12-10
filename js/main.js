// DK Handyman - Main JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Header scroll behavior
    function initHeaderScroll() {
        const header = document.getElementById('header');
        const header_background = document.getElementById('header-background');
        const header_nav = document.getElementById('header-nav');
        const heroCarousel = document.getElementById('home');
        
        if (!header || !heroCarousel) return;
        
        function handleScroll() {
            const heroBottom = heroCarousel.offsetTop + heroCarousel.offsetHeight;
            const scrollPosition = window.scrollY;
            
            // Cuando el scroll pasa el hero-carousel, fijar el header en la parte superior
            if (scrollPosition >= heroBottom - header.offsetHeight) {
                header.classList.add('fixed');
                header_background.classList.add('fixed');
                header_nav.classList.add('fixed');
            } else {
                header.classList.remove('fixed');
                header_background.classList.remove('fixed');
                header_nav.classList.remove('fixed');
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

 

    // Initialize all functionality
    initHeaderScroll();
    initNavigation();
    initCallButton();

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
