.PHONY: all
all: test/a_tco.js \
     test/a_tco_tco.js \
     test/closure_tco.js \
     test/closure_tco_tco.js \
     test/mutual_tco.js \
     test/mutual_tco_tco.js \
     test/yes_tco.js \
     test/yes_tco_tco.js \
     test/state_tco.js \
     test/state_tco_tco.js

tco_tco.js: tco.js
	nodejs tco.js tco.js > tco_tco.js

%_tco_tco.js: %.js tco_tco.js
	nodejs tco_tco.js $< > $@

%_tco.js: %.js tco.js
	nodejs tco.js $< > $@
