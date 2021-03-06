var fs = require('fs');
var escodegen = require('escodegen');
var esprima = require('esprima');
var LOOP = 'function __call(__label, __this, __env, __args) { ' + '  __jmp:' + '  while(true) {' + '    switch(__label) {' + '    default:' + '      console.error(\'unrecognized label: \' + __label);' + '      break __jmp;' + '    }' + '  }' + '}' + 'function __call1(__label, __this, __env, __args) { var ret = __call(__label, __this, __env, __args); if (typeof ret === "object" && ret.__label && ret.__env){ return function () { return __call1(ret.__label,this,ret.__env,[].slice.call(arguments)) } } else { return ret; } }' + 'function __mk(__label,__env,fn){ fn.__label = __label;fn.__env = __env;return fn; }';
var OUTPUT = esprima.parse(LOOP);
var EMPTY_OBJECT = {
  type: 'ObjectExpression',
  properties: []
};
function copyenv(env) {
  var cp = {
    type: 'ObjectExpression',
    properties: []
  };
  for (var k in env) {
    var prop = {
      type: 'Property',
      key: {
        type: 'Identifier',
        name: k
      },
      value: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: '__env'
        },
        property: {
          type: 'Identifier',
          name: k
        }
      },
      kind: 'init'
    };
    cp.properties.push(prop);
  }
  return cp;
}
function shallowCopy(obj) {
  var cp = {};
  for (var k in obj) {
    cp[k] = obj[k];
  }
  return cp;
}
function appendCase(a_case) {
  OUTPUT.body[0].body.body[0].body.body.body[0].cases.unshift(a_case);
  return;
}
var i = 0;
function gensym() {
  i += 1;
  return i;
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
function existsLhs1(info) {
  var ast = info.ast;
  var env = info.env;
  switch (ast.type) {
  case 'MemberExpression':
    return existsLhs1({
      ast: ast.object,
      env: env
    });
  case 'Identifier':
    return {
      type: 'MemberExpression',
      object: {
        type: 'Identifier',
        name: '__env'
      },
      property: ast
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optLhs1(info) {
  var ast = info.ast;
  var env = info.env;
  switch (ast.type) {
  case 'MemberExpression':
    if (ast.computed) {
      var obj = optLhs1({
        ast: ast.object,
        env: env
      });
      var prop = optExpr({
        ast: ast.property,
        env: env
      });
      return {
        type: 'MemberExpression',
        object: obj,
        property: prop,
        computed: ast.computed
      };
    } else {
      var obj = optLhs1({
        ast: ast.object,
        env: env
      });
      return {
        type: 'MemberExpression',
        object: obj,
        property: ast.property,
        computed: ast.computed
      };
    }
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
      computed: true,
      property: {
        type: 'Literal',
        value: 0
      }
    };
  default:
    console.error('unrecognized ast: ' + ast.type);
  }
}
function optLhs2(info) {
  var ast = info.ast;
  var env = info.env;
  switch (ast.type) {
  case 'MemberExpression':
    if (ast.computed) {
      return {
        type: 'MemberExpression',
        object: ast.object,
        computed: ast.computed,
        property: optExpr({
          ast: ast.property,
          env: env
        })
      };
    } else {
      return ast;
    }
  default:
    return ast;
  }
}
function optExpr(info) {
  var ast = info.ast;
  var env = info.env;
  switch (ast.type) {
  case 'Literal':
    return ast;
  case 'ThisExpression':
    return {
      type: 'Identifier',
      name: '__this'
    };
  case 'Identifier':
    if (ast.name.lastIndexOf('__', 0) === 0) {
      console.warn('any identifier starting with ``__" is reserved.');
    }
    if (env[ast.name]) {
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
    } else {
      return ast;
    }
  case 'SequenceExpression':
    var exprs = [];
    for (var i = 0; i < ast.expressions.length; ++i) {
      exprs.push(optExpr({
        ast: ast.expressions[i],
        env: env
      }));
    }
    return {
      type: 'SequenceExpression',
      expressions: exprs
    };
  case 'UnaryExpression':
      return {
        type: 'UnaryExpression',
        prefix: ast.prefix,
        argument: optExpr({
          ast: ast.argument,
          env: env
        }),
        operator: ast.operator
      };
  case 'NewExpression':
    var callee = optExpr({
      ast: ast.callee,
      env: env
    });
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optExpr({
        ast: ast.arguments[i],
        env: env
      }));
    }
    return {
      type: 'NewExpression',
      callee: callee,
      arguments: args
    };
  case 'UpdateExpression':
    var arg = optExpr({ast: ast.argument, env: env});
    return {
        type: 'UpdateExpression',
        operator: ast.operator,
        argument: arg,
        prefix: ast.prefix
      };
  case 'AssignmentExpression':
    var lhs = optExpr({ast:ast.left, env: env});
    var rhs = optExpr({
      ast: ast.right,
      env: env
    });
    return {
        type: 'AssignmentExpression',
        operator: ast.operator,
        left: lhs,
        right: rhs
      };
  case 'ConditionalExpression':
    var test = optExpr({
      ast: ast.test,
      env: env
    });
    var alternate = optExpr({
      ast: ast.alternate,
      env: env
    });
    var consequent = optExpr({
      ast: ast.consequent,
      env: env
    });
    return {
      type: 'ConditionalExpression',
      test: test,
      alternate: alternate,
      consequent: consequent
    };
  case 'BinaryExpression':
    var lhs = optExpr({
      ast: ast.left,
      env: env
    });
    var rhs = optExpr({
      ast: ast.right,
      env: env
    });
    return {
      type: 'LogicalExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'LogicalExpression':
    var lhs = optExpr({
      ast: ast.left,
      env: env
    });
    var rhs = optExpr({
      ast: ast.right,
      env: env
    });
    return {
      type: 'BinaryExpression',
      operator: ast.operator,
      left: lhs,
      right: rhs
    };
  case 'MemberExpression':
    var obj = optExpr({
      ast: ast.object,
      env: env
    });
    if (ast.computed) {
      return {
        type: 'MemberExpression',
        object: obj,
        property: optExpr({
          ast: ast.property,
          env: env
        }),
        computed: ast.computed
      };
    } else {
      return {
        type: 'MemberExpression',
        object: obj,
        property: ast.property,
        computed: ast.computed
      };
    }
  case 'ObjectExpression':
    var props = [];
    for (var i = 0; i < ast.properties.length; ++i) {
      var prop = ast.properties[i];
      props.push({
        type: 'Property',
        key: prop.key,
        value: optExpr({
          ast: prop.value,
          env: env
        }),
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
      elts.push(optExpr({
        ast: elt,
        env: env
      }));
    }
    return {
      type: 'ArrayExpression',
      elements: elts
    };
  case 'FunctionExpression':
    var j = gensym();
    var id = {
      type: 'Identifier',
      name: '__lambda_' + j
    };
    env = shallowCopy(env);
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
                name: '__call'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: j
                },
                {
                  type: 'Identifier',
                  name: '__this'
                },
                {
                  type: 'Identifier',
                  name: '__env'
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
    var mk = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: '__mk'
      },
      arguments: [
        {
          type: 'Literal',
          value: j
        },
        {
          type: 'Identifier',
          name: '__env'
        },
        fn
      ]
    };
    var bind = esprima.parse('(function (__env) { return; })()').body[0].expression;
    bind.callee.body.body[0].argument = mk;
    bind.arguments[0] = copyenv(env);
    var body1 = [];
    if (ast.id != null) {
      env[ast.id.name] = true;
      body1.push({
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
          right: bind
        }
      });
    }
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      env[param.name] = true;
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
    var body = optStmt({
      ast: ast.body,
      env: env
    });
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
        value: j
      },
      consequent: body1
    });
    return bind;
  case 'CallExpression':
    var callee = optExpr({
      ast: ast.callee,
      env: env
    });
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optExpr({
        ast: ast.arguments[i],
        env: env
      }));
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
function optCatchClause(info) {
  var ast = info.ast;
  var env = info.env;
  return {
    type: 'CatchClause',
    param: ast.param,
    guard: ast.guard ? optExpr({
      ast: ast.guard,
      env: env
    }) : null,
    body: optStmt({
      ast: ast.body,
      env: env
    })
  };
}
function optVariableDeclaration(info) {
  var ast = info.ast;
  var env = info.env;
  var declarations = [];
  for (var i = 0; i < ast.declarations.length; ++i) {
    var declaration = ast.declarations[i];
    env[declaration.id.name] = true;
    declarations.push({
      type: 'AssignmentExpression',
      operator: '=',
      left: {
        type: 'MemberExpression',
        object: {
          type: 'Identifier',
          name: '__env'
        },
        property: declaration.id
      },
      right: {
        type: 'ArrayExpression',
        elements: declaration.init ? [optExpr({
            ast: declaration.init,
            env: env
          })] : []
      }
    });
  }
  return {
    type: 'SequenceExpression',
    expressions: declarations
  };
}
function optStmt(info) {
  var ast = info.ast;
  var env = info.env;
  switch (ast.type) {
  case 'EmptyStatement':
    return ast;
  case 'BlockStatement':
    var body = [];
    for (var i = 0; i < ast.body.length; ++i) {
      var stmt = ast.body[i];
      stmt = optStmt({
        ast: stmt,
        env: env
      });
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
    var expr = optExpr({
      ast: ast.expression,
      env: env
    });
    return {
      type: 'ExpressionStatement',
      expression: expr
    };
  case 'IfStatement':
    var test = optExpr({
      ast: ast.test,
      env: env
    });
    var consequent = optStmt({
      ast: ast.consequent,
      env: env
    });
    var alternate = ast.alternate ? optStmt({
      ast: ast.alternate,
      env: env
    }) : null;
    return {
      type: 'IfStatement',
      test: test,
      consequent: consequent,
      alternate: alternate
    };
  case 'LabeledStatement':
    var body = optStmt({
      ast: ast.body,
      env: env
    });
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
    var obj = optExpr({
      ast: ast.object,
      env: env
    });
    var body = optStmt({
      ast: ast.body,
      env: env
    });
    return {
      type: 'WithStatement',
      object: obj,
      body: body
    };
  case 'SwitchStatement':
    var discriminant = optExpr({
      ast: ast.discriminant,
      env: env
    });
    var cases = [];
    for (var i = 0; i < ast.cases.length; ++i) {
      var test = ast.cases[i].test ? optExpr({
        ast: ast.cases[i].test,
        env: env
      }) : null;
      var body = [];
      for (var j = 0; j < ast.cases[i].consequent.length; ++j) {
        body.push(optStmt({
          ast: ast.cases[i].consequent[j],
          env: env
        }));
      }
      cases.push({
        type: 'SwitchCase',
        test: test,
        consequent: body,
        lexical: ast.lexical
      });
    }
    return {
      type: 'SwitchStatement',
      discriminant: discriminant,
      cases: cases,
      lexical: ast.lexical
    };
  case 'ThrowStatement':
    var arg = optExpr({
      ast: ast.argument,
      env: env
    });
    return {
      type: 'ThrowStatement',
      argument: arg
    };
  case 'TryStatement':
    var block = optStmt({
      ast: ast.block,
      env: env
    });
    var handlers = [];
    for (var i = 0; i < ast.handlers.length; ++i) {
      handlers.push(optCatchClause({
        ast: ast.handlers[i],
        env: env
      }));
    }
    var guardedHandlers = [];
    for (var i = 0; i < ast.guardedHandlers.length; ++i) {
      guardedHandlers.push(optCatchClause({
        ast: ast.guardedHandlers[i],
        env: env
      }));
    }
    var finalizer = ast.finalizer ? optStmt({
      ast: ast.finalizer,
      env: env
    }) : null;
    return {
      type: 'TryStatement',
      block: block,
      handlers: handlers,
      guardedHandlers: guardedHandlers,
      finalizer: finalizer
    };
  case 'WhileStatement':
    var test = optExpr({
      ast: ast.test,
      env: env
    });
    var body = optStmt({
      ast: ast.body,
      env: env
    });
    return {
      type: 'WhileStatement',
      test: test,
      body: body
    };
  case 'DoWhileStatement':
    var test = optExpr({
      ast: ast.test,
      env: env
    });
    var body = optStmt({
      ast: ast.body,
      env: env
    });
    return {
      type: 'DoWhileStatement',
      test: test,
      body: body
    };
  case 'ForStatement':
    if (ast.init == null) {
      var init = null;
    } else {
      switch (ast.init.type) {
      case 'VariableDeclaration':
        var init = optVariableDeclaration({
          ast: ast.init,
          env: env
        });
        break;
      default:
        var init = optExpr({
          ast: ast.init,
          env: env
        });
      }
    }
    var test = ast.test ? optExpr({
      ast: ast.test,
      env: env
    }) : null;
    var update = ast.update ? optExpr({
      ast: ast.update,
      env: env
    }) : null;
    var body = optStmt({
      ast: ast.body,
      env: env
    });
    return {
      type: 'ForStatement',
      init: init,
      test: test,
      update: update,
      body: body
    };
  case 'ForInStatement':
    if (ast.left == null) {
      var left = null;
    } else {
      switch (ast.left.type) {
      case 'VariableDeclaration':
        var left_init = optVariableDeclaration({
          ast: ast.left,
          env: env
        });
        var left = {
          type: 'MemberExpression',
          object: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: ast.left.declarations[0].id
          },
          property: {
            type: 'Literal',
            value: 0
          },
          computed: true
        };
        break;
      default:
        var left = optExpr({
          ast: ast.init,
          env: env
        });
      }
    }
    var right = optExpr({
      ast: ast.right,
      env: env
    });
    var body = optStmt({
      ast: ast.body,
      env: env
    });
    return {
      type: 'BlockStatement',
      body: [
        {
          type: 'ExpressionStatement',
          expression: left_init
        },
        {
          type: 'ForInStatement',
          left: left,
          right: right,
          body: body,
          each: ast.each
        }
      ]
    };
  case 'DebuggerStatement':
    return ast;
  case 'VariableDeclaration':
    return {
      type: 'ExpressionStatement',
      expression: optVariableDeclaration({
        ast: ast,
        env: env
      })
    };
  case 'ReturnStatement':
    if (ast.argument == null) {
      return { type: 'ReturnStatement' };
    }
    var argument = optExpr({
      ast: ast.argument,
      env: env
    });
    switch (ast.argument.type) {
    case 'CallExpression':
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
        };
      }
    default:
      return {
        type: 'ReturnStatement',
        argument: argument
      };
    }
  case 'FunctionDeclaration':
    var j = gensym();
    env = shallowCopy(env);
    var body1 = [];
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      env[param.name] = true;
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
    var body = optStmt({
      ast: ast.body,
      env: env
    });
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
        value: j
      },
      consequent: body1
    });
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
                name: '__call'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: j
                },
                {
                  type: 'Identifier',
                  name: '__this'
                },
                {
                  type: 'Identifier',
                  name: '__env'
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
    var mk = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: '__mk'
      },
      arguments: [
        {
          type: 'Literal',
          value: j
        },
        {
          type: 'Identifier',
          name: '__env'
        },
        fn
      ]
    };
    var bind = esprima.parse('(function (__env) { return; })()').body[0].expression;
    bind.callee.body.body[0].argument = mk;
    bind.arguments[0] = copyenv(env);
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
          elements: [bind]
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
    if (ast.name.lastIndexOf('__', 0) === 0) {
      console.warn('any identifier starting with ``__" is reserved.');
    }
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
    return {
      type: 'SequenceExpression',
      expressions: exprs
    };
  case 'UpdateExpression':
    return {
      type: 'UpdateExpression',
      prefix: ast.prefix,
      argument: optToplevelExpr(ast.argument),
      operator: ast.operator
    };
  case 'UnaryExpression':
    return {
      type: 'UnaryExpression',
      prefix: ast.prefix,
      argument: optToplevelExpr(ast.argument),
      operator: ast.operator
    };
  case 'NewExpression':
    var callee = optToplevelExpr(ast.callee);
    var args = [];
    for (var i = 0; i < ast.arguments.length; ++i) {
      args.push(optToplevelExpr(ast.arguments[i]));
    }
    return {
      type: 'NewExpression',
      callee: callee,
      arguments: args
    };
  case 'ConditionalExpression':
    var test = optExpr({
      ast: ast.test,
      env: env
    });
    var alternate = optExpr({
      ast: ast.alternate,
      env: env
    });
    var consequent = optExpr({
      ast: ast.consequent,
      env: env
    });
    return {
      type: 'ConditionalExpression',
      test: test,
      alternate: alternate,
      consequent: consequent
    };
  case 'LogicalExpression':
    var lhs = optToplevelExpr(ast.left);
    var rhs = optToplevelExpr(ast.right);
    return {
      type: 'LogicalExpression',
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
    if (ast.computed) {
      return {
        type: 'MemberExpression',
        object: obj,
        property: optToplevelExpr(ast.property),
        computed: ast.computed
      };
    } else {
      return {
        type: 'MemberExpression',
        object: obj,
        property: ast.property,
        computed: ast.computed
      };
    }
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
      elts.push(optToplevelExpr(elt));
    }
    return {
      type: 'ArrayExpression',
      elements: elts
    };
  case 'FunctionExpression':
    var j = gensym();
    var id = {
      type: 'Identifier',
      name: '__lambda__' + j
    };
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
                name: '__call'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: j
                },
                { type: 'ThisExpression' },
                EMPTY_OBJECT,
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
    var mk = {
      type: 'CallExpression',
      callee: {
        type: 'Identifier',
        name: '__mk'
      },
      arguments: [
        {
          type: 'Literal',
          value: j
        },
        EMPTY_OBJECT,
        fn
      ]
    };
    var env = {};
    var body1 = [];
    if (ast.id != null) {
      env[ast.id.name] = true;
      body1.push({
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
          right: mk
        }
      });
    }
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      env[param.name] = true;
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
    var body = optStmt({
      ast: ast.body,
      env: env
    });
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
        value: j
      },
      consequent: body1
    });
    return mk;
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
  return {
    type: 'CatchClause',
    param: ast.param,
    guard: ast.guard ? optToplevelExpr(ast.guard) : null,
    body: optToplevelStmt(ast.body)
  };
}
function optToplevelVariableDeclaration(ast) {
  var declarations = [];
  for (var i = 0; i < ast.declarations.length; ++i) {
    var declaration = ast.declarations[i];
    if (declaration.init) {
      declarations.push({
        type: 'VariableDeclarator',
        id: declaration.id,
        init: optToplevelExpr(declaration.init)
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
    var test = optToplevelExpr(ast.test);
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
        consequent: body,
        lexical: ast.lexical
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
    return {
      type: 'TryStatement',
      block: block,
      handlers: handlers,
      guardedHandlers: guardedHandlers,
      finalizer: finalizer
    };
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
    if (ast.init == null) {
      var init = null;
    } else {
      switch (ast.init.type) {
      case 'VariableDeclaration':
        var init = optToplevelVariableDeclaration(ast.init);
        break;
      default:
        var init = optToplevelExpr(ast.init);
      }
    }
    var test = ast.test ? optToplevelExpr(ast.test) : null;
    var update = ast.update ? optToplevelExpr(ast.update) : null;
    var body = optToplevelStmt(ast.body);
    return {
      type: 'ForStatement',
      init: init,
      test: test,
      update: update,
      body: body
    };
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
    }
    return {
      type: 'BlockStatement',
      body: decls.concat(body)
    };
  case 'ReturnStatement':
    console.error('unexpected ast: ReturnStatement');
    break;
  case 'FunctionDeclaration':
    var j = gensym();
    var env = {};
    var body1 = [];
    for (var i = 0; i < ast.params.length; ++i) {
      var param = ast.params[i];
      env[param.name] = true;
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
    var body = optStmt({
      ast: ast.body,
      env: env
    });
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
        value: j
      },
      consequent: body1
    });
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
                name: '__call'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: j
                },
                { type: 'ThisExpression' },
                EMPTY_OBJECT,
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
              value: j
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
            right: EMPTY_OBJECT
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
  return;
});
