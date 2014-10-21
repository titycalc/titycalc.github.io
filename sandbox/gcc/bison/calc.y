%{
#include <stdio.h>
void prompt();
%}

%output "calc.y.c"
%defines "calc.y.h"
%define api.value.type {double}
%token NUM
%left '+' '-'
%left '*' '/'

%%

input : %empty { prompt(); }
      | input line { prompt(); }
      ;

line : '\n'
     | exp '\n' { printf("= %f\n", $1); }
     ;

exp : NUM { $$ = $1; }
    | exp '+' exp { $$ = $1 + $3; }
    | exp '-' exp { $$ = $1 - $3; }
    | exp '*' exp { $$ = $1 * $3; }
    | exp '/' exp { $$ = $1 / $3; }
    | '(' exp ')' { $$ = $2; }
    ;

%%

void prompt() {
  printf("- ");
}
