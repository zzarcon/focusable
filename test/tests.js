(function() {
  "use strict";

  function isActive() {
    var $layer = $('#overlay-layer');
    var isOverlayInDom = $layer.length === 1;
    var areColumnsInDom = $layer.find('.column').length === 4;

    return isOverlayInDom && areColumnsInDom;
  }

  function find(selector) {
    return $('#qunit-fixture').find(selector);
  }

  module("Focusable", {
    setup: function() {

    }
  });

  test("Set focus on an element", function() {
    var $header = find('header');
    Focusable.setFocus($header);

    ok(isActive(), true, 'The overlay is in DOM');
    ok(Focusable.getActiveElement() == $header, true, 'The focused element is active');
  });

  test("jQuery plugin", function() {
    ok(typeof find('header').focusable === 'function', true, 'The library is defined as jQuery plugin');
  });

  //This test guarantees the default options, because a change in these options will be a breaking change
  test("Default options", function() {
    var options = Focusable.getOptions();

    ok(options.fadeDuration, 700);
    ok(!options.hideOnClick, true);
    ok(!options.hideOnESC, true);
    ok(!options.findOnResize, true);
  });

  // test("Hide focus", function() {

  //   // ok(hideOnClick: false)
  //   // ok(hideOnESC: false)
  // });

  // test("Find element on resize", function() {
  //   //findOnResize
  // });
})();