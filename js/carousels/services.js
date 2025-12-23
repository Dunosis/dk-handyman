
new Swiper('#slider-cards .card-wrapper', {  
  loop: true,
  speed: 700,
  spaceBetween: 30,

  autoplay: {  
    delay: 2500,
    disableOnInteraction: false,
  },
  
  pagination: {  
    el: '#slider-cards .swiper-pagination',
    clickable: true,
    dynamicBullets: true,
  },

  navigation: {
    nextEl: '#slider-cards .swiper-button-next',
    prevEl: '#slider-cards .swiper-button-prev',
  },

  breakpoints: { 
    0: { slidesPerView: 1 },  
    768: { slidesPerView: 2 },  
    1024: { slidesPerView: 3 },  
  }
});