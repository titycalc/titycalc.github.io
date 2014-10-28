%{
%}
%token<float> NUM
%token PLUS MINUS STAR SLASH LPAREN RPAREN EOF EOL
%left PLUS MINUS
%left STAR SLASH
%start start
%type<[`EOF|`Ok of float]> start
%%
start:
    EOF { `EOF }
  | expr EOL { `Ok $1 }
  ;
expr:
    NUM { $1 }
  | expr PLUS expr { $1 +. $3 }
  | expr MINUS expr { $1 -. $3 }
  | expr STAR expr { $1 *. $3 }
  | expr SLASH expr { $1 /. $3 }
  | LPAREN expr RPAREN { $2 }
%%