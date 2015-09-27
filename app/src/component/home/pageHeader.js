$(document).ready(function () {
    var menu = document.getElementById('mainMobileHeaderMenu');
    var menu_logout = document.getElementById('logoutMobileHeaderMenu');
    var show_hide_button = document.getElementById('btn-menu-mobile');
    var show_hide_logout_button = document.getElementById('headerMenuContainer--avatar');

    show_hide_logout_button.onclick = function(){
        if(!menu.hasAttribute('hidden')){
            hideMenu(menu);
        }
        toggleMenu(menu_logout);
    };

    show_hide_button.onclick = function(){
        if(!menu_logout.hasAttribute('hidden')){
            hideMenu(menu_logout);
        }
        toggleMenu(menu);
    };

    function toggleMenu(menu){
        if( menu.hasAttribute('hidden')){
            showMenu(menu);
        }
        else{
            hideMenu(menu);
        }
    }

    function hideMenu(menuName){
        menuName.setAttribute('hidden','hidden');
    }

    function showMenu(menuName){
        menuName.removeAttribute('hidden');
        Materialize.showStaggeredList('#' + menuName.id);
    }
});
