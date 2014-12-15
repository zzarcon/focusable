document.addEventListener('DOMContentLoaded', function() {
   var listeners = document.querySelectorAll('.show');
   listeners = Array.prototype.slice.call(listeners);

   for (var i = 0; i < listeners.length; i++) {
        listeners[i].addEventListener('click', show);
    }
  // document.querySelector('.hide').addEventListener('click', hide);

  function show() {
    var selector = this.getAttribute('data-selector');
    Focusable.setFocus(document.querySelector(selector));
  }

  function hide() {
    Focusable.hide();
  }
});