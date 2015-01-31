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
  var isVisible = false
  var columnClass = 'focusable-column'
  var columnSelector = '.' + columnClass

  var options = {
    fadeDuration: 700,
    hideOnClick: false,
    hideOnESC: false,
    findOnResize: false
  }

  $(document).ready(setup)

  function setup() {
    columnWrapper = $('body')
    addStylesheet()
    addEvents()
  }

  function addEvents() {
    columnWrapper.on('click', columnSelector, clickOnOverlay)
    $(window).on('resize', resizeHandler)
    $(window).on('keyup', keyupHandler)
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

  function setFocus($el, userOptions) {
    $('body').css('overflow', 'hidden')
    options = $.extend(options, userOptions)
    element = $el
    createColumns()
    columnWrapper.find(columnSelector).fadeIn(options.fadeDuration)
  }

  function clearColumns() {
    columnWrapper.find(columnSelector).remove()
  }

  function hide() {
    isVisible = false
    element = null
    $('body').css('overflow', '')
    columnWrapper.find(columnSelector).fadeOut(options.fadeDuration, clearColumns)
  }

  function createColumns(forceVisibility) {
    if (!element) { return }

    var createdColumns = 0
    isVisible = true
    clearColumns()

    while (createdColumns < 4) {
      createColumn(createdColumns)
      createdColumns++
    }

    if (forceVisibility === true) {
      $(columnSelector).show()
    }
  }

  function createColumn(index) {
    var styles = ''
    var offset = element.offset()
    var top = 0, left = 0, width = px(element.outerWidth()), height = "100%"

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

    styles = 'top:' + top + ';left:' + left + ';width:' + width + ';height:' + height
    columnWrapper.prepend('<div class="' + columnClass + '" style="' + styles + '"></div>')
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
