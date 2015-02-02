/*! focusable - v.0.1.0 - MIT License - https://github.com/zzarcon/focusable */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(['exports'], factory)
  } else if (typeof exports === 'object') {
    factory(exports)
    if (typeof module === 'object' && module !== null) {
      module.exports = exports = exports.Focusable
    }
  } else {
    factory(root)
  }
}(this, function (exports) {
  'use strict'

  var VERSION = '0.1.0'
  var NODE_ID = 'focusable-overlay'

  var slice = Array.prototype.slice
  var hasOwn = Object.prototype.hasOwnProperty

  var defaults = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: true,
    findOnResize: true
  }

  var elements = []
  var columnWrapper = null
  var overlay = null
  var isSetup = false
  var isVisible = false
  var body = document.body
  var columnSelector = '#' + NODE_ID + ' .column'

  function Focusable(element, options) {
    if (element && element.length) {
      element = element[0]
    } else if (!(element instanceof HTMLElement)) {
      throw new TypeError('First argument should be a Node or jQuery/Zepto selector')
    }

    options = merge(merge({}, defaults), options)
    spotlightElement(element, options)

    return {
      element: element,
      options: options,
      isVisible: getVisibility,
      hide: function () {
        hide(element)
      }
    }
  }

  function getVisibility() {
    return isVisible
  }

  function setup(options) {
    var newDiv = document.createElement('div')
    newDiv.id = NODE_ID
    body.insertBefore(newDiv, body.firstChild)
    overlay = newDiv
    isSetup = true

    addEvents(options)
    addStylesheet(options)
  }

  function addEvents(options) {
    if (options.hideOnESC) {
      window.addEventListener('keyup', keyupHandler)
    }
    if (options.hideOnClick) {
      overlay.addEventListener('click', hideAll)
    }
  }

  function keyupHandler(event) {
    event.keyCode === 27 && isVisible && hideAll()
  }

  function onBodyReady(fn, args) {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        body = document.body
        fn.apply(null, args)
      }
    }
  }

  function spotlightElement(element, options) {
    if (document.readyState !== 'complete') {
      return onBodyReady(spotlightElement, arguments)
    } else if (body == null) {
      body = document.body
    }

    if (isSetup === false) { setup(options) }

    setFocus(element, options)
  }

  function setFocus(element, options) {
    var styleEl = window.getComputedStyle(element)

    elements.push({
      zIndex: styleEl.getPropertyValue('z-index'),
      position: styleEl.getPropertyValue('z-index'),
      element: element
    })

    body.style.overflow = 'hidden'
    element.style.position = 'relative'
    element.style.zIndex = 10000

    if (isVisible === false) {
      createColumns(element)
    }
    overlay.style.display = 'block'

    // the transition won't happen at the same time as display: block; create a short delay
    setTimeout(function() {
      overlay.style.opacity = '1'
    }, 50)
  }

  function hide(element) {
    var index = null
    for (var i = 0, l = elements.length; i < l; i += 1) {
      if (elements[i].element === element) {
        index = i
        break
      }
    }

    var node = elements[index]
    node.element.style.zIndex = node.zIndex
    node.element.style.position = node.position

    elements.splice(index, 1)

    if (elements.length) {
      clearColumns()
      createColumns(elements[0].element)
    } else {
      hideAll()
    }
  }

  function hideAll() {
    isVisible = false
    body.style.overflow = ''
    overlay.style.display = 'none'
    clearColumns()

    elements.splice(0).forEach(function (node) {
      node.element.style.zIndex = node.zIndex
      node.element.style.position = node.position
    })
  }

  function createColumns(element) {
    var createdColumns = 0
    isVisible = true
    clearColumns()

    while (createdColumns < 4) {
      createColumn(element, createdColumns)
      createdColumns += 1
    }
  }

  function createColumn(element, index) {
    var offset = element.getBoundingClientRect()
    var top = 0, left = 0, width = px(element.clientWidth), height = '100%'

    switch (index) {
      case 0:
        width = px(offset.left)
        break
      case 1:
        left = px(offset.left)
        height = px(offset.top)
        break
      case 2:
        left = px(offset.left)
        top = px(element.clientHeight + offset.top)
        break
      case 3:
        width = '100%'
        left = px(element.clientWidth + offset.left)
        break
    }

    var styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height
    var column = createColumnDivisor(styles)
    overlay.appendChild(column)
  }

  function createColumnDivisor(styles) {
    var column = document.createElement('div')
    column.className = 'column'
    column.setAttribute('style', styles)
    return column
  }

  function clearColumns() {
    // Returns a NodeList instance with a valid length property
    var columns = overlay.querySelectorAll('#' + NODE_ID + ' .column')
    for (var i = 0, l = columns.length; i < l; i += 1) {
      columns[i].parentNode.removeChild(columns[i])
    }
  }

  function px(value) {
    return value + 'px'
  }

  function addStylesheet(options) {
    var sheet = appendStylesheet()

    sheet.insertRule('#' + NODE_ID
    + '{' +
      + 'display:none;'
      + 'opacity:0;'
      + 'transition: opacity ' + options.fadeDuration + 'ms;'
      + 'position: absolute;'
      + 'top: 0;'
      + 'left: 0;'
      + 'width: 100%;'
      + 'height: 100%;'
      + 'z-index: 9999;'
      + 'overflow: hidden;'
      + 'pointer-events: none;'
    + '}', 0)

    sheet.insertRule('#' + NODE_ID + ' .column'
    + '{'
      + 'position: absolute;'
      + 'background: rgba(0,0,0,0.8);'
      + 'pointer-events: all;'
    + '}', 1)
  }

  function appendStylesheet() {
    var style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    document.head.appendChild(style)
    return style.sheet
  }

  function merge(target, source) {
    for (var key in source) if (hasOwn.call(source, key)) {
      target[key] = source[key]
    }
    return target
  }

  exports.Focusable = Focusable
  Focusable.defaults = defaults
  Focusable.hideAll = hideAll
  Focusable.elements = elements
  Focusable.isVisible = getVisibility
  Focusable.VERSION = VERSION

}))
