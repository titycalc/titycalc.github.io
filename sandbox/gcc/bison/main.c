#include <stdio.h>
#include "calc.lex.h"
#include "calc.y.h"

int main(int argc, char **argv) {
  yyin = stdin;
  yyout = stdout;
  /*yylloc.first_line = 1;
  yylloc.last_line = 1;
  yylloc.first_column = 0;
  yylloc.last_column = 0;*/
  return yyparse();
}
