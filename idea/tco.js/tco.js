var fs = require('fs');
var escodegen = require('escodegen');
var esprima = require('esprima');
var LOOP = 'var __global = {}; for (var k in __global) { __global[k][0].__env = __global; }' + 'function __call(__label, __this, __env, __args) { ' + '  __jmp:' + '  while(true) {' + '    switch(__label) {' + '    default:' + '      console.error(\'unrecognized label: \' + __label);' + '      break __jmp;' + '    }' + '  }' + '}' + 'function __call1(__label, __this, __env, __args) { var ret = __call(__label, __this, __env, __args); if (typeof ret === "object" && ret.__label && ret.__env){ return function () { return __call1(ret.__label,this,ret.__env,[].slice.call(arguments)) } } else { return ret; } }' + 'function __mk(__label,__env,fn){ fn.__label = __label;fn.__env = __env;return fn; }';
var OUTPUT = esprima.parse(LOOP);
var GLOBAL = {
  type: 'ObjectExpression',
  properties: []
};
var COPYENV = {
  type: 'ObjectExpression',
  properties: []
};
function appendCase(a_case) {
  OUTPUT.body[2].body.body[0].body.body.body[0].cases.unshift(a_case);
}
function appendProp(a_prop) {
  COPYENV.properties.push(a_prop);
}
function appendVar(ident) {
  var prop = {
    type: 'Property',
    key: ident,
    value: {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: '__env'
      },
      property: ident
    },
    kind: 'init'
  };
  appendProp(prop);
}
function appendGlobalVar(ident) {
  return;
  var prop1 = {
    type: 'Property',
    key: ident,
    value: {
      type: 'ArrayExpression',
      elements: [{
          type: 'ObjectExpression',
          properties: [{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: '__label'
              },
              value: {
                type: 'Literal',
                value: ident.name
              },
              kind: 'init'
            }]
        }]
    },
    kind: 'init'
  };
  OUTPUT.body[0].declarations[0].init.properties.push(prop1);
}
var i = 0;
function gensym() {
  i += 1;
  return '__lambda_' + i;
}
function isTailCallExpr(ast) {
  switch (ast.type) {
  case 'CallExpression':
    return true;
  default:
    return false;
  }
}
function isTailCallStmt(ast) {
  switch (ast.type) {
  case 'ExpressionStatement':
    return isTailCallExpr(ast.expression);
  case 'BlockStatement':
    return isTailCallStmt(ast.body[ast.body.length - 1]);
  case 'ReturnStatement':
    return isTailCallExpr(ast.argument);
  case 'IfStatement':
    return isTailCallStmt(ast.consequent) || isTailCallStmt(ast.alternate);
  default:
    return false;
  }
}
function optLhs1(ast) {
  switch (ast.type) {
  case 'MemberExpression':
    var obj = optLhs1(ast.object);
    return {
      type: 'MemberExpression',
      object: obj,
      property: ast.property,
      computed: ast.computed
    };
  case 'Identifier':
    return { type: 'MemberExpression', object: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: '__env'
        },
        property: ast
      }, computed: true, property: {type: 'Literal', value: 0}};
default:
    console.error('unrecognized ast: ' + ast.type);
}
}
function optLhs2(ast) {
  return ast;
}
function optExpr(ast) {
  switch (ast.type) {
  case 'Literal':
    return ast;
  case 'ThisExpression':
    return {
      type: 'Identifier',
      name: '__this'
    };
  case 'Identifier':
    return { type: 'ConditionalExpression',
test:{
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: '__env'
        },
        property: ast
      },
consequent: {
      type: 'MemberExpression',
      object: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: '__env'
        },
        property: ast
      },
      property: {
        type: 'Literal',
        value: 0
      },
      computed: true
    },
alternate: /*{ type: 'MemberExpression', object: {type:'ThisExpression'},
property: */ast/* }*/
};
  case 'SequenceExpression':
    var exprs = [];
    for (var i = 0; i < ast.expressions.length; ++i) {
      exprs.push(optExpr(ast.expressions[i]));
    }
    return { type: 'SequenceExpression', expressions: exprs };
  case 'UnaryExpression':
    return { type: 'UnaryExpression', prefix: ast.prefix,
argument: optExpr(ast.argument), operator: ast.operator };
  case 'NewExpression':
    var callee = optExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i)  {
      args.push(optExpr(ast.arguments[i]));
    }
    return { type: 'NewExpression', callee: callee,
arguments: args };
  case 'AssignmentExpression':
    var lhs1 = optLhs1(ast.left);
    var lhs2 = optLhs2(ast.left);
    var rhs = optExpr(ast.right);
    return { type: 'ConditionalExpression',
test: lhs1,
consequent: {
      type: 'AssignmentExpression',
      operator: ast.operator,
      left: lhs1,
      right: rhs
    },
alternate: {
      type: 'AssignmentExpression',
      operator: ast.operator,
      left: lhs2,
      right: rhs
    }};
  case 'ConditionalExpression':
    var test = optExpr(ast.test);
    var alternate = optExpr(ast.alternate);
    var consequent = optExpr(ast.consequent);
    return { type: 'ConditionalExpression', test: test,
alternate: alternate, consequent: consequent };
  case 'BinaryExpression':
  case 'LogicalExpression':
    var lhs = optExpr(ast.left);
    var rhs = optExpr(ast.right);
    return {
      type: 'BinaryExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'MemberExpression':
    var obj = optExpr(ast.object);
    return {
      type: 'MemberExpression',
      object: obj,
      property: ast.property,
      computed: ast.computed
    };
  case 'ObjectExpression':
    var props = [];
    for (var i = 0; i < ast.properties.length; ++i) {
      var prop = ast.properties[i];
      props.push({
        type: 'Property',
        key: prop.key,
        value: optExpr(prop.value),
        kind: prop.kind
      });
    }
    return {
      type: 'ObjectExpression',
      properties: props
    };
  case 'ArrayExpression':
    var elts = [];
    for (var i = 0; i < ast.elements.length; ++i) {
      var elt = ast.elements[i];
      elts.push(optExpr(elt));
    }
    return {
      type: 'ArrayExpression',
      elements: elts
    };
  case 'FunctionExpression':
    var id = {
      type: 'Identifier',
      name: gensym()
    };
    var body = optStmt(ast.body);
    var body1 = [];
    appendVar(id);
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      appendVar(param);
      var setParam = {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: param
          },
          right: {
            type: 'ArrayExpression',
            elements: [{
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: '__args'
                },
                property: {
                  type: 'Literal',
                  value: i
                }
              }]
          }
        }
      };
      body1.push(setParam);
    }
    switch (body.type) {
    case 'BlockStatement':
      body1 = body1.concat(body.body);
      break;
    default:
      body1.push(body);
    }
    appendCase({
      type: 'SwitchCase',
      test: {
        type: 'Literal',
        value: id.name
      },
      consequent: body1
    });
    return {
      type: 'ObjectExpression',
      properties: [
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: '__env'
          },
          value: COPYENV,
          kind: 'init'
        },
        {
          type: 'Property',
          key: {
            type: 'Identifier',
            name: '__label'
          },
          value: {
            type: 'Literal',
            value: id.name
          },
          kind: 'init'
        }
      ]
    };
  case 'CallExpression':
    var callee = optExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optExpr(ast.arguments[i]));
    }
    return {
      type: 'CallExpression',
      callee: callee,
      arguments: args
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optCatchClause(ast) {
  return { type: 'CatchClause', param: ast.param,
guard: ast.guard ? optExpr(ast.guard) : null,
body: optStmt(ast.body) }
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
      switch (stmt.type) {
      case 'BlockStatement':
        body = body.concat(stmt.body);
        break;
      default:
        body.push(stmt);
      }
    }
    return {
      type: 'BlockStatement',
      body: body
    };
  case 'ExpressionStatement':
    var expr = optExpr(ast.expression);
    return {
      type: 'ExpressionStatement',
      expression: expr
    };
  case 'IfStatement':
    var test = optExpr(ast.test);
    var consequent = optStmt(ast.consequent);
    var alternate = ast.alternate ? optStmt(ast.alternate) : null;
    return {
      type: 'IfStatement',
      test: test,
      consequent: consequent,
      alternate: alternate
    };
  case 'LabeledStatement':
    var body = optStmt(ast.body);
    return {
      type: 'LabeledStatement',
      label: ast.label,
      body: body
    };
  case 'BreakStatement':
    return ast;
  case 'ContinueStatement':
    return ast;
  case 'WithStatement':
    var obj = optExpr(ast.object);
    var body = optStmt(ast.body);
    return {
      type: 'WithStatement',
      object: obj,
      body: body
    };
  case 'SwitchStatement':
    var discriminant = optExpr(ast.discriminant);
    var cases = [];
    for (var i = 0; i < ast.cases.length; ++i) {
      var test = ast.cases[i].test ? optExpr(ast.cases[i].test) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].consequent.length; ++j) {
        body.push(optStmt(ast.cases[i].consequent[j]));
      }
      cases.push({
        type: 'SwitchCase',
        test: test,
        consequent: body, lexical: ast.lexical
      });
    }
    return {
      type: 'SwitchStatement',
      discriminant: discriminant,
      cases: cases,
      lexical: ast.lexical
    };
  case 'ThrowStatement':
    var arg = optExpr(ast.argument);
    return {
      type: 'ThrowStatement',
      argument: arg
    };
  case 'TryStatement':
    var block = optStmt(ast.block);
    var handlers = [];
    for (var i = 0; i < ast.handlers.length; ++i) {
      handlers.push(optCatchClause(ast.handlers[i]));
    }
    var guardedHandlers = [];
    for (var i = 0; i < ast.guardedHandlers.length; ++i) {
      guardedHandlers.push(optCatchClause(ast.guardedHandlers[i]));
    }
    var finalizer = ast.finalizer ? optStmt(ast.finalizer) : null;
    return { type: 'TryStatement',
block: block, handlers: handlers, guardedHandlers: guardedHandlers,
finalizer: finalizer };
  case 'WhileStatement':
    var test = optExpr(ast.test);
    var body = optStmt(ast.body);
    return {
      type: 'WhileStatement',
      test: test,
      body: body
    };
  case 'DoWhileStatement':
    var test = optExpr(ast.test);
    var body = optStmt(ast.body);
    return {
      type: 'DoWhileStatement',
      test: test,
      body: body
    };
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'LetStatement':
  case 'DebuggerStatement':
    return ast;
  case 'VariableDeclaration':
    var declarations = [];
    for (var i = 0; i < ast.declarations.length; ++i) {
      var declaration = ast.declarations[i];
      if (declaration.init) {
        declarations.push({
          type: 'VariableDeclarator',
          id: declaration.id,
          init: optExpr(declaration.init)
        });
      } else {
        declarations.push(declaration);
      }
    }
    return {
      type: 'VariableDeclaration',
      declarations: declarations,
      kind: ast.kind
    };
  case 'ReturnStatement':
    if (ast.argument == null){ return { type: 'ReturnStatement' }}
    var argument = optExpr(ast.argument);
    switch (argument.type) {
    case 'CallExpression':
//console.log(ast.argument.callee.type);
      switch (ast.argument.callee.type) {
      case 'MemberExpression':
      return {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__args'
              },
              right: {
                type: 'ArrayExpression',
                elements: argument.arguments
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__label'
              },
              right: {
                type: 'MemberExpression',
                object: argument.callee,
                property: {
                  type: 'Identifier',
                  name: '__label'
                }
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__env'
              },
              right: {
                type: 'MemberExpression',
                object: argument.callee,
                property: {
                  type: 'Identifier',
                  name: '__env'
                }
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__this'
              },
              right: argument.callee.object
            }
          },
          {
            type: 'ContinueStatement',
            label: {
              type: 'Identifier',
              name: '__jmp'
            }
          }
        ]
      };
      default:
      return {
        type: 'BlockStatement',
        body: [
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__args'
              },
              right: {
                type: 'ArrayExpression',
                elements: argument.arguments
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__label'
              },
              right: {
                type: 'MemberExpression',
                object: argument.callee,
                property: {
                  type: 'Identifier',
                  name: '__label'
                }
              }
            }
          },
          {
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'Identifier',
                name: '__env'
              },
              right: {
                type: 'MemberExpression',
                object: argument.callee,
                property: {
                  type: 'Identifier',
                  name: '__env'
                }
              }
            }
          },
          {
            type: 'ContinueStatement',
            label: {
              type: 'Identifier',
              name: '__jmp'
            }
          }
        ]
      };}
    default:
      return {
        type: 'ReturnStatement',
        argument: argument
      };
    }
  case 'FunctionDeclaration':
    var body = optStmt(ast.body);
    var body1 = [];
    appendVar(ast.id);
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      appendVar(param);
      var setParam = {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: param
          },
          right: {
            type: 'ArrayExpression',
            elements: [{
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: '__args'
                },
                property: {
                  type: 'Literal',
                  value: i
                }
              }]
          }
        }
      };
      body1.push(setParam);
    }
    switch (body.type) {
    case 'BlockStatement':
      body1 = body1.concat(body.body);
      break;
    default:
      body1.push(body);
    }
    appendCase({
      type: 'SwitchCase',
      test: {
        type: 'Literal',
        value: ast.id.name
      },
      consequent: body1
    });
    return {
      type: 'ExpressionStatement',
      expression: {
        type: 'AssignmentExpression',
        operator: '=',
        left: {
          type: 'MemberExpression',
          object: {
            type: 'Identifier',
            name: '__env'
          },
          property: ast.id
        },
        right: {
          type: 'ArrayExpression',
          elements: [{
              type: 'ObjectExpression',
              properties: [
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: '__env'
                  },
                  value: COPYENV,
                  kind: 'init'
                },
                {
                  type: 'Property',
                  key: {
                    type: 'Identifier',
                    name: '__label'
                  },
                  value: {
                    type: 'Literal',
                    value: ast.id.name
                  },
                  kind: 'init'
                }
              ]
            }]
        }
      }
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optToplevelExpr(ast) {
  switch (ast.type) {
  case 'Literal':
    return ast;
  case 'ThisExpression':
    return ast;
  case 'Identifier':
    return ast;
  case 'AssignmentExpression':
    var lhs = optToplevelExpr(ast.left);
    var rhs = optToplevelExpr(ast.right);
    return {
      type: 'AssignmentExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'SequenceExpression':
    var exprs = [];
    for (var i = 0; i < ast.expressions.length; ++i) {
      exprs.push(optToplevelExpr(ast.expressions[i]));
    }
    return { type: 'SequenceExpression', expressions: exprs };
  case 'UnaryExpression':
    return { type: 'UnaryExpression', prefix: ast.prefix,
argument: optToplevelExpr(ast.argument), operator: ast.operator };
  case 'NewExpression':
    var callee = optToplevelExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i)  {
      args.push(optToplevelExpr(ast.arguments[i]));
    }
    return { type: 'NewExpression', callee: callee,
arguments: args };
  case 'ConditionalExpression':
    var test = optExpr(ast.test);
    var alternate = optExpr(ast.alternate);
    var consequent = optExpr(ast.consequent);
    return { type: 'ConditionalExpression', test: test,
alternate: alternate, consequent: consequent };
  case 'BinaryExpression':
  case 'LogicalExpression':
    var lhs = optToplevelExpr(ast.left);
    var rhs = optToplevelExpr(ast.right);
    return {
      type: 'BinaryExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'MemberExpression':
    var obj = optToplevelExpr(ast.object);
    return {
      type: 'MemberExpression',
      object: obj,
      property: ast.property,
      computed: ast.computed
    };
  case 'ObjectExpression':
    var props = [];
    for (var i = 0; i < ast.properties.length; ++i) {
      var prop = ast.properties[i];
      props.push({
        type: 'Property',
        key: prop.key,
        value: optToplevelExpr(prop.value),
        kind: prop.kind
      });
    }
    return {
      type: 'ObjectExpression',
      properties: props
    };
  case 'ArrayExpression':
    var elts = [];
    for (var i = 0; i < ast.elements.length; ++i) {
      var elt = ast.elements[i];
      elts.push(optExpr(elt));
    }
    return {
      type: 'ArrayExpression',
      elements: elts
    };
  case 'FunctionExpression':
    var id = {
      type: 'Identifier',
      name: gensym()
    };
    var body = optStmt(ast.body);
    var body1 = [];
    appendVar(id);
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      appendVar(param);
      var setParam = {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: param
          },
          right: {
            type: 'ArrayExpression',
            elements: [{
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: '__args'
                },
                property: {
                  type: 'Literal',
                  value: i
                }
              }]
          }
        }
      };
      body1.push(setParam);
    }
    switch (body.type) {
    case 'BlockStatement':
      body1 = body1.concat(body.body);
      break;
    default:
      body1.push(body);
    }
    appendCase({
      type: 'SwitchCase',
      test: {
        type: 'Literal',
        value: id.name
      },
      consequent: body1
    });
    /*if (isTailCallStmt(ast.body)) {*/
      var fn = {
        type: 'FunctionExpression',
        params: ast.params,
        body: {
          type: 'BlockStatement',
          body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: '__call1'
                },
                arguments: [
                  {
                    type: 'Literal',
                    value: id.name
                  },
                  { type: 'ThisExpression' },
                  {
                    type: 'Identifier',
                    name: '__global'
                  },
                  {
                    type: 'ArrayExpression',
                    elements: ast.params
                  }
                ]
              }
            }]
        },
        id: id,
        defaults: [],
        rest: null,
        generator: false,
        expression: false
      };
      return {
        type: 'CallExpression',
        callee: {
          type: 'Identifier',
          name: '__mk'
        },
        arguments: [
          {
            type: 'Literal',
            value: id.name
          },
          { type: 'ThisExpression' },
          fn
        ]
      };
    /*} else {
      return ast;
    }*/
    ;
  case 'CallExpression':
    var callee = optToplevelExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optToplevelExpr(ast.arguments[i]));
    }
    return {
      type: 'CallExpression',
      callee: callee,
      arguments: args
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optToplevelCatchClause(ast) {
  return { type: 'CatchClause', param: ast.param,
guard: ast.guard ? optToplevelExpr(ast.guard) : null,
body: optToplevelStmt(ast.body) }
}
function optToplevelStmt(ast) {
  switch (ast.type) {
  case 'EmptyStatement':
    return ast;
  case 'BlockStatement':
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
      stmt = optToplevelStmt(stmt);
      switch (stmt.type) {
      case 'BlockStatement':
        body = body.concat(stmt.body);
        break;
      default:
        body.push(stmt);
      }
    }
    return {
      type: 'BlockStatement',
      body: body
    };
  case 'ExpressionStatement':
    var expr = optToplevelExpr(ast.expression);
    return {
      type: 'ExpressionStatement',
      expression: expr
    };
  case 'IfStatement':
    var test = optToplvelExpr(ast.test);
    var consequent = optToplevelStmt(ast.consequent);
    var alternate = ast.alternate ? optToplevelStmt(ast.alternate) : null;
    return {
      type: 'IfStatement',
      test: test,
      consequent: consequent,
      alternate: alternate
    };
  case 'LabeledStatement':
    var body = optToplevelStmt(ast.body);
    return {
      type: 'LabeledStatement',
      label: ast.label,
      body: body
    };
  case 'BreakStatement':
    return ast;
  case 'ContinueStatement':
    return ast;
  case 'WithStatement':
    var obj = optToplevelExpr(ast.object);
    var body = optToplevelStmt(ast.body);
    return {
      type: 'WithStatement',
      object: obj,
      body: body
    };
  case 'SwitchStatement':
    var discriminant = optToplevelExpr(ast.discriminant);
    var cases = [];
    for (var i = 0; i < ast.cases.length; ++i) {
      var test = ast.cases[i].test ? opTopleveltExpr(ast.cases[i].test) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].consequent.length; ++j) {
        body.push(optToplevelStmt(ast.cases[i].consequent[j]));
      }
      cases.push({
        type: 'SwitchCase',
        test: test,
        consequent: body, lexical: ast.lexical
      });
    }
    return {
      type: 'SwitchStatement',
      discriminant: discriminant,
      cases: cases,
      lexical: ast.lexical
    };
  case 'ThrowStatement':
    var arg = optToplevelExpr(ast.argument);
    return {
      type: 'ThrowStatement',
      argument: arg
    };
  case 'TryStatement':
    var block = optToplevelStmt(ast.block);
    var handlers = [];
    for (var i = 0; i < ast.handlers.length; ++i) {
      handlers.push(optToplevelCatchClause(ast.handlers[i]));
    }
    var guardedHandlers = [];
    for (var i = 0; i < ast.guardedHandlers.length; ++i) {
      guardedHandlers.push(optToplevelCatchClause(ast.guardedHandlers[i]));
    }
    var finalizer = ast.finalizer ? optToplevelStmt(ast.finalizer) : null;
    return { type: 'TryStatement',
block: block, handlers: handlers, guardedHandlers: guardedHandlers,
finalizer: finalizer };
  case 'WhileStatement':
    var test = optToplevelExpr(ast.test);
    var body = optToplevelStmt(ast.body);
    return {
      type: 'WhileStatement',
      test: test,
      body: body
    };
  case 'DoWhileStatement':
    var test = optToplevelExpr(ast.test);
    var body = optToplevelStmt(ast.body);
    return {
      type: 'DoWhileStatement',
      test: test,
      body: body
    };
  case 'ForStatement':
  case 'ForInStatement':
  case 'ForOfStatement':
  case 'LetStatement':
  case 'DebuggerStatement':
    return ast;
  case 'VariableDeclaration':
    var decls = [];
    var body = [];
    for (var i = 0; i < ast.declarations.length; ++i) {
      decls.push({
        type: 'VariableDeclaration',
        kind: ast.kind,
        declarations: [{
            type: 'VariableDeclarator',
            id: ast.declarations[i].id
          }]
      });
    }
    for (var i = 0; i < ast.declarations.length; ++i) {
      body.push({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: ast.declarations[i].id,
          right: optToplevelExpr(ast.declarations[i].init)
        }
      });
      body.push({
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__global'
            },
            property: ast.declarations[i].id
          },
          right: {
            type: 'ArrayExpression',
            elements: [ast.declarations[i].id]
          }
        }
      });
    }
    return {
      type: 'BlockStatement',
      body: decls.concat(body)
    };
  case 'ReturnStatement':
    console.error('unexpected ast: ReturnStatement');
    break;
  case 'FunctionDeclaration':
    var body = optStmt(ast.body);
    var body1 = [];
    appendVar(ast.id);
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      appendVar(param);
      var setParam = {
        type: 'ExpressionStatement',
        expression: {
          type: 'AssignmentExpression',
          operator: '=',
          left: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: param
          },
          right: {
            type: 'ArrayExpression',
            elements: [{
                type: 'MemberExpression',
                computed: true,
                object: {
                  type: 'Identifier',
                  name: '__args'
                },
                property: {
                  type: 'Literal',
                  value: i
                }
              }]
          }
        }
      };
      body1.push(setParam);
    }
    switch (body.type) {
    case 'BlockStatement':
      body1 = body1.concat(body.body);
      break;
    default:
      body1.push(body);
    }
    appendCase({
      type: 'SwitchCase',
      test: {
        type: 'Literal',
        value: ast.id.name
      },
      consequent: body1
    });
    /*if (isTailCallStmt(ast.body)) {*/
      var decl = {
        type: 'FunctionDeclaration',
        params: ast.params,
        body: {
          type: 'BlockStatement',
          body: [{
              type: 'ReturnStatement',
              argument: {
                type: 'CallExpression',
                callee: {
                  type: 'Identifier',
                  name: '__call1'
                },
                arguments: [
                  {
                    type: 'Literal',
                    value: ast.id.name
                  },
                  { type: 'ThisExpression' },
                  {
                    type: 'Identifier',
                    name: '__global'
                  },
                  {
                    type: 'ArrayExpression',
                    elements: ast.params
                  }
                ]
              }
            }]
        },
        id: ast.id,
        defaults: [],
        rest: null,
        generator: false,
        expression: false
      };
    /*} else {
      var decl = ast;
    }*/
    return {
      type: 'BlockStatement',
      body: [
        decl,
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: decl.id,
              property: {
                type: 'Identifier',
                name: '__label'
              }
            },
            right: {
              type: 'Literal',
              value: decl.id.name
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: decl.id,
              property: {
                type: 'Identifier',
                name: '__env'
              }
            },
            right: {
              type: 'Identifier',
              name: '__global'
            }
          }
        },
        {
          type: 'ExpressionStatement',
          expression: {
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: '__global'
              },
              property: decl.id
            },
            right: {
              type: 'ArrayExpression',
              elements: [decl.id]
            }
          }
        }
      ]
    };
    ;
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optProgram(ast) {
  switch (ast.type) {
  case 'Program':
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
      stmt = optToplevelStmt(stmt);
      switch (stmt.type) {
      case 'BlockStatement':
      body = body.concat(stmt.body);
      break;
      default:
      body.push(stmt);
}
    }
    return {
      type: 'Program',
      body: body
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
fs.readFile(process.argv[2], 'utf-8', function (err, code) {
  if (err) {
    console.error(err);
    return;
  }
  var program = optProgram(esprima.parse(code));
  OUTPUT.body = OUTPUT.body.concat(program.body);
  console.log(escodegen.generate(OUTPUT, { indent: '  ' }));
});
