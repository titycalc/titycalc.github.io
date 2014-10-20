structure CalcLrVals = CalcLrValsFun(structure Token = LrParser.Token)
structure CalcLex = CalcLexFun(structure Tokens = CalcLrVals.Tokens)
structure CalcParser = Join(
                         structure LrParser = LrParser
                         structure ParserData = CalcLrVals.ParserData
                         structure Lex = CalcLex)

fun prompt () = print "- "

fun invoke lexer =
    let fun print_error(s,i,_) =
            print("Error, line " ^ Int.toString i ^ ", " ^ s ^ "\n")
    in CalcParser.parse(0, lexer, print_error, ())
        handle ParseError => (NONE, lexer)
    end

fun loop lexer =
  let val (result, lexer) = invoke lexer
      val (nextToken, lexer) = CalcParser.Stream.get lexer
      val dummyEOF = CalcLrVals.Tokens.EOF(0,0)
  in
    case result of
      SOME i => (print "= "; print(Real.toString i ^ "\n"))
    | NONE => ();
    if CalcParser.sameToken(nextToken, dummyEOF)
      then ()
      else loop lexer
  end

val lexer = CalcParser.makeLexer
              (fn _ => (prompt ();
                       case TextIO.inputLine TextIO.stdIn of
                         SOME s => s
                       | NONE => ""))

val () = loop lexer