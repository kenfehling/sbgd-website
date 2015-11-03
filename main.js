var MENU_ITEMS = {
    desktop: [ 'about', 'competition', 'learn' ],
    mobile: [ 'about', 'competition', 'learn', 'follow' ]
};

var LINKS = {
    facebook: 'http://facebook.com/groups/sbgamedev',
    twitter: 'https://twitter.com/sbgamedev',
    youtube: 'http://youtube.com/channel/UCphKL94CG1xWWYBlYyzIe6g',
    mail: 'http://us2.campaign-archive2.com/?u=2ad728739096f696cf3ae5d25&id=629f6b4980'
};

function findTemplate(names, device) {
    return _.find(MENU_ITEMS[device], function(item) {
        return _.contains(names, item);
    });
}

function findAndShowTemplate(names, device) {
    var template = findTemplate(names, device);
    if (template) {
        showTemplate(template, device);
    }
}

function onClick(e) {
    var classes = $(e.currentTarget).get(0).classList;
    $(e.currentTarget).blur();
    findAndShowTemplate(classes, 'desktop');
    findAndShowTemplate(classes, 'mobile');
}

function registerClickHandlers() {
    var $menuItems = $('.menu-item');
    $menuItems.off('click', onClick);
    $menuItems.on('click', onClick);
}

function registerLinks() {
    _.each(LINKS, function(value, key) {
        var $a = $('a.' + key);
        $a.attr('href', value);
        $a.attr('target', '_blank');
    });
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
    registerLinks();
    $('#menu-content').removeClass('open');

    $(".about-content").typed({
        strings: [
            "Stony Brook Game Developers (SBGD) is a special interest " +
            "group of the Stony Brook Computing Society. <br><br>" +
            "Our Fall 2015 meetings are held Tuesdays from 6:00pm to 8:00pm " +
            "in the new Computer Science building, Room 115."
        ],
        typeSpeed: -20,
        contentType: 'html'
    });

    $(".competition-content").typed({
        strings: [
            "The annual Game Programming Competition is held in May " +
            "at the end of the Spring semester."
        ],
        typeSpeed: -20,
        contentType: 'html'
    });

    $(".learn-content").typed({
        strings: [
            "Resources for learning to make games:"
        ],
        typeSpeed: -20,
        contentType: 'html'
    });
}

function goHome() {
    showTemplate('about', 'desktop');
    showTemplate('dashboard', 'mobile');
}

function toggleMenu() {
    var $menu = $('#menu-content');
    if ($menu.hasClass('open')) {
        $menu.removeClass('open');
    }
    else {
        $menu.addClass('open');
    }
}

$(document).ready(function () {
    $('header .title').click(goHome);
    $('#menu-content .home').click(goHome);
    goHome();
    $('#menu-button').click(toggleMenu);
});