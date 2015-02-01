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

  var NODE_ID = 'focusaable-overlay-layer'

  var columnWrapper = null
  var element = null
  var overlay = null
  var isSetup = false
  var isVisible = false
  var body = document.body
  var columnSelector = '#' + NODE_ID + ' .column'

  var slice = Array.prototype.slice
  var hasOwn = Object.prototype.hasOwnProperty

  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: true,
    findOnResize: true
  }

  function merge(target, source) {
    for (var key in source) if (hasOwn.call(source, key)) {
      target[key] = source[key]
    }
    return target
  }

  function setup() {
    var newDiv = document.createElement('div')
    newDiv.id = NODE_ID
    body.insertBefore(newDiv, body.firstChild)
    overlay = document.querySelector('#' + NODE_ID)
    isSetup = true

    addStylesheet()
    addEvents()
  }

  function addEvents() {
    overlay.addEventListener('click', clickOnOverlay)
    //window.addEventListener('resize', resizeHandler)
    window.addEventListener('keyup', keyupHandler)
  }

  function resizeHandler() {
    if (!element) { return }
    // Refind the element
    element = options.findOnResize ? $(element.selector) : element
    refresh()
  }

  function keyupHandler(e) {
    options.hideOnESC && e.keyCode === 27 && isVisible && hide()
  }

  function clickOnOverlay() {
    if (!options.hideOnClick) { return }
    hide()
  }

  function onBodyReady(fn, args) {
    document.onreadystatechange = function () {
      if (document.readyState === 'complete') {
        body = document.body
        fn.apply(null, args)
      }
    }
  }

  function setFocus(el, userOptions) {
    if (document.readyState !== 'complete') {
      return onBodyReady(setFocus, arguments)
    } else if (body == null) {
      body = document.body
    }

    if (isSetup === false) { setup() }

    body.style.overflow = 'hidden'
    userOptions = merge(merge({}, options), userOptions)
    element = getElement(el)
    createColumns()
    overlay.style.display = 'block'

    // the transition won't happen at the same time as display: block; create a short delay
    setTimeout(function() {
      overlay.style.opacity = '1'
    }, 50)
  }

  function getElement(el) {
    return (el instanceof HTMLElement) ? el : el.get(0)
  }

  function clearColumns() {
    /* todo: review -> Convert nodeList into array */
    var columns = slice.call(overlay.querySelectorAll('.column'))
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
      document.querySelector(columnSelector).style.display = 'block'
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
        top = px(element.clientHeight + offset.top)
        break
      case 3:
        width = '100%'
        left = px(element.clientWidth + offset.left)
        break
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

    console.log(options)
    sheet.insertRule('#' + NODE_ID + '{'
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

    sheet.insertRule('#' + NODE_ID + ' .column {'
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
