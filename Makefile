VERSION = 0.1.0
BROWSERIFY = node ./node_modules/browserify/bin/cmd.js
UGLIFYJS = ./node_modules/.bin/uglifyjs
BANNER = "/*! focusable - v$(VERSION) - MIT License - https://github.com/zzarcon/focusable */"
MOCHA_PHANTOM = ./node_modules/.bin/mocha-phantomjs

default: all
all: test
browser: uglify
test: browser mocha

uglify:
	$(UGLIFYJS) focusable.js --mangle --preamble $(BANNER) --source-map focusable.min.js.map --source-map-url http://cdn.rawgit.com/lil-js/http/$(VERSION)/focusable.min.js.map > focusable.min.js

mocha:
	$(MOCHA_PHANTOM) --ui bdd

loc:
	wc -l focusable.js

gzip:
	gzip -c focusable.js | wc -c

publish: browser release
	git push --tags origin HEAD:master