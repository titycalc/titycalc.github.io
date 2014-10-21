%{
#include <stdlib.h>
#include <stdio.h>
#include "calc.y.h"
void yyerror(char *s);
%}

%option header-file="calc.lex.h"
%option outfile="calc.lex.c"
%option interactive
%option yylineno
%option noyywrap

DIGIT [0-9]

%%

[ \t] /* Skip spaces */
\n { return '\n'; }
{DIGIT}+"."{DIGIT}+ { yylval = atof(yytext); return NUM; }
{DIGIT}+ { yylval = atof(yytext); return NUM; }
"+" { return '+'; }
"-" { return '-'; }
"*" { return '*'; }
"/" { return '/'; }
"(" { return '('; }
")" { return ')'; }
. { yyerror("unrecognized character"); }

%%

void yyerror(char *s) {
  printf("Error, line %d, %s at %s\n", yylineno, s, yytext);
}
