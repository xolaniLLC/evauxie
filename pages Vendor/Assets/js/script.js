

//  Jquery section
$(document).ready(function () {
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

