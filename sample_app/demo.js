(function() {
  $(document).ready(init);

  function init() {
    $('.show').on('click', show);
    $('.hide').on('click', hide);

    function show() {
      var selector = $(this).attr('data-selector');
      var options = getOptions();
      if ($(this).attr('data-context')) {
        options.context = $(this).attr('data-context');
      }
      Focusable.setFocus($(selector), options);
    }

    function hide() {
      Focusable.hide();
    }
  }

  function getOptions() {
    return {
      fadeDuration: parseInt($('#fade-duration').val()),
      hideOnClick: $('#hide-on-click').is(':checked'),
      hideOnESC: $('#hide-on-esc').is(':checked'),
      findOnResize: $('#find-on-resize').is(':checked'),
    };
  }
})();
