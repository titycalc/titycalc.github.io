.PHONY: compile
compile: hello.sml hello.cm
	ml-build hello.cm Main.main hello-image
.PHONY: run
run: compile
	sml @SMLload hello-image
