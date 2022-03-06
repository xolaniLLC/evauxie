(function ($) {
"use strict";  
    
/*------------------------------------
	Sticky Menu 
--------------------------------------*/
 var windows = $(window);
    var stick = $(".header-sticky");
	windows.on('scroll',function() {    
		var scroll = windows.scrollTop();
		if (scroll < 5) {
			stick.removeClass("sticky");
		}else{
			stick.addClass("sticky");
		}
	});  
/*------------------------------------
	jQuery MeanMenu 
--------------------------------------*/
	$('.main-menu nav').meanmenu({
		meanScreenWidth: "767",
		meanMenuContainer: '.mobile-menu'
	});
    
    
    /* last  2 li child add class */
    $('ul.menu>li').slice(-2).addClass('last-elements');
/*------------------------------------
	Owl Carousel
--------------------------------------*/
    $('.slider-owl').owlCarousel({
        loop:true,
        nav:true,
        animateOut: 'fadeOut',
        animateIn: 'fadeIn',
        smartSpeed: 2500,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            768:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });

    $('.partner-owl').owlCarousel({
        loop:true,
        nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            768:{
                items:3
            },
            1000:{
                items:5
            }
        }
    });  

    $('.testimonial-owl').owlCarousel({
        loop:true,
        nav:true,
        navText:['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'],
        responsive:{
            0:{
                items:1
            },
            768:{
                items:1
            },
            1000:{
                items:1
            }
        }
    });
/*------------------------------------
	Video Player
--------------------------------------*/
    $('.video-popup').magnificPopup({
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
        zoom: {
            enabled: true,
        }
    });
    
    $('.image-popup').magnificPopup({
        type: 'image',
        gallery:{
            enabled:true
        }
    }); 
/*----------------------------
    Wow js active
------------------------------ */
    new WOW().init();
/*------------------------------------
	Scrollup
--------------------------------------*/
    $.scrollUp({
        scrollText: '<i class="fa fa-angle-up"></i>',
        easingType: 'linear',
        scrollSpeed: 900,
        animation: 'fade'
    });
/*------------------------------------
	Nicescroll
--------------------------------------*/
     $('body').scrollspy({ 
            target: '.navbar-collapse',
            offset: 95
        });
$(".notice-left").niceScroll({
            cursorcolor: "#EC1C23",
            cursorborder: "0px solid #fff",
            autohidemode: false,
            
        });

})(jQuery);	

// tabs js started

function overdueFunction() {
    document.getElementById("overdue").style.display = "block";
    document.getElementById("pending").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("allBookings").style.display = "flex";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
}
function pendingFunction() {
    document.getElementById("pending").style.display = "block";
    document.getElementById("overdue").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("allBookings").style.display = "flex";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
}
function upcomingFunction() {
    document.getElementById("upcoming").style.display = "block";
    document.getElementById("pending").style.display = "none";
    document.getElementById("overdue").style.display = "none";
    document.getElementById("allBookings").style.display = "flex";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
}
function allBookingsFunction() {
    document.getElementById("allBookings").style.display = "flex";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("pending").style.display = "none";
    document.getElementById("overdue").style.display = "block";
}
function ongoingBookingsFunction() {
    document.getElementById("ongoingBookings").style.display = "block";
    document.getElementById("allBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("pending").style.display = "none";
    document.getElementById("overdue").style.display = "block";
}
function upcomingBookingsFunction() {
    document.getElementById("upcomingBookings").style.display = "block";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("pendingBookings").style.display = "none";
    document.getElementById("allBookings").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("pending").style.display = "none";
    document.getElementById("overdue").style.display = "block";
}
function pendingBookingsFunction() {
    document.getElementById("pendingBookings").style.display = "block";
    document.getElementById("upcomingBookings").style.display = "none";
    document.getElementById("ongoingBookings").style.display = "none";
    document.getElementById("allBookings").style.display = "none";
    document.getElementById("upcoming").style.display = "none";
    document.getElementById("pending").style.display = "none";
    document.getElementById("overdue").style.display = "block";
}