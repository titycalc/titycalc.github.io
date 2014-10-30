var fs = require('fs');
var escodegen = require('escodegen');
var esprima = require('esprima');
var LOOP = 'var __global = {}; for (var k in __global) { __global[k][0].__env = __global; }' + 'function __call(__label, __this, __env, __args) { ' + '  __jmp:' + '  while(true) {' + '    switch(__label) {' + '    default:' + '      console.error(\'unrecognized label: \' + __label);' + '      break __jmp;' + '    }' + '  }' + '}' + 'function __call1(__label, __this, __env, __args) { var ret = __call(__label, __this, __env, __args); if (typeof ret === "object" && ret.__label && ret.__env){ return function () { return __call1(ret.__label,this,ret.__env,[].slice.call(arguments)) } } else { return ret; } }' +
'function __mk(__label,__env,fn){ fn.__label = __label;fn.__env = __env;return fn; }';
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
    return {
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
    };
  case 'AssignmentExpression':
    var lhs = optExpr(ast.left);
    var rhs = optExpr(ast.right);
    return {
      type: 'AssignmentExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'BinaryExpression':
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
      property: ast.property
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
    for (var i = 0; i < ast.cases; ++i) {
      var test = ast.cases[i].test ? optExpr(ast.cases[i].test) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].body.length; ++i) {
        body.push(optStmt(ast.cases[i].body[j]));
      }
      cases.push({
        type: 'SwitchCase',
        test: test,
        body: body
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
    var argument = optExpr(ast.argument);
    switch (argument.type) {
    case 'CallExpression':
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
      };
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
  case 'BinaryExpression':
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
      property: ast.property
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
    if (isTailCallStmt(ast.body)) {
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
      //return fn;
      return { type: 'CallExpression', callee: {type:'Identifier',name:'__mk'}, arguments:[{type:'Literal',value:id.name},{type:'ThisExpression'},fn] }
    } else {
      return ast;
    }
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
    for (var i = 0; i < ast.cases; ++i) {
      var test = ast.cases[i].test ? opTopleveltExpr(ast.cases[i].test) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].body.length; ++i) {
        body.push(optToplevelStmt(ast.cases[i].body[j]));
      }
      cases.push({
        type: 'SwitchCase',
        test: test,
        body: body
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
//    var declarations = [];
    var decls = [];
    var body = [];
    for (var i = 0; i < ast.declarations.length; ++i) {
      decls.push({
type: 'VariableDeclaration', kind: ast.kind, declarations: [
  { type: 'VariableDeclarator', id: ast.declarations[i].id }
]
       });
    }
//console.log(ast.declarations.length);
    for (var i = 0; i < ast.declarations.length; ++i) {
//console.log(i);
//console.log(ast.declarations[i]);
      body.push({ type: 'ExpressionStatement',
expression: { type: 'AssignmentExpression',
operator: '=', left: ast.declarations[i].id, right: optToplevelExpr(ast.declarations[i].init) } });
      body.push(
          {type: 'ExpressionStatement',
expression: {type: 'AssignmentExpression', operator: '=',
left: {type: 'MemberExpression',object: {type:'Identifier',name:'__global'},property:ast.declarations[i].id}, right: {
      type: 'ArrayExpression',
      elements: [ast.declarations[i].id/*{
          type: 'ObjectExpression',
          properties: [{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: '__label'
              },
              value: {
                type: 'MemberExpression',
                object: ast.declarations[i].id,
                property: {type:'Identifier',name:'__label'}
              },
              kind: 'init'
            },{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: '__env'
              },
              value: {
                type: 'MemberExpression',
                object: ast.declarations[i].id,
                property: {type:'Identifier',name:'__env'}
              },
              kind: 'init'
            }]
        }*/]
    }}})
    }
    /*for (var i = 0; i < ast.declarations.length; ++i) {
      var declaration = ast.declarations[i];
      //appendGlobalVar(declaration.id);
      if (declaration.init) {
        declarations.push({
          type: 'VariableDeclarator',
          id: declaration.id,
          init: optToplevelExpr(declaration.init)
        });
      } else {
        declarations.push(declaration);
      }
    }*/
    /*return {
      type: 'VariableDeclaration',
      declarations: declarations,
      kind: ast.kind
    };*/
    return { type: 'BlockStatement', body: decls.concat(body) };
  case 'ReturnStatement':
    console.error('unexpected ast: ReturnStatement');
    break;
  case 'FunctionDeclaration':
    var body = optStmt(ast.body);
    var body1 = [];
    appendVar(ast.id);
    //appendGlobalVar(ast.id);
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
    if (isTailCallStmt(ast.body)) {
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
      //return decl;
    } else {
      var decl = ast;
    }
      return { type: 'BlockStatement', body: [decl,
					      {type: 'ExpressionStatement',
expression: { type: 'AssignmentExpression',operator:'=',left: {type: 'MemberExpression',object:decl.id,property:{type:'Identifier',name:'__label'}},right: {type: 'Literal',value:decl.id.name} }},
					      {type: 'ExpressionStatement',
expression: { type: 'AssignmentExpression',operator:'=',left: {type: 'MemberExpression',object:decl.id,property:{type:'Identifier',name:'__env'}},right: {type: 'Identifier',name:'__global'} }},
          {type: 'ExpressionStatement',
expression: {type: 'AssignmentExpression', operator: '=',
left: {type: 'MemberExpression',object: {type:'Identifier',name:'__global'},property:decl.id}, right: {
      type: 'ArrayExpression',
      elements: [decl.id/*{
          type: 'ObjectExpression',
          properties: [{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: '__label'
              },
              value: {
                type: 'Literal',
                value: decl.id.name
              },
              kind: 'init'
            },{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: '__env'
              },
              value: {
                type: 'Identifier',
                name: '__global'
              },
              kind: 'init'
            }]
        }*/]
    }}}] };
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
      body.push(stmt);
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
