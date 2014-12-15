/*!
 * Focus element overlay (Focusable) v0.1
 * https://github.com/zzarcon/focus-element-overlay
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
  var overlay = null;
  var element = null;
  var isVisible = false;
  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: false
  };
  var body = null;

  document.addEventListener('DOMContentLoaded', setup);

  function setup() {
    body = document.body
    var newDiv = document.createElement('div')

    newDiv.id = "overlay-layer";
    body.insertBefore(newDiv, body.firstChild);
  	overlay = document.querySelector('#overlay-layer');

  	addStylesheet();
    addEvents();
  }

  function addEvents() {
    overlay.addEventListener('click', clickOnOverlay);
    window.addEventListener('resize', resizeHandler);
    window.addEventListener("keyup", keyupHandler);
  }

  function resizeHandler() {
    if (!element) {
      return;
    }
    //Refind the element
    // .selector should not be used anyway as its deprecated
    // element = options.findOnResize ? $($element.selector) : element;

    createColumns();
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

  function extend(a, b){
    for(var key in b)
        if(b.hasOwnProperty(key))
            a[key] = b[key];
    return a;
  }

  function setFocus(el, userOptions) {
    body.style.overflow = 'hidden';
    options = extend(options, userOptions);
    element = el;
    createColumns();
    overlay.style.display = "block";
    // the transition won't happen at the same time as display: block; create a short delay
    setTimeout(function() {
      overlay.style.opacity = "1";
    }, 50);
  };

  function clearColumns() {
    var columns = overlay.querySelectorAll('.column');
    /* Convert nodeList into array */
    columns = Array.prototype.slice.call(columns);
    for (var i = 0;i < columns.length; i++) {
      columns[i].parentNode.removeChild(columns[i]);
    }
  }

  function hide() {
  	isVisible = false;
    element = null;
  	body.style.overflow = '';
    overlay.style.display = "none";
    clearColumns();
  }

  function createColumns() {
  	if (!element) {
  		return;
  	}

		var createdColumns = 0;
  	isVisible = true;
  	clearColumns();

    while (createdColumns < 4) {
      createColumn(createdColumns);
      createdColumns++;
    }
  }

  function createColumn(index) {
    var offset = element.getBoundingClientRect();
    var top = 0, left = 0, width = px(element.clientWidth), height = "100%";
    var styles = '';
    var columnDiv = document.createElement('div');

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
        top = px(element.clientHeight + offset.top);
        break;
      case 3:
        width = "100%";
        left = px((element.clientWidth + offset.left));
        break;
    }

    styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height;
    columnDiv.className = "column"
    columnDiv.setAttribute('style', styles);

    overlay.appendChild(columnDiv);
  }

  function px(value) {
    return value + 'px';
  }

  function addStylesheet() {
  	var sheet = (function() {
			var style = document.createElement("style");

			style.appendChild(document.createTextNode(""));
			document.head.appendChild(style);

			return style.sheet;
		})();

		sheet.insertRule("#overlay-layer{ display:none; opacity:0; transition: opacity 700ms; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 9999; overflow: hidden; pointer-events: none; }", 0);
		sheet.insertRule("#overlay-layer .column{ position: absolute; background: rgba(0,0,0,0.8); pointer-events: all; }", 1);
  }

  exports.Focusable = {
    setFocus: setFocus,
    hide: hide,
    refresh: createColumns
  };
})(window);