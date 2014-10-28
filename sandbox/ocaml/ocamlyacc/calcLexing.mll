{
open CalcParsing
}
rule token = parse
    ['0'-'9']+"."['0'-'9']+ { NUM(float_of_string(Lexing.lexeme lexbuf)) }
  | ['0'-'9']+ { NUM(float_of_string(Lexing.lexeme lexbuf)) }
  | '+' { PLUS }
  | '-' { MINUS }
  | '*' { STAR }
  | '/' { SLASH }
  | '(' { LPAREN }
  | ')' { RPAREN }
  | '\n' { EOL }
  | [' ' '\t'] { token lexbuf }
  | eof { EOF }
{
}