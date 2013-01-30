function Menu(options) {
    this.menu = null;
    this.menuContent = '';
    this.button = null;
    for (var key in options) {
        this[key] = options[key];
    }
}

Menu.prototype.init = function() {
    this.setOptions();
    this.bind();
    var button = this.getButton().init();
    button.addClass('raptor-menu-button');
    return button;
};

Menu.prototype.bind = function() {
    // Bind events
};

Menu.prototype.getButton = function() {
    if (!this.button) {
        this.button = new MenuButton(this);
    }
    return this.button;
};

Menu.prototype.setOptions = function() {
    this.options.title = _(this.name + 'Title');
    this.options.icon = 'ui-icon-' + this.name;
};

Menu.prototype.getMenu = function() {
    if (!this.menu) {
        this.menu = $('<div>')
            .addClass('ui-menu ui-widget ui-widget-content ui-corner-all ' + this.options.baseClass + '-menu ' + this.raptor.options.baseClass + '-menu')
            .html(this.menuContent)
            .css('position', 'fixed')
            .hide()
            .mousedown(function(event) {
                // Prevent losing the selection on the editor target
                event.preventDefault();
            })
            .children()
            .appendTo('body');
    }
    return this.menu;
};

Menu.prototype.show = function() {
    $('.raptor-menu').hide();
    elementPositionUnder(this.getMenu().toggle(), this.getButton().getButton());
};

// Click off close event
$('html').click(function(event) {
    if (!$(event.target).hasClass('raptor-menu-button') &&
            $(event.target).closest('.raptor-menu-button').length === 0) {
        $('.raptor-menu').hide();
    }
});
