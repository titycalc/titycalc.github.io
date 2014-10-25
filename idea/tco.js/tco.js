var escodegen = require('escodegen');
var esprima = require('esprima');

var LOOP =
  "function __call(__label) { " +
  "  var __args = [].slice.call(arguments, 1);" +
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

var code = "function f(x,y,z) { return f(x,y,z); }";

function appendCase(a_case) {
  OUTPUT.body[0].body.body[1].body.body.body[0].cases.unshift(a_case);
}

function appendStmt(a_stmt) {
  OUTPUT.body.unshift(a_stmt);
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
    return { type: 'CallExpression'
           , callee: callee
           , arguments: args
           }
  default:
    console.warn('unrecognized ast: ' + ast.type);
  }
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
	  return { type: 'BlockStatement'
                 , body: [ { type: 'ExpressionStatement'
                           , expression: { type: 'AssignmentExpression'
                                         , operator: '='
                                         , left: { type: 'Identifier'
                                                 , name: '__args'
                                                 }
                                         , right: { type: 'ArrayExpression'
                                                  , elements: argument.arguments
                                                  }
                                         }
                           }
                         , { type: 'ExpressionStatement'
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
                 };

      default:
        return { type: 'ReturnStatement'
               , argument: argument
               };
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
      var body = optStmt(ast.body);
      var setParams = [];
      for (var i = 0; i < ast.params.length; ++i) {
        var param = ast.params[i];
        var setParam = { type: 'ExpressionStatement'
                       , expression: { type: 'AssignmentExpression'
                                     , operator: '='
                                     , left: param
                                     , right: { type: 'MemberExpression'
                                              , computed: true
                                              , object: { type: 'Identifier'
                                                        , name: '__args'
                                                        }
                                              , property: { type: 'Literal'
                                                          , value: i
                                                          }
                                              }
                                     }
                       }
        setParams.push(setParam);
      }
      appendCase({ type: 'SwitchCase'
                 , test: { type: 'Literal'
                         , value: ast.id.name
                         }
                 , consequent: setParams.concat([body])
                 });
      appendStmt({ type: 'FunctionDeclaration'
                 , params: ast.params
                 , body: { type: 'BlockStatement'
                         , body: [ { type: 'ReturnStatement'
                                   , argument: { type: 'CallExpression'
                                               , callee: { type: 'Identifier', name: '__call' }
                                               , arguments: [{ type: 'Literal', value: ast.id.name }].concat(ast.params)
                                               }
                                   }
                                 ]
                         }
                 , id: ast.id
                 , defaults: []
                 , rest: null
                 , generator: false
                 , expression: false
                 });
      break;
  default:
    console.warn('unrecognized ast: ' + ast.type);
  }
}

function optProgram(ast) {
  switch (ast.type) {
  case 'Program':
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
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

optProgram(esprima.parse(code));
console.log(escodegen.generate(OUTPUT, { indent: '  ' }));
