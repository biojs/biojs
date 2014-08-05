/*
 * jQuery dropdown: A simple dropdown plugin
 *
 * Copyright 2013 Cory LaViska for A Beautiful Site, LLC. (http://abeautifulsite.net/)
 *
 * Licensed under the MIT license: http://opensource.org/licenses/MIT
 *
 */
var jQueryDropDown = function(){
  if (jQuery) (function (jQuery) {

    jQuery.extend($.fn, {
      dropdown: function (method, data) {

        switch (method) {
          case 'show':
            show(null, jQuery(this));
            return jQuery(this);
          case 'hide':
            hide();
            return jQuery(this);
          case 'attach':
            return jQuery(this).attr('data-dropdown', data);
          case 'detach':
            hide();
            return jQuery(this).removeAttr('data-dropdown');
          case 'disable':
            return jQuery(this).addClass('dropdown-disabled');
          case 'enable':
            hide();
            return jQuery(this).removeClass('dropdown-disabled');
        }

      }
    });

    function show(event, object) {

      var trigger = event ? jQuery(this) : object,
          dropdown = jQuery(trigger.attr('data-dropdown')),
          isOpen = trigger.hasClass('dropdown-open');

      // In some cases we don't want to show it
      if (event) {
        if (jQuery(event.target).hasClass('dropdown-ignore')) return;

        event.preventDefault();
        event.stopPropagation();
      } else {
        if (trigger !== object.target && jQuery(object.target).hasClass('dropdown-ignore')) return;
      }
      hide();

      if (isOpen || trigger.hasClass('dropdown-disabled')) return;

      // Show it
      trigger.addClass('dropdown-open');
      dropdown
        .data('dropdown-trigger', trigger)
        .show();

      // Position it
      position();
      // doing that twice is a dirty hack - but we now got a valid offset
      // for slides
      position();

      // Trigger the show callback
      dropdown
        .trigger('show', {
          dropdown: dropdown,
          trigger: trigger
        });

    }

    function hide(event) {

      // In some cases we don't hide them
      var targetGroup = typeof event !== "undefined" ? jQuery(event.target).parents() : null;

      // SW: hack for strange cases
      if( targetGroup !== null && "addBack" in targetGroup ){
        targetGroup = targetGroup.addBack();
      }else{
        targetGroup = null;
      }

      // Are we clicking anywhere in a dropdown?
      if (targetGroup && targetGroup.is('.dropdown')) {
        // Is it a dropdown menu?
        if (targetGroup.is('.dropdown-menu')) {
          // Did we click on an option? If so close it.
          // PATCHED - do no require link 
          //if (!targetGroup.is('A')) return;
        } else {
          // Nope, it's a panel. Leave it open.
          return;
        }
      }

      // Hide any dropdown that may be showing
      jQuery(document).find('.dropdown:visible').each(function () {
        var dropdown = jQuery(this);
        dropdown
        .hide()
        .removeData('dropdown-trigger')
        .trigger('hide', { dropdown: dropdown });
      });

      // Remove all dropdown-open classes
      jQuery(document).find('.dropdown-open').removeClass('dropdown-open');
    }


    function position() {

      var dropdown = jQuery('.dropdown:visible').eq(0),
          trigger = dropdown.data('dropdown-trigger'),
          hOffset = trigger ? parseInt(trigger.attr('data-horizontal-offset') || 0, 10) : null,
          vOffset = trigger ? parseInt(trigger.attr('data-vertical-offset') || 0, 10) : null;

      if (dropdown.length === 0 || !trigger) return;

      // Position the dropdown relative-to-parent...
      if (dropdown.hasClass('dropdown-relative')) {
        dropdown.offset({
          left: dropdown.hasClass('dropdown-anchor-right') ?
          trigger.position().left - (dropdown.outerWidth(true) - trigger.outerWidth(true)) - parseInt(trigger.css('margin-right'), 10) + hOffset :
          trigger.position().left + parseInt(trigger.css('margin-left'), 10) + hOffset,
          top: trigger.position().top + trigger.outerHeight(true) - parseInt(trigger.css('margin-top'), 10) + vOffset
        });
      } else {
        // ...or relative to document
        dropdown.offset({
          left: dropdown.hasClass('dropdown-anchor-right') ?
          trigger.offset().left - (dropdown.outerWidth() - trigger.outerWidth()) + hOffset : trigger.offset().left + hOffset,
          top: trigger.offset().top + trigger.outerHeight() + vOffset
        });
      }
    }

    jQuery(document).on('click.dropdown', '[data-dropdown]', show);
    jQuery(document).on('click.dropdown', hide);
    jQuery(window).on('resize', position);

  })(jQuery);
};

// custom patch for AMD support
if (typeof define === 'function' && define.amd) {
  require(["jquery"], function(jQuery){
    jQueryDropDown();
});
}else{
  jQueryDropDown();
}
