(function($) {

  "use strict";

  /* globals jQuery */

  var $html = $('html');
  var $body = $('body');

  var $panel = $('#mfn-demo-panel');
  var $overlay = $('#mfn-demo-panel-overlay');

  var classPanelOpen = 'demo-panel-open';

  /**
   * Source = iframe
   */

  function iframe(){

    if( ! $body.hasClass('source-iframe') ){
      return;
    }

    // gdpr 2.0
    $( '#consent_deny', $body ).trigger('click');
    $( '#mfn-consent-mode', $body ).remove();

    // gdpr 1.0
    $( '.mfn-gdpr-button', $body ).trigger('click');
    $( '#mfn-gdpr', $body ).remove();

    // remove popups
    $( '.mfn-popup-tmpl-display-on-start, .mfn-popup-tmpl-display-on-scroll, .mfn-popup-tmpl-display-scroll-to-element', $body ).remove();

    // prevent scroll
    $('html').removeClass('mfn-popup-browser-scroll-disabled');

    $(window).on('scroll', function(){
      $('html').removeClass('mfn-popup-browser-scroll-disabled');
    });

  }

  /**
   * Device check
   */

  function checkWindowSize() {

    const width = $(window).width();

    if (width < 768) {
      if (!$html.hasClass('is-mobile')) {
        $html.addClass('is-mobile').removeClass('is-desktop');
      }
    } else {
      if (!$html.hasClass('is-desktop')) {
        $html.addClass('is-desktop').removeClass('is-mobile');
      }
    }
  }

  /**
   * Demo panel
   */

  var panel = {

    open: function(){

      if( $html.hasClass(classPanelOpen) ){

        $overlay.fadeOut(200);
        $html.removeClass(classPanelOpen);

        // console.log(1);

      } else {

        $overlay.fadeIn(200);
        $html.addClass(classPanelOpen);

        // console.log(2);

      }

    }

  }

  /**
   * Resize
   */

  let resizeTimer;
  $(window).on('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(checkWindowSize, 100); // Wait 100ms
  });

  /**
   * Bind
   */

  function bind(){

    $('body').on('click', '#mfn-demo-panel .control.sliding, #mfn-demo-panel .panel-close, #mfn-demo-panel-overlay', function(e) {
      e.preventDefault();
      panel.open();
    });

  }

  /**
   * .ready functions
   */

  $(function() {

    checkWindowSize();
    bind();

    iframe();

  });

})(jQuery);
