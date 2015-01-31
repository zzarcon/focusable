VERSION = 0.1.0
UGLIFYJS = ./node_modules/.bin/uglifyjs
MOCHA_PHANTOM = ./node_modules/.bin/mocha-phantomjs
BANNER = "/*! focusable - v$(VERSION) - MIT License - https://github.com/zzarcon/focusable */"

default: all
all: test
browser: uglify
test: browser mocha

uglify:
	$(UGLIFYJS) focusable.js --mangle --preamble $(BANNER) --source-map focusable.min.js.map --source-map-url http://cdn.rawgit.com/zzarcon/focusable/$(VERSION)/focusable.min.js.map > focusable.min.js

mocha:
	$(MOCHA_PHANTOM) --reporter bdd

loc:
	wc -l focusable.js

gzip:
	gzip -c focusable.js | wc -c
