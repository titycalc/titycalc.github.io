.PHONY: compile
compile:
	yacc calc.y
	flex calc.lex
	gcc -c calc.y.c
	gcc -c calc.lex.c
	gcc -c main.c
	gcc calc.y.o calc.lex.o main.o
.PHONY: run
run: compile
	./a.out
