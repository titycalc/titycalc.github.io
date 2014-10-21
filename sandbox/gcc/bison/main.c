#include <stdio.h>
#include "calc.lex.h"
#include "calc.y.h"

int main(int argc, char **argv) {
  yyin = stdin;
  yyout = stdout;
  return yyparse();
}
