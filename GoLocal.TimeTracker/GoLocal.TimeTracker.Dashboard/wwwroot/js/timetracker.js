

var searchVisible = 0;
var transparent = true;

var fixedTop = false;

var navbar_initialized = false;

$(document).ready(function(){
    window_width = $(window).width();
	lbd.initRightMenu();

    
   
  
    // Fixes sub-nav not working as expected on IOS
    $('body').on('touchstart.dropdown', '.dropdown-menu', function (e) { e.stopPropagation(); });

    

    

    // Change Month DropDown
    $(".ddlMonth").change(function () {
        var selMon = $(this).val();
        window.location.href = '/Home/ByMonth?mon=' + selMon;

    }); 
});

$(document).on("click", "#lnkNotification", function (event) {
    $(".lnkNotification").removeClass('hidden');
});
$(document).on("click", "#lnkDashboard", function (event) {
    $(".lnkDashboard").removeClass('hidden');
});
$(document).on("click", "#lnkWeekly", function (event) {
    $(".lnkWeekly").removeClass('hidden');
});
$(document).on("click", "#lnkMonthly", function (event) {
    $(".lnkMonthly").removeClass('hidden');
});
$(document).on("click", "#lnkMyTeams", function (event) {
    $(".lnkMyTeams").removeClass('hidden');
});

$(document).on("click", ".ms-Icon--ChevronLeftSmall,.ms-Icon ms-Icon--ChevronRightSmall", function (event) {
    $(".lnkNextPrevWeek").removeClass('hidden');
});


$(document).on('click', '.navbar-toggle', function(){
    $toggle = $(this);

    if(lbd.misc.navbar_menu_visible === 1) {
        $('html').removeClass('nav-open');
       lbd.misc.navbar_menu_visible = 0;
        $('#bodyClick').remove();
        setTimeout(function(){
           $toggle.removeClass('toggled');
       }, 550);
    } else {
       setTimeout(function(){
           $toggle.addClass('toggled');
       }, 580);
       div = '<div id="bodyClick"></div>';
       $(div).appendTo('body').click(function() {
           $('html').removeClass('nav-open');
           lbd.misc.navbar_menu_visible = 0;
            setTimeout(function(){
               $toggle.removeClass('toggled');
               $('#bodyClick').remove();
            }, 550);
       });

      $('html').addClass('nav-open');
       lbd.misc.navbar_menu_visible = 1;
    }
});

$(window).on('resize', function(){
    if(navbar_initialized){
        lbd.initRightMenu();
        navbar_initialized = true;
    }
});

lbd = {
    misc:{
        navbar_menu_visible: 0
    },

    checkSidebarImage: function(){
        $sidebar = $('.sidebar');
        image_src = $sidebar.data('image');

        if(image_src !== undefined){
            sidebar_container = '<div class="sidebar-background" style="background-image: url(' + image_src + ') "/>'
            $sidebar.append(sidebar_container);
        }
    },

    initRightMenu: debounce(function(){
        if(!navbar_initialized){
            $sidebar_wrapper = $('.sidebar-wrapper');
            $navbar = $('nav').find('.navbar-collapse').html();

            mobile_menu_content = '';

            nav_content = $navbar;

            nav_content = '<ul class="nav nav-mobile-menu">' + nav_content + '</ul>';

            

            $sidebar_nav = $sidebar_wrapper.find(' > .nav');

            
            $nav_content = $(nav_content);
            
            $nav_content.insertBefore($sidebar_nav);
           

            $(".sidebar-wrapper .dropdown .dropdown-menu > li > a").click(function(event) {
                event.stopPropagation();

            });

            mobile_menu_initialized = true;
        } else {
            if($(window).width() > 991){
              
                $sidebar_wrapper.find('.nav-mobile-menu').remove();

                mobile_menu_initialized = false;
            }
        }
    },200)
}



function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		clearTimeout(timeout);
		timeout = setTimeout(function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		}, wait);
		if (immediate && !timeout) func.apply(context, args);
	};
};

(function () {
    // Activate side bar menu item 
    $('.nav ul li').removeClass('active');
    var pathname = window.location.pathname;
    if ((window.location.href.indexOf(pathname) > -1)) {
        var selNavPage = pathname.split('?')[0];
        if (selNavPage === "/") {
            selNavPage = selNavPage; // Dashboard url not ends with /, so do not spiliting
        } else {
            selNavPage = selNavPage.endsWith('/') ? selNavPage.slice(0, -1) : selNavPage;
        }
        $('.nav > li > a[href="' + selNavPage + '"]').parent().addClass('active');
    }
    

}());
