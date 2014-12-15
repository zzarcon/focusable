$(document).ready(function() {
  $('.show').on('click', show);
  $('.hide').on('click', hide);

  function show() {
    var selector = $(this).attr('data-selector');
    Focusable.setFocus($(selector));
  }

  function hide() {
    Focusable.hide();
  }
});