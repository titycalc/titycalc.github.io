calc.grm.sml: calc.grm
	ml-yacc calc.grm
calc.grm.sig: calc.grm
	ml-yacc calc.grm
calc.lex.sml: calc.lex
	ml-lex calc.lex
.PHONY: compile
compile: main.sml calc.lex.sml calc.grm.sml main.cm
	ml-build main.cm Main.main
.PHONY: run
run: compile
	sml @SMLload main
