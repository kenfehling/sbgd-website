var MENU_ITEMS = {
    desktop: [ 'about', 'competition', 'learn' ],
    mobile: [ 'about', 'competition', 'learn', 'follow' ]
};

var LINKS = {
    facebook: 'http://facebook.com/groups/sbgamedev',
    twitter: 'http://twitter.com',
    mail: 'http://mailchimp.com',
    rss: 'http://feedburner.com'
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
}

function goHome() {
    showTemplate('about', 'desktop');
    showTemplate('dashboard', 'mobile');
}

$(document).ready(function () {
    $('header .title').click(goHome);
    goHome();
});