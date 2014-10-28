.PHONY: compile
compile: calcLexing.mll calcParsing.mly main.ml
	ocamllex calcLexing.mll
	ocamlyacc calcParsing.mly
	ocamlc -c calcParsing.mli
	ocamlc -c calcParsing.ml
	ocamlc -c calcLexing.ml
	ocamlc -c main.ml
	ocamlc -o a.out calcLexing.cmo calcParsing.cmo main.cmo
.PHONY: run
run: compile
	./a.out
