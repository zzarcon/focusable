/*!
 * Focus element overlay (Focusable) v0.1
 * https://github.com/zzarcon/focusable
 *
 * Copyright (c) 2014 @zzarcon <hezarco@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 *
 * Date: 2014-11-18
 */

(function(exports) {
  var $columnWrapper = null;
  var $element = null;
  var isVisible = false;
  var columnClass = 'focusable-column';
  var columnSelector = '.' + columnClass;
  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: false,
    findOnResize: false,
    scrollToElement: false,
    scrollTopPadding: 0,
    scrollBottomPadding: 0,
  };

  $(document).ready(setup);

  function setup() {
    $columnWrapper = $('body');
    createPlugin();
    addStylesheet();
    addEvents();
  }

  /**
   * Defines Focusable as jQuey plugin
   * @return {jQuery object} this
   */
  function createPlugin() {
    if (!window.jQuery || !window.$ || !window.$.fn) {
      return;
    }

    $.fn.focusable = function(options) {
      Focusable.setFocus(this, options);
      return this;
    };
  }

  function addEvents() {
    $columnWrapper.on('click', columnSelector, clickOnOverlay);
    $(window).on("resize", resizeHandler);
    $(window).on("keyup", keyupHandler);
  }

  function resizeHandler() {
    if (!$element) {
      return;
    }
    //Refind the element
    $element = options.findOnResize ? $($element.selector) : $element;

    refresh();
  }

  function keyupHandler(e) {
    options.hideOnESC && e.keyCode === 27 && isVisible && hide();
  }

  function clickOnOverlay() {
    if (!options.hideOnClick) {
      return;
    }

    hide();
  }

    //Determines if the element to be focused is visible within the viewport
  function elementIsVisible(el) {
    var rect = el.getBoundingClientRect();
    var winDimens = getWindowDimensions();

    return (
      rect.top >= options.scrollTopPadding &&
      rect.left >= 0 &&
      (rect.bottom + options.scrollBottomPadding) <= winDimens.height &&
      rect.right <= winDimens.width
    );
  }

    //Returns height and width of window. Cross-browser compatible.
  function getWindowDimensions() {
    if (window.innerWidth != undefined) {
      return {
        width: window.innerWidth,
        height: window.innerHeight
      };
    } else {
      var doc = document.documentElement;
      return {
        width: doc.clientWidth,
        height: doc.clientHeight
      };
    }
  } 

  function setFocus($el, userOptions) {
    $element = $el;
    options = $.extend(options, userOptions);
    var rawElement = $el.get(0);

    //Do not try to focus if element does not exist
    if (rawElement) {
      $('body').css('overflow', 'hidden');
      createColumns();

      if (options.scrollToElement && !elementIsVisible(rawElement)) {
        var elDimens = rawElement.getBoundingClientRect(),
        winDimens = getWindowDimensions(),
        top = elDimens.bottom - (elDimens.bottom - elDimens.top),
        bottom = elDimens.bottom - winDimens.height;

        if (top - options.scrollTopPadding < 0 || rawElement.clientHeight > winDimens.height) {
          window.scrollBy(0, (top - 100) - options.scrollTopPadding); //Extra padding so element is not right at the edge of the screen
        } else {
          window.scrollBy(0, (bottom + 100) + options.scrollBottomPadding); //Extra padding so element is not right at the edge of the screen
        }
      }

      $columnWrapper.find(columnSelector).fadeIn(options.fadeDuration);
    }
    else {
      throw "Focusable: Target element does not exist.";
    }
  };

  function clearColumns() {
    $columnWrapper.find(columnSelector).remove();
  }

  function hide() {
    isVisible = false;
    $element = null;
    $('body').css('overflow', '');
    $columnWrapper.find(columnSelector).fadeOut(options.fadeDuration, clearColumns);
  }

  function createColumns(forceVisibility) {
    if (!$element) {
      return;
    }

    var createdColumns = 0;
    isVisible = true;
    clearColumns();

    while (createdColumns < 4) {
      createColumn(createdColumns);
      createdColumns++;
    }

    if (forceVisibility === true) {
      $(columnSelector).show();
    }
  }

  function createColumn(index) {
    var offset = $element.offset();
    var top = 0, left = 0, width = px($element.outerWidth()), height = "100%";
    var styles = '';

    switch (index) {
      case 0:
        width = px(offset.left);
        break;
      case 1:
        left = px(offset.left);
        height = px(offset.top);
        break;
      case 2:
        left = px(offset.left);
        top = px($element.outerHeight() + offset.top);
        break;
      case 3:
        width = "100%";
        left = px(($element.outerWidth() + offset.left));
        break;
    }

    styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height;
    $columnWrapper.prepend('<div class="' + columnClass + '" style="' + styles + '"></div>');
  }

  /**
   * Prepend px to the received value
   * @return {String}
   */
  function px(value) {
    return value + 'px';
  }

  /**
   * Create dynamic CSS rules required by the library;
   * Using this approach we avoid to include an external css file.
   * @return {Void}
   */
  function addStylesheet() {
    var sheet = (function() {
      var style = document.createElement("style");

      style.appendChild(document.createTextNode(""));
      document.head.appendChild(style);

      return style.sheet;
    })();

    sheet.insertRule(columnSelector + "{ display:none; position: absolute; z-index: 9999; background: rgba(0,0,0,0.8); }", 0);
  }

  function getActiveElement() {
    return $element;
  }

  function getOptions() {
    return options;
  }

  function getVisibility() {
    return isVisible;
  }

  function refresh() {
    createColumns(true);
  }

  exports.Focusable = {
    setFocus: setFocus,
    hide: hide,
    refresh: refresh,
    getActiveElement: getActiveElement,
    getOptions: getOptions,
    isVisible: getVisibility
  };
})(window);