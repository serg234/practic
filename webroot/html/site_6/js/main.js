/**
 * Created by kisel on 04.11.2015.
 */
$(function(){
    var prev =1;
    var currPage =1;
    var body =$('body');
    var main = $('#main-content');
    body.css('height',Math.round($('html').height())+'px');
    body.css('max-height',Math.round($('html').height())+'px');
    body.css('min-height',Math.round($('html').height())+'px');
    var rounds = $('.nav-item');
    var maxHeight = $('body').height();
    var headerHeight = maxHeight/5.4;
    var sectionHeight = maxHeight-headerHeight;
    var resize;
    endAnimation = true;
    main.scrollLeft(0,0);
    main.scrollTop(0,0);

    $(window).resize(function(e){
      body.css('height',Math.round($('html').height())+'px');
      body.css('max-height',Math.round($('html').height())+'px');
      body.css('min-height',Math.round($('html').height())+'px');
      maxHeight = $('body').height();
      resize();
    });
    // ---------------- Navigation -----------------
    var move =function(page){
       if(endAnimation) {
           endAnimation = false;
           if (page == 1) {
               if (prev < 5) {
                   //body.scrollTop(0, 0);
                   main.animate({scrollLeft: 0}, '500', function () {
                       endAnimation = true;
                   });
               } else {
                   main.animate({scrollTop: 0}, '500',function () {
                       endAnimation = true;
                       main.scrollLeft(0, 0);
                   });

               }
               prev = 1;
           } else if (page < 5) {
               if (prev < 5) {
                   //body.scrollLeft(body.width(), 0);
                   main.animate({scrollLeft:body.width()*(page-1)}, '500',function () {
                       endAnimation = true;
                   });
               } else {
                   main.animate({scrollTop: 0}, '500',function () {
                       main.scrollLeft(body.width()*(page-1),0);
                       endAnimation = true;
                   });
               }
               prev = page;
               //body.animate({scrollTop: (page-1)*800}, '500');
           } else if (page == 5) {
               if (prev < 5) {
                   main.animate({scrollTop: maxHeight}, '500',function () {
                       main.scrollLeft(3*body.width(),0 );
                       endAnimation = true;
                   });

               } else {
                   main.animate({scrollTop: maxHeight}, '500',function () {
                       main.scrollLeft(3*body.width(),0);
                       endAnimation = true;
                   });
               }
               prev = page;
           } else {
               if (prev < 5) {
                   main.animate({scrollTop: (page-4)*maxHeight}, '500',function () {
                       endAnimation = true;
                   });
                   main.scrollLeft(3*body.width(), 0);
               } else {
                   main.animate({scrollTop:(page-4)*maxHeight}, '500',function () {
                       endAnimation = true;
                   });
               }
               prev = page;
           }
           rounds.removeClass("nav-active");
           $(rounds[page - 1]).addClass("nav-active");
       }
    };


    $('#nav-menu .nav-item').click(function(e){
        var page = $(e.currentTarget).attr("data-page");
        //$('li').removeClass("nav-active");
        //$(e.currentTarget).addClass("nav-active");
        move(page);
        /*$('section').removeClass('in');
        $("#page"+page).addClass('in');*/
    });

    $('.next-button').click(function(e){
        page = +prev+1;
        if(page > 11) page=1;
        /*var rounds = $('.nav-item');
        rounds.removeClass("nav-active");
        $(rounds[page-1]).addClass("nav-active");*/
        move(page);
    });

    /*------------------------------------------------- Mouse Wheel ------------------------------------------------------*/

    var onWheel = function (e) {
            e = e || window.event;
            var delta = e.deltaY || e.detail || e.wheelDelta;
            if (delta < 0) { if((+prev-1)<1) move(11); else move(+prev-1);}
            else if (delta > 0) { if((+prev+1)>11) move(1); else move(+prev+1)};
            return false;
    };

    var mouseWheel = function() {
        var scroll_element = document.body;
        setTimeout(function(){
            if (scroll_element.addEventListener) {
                if ('onwheel' in document) {
                    // IE9ght+, FF17+, Ch31+
                    scroll_element.addEventListener("wheel", onWheel);
                } else if ('onmousewheel' in document) {
                    // устаревший вариант события
                    scroll_element.addEventListener("mousewheel", onWheel);
                } else {
                    // Firefox < 17
                    scroll_element.addEventListener("MozMousePixelScroll", onWheel);
                }
            } else { // IE8-
                scroll_element.attachEvent("onmousewheel", onWheel);
            }
        },800);
    };

    /*----------------------------------------------- End mouse Wheel ----------------------------------------------------*/

    mouseWheel();


    // --------------------------------------swipe -----------------------------

    var swipe_x;

    $(body).on('touchstart',function(e){
        var touch = e.originalEvent.touches[0];
        swipe_x = touch.clientX;
        swipe = true;
    });

    $(body).on('touchmove',function(e){
        var touches = e.originalEvent.touches;
        console.log(touches);
        if((touches[0].clientX-swipe_x)>40){
            if((+prev-1)<1) move(11); else move(+prev-1);
        } else if ((touches[0].clientX-swipe_x)<-40) {
            if((+prev+1)>11) move(1); else move(+prev+1);

        }
    });

    // -------------------------------------swipe end ----------------------------


    // ---------------- Navigation end-----------------


    resize = function(){
       var headerHeight = maxHeight/5.4;
       if((body.width()-maxHeight) < 0&&body.width()>640) headerHeight = 90;
       var sectionHeight = maxHeight-headerHeight;
       $('section').css('height',Math.round(sectionHeight)+'px');
       $('section').css('max-height',Math.round(sectionHeight)+'px');
       $('section').css('min-height',Math.round(sectionHeight)+'px');
       $('.head').css('height',Math.round(headerHeight)+'px');
       $('section').css('margin-top',Math.round(headerHeight)+'px');
       $('#page2,#page3,#page4').css('margin-top',0);
       $('.second-col,.third-col,.first-col').css('height',Math.round(sectionHeight)+'px');
       if((body.width()-maxHeight) < 0 )$('.second-col,.third-col,.first-col').css('height','33.33%');
    };

    resize();
    //------------------language ----------------------

    $('.lang-icon img').click(
        function(e){
            $('.lang-icon img').removeClass('flag-active');
            $(e.currentTarget).addClass('flag-active');
        }
    )

    //---------------end language ----------------------

    //---------------Top menu icon ---------------------

    $('.top-menu-icon').click(function (e){
        $('.top-menu ul').toggle(200);
    });

    $('body').click(function(e){
        if(!$(e.target).hasClass('menu-icon-img')){
            if(body.width() < 640 ) $('.top-menu ul').hide(200);
        } ;
    });

    $(".top-menu ul > li").click(
        function(e){
            $(".top-menu ul > li").removeClass('active');
            $(this).addClass('active');
            move($(this).attr('data-page'));
        }
    )

    //----------------------text hover on page5 ------------

    //-------------------globus hover on page4 ---------------------

    $('#page5 .first-col').hover(function(){
      $(this).find('#col1Text').show(200);
    },function(){
        $(this).find('#col1Text').hide(200);
    });

    $('#page5 > div').hover(function(){
        $(this).find('div p span').show(200);
    },function(){
        $(this).find('div p span').hide(200);
    });

    //---------------------end------------------------------

});