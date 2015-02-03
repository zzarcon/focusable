function isActive() {
  var areColumnsInDom = $('.focusable-column').length === 4;
  return areColumnsInDom;
}

/**
 * Return a element wrapping the find in the quinit fixture DOM
 */
function find(selector) {
  return $('#qunit-fixture').find(selector);
}

suite('focusable', function () {
  test('Set focus on an element', function() {
    var $element = find('header');
    Focusable.setFocus($element);

    ok(isActive(), true, 'The overlay is in DOM');
    ok(Focusable.getActiveElement() == $element, true, 'The focused element is active');
  });

  test("jQuery plugin", function() {
    ok(typeof find('header').focusable === 'function', true, 'The library is defined as jQuery plugin');
  });

  // This test guarantees the default options, because a change in these options will be a breaking change
  test("Default options", function() {
    var options = Focusable.getOptions();

    ok(options.fadeDuration, 700);
    ok(!options.hideOnClick, true);
    ok(!options.hideOnESC, true);
    ok(!options.findOnResize, true);
  });

  test("Hide focus", function() {
    var $element = find('li:first');

    Focusable.setFocus($element);
    ok(isActive(), true, 'The overlay is in DOM');

    Focusable.hide();
    ok(isActive(), false, 'The overlay is inactive');
  });

  test("Hide options", function(assert) {
    assert.expect(2);
    Focusable.setFocus(find('ul'), {
      hideOnClick: true,
      hideOnESC: true
    });

    assert.ok(isActive(), true, 'The overlay is in DOM');

    //Simulate click on overlay
    $('#overlay-layer .column:first').click();
    assert.ok(isActive(), false, 'The overlay is inactive');
  });
})
