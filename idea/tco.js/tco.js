var escodegen = require('escodegen');
var esprima = require('esprima');

/*

{ type: 'SwitchCase',
  test: 
   { type: 'Literal',
     value: 'f',
     raw: '\'f\'' },
  consequent: 
   [ { type: 'ExpressionStatement',
       expression: [Object] } ] }

*/

var LOOP =
  "function call(__label) { " +
  "  __jmp:" +
  "  while(true) {" +
  "    switch(__label) {" +
  "    default:" +
  "      console.warn('unrecognized label: ' + __label);" +
  "      break __jmp;" +
  "    }" +
  "  }" +
  "}";

var OUTPUT = esprima.parse(LOOP);
//OUTPUT.cases = [];

var code = "function f() { return f(); }";

function appendCase(a_case) {
  OUTPUT.body[0].body.body[0].body.body.body[0].cases.unshift(a_case);
}

function optExpr(ast) {
  switch (ast.type) {
  case 'Identifier':
    return ast;
  case 'CallExpression':
    var callee = optExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optExpr(ast.arguments[i]));
    }
//    {"type":"ExpressionStatement","expression":{"type":"AssignmentExpression","operator":"=","left":{"type":"Identifier","name":"x"},"right":{"type":"Literal","value":"a","raw":"'a'"}}}
    // callee is a identifier
  //  callee.id.name;
//    console.log(ast);
    return { type: 'CallExpression'
           , callee: callee
           , arguments: args
           }
  default:
    console.warn('unrecognized ast: ' + ast.type);
  }
  //return ast;
}

function optStmt(ast) {
  switch (ast.type) {
  case 'ExpressionStatement':
    console.log(JSON.stringify(ast,null));
  case 'ReturnStatement':
    var argument = optExpr(ast.argument);
    switch (argument.type) {
    case 'CallExpression':
      switch (argument.callee.type) {
      case 'Identifier':
//        console.log(argument.callee);
	  return { type: 'BlockStatement'
                 , body: [ { type: 'ExpressionStatement'
                           , expression: { type: 'AssignmentExpression'
                                         , operator: '='
                                         , left: { type: 'Identifier'
                                                 , name: '__label'
                                                 }
                                         , right: { type: 'Literal'
                                                  , value: argument.callee.name
                                                  }
                                         }
                           }
                         , { type: 'ContinueStatement'
                           , label: { type: 'Identifier', name: '__jmp' }
                           }
                         ]
                 }
      return { type: 'ReturnStatement'
             , argument: argument
             }

      default:
        return { type: 'ReturnStatement'
               , argument: argument
               }
      }
    default:
      return { type: 'ReturnStatement'
             , argument: argument
             }
    }
  case 'BlockStatement':
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
      stmt = optStmt(stmt);
      body.push(stmt);
    }
    return { type: 'BlockStatement'
           , body: body
           };
  case 'FunctionDeclaration':
      //console.log(ast);
      var body = optStmt(ast.body);
      appendCase({ type: 'SwitchCase'
                 , test: { type: 'Literal'
                         , value: ast.id.name
                         }
                 , consequent: [body]
                 });
/*
{ type: 'FunctionDeclaration',
  id: { type: 'Identifier', name: 'f' },
  params: [],
  defaults: [],
  body: { type: 'BlockStatement', body: [ [Object] ] },
  rest: null,
  generator: false,
  expression: false }
*/
//    console.log(ast);
//      console.log(ast);
     // appendCase("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
      break;
  default:
    console.warn('unrecognized ast: ' + ast.type);
  }
}

function optProgram(ast) {
  switch (ast.type) {
  case 'Program':
//      console.log(JSON.stringify(ast.body[0].body.body[0].body.cases,null));
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
	//console.log(stmt);
      stmt = optStmt(stmt);
      body.push(stmt);
    }
    return { type: 'Program'
           , body: body
           };
  default:
    console.warn('unrecognized ast: ' + ast.type);
  }
}

//console.log(JSON.stringify(OUTPUT.body[0].body.body[0].body.body.body[0].cases,null));
//console.log(JSON.stringify(OUTPUT,null));
optProgram(esprima.parse(code));
console.log(escodegen.generate(OUTPUT, { indent: '  ' }));
//console.log(JSON.stringify(OUTPUT.body[0].body.body[0].body.body.body[0].cases,null));
