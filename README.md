# Focusable [![Build Status](https://travis-ci.org/zzarcon/focusable.svg?branch=master)](https://travis-ci.org/zzarcon/focusable)

A lightweight and dependency-free micro library to easily spotlight DOM elements

You can find a live demo [here](http://zzarcon.github.io/focusable/)

## Showcase

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/list.gif)

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/header.gif)

![](https://raw.github.com/zzarcon/focus-element-overlay/master/showcase/elements.gif)

## Installation

Install via [Bower](http://bower.io)
```bash
bower install focusable
```

Install via [Component](http://component.github.io)
```bash
component install zzarcon/focusable
```

Install via [npm](http://npmjs.org)
```bash
npm install focuable
```

Or loading the script remotely
```html
<script src="//cdn.rawgit.com/zzarcon/focusable/0.1.0/focusable.js"></script>
```

## Browser Support

![Chrome](https://raw.github.com/alrra/browser-logos/master/chrome/chrome_48x48.png) | ![Firefox](https://raw.github.com/alrra/browser-logos/master/firefox/firefox_48x48.png) | ![IE](https://raw.github.com/alrra/browser-logos/master/internet-explorer/internet-explorer_48x48.png) | ![Opera](https://raw.github.com/alrra/browser-logos/master/opera/opera_48x48.png) | ![Safari](https://raw.github.com/alrra/browser-logos/master/safari/safari_48x48.png)
--- | --- | --- | --- | --- |
Canary ✔ | Nightly ✔ | No | ? | No |

## API

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

##### Options

Property | Value | Default | Description
------------ | ------------- | ------------- | -------------
fadeDuration | Number | 700 | Duration of the overlay transition (milliseconds).
hideOnClick | Boolean | false | Hides the overlay when the user click into it.
hideOnESC | Boolean | false | Hides the overlay when the user press Esc.
findOnResize | Boolean | false | Refind the element in the DOM in case that the element don't still exists.

## Development

Clone this repository and switch into it
```bash
git clone https://github.com/zzarcon/focusable && cd focusable
```

Install development dependencies
```bash
npm install
```

Run tests
```bash
make test
```

Run the example demo and open [localhost:8000](http://localhost:8000)
```
make demo
```

## Contributing

0. Check [open issues](https://github.com/zzarcon/focusable/issues)

1. [Fork it](https://github.com/zzarcon/focusable/fork)

2. Create your feature branch (`git checkout -b my-new-feature`)

3. Commit your changes (`git commit -am 'feat(name): description'`)

4. Push to the branch (`git push origin my-new-feature`)

5. Create a new [Pull Request](https://github.com/zzarcon/focusable/compare/)

## Authors

- [Hector Zarcon](https://github.com/zzarcon)
- [Tomas Aparicio](https://github.com/h2non)

## License

MIT (c) 2015 - Hector Zarco and contributors
