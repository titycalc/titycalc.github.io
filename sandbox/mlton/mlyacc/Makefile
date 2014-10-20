calc.grm.sml: calc.grm
	mlyacc calc.grm
calc.grm.sig: calc.grm
	mlyacc calc.grm
calc.lex.sml: calc.lex
	mllex calc.lex
main: main.sml calc.lex.sml calc.grm.sml main.mlb
	mlton main.mlb
.PHONY: compile
compile: main
	true
.PHONY: run
run: main
	./main
