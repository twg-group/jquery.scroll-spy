(function ($) {
    'use strict';

    let defaults = {
        activeClass: 'active',
        fixed: true
    };

    let container,
        target,
        activeClass,
        fixed,
        collection = [];

    let init = function (params) {
        let options = $.extend({}, defaults, params);

        container = this;
        target = options.target;
        activeClass = options.activeClass;
        fixed = options.fixed;

        let hash = null;
        $.each(target, function () {
            (hash = this.href.split('#')[1]) !== undefined ? collection.push({
                link: $(this),
                element: container.find(`[id="${hash}"]`)
            }) : null;
        });
        this.unbind('scroll', eventListener).bind('scroll', eventListener);
        return this;
    };

    let eventListener = function () {
        $.each(collection, function () {
            let calc = this.element.offset().top + this.element.outerHeight() - container.offset().top;
            if ((calc > 0 && calc < this.element.outerHeight()) ||
                Math.floor(this.element.offset().top - container.offset().top) === 0) {
                if (!this.link.hasClass(activeClass)) {
                    target.removeClass(activeClass);
                    this.link.addClass(activeClass);
                }
                return false;
            } else if (fixed) {
                this.link.removeClass('active');
            }
        });
    };

    $.fn.scrollSpy = function (options) {
        if (typeof options === 'object' && typeof options.target != "undefined") {
            return init.apply(this, arguments);
        } else {
            $.error('You should use plugin with required options...');
        }
    };

})(jQuery);
