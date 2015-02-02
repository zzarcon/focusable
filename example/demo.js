(function() {
  $(document).ready(init);

  function init() {
    var focusElement = null

    $('.show').on('click', show);
    $('.hide').on('click', hide);

    function show() {
      var selector = $(this).attr('data-selector');
      var options = getOptions();
      focusElement = Focusable($(selector), options);
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
      findOnResize: $('#find-on-resize').is(':checked')
    }
  }
})();
