.PHONY: compile
compile: hello.sml hello.cm
	ml-build hello.cm Main.main hello-image
.PHONU: run
run: compile
	sml @SMLload hello-image
