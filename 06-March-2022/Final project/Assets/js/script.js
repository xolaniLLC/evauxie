

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
    



    // new task


    $(document).ready(function(){
      $("#NewTask").click(function(){

        var $task = $("#input_task").val();
        var $budget = $("#input_budget").val();
        var $minbudget = $('#min_budget').val();
         var $calend = $('#dateee').val();

         $(".chck_to_do_sec1").prepend("<div class='paln_list_menu'>"+"<div class='paln_checkbox'>"+"<i class='far fa-check-circle'></i>"+"</div>"+"<div class='paln_title'>"+"<p class='editable'>"+$task+"</p>"+"<div class='dates'>"+" <p>"+$calend+"</p>"+"<div class='icon'>"+"<img src='../Assets/icons/Frame.png' width='25px'>"+"</div>"+" <span>"+$minbudget+"$"+"-"+$budget+"$$"+"</span>"+" </div>"+"</div>"+"<div class='paln_deletebox'>"+"<i class='fas fa-times-circle'>"+"</i>"+" </div>"+"</div>")

         $(".paln_deletebox").click(function(){
          $(this).parent().remove();

         });
         });
});




// BOOKING TASK

$(document).ready(function(){
  $(".new_checklist").click(function(){

    $(".paln_bottom_sec").prepend("<div class='paln_list_menu'>"+"<div class='paln_checkbox'>"+"<i class='far fa-check-circle'></i>"+"</div>"+"<div class='paln_title'>"+"<p class='editable'>"+" "+"</p>"+"<div class='dates'>"+" <p>"+" "+"</p>"+"<div class='icon'>"+"<img src='../Assets/icons/Frame.png' width='25px'>"+"</div>"+" <span>"+"$ - $$"+"</span>"+" </div>"+"</div>"+"<div class='paln_deletebox'>"+"<i class='fas fa-times-circle'>"+"</i>"+" </div>"+"</div>")
     $(".paln_deletebox").click(function(){
      $(this).parent().remove();
     });
     });
});



      
 



  
                
                
                   
                    
                   
               
    