.PHONY: compile
compile: main.sml main.mlb
	smltojs main.mlb
.PHONY: run
run: compile
	node MLB/Js/main-sml.js
