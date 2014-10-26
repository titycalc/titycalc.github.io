var escodegen = require('escodegen');
var esprima = require('esprima');

var LOOP =
  "function __call(__label, __env, __args) { " +
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
var COPYENV = { type: 'ObjectExpression'
              , properties: []
              };

var code = "function f(x) { function g(y) { return x; } return g }";

function appendCase(a_case) {
  OUTPUT.body[0].body.body[0].body.body.body[0].cases.unshift(a_case);
}

function appendStmt(a_stmt) {
  OUTPUT.body.push(a_stmt);
}

function appendProp(a_prop) {
  COPYENV.properties.push(a_prop);
}

function appendVar(ident) {
  var prop = { type: 'Property'
             , key: ident
             , value: { type: 'MemberExpression'
                      , object: { type: 'Identifier', name: '__env' }
                      , property: ident
                      }
             , kind: 'init'
             };
  appendProp(prop);
}

function optExpr(ast) {
  switch (ast.type) {
  case 'Identifier':
    return { type: 'MemberExpression'
           , object: { type: 'Identifier', name: '__env' }
           , property: ast
           };
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
  case 'EmptyStatement':
    return ast;
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
  case 'ExpressionStatement':
    var expr = optExpr(ast.expression);
    return { type: 'ExpressionStatement', expression: expr };
  case 'IfStatement':
    var test = optExpr(ast.test);
    var consequent = optStmt(ast.consequent);
    var alternative = ast.alternative ? optStmt(ast.alternative) : null;
    return { type: 'IfStatement'
           , test: test
           , consequent: consequent
           , alternative: alternative
           };
  case 'LabeledStatement':
    var body = optStmt(ast.body);
    return { type: 'LabeledStatement'
           , label: ast.label
           , body: body
           };
  case 'BreakStatement':
    return ast;
  case 'ContinueStatement':
    return ast;
  case 'WithStatement':
    var obj = optExpr(ast.object);
    var body = optStmt(ast.body);
    return { type: 'WithStatement'
           , object: obj
           , body: body
           }
  case 'SwitchStatement':
    var discriminant = optExpr(ast.discriminant);
    var cases = [];
    for (var i = 0; i < ast.cases; ++i) {
      var test = ast.cases[i].test ? optExpr(ast.cases[i].test) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].body; ++i) {
        body.push(optStmt(ast.cases[i].body[j]));
      }
      cases.push({ type: 'SwitchCase'
                 , test: test
                 , body: body
                 });
    }
    return { type: 'SwitchStatement'
           , discriminant: discriminant
           , cases: cases
           , lexical: ast.lexical
           }
  case 'ThrowStatement':
    var arg = optExpr(ast.argument);
    return { type: 'ThrowStatement'
           , argument: arg
           }
  case 'TryStatement':
    // TODO
  case 'WhileStatement':
    var test = optExpr(ast.test);
    var body = optExpr(ast.body);
    return { type: 'WhileStatement'
           , test: test
           , body: body
           }
  case 'DoWhileStatement':
    var test = optExpr(ast.test);
    var body = optExpr(ast.body);
    return { type: 'DoWhileStatement'
           , test: test
           , body: body
           }
  case 'ForStatement':
    // TODO
  case 'ForInStatement':
    // TODO
  case 'ForOfStatement':
    // TODO
  case 'LetStatement':
    // TODO
  case 'DebuggerStatement':
    return ast;
  case 'VariableDeclaration':
    var declarations = [];
    for (var i = 0; i < ast.declarations.length; ++i) {
      var declaration = ast.declarations[i];
      if (declaration.init) {
        declarations.push({ type: 'VariableDeclarator'
                          , id: declaration.id
                          , init: optExpr(declaration.init)
                          })
      } else {
        declarations.push(declaration);
      }
    }
    return { type: 'VariableDeclaration'
           , declarations: declarations
           , kind: ast.kind
           };
  case 'ReturnStatement':
    var argument = optExpr(ast.argument);
    switch (argument.type) {
    case 'CallExpression':
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
                                         , right: { type: 'MemberExpression', object: argument.callee, property: { type: 'Identifier', name: 'name' } }
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
             }
    }
  case 'FunctionDeclaration':
      var body = optStmt(ast.body);
      var setParams = [];
      for (var i = 0; i < ast.params.length; ++i) {
        var param = ast.params[i];
        appendVar(param);
        var setParam = { type: 'ExpressionStatement'
                       , expression: { type: 'AssignmentExpression'
                                     , operator: '='
                                     , left: { type: 'MemberExpression'
                                             , object: { type: 'Identifier'
                                                       , name: '__env'
                                                       }
                                             , property: param
                                             }
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
                                               , arguments: [{ type: 'Literal', value: ast.id.name }, { type: 'ObjectExpression', properties: [] }, { type: 'ArrayExpression', elements: ast.params }]
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
      return { type: 'ExpressionStatement'
             , expression: { type: 'AssignmentExpression'
                           , operator: '='
                           , left: { type: 'MemberExpression'
                                   , object: { type: 'Identifier'
                                             , name: '__env'
                                             }
                                   , property: ast.id
                                   }
                           , right: { type: 'ObjectExpression'
                                    , properties: [
                                        { type: 'Property'
                                        , key: { type: 'Identifier', name: 'env' }
                                        , value: COPYENV
                                        , kind: 'init'
                                        }
                                      , { type: 'Property'
                                      , key: { type: 'Identifier', name: 'label' }
                                      , value: { type: 'Literal', value: ast.id.name }
                                      , kind: 'init'
                                      }
                           ]}}};
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
