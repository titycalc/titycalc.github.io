structure Tokens = Tokens
type pos = int
type svalue = Tokens.svalue
type ('a,'b) token = ('a, 'b) Tokens.token
type lexresult = (svalue, pos) token
val pos = ref 0
fun eof () = Tokens.EOF(!pos, !pos)

%%
%header (functor CalcLexFun(structure Tokens : Calc_TOKENS));
digit=[0-9];
space=[\ \t];
%%

\n => (pos := !pos + 1; Tokens.EOL(!pos, !pos));
{space}+ => (lex());
{digit}+"."{digit}+ => ( case Real.fromString(yytext) of
                           SOME n => Tokens.NUM(n, !pos, !pos)
			 | NONE => lex() );
{digit}+ => ( case Real.fromString(yytext) of
                SOME n => Tokens.NUM(n, !pos, !pos)
              | NONE => lex() );
"+" => (Tokens.PLUS(!pos, !pos));
"-" => (Tokens.MINUS(!pos, !pos));
"*" => (Tokens.STAR(!pos, !pos));
"/" => (Tokens.SLASH(!pos, !pos));
"(" => (Tokens.LPAREN(!pos, !pos));
")" => (Tokens.RPAREN(!pos, !pos));
. => (lex());
