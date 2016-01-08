Focusable [![Build Status](https://travis-ci.org/zzarcon/focusable.svg?branch=master)](https://travis-ci.org/zzarcon/focusable) [![Awesome](https://cdn.rawgit.com/sindresorhus/awesome/d7305f38d29fed78fa85652e3a63e154dd8e8829/media/badge.svg)](https://github.com/sindresorhus/awesome)
=============

[![Gitter](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/zzarcon/focusable?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
An awesome and lightweight library for performing spotlight in your DOM elements, setting an animated overlay to the rest of the page.
You can find a [live demo here](http://zzarcon.github.io/focusable/).

### Showcase

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/list.gif)

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/header.gif)

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/elements.gif)

### API
###### Set spotlight (jQuery style)
```javascript
$('#my-element').setFocus(options);
```
###### Set spotlight (through library)
```javascript
Focusable.setFocus($('#my-element'), options);
```
###### Refresh current focused element
```javascript
Focusable.refresh();
```
###### Hide spotlight
```javascript
Focusable.hide();
```
###### Get focused element
```javascript
Focusable.getActiveElement();
```
###### Get options
```javascript
Focusable.getOptions();
```

###### Options
Property | Value | Default | Description
------------ | ------------- | ------------- | -------------
fadeDuration | Number | 700 | Duration of the overlay transition (milliseconds).
hideOnClick | Boolean | false | Hides the overlay when the user click into it.
hideOnESC | Boolean | false | Hides the overlay when the user press Esc.
findOnResize | Boolean | false | Refind the element in the DOM in case that the element don't still exists.
circle | Boolean | false | Have the spotlight in a circle shape

###### Runing tests
* `npm install`
* `grunt`
* See the result of testsuite in [http://localhost:9092](http://localhost:9092)

###### Dependencies
- jQuery

###### Contributing

0. Check [open issues](https://github.com/zzarcon/focusable/issues)
1. [Fork it](https://github.com/zzarcon/focusable/fork)
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create a new Pull Request

###### Author
You can follow me on Twitter - https://twitter.com/zzarcon
