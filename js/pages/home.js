var homePageContainer = $("#home_page_container");
$(document).ready(function() {
    // banner swiper
    var bannerSwiper = new Swiper('.swiper-container.banner-swiper', {
        loop: false,
        slidesPerView: 1,
        centeredSlides: true,
        watchSlidesProgress: true,
        effect: 'coverflow',
        coverflowEffect: {
            rotate: 30,
            slideShadows: false,
        },
        lazy: {
            preloadImages: false,
            loadPrevNext: true,
            loadPrevNextAmount: 2,
        },
        scrollbar: {
            el: '.swiper-scrollbar',
            draggable: true,
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true,
        },
        // autoplay: {
        //     delay: 2000,
        // },
        breakpoints: {
            991.98: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
        },
    });

    // let scrollBarDrag = homePageContainer.find(".banner-section .swiper-scrollbar .swiper-scrollbar-drag");
    // let scrollBarOldInitialWidth = scrollBarDrag.outerWidth();
    // bannerSwiper.on("slideChange", function() {
    //     let currentSlideNumber = bannerSwiper.activeIndex + 1;
    //     scrollBarDrag.css("width", scrollBarOldInitialWidth * currentSlideNumber);
    // });



    // reviews swiper
    var reviewsSwiper = new Swiper('.swiper-container.reviews-swiper', {
        loop: false,
        slidesPerView: 1,
        spaceBetween: 20,
        lazy: {
            preloadImages: false,
            loadPrevNext: true,
            loadPrevNextAmount: 4,
        },
        navigation: {
            nextEl: '.swiper-btn-next-reviews',
            prevEl: '.swiper-btn-prev-reviews'
        },
        breakpoints: {
            991.98: {
                slidesPerView: 2,
                spaceBetween: 20,
                watchSlidesVisibility: true,
            },
        }
    });
});