let _ = begin
  let lexbuf = Lexing.from_channel stdin in
  let rec loop() = begin
    print_string "- ";
    flush stdout;
    match CalcParsing.start CalcLexing.token lexbuf with
    | `EOF -> ()
    | `Ok i -> print_string "= ";
               print_float i;
               print_newline();
               flush stdout;
               loop()
  end in
  loop()
end
