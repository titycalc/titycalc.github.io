.PHONY: all
all: test/a_tco.js test/closure_tco.js test/mutual_tco.js test/yes_tco.js test/state_tco.js

%_tco.js: %.js tco.js
	nodejs tco.js $< > $@
