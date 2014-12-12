Focusable
=============
An awesome and lightweight library for performing spotlight in your DOM elements, setting an animated overlay to the rest of the page.

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
###### Options
Property | Value | Description
------------ | ------------- | -------------
fadeDuration | Number | Duration of the overlay transition (milliseconds).
hideOnClick | Boolean | Hides the overlay when the user click into it.
hideOnESC | Boolean | Hides the overlay when the user press Esc.
findOnResize | Boolean | Refind the element in the DOM in case that the element don't still exists.
### Dependencies
- jQuery
### TODO

- [ ] Add hightlight option
- [ ] Add comments to code
- [ ] Remove jQuery dependency
- [ ] Support multiple elements at same time
