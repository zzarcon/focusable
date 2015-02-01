
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

  var columnWrapper = null
  var element = null
  var overlay = null
  var isVisible = false
  var columnClass = 'focusable-column'
  var columnSelector = '.' + columnClass
  var body = document.body

  var slice = Array.prototype.slice
  var hasOwn = Object.prototype.hasOwnProperty

  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: false,
    findOnResize: false
  }

  function merge(target, source) {
    target = merge({}, target)
    for (var key in source) if (hasOwn.call(source, key)) {
      target[key] = source[key]
    }
    return target
  }

  function setup() {
    var newDiv = document.createElement('div')
    newDiv.id = 'focusable-overlay-layer'
    body.insertBefore(newDiv, body.firstChild)
    overlay = document.querySelector('#focusable-overlay-layer')

    addStylesheet()
    addEvents()
  }

  function addEvents() {
    overlay.addEventListener('click', clickOnOverlay)
    window.addEventListener('resize', resizeHandler)
    window.addEventListener('keyup', keyupHandler)
  }

  function resizeHandler() {
    if (!element) { return }
    // Refind the element
    //element = options.findOnResize ? $(element.selector) : element
    refresh()
  }

  function keyupHandler(e) {
    options.hideOnESC && e.keyCode === 27 && isVisible && hide()
  }

  function clickOnOverlay() {
    if (!options.hideOnClick) { return }
    hide()
  }

  function runBodyReady(fn, args) {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        fn.apply(null, args)
      }
    }
  }

  function setFocus(el, userOptions) {
    if (document.readyState !== 'complete') {
      return runBodyReady(setFocus, arguments)
    }

    body.style.overflow = 'hidden'
    options = extend(options, userOptions)
    element = el
    createColumns()
    overlay.style.display = 'block'
    // the transition won't happen at the same time as display: block; create a short delay
    setTimeout(function() {
      overlay.style.opacity = '1'
    }, 50)
  }

  function clearColumns() {
    var columns = overlay.querySelectorAll('.column')
    /* todo: review -> Convert nodeList into array */
    columns = slice.call(columns)
    for (var i = 0, l = columns.length; i < l; i += 1) {
      columns[i].parentNode.removeChild(columns[i])
    }
  }

  function hide() {
    isVisible = false
    element = null
    body.style.overflow = ''
    overlay.style.display = 'none'
    clearColumns()
  }

  function createColumns(forceVisibility) {
    if (!element) { return }

    var createdColumns = 0
    isVisible = true
    clearColumns()

    while (createdColumns < 4) {
      createColumn(createdColumns)
      createdColumns += 1
    }

    if (forceVisibility === true) {
      $(columnSelector).show()
    }
  }

  function createColumn(index) {
    var offset = element.getBoundingClientRect()
    var columnDiv = document.createElement('div')
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
        top = px(element.outerHeight() + offset.top)
        break
      case 3:
        width = "100%"
        left = px((element.outerWidth() + offset.left))
        break;
    }

    var styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height
    columnDiv.className = 'column'
    columnDiv.setAttribute('style', styles)
    overlay.appendChild(columnDiv)
  }

  /**
   * Prepend px to the received value
   * @return {String}
   */
  function px(value) {
    return value + 'px'
  }

  /**
   * Create dynamic CSS rules required by the library;
   * Using this approach we avoid to include an external css file.
   * @return {Void}
   */
  function addStylesheet() {
    var sheet = appendStylesheet()
    sheet.insertRule(columnSelector + '{'
     + 'display:none;'
     + 'position: absolute;'
     + 'z-index: 9999;'
     + 'opacity: 0;'
     + 'transition: opacity 700ms;'
     + 'background: rgba(0,0,0,0.8);'
     + '}', 0)
  }

  function appendStylesheet() {
    var style = document.createElement('style')
    style.appendChild(document.createTextNode(''))
    document.head.appendChild(style)
    return style.sheet
  }

  function getActiveElement() {
    return element
  }

  function getOptions() {
    return options
  }

  function getVisibility() {
    return isVisible
  }

  function refresh() {
    createColumns(true)
  }

  exports.Focusable = {
    setFocus: setFocus,
    hide: hide,
    refresh: refresh,
    getActiveElement: getActiveElement,
    getOptions: getOptions,
    isVisible: getVisibility
  }

}))
