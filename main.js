var MENU_ITEMS = [ 'about', 'competition', 'learn' ];

function onClick(e) {
    var clickedItem = _.find(MENU_ITEMS, function(item) {
        return _.contains($(e.currentTarget).get(0).classList, item);
    });
    showTemplate(clickedItem);
}

function registerClickHandlers() {
    var $menuItems = $('.menu-item');

    console.log($menuItems);

    $menuItems.off('click', onClick);
    $menuItems.on('click', onClick);
}

function showTemplate(name, device) {
    var template = $('#' + name + 'Tpl').html();
    var html = Mustache.to_html(template);
    if (device) {
        $('.' + device + '-content').html(html);
    }
    else {
        $('.content').html(html);
    }
    registerClickHandlers();
}

function goHome() {
    showTemplate('about', 'desktop');
    showTemplate('dashboard', 'mobile');
}

$(document).ready(function () {
    $('header .title').click(goHome);
    goHome();
});