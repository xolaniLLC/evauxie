

//  Jquery section

$(document).ready(function () {

  /** Debut main **/

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
  /* $('.main-menu nav').meanmenu({
     meanScreenWidth: "767",
     meanMenuContainer: '.mobile-menu'
   }); */


  /* last  2 li child add class */
  $('ul.menu>li').slice(-2).addClass('last-elements');
  /*------------------------------------
    Owl Carousel
  --------------------------------------*/
/*  $('.slider-owl').owlCarousel({
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

  */

  /*------------------------------------
    Video Player
  --------------------------------------*/
  /*$('.video-popup').magnificPopup({
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
  }); */
  /*----------------------------
      Wow js active
  ------------------------------ */
  //new WOW().init();
  /*------------------------------------
    Scrollup
  --------------------------------------*/
  /*$.scrollUp({
     scrollText: '<i class="fa fa-angle-up"></i>',
     easingType: 'linear',
     scrollSpeed: 900,
     animation: 'fade'
   });*/
  /*------------------------------------
    Nicescroll
  --------------------------------------*/
  $('body').scrollspy({
    target: '.navbar-collapse',
    offset: 95
  });
  /* $(".notice-left").niceScroll({
     cursorcolor: "#EC1C23",
     cursorborder: "0px solid #fff",
     autohidemode: false,

   });*/

  /** Fin main **/

  let x = 1
  $(".menu-button").on("click", function () {
    if(x == 1){
      $(".Nav-menu").toggleClass("Nav-menu-active");
      $(".Nav-menu").removeClass("Nav-menu-active-re");
      x = 0;
    }
    else{
      $(".Nav-menu").toggleClass("Nav-menu-active-re");
      $(".Nav-menu").removeClass("Nav-menu-active");
      x = 1
    }
  });
});
$(document).ready(function () {
  let x = 1
  $(".fav_fil_catga_btn").on("click", function () {
    if(x == 1){
      $(".fav_fil_catga").addClass("active");
      x = 0;
    }
    else{
      $(".fav_fil_catga").removeClass("active");
      x = 1
    }
  });
});


$(".menu-button").click( function() {
  $(".icon").toggleClass("close");
});
$(".plan_tol_list").click(function(){
  // self clicking close
  if($(this).prev(".menu_list").hasClass("active")){
    $(this).prev(".menu_list").removeClass("active").slideUp()
    $(".menu_list").next(".plan_tol_list").removeClass("plan_close").addClass("plan_icon");
    $(this).removeClass("plan_close").addClass("plan_icon")
  }
  else{
    $("li .menu_list").removeClass("active").slideUp()
    $(this).prev(".menu_list").addClass("active").slideDown()
    $(".menu_list").next(".plan_tol_list").removeClass("plan_close").addClass("plan_icon");
    $(this).removeClass("plan_icon").addClass("plan_close")
  }
});

$('.editable').on('click', function() {
  var that = $(this);
  if (that.find('input').length > 0) {
    return;
  }
  var currentText = that.text();

  var $input = $('<input>').val(currentText)
    .css({
      'position': 'absolute',
      top: '0px',
      left: '0px',
      opacity: 0.9,
      padding: '5px',
      border: 'none',
      outline: 'none',
      background: '#E5E5E5'
    });

  $(this).append($input);

  // Handle outside click
  $(document).click(function(event) {
    if(!$(event.target).closest('.editable').length) {
      if ($input.val()) {
        that.text($input.val());
      }
      that.find('input').remove();
    }
  });
});

$(".dropdown-menu li a").click(function(){

  $(".btn:first-child").html($(this).text()+' <span class="caret"></span>');

});
