function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_1':
        __env.err = [__args[0]];
        __env.code = [__args[1]];
        if (__env.err[0]) {
          console.error(__env.err[0]);
          return;
        }
        __env.program = [optProgram(esprima.parse(__env.code[0]))];
        __env.OUTPUT ? __env.OUTPUT[0].body = OUTPUT.body.concat(__env.program[0].body) : OUTPUT.body = OUTPUT.body.concat(__env.program[0].body);
        console.log(escodegen.generate(OUTPUT, { indent: '  ' }));
        return;
      case 'optProgram':
        __env.ast = [__args[0]];
        switch (__env.ast[0].type) {
        case 'Program':
          __env.body = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [__env.ast[0].body[__env.i[0]]];
            __env.stmt ? __env.stmt[0] = optToplevelStmt(__env.stmt[0]) : stmt = optToplevelStmt(__env.stmt[0]);
            switch (__env.stmt[0].type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = __env.body[0].concat(__env.stmt[0].body) : body = __env.body[0].concat(__env.stmt[0].body);
              break;
            default:
              __env.body[0].push(__env.stmt[0]);
            }
          }
          return {
            type: 'Program',
            body: __env.body[0]
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'optToplevelStmt':
        __env.ast = [__args[0]];
        switch (__env.ast[0].type) {
        case 'EmptyStatement':
          return __env.ast[0];
        case 'BlockStatement':
          __env.body = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [__env.ast[0].body[__env.i[0]]];
            __env.stmt ? __env.stmt[0] = optToplevelStmt(__env.stmt[0]) : stmt = optToplevelStmt(__env.stmt[0]);
            switch (__env.stmt[0].type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = __env.body[0].concat(__env.stmt[0].body) : body = __env.body[0].concat(__env.stmt[0].body);
              break;
            default:
              __env.body[0].push(__env.stmt[0]);
            }
          }
          return {
            type: 'BlockStatement',
            body: __env.body[0]
          };
        case 'ExpressionStatement':
          __env.expr = [optToplevelExpr(__env.ast[0].expression)];
          return {
            type: 'ExpressionStatement',
            expression: __env.expr[0]
          };
        case 'IfStatement':
          __env.test = [optToplevelExpr(__env.ast[0].test)];
          __env.consequent = [optToplevelStmt(__env.ast[0].consequent)];
          __env.alternate = [__env.ast[0].alternate ? optToplevelStmt(__env.ast[0].alternate) : null];
          return {
            type: 'IfStatement',
            test: __env.test[0],
            consequent: __env.consequent[0],
            alternate: __env.alternate[0]
          };
        case 'LabeledStatement':
          __env.body = [optToplevelStmt(__env.ast[0].body)];
          return {
            type: 'LabeledStatement',
            label: __env.ast[0].label,
            body: __env.body[0]
          };
        case 'BreakStatement':
          return __env.ast[0];
        case 'ContinueStatement':
          return __env.ast[0];
        case 'WithStatement':
          __env.obj = [optToplevelExpr(__env.ast[0].object)];
          __env.body = [optToplevelStmt(__env.ast[0].body)];
          return {
            type: 'WithStatement',
            object: __env.obj[0],
            body: __env.body[0]
          };
        case 'SwitchStatement':
          __env.discriminant = [optToplevelExpr(__env.ast[0].discriminant)];
          __env.cases = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].cases.length; __env.i ? ++__env.i[0] : ++i) {
            __env.test = [__env.ast[0].cases[__env.i[0]].test ? opTopleveltExpr(__env.ast[0].cases[__env.i[0]].test) : null];
            __env.body = [[]];
            for (__env.j = [0]; __env.j[0] < __env.ast[0].cases[__env.i[0]].consequent.length; __env.j ? ++__env.j[0] : ++j) {
              __env.body[0].push(optToplevelStmt(__env.ast[0].cases[__env.i[0]].consequent[__env.j[0]]));
            }
            __env.cases[0].push({
              type: 'SwitchCase',
              test: __env.test[0],
              consequent: __env.body[0],
              lexical: __env.ast[0].lexical
            });
          }
          return {
            type: 'SwitchStatement',
            discriminant: __env.discriminant[0],
            cases: __env.cases[0],
            lexical: __env.ast[0].lexical
          };
        case 'ThrowStatement':
          __env.arg = [optToplevelExpr(__env.ast[0].argument)];
          return {
            type: 'ThrowStatement',
            argument: __env.arg[0]
          };
        case 'TryStatement':
          __env.block = [optToplevelStmt(__env.ast[0].block)];
          __env.handlers = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].handlers.length; __env.i ? ++__env.i[0] : ++i) {
            __env.handlers[0].push(optToplevelCatchClause(__env.ast[0].handlers[__env.i[0]]));
          }
          __env.guardedHandlers = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].guardedHandlers.length; __env.i ? ++__env.i[0] : ++i) {
            __env.guardedHandlers[0].push(optToplevelCatchClause(__env.ast[0].guardedHandlers[__env.i[0]]));
          }
          __env.finalizer = [__env.ast[0].finalizer ? optToplevelStmt(__env.ast[0].finalizer) : null];
          return {
            type: 'TryStatement',
            block: __env.block[0],
            handlers: __env.handlers[0],
            guardedHandlers: __env.guardedHandlers[0],
            finalizer: __env.finalizer[0]
          };
        case 'WhileStatement':
          __env.test = [optToplevelExpr(__env.ast[0].test)];
          __env.body = [optToplevelStmt(__env.ast[0].body)];
          return {
            type: 'WhileStatement',
            test: __env.test[0],
            body: __env.body[0]
          };
        case 'DoWhileStatement':
          __env.test = [optToplevelExpr(__env.ast[0].test)];
          __env.body = [optToplevelStmt(__env.ast[0].body)];
          return {
            type: 'DoWhileStatement',
            test: __env.test[0],
            body: __env.body[0]
          };
        case 'ForStatement':
          if (__env.ast[0].init == null) {
            __env.init = [null];
          } else {
            switch (__env.ast[0].init.type) {
            case 'VariableDeclaration':
              __env.init = [optToplevelVariableDeclaration(__env.ast[0].init)];
              break;
            default:
              __env.init = [optToplevelExpr(__env.ast[0].init)];
            }
          }
          __env.test = [__env.ast[0].test ? optToplevelExpr(__env.ast[0].test) : null];
          __env.update = [__env.ast[0].update ? optToplevelExpr(__env.ast[0].update) : null];
          __env.body = [optToplevelStmt(__env.ast[0].body)];
          return {
            type: 'ForStatement',
            init: __env.init[0],
            test: __env.test[0],
            update: __env.update[0],
            body: __env.body[0]
          };
        case 'DebuggerStatement':
          return __env.ast[0];
        case 'VariableDeclaration':
          __env.decls = [[]];
          __env.body = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].declarations.length; __env.i ? ++__env.i[0] : ++i) {
            __env.decls[0].push({
              type: 'VariableDeclaration',
              kind: __env.ast[0].kind,
              declarations: [{
                  type: 'VariableDeclarator',
                  id: __env.ast[0].declarations[__env.i[0]].id
                }]
            });
          }
          for (__env.i = [0]; __env.i[0] < __env.ast[0].declarations.length; __env.i ? ++__env.i[0] : ++i) {
            __env.body[0].push({
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: __env.ast[0].declarations[__env.i[0]].id,
                right: optToplevelExpr(__env.ast[0].declarations[__env.i[0]].init)
              }
            });
          }
          return {
            type: 'BlockStatement',
            body: __env.decls[0].concat(__env.body[0])
          };
        case 'ReturnStatement':
          console.error('unexpected ast: ReturnStatement');
          break;
        case 'FunctionDeclaration':
          __env.env = [{}];
          __env.body1 = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [__env.ast[0].params[__env.i[0]]];
            __env.env ? __env.env[0][__env.param[0].name] = true : env[__env.param[0].name] = true;
            __env.setParam = [{
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
                    property: __env.param[0]
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
                          value: __env.i[0]
                        }
                      }]
                  }
                }
              }];
            __env.body1[0].push(__env.setParam[0]);
          }
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          switch (__env.body[0].type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = __env.body1[0].concat(__env.body[0].body) : body1 = __env.body1[0].concat(__env.body[0].body);
            break;
          default:
            __env.body1[0].push(__env.body[0]);
          }
          appendCase({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: __env.ast[0].id.name
            },
            consequent: __env.body1[0]
          });
          __env.decl = [{
              type: 'FunctionDeclaration',
              params: __env.ast[0].params,
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
                          value: __env.ast[0].id.name
                        },
                        { type: 'ThisExpression' },
                        COPYGLOBAL,
                        {
                          type: 'ArrayExpression',
                          elements: __env.ast[0].params
                        }
                      ]
                    }
                  }]
              },
              id: __env.ast[0].id,
              defaults: [],
              rest: null,
              generator: false,
              expression: false
            }];
          return {
            type: 'BlockStatement',
            body: [
              __env.decl[0],
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'MemberExpression',
                    object: __env.decl[0].id,
                    property: {
                      type: 'Identifier',
                      name: '__label'
                    }
                  },
                  right: {
                    type: 'Literal',
                    value: __env.decl[0].id.name
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
                    object: __env.decl[0].id,
                    property: {
                      type: 'Identifier',
                      name: '__env'
                    }
                  },
                  right: COPYGLOBAL
                }
              }
            ]
          };
          ;
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'optToplevelVariableDeclaration':
        __env.ast = [__args[0]];
        __env.declarations = [[]];
        for (__env.i = [0]; __env.i[0] < __env.ast[0].declarations.length; __env.i ? ++__env.i[0] : ++i) {
          __env.declaration = [__env.ast[0].declarations[__env.i[0]]];
          if (__env.declaration[0].init) {
            __env.declarations[0].push({
              type: 'VariableDeclarator',
              id: __env.declaration[0].id,
              init: optToplevelExpr(__env.declaration[0].init)
            });
          } else {
            __env.declarations[0].push(__env.declaration[0]);
          }
        }
        return {
          type: 'VariableDeclaration',
          declarations: __env.declarations[0],
          kind: __env.ast[0].kind
        };
      case 'optToplevelCatchClause':
        __env.ast = [__args[0]];
        return {
          type: 'CatchClause',
          param: __env.ast[0].param,
          guard: __env.ast[0].guard ? optToplevelExpr(__env.ast[0].guard) : null,
          body: optToplevelStmt(__env.ast[0].body)
        };
      case 'optToplevelExpr':
        __env.ast = [__args[0]];
        switch (__env.ast[0].type) {
        case 'Literal':
          return __env.ast[0];
        case 'ThisExpression':
          return __env.ast[0];
        case 'Identifier':
          if (__env.ast[0].name.lastIndexOf('__', 0) === 0) {
            console.warn('any identifier starting with ``__" is reserved.');
          }
          return __env.ast[0];
        case 'AssignmentExpression':
          __env.lhs = [optToplevelExpr(__env.ast[0].left)];
          __env.rhs = [optToplevelExpr(__env.ast[0].right)];
          return {
            type: 'AssignmentExpression',
            operator: __env.ast[0].operator,
            left: __env.lhs[0],
            right: __env.rhs[0]
          };
        case 'SequenceExpression':
          __env.exprs = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].expressions.length; __env.i ? ++__env.i[0] : ++i) {
            __env.exprs[0].push(optToplevelExpr(__env.ast[0].expressions[__env.i[0]]));
          }
          return {
            type: 'SequenceExpression',
            expressions: __env.exprs[0]
          };
        case 'UpdateExpression':
          return {
            type: 'UpdateExpression',
            prefix: __env.ast[0].prefix,
            argument: optToplevelExpr(__env.ast[0].argument),
            operator: __env.ast[0].operator
          };
        case 'UnaryExpression':
          return {
            type: 'UnaryExpression',
            prefix: __env.ast[0].prefix,
            argument: optToplevelExpr(__env.ast[0].argument),
            operator: __env.ast[0].operator
          };
        case 'NewExpression':
          __env.callee = [optToplevelExpr(__env.ast[0].callee)];
          __env.args = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].arguments.length; __env.i ? ++__env.i[0] : ++i) {
            __env.args[0].push(optToplevelExpr(__env.ast[0].arguments[__env.i[0]]));
          }
          return {
            type: 'NewExpression',
            callee: __env.callee[0],
            arguments: __env.args[0]
          };
        case 'ConditionalExpression':
          __env.test = [optExpr({
              ast: __env.ast[0].test,
              env: env
            })];
          __env.alternate = [optExpr({
              ast: __env.ast[0].alternate,
              env: env
            })];
          __env.consequent = [optExpr({
              ast: __env.ast[0].consequent,
              env: env
            })];
          return {
            type: 'ConditionalExpression',
            test: __env.test[0],
            alternate: __env.alternate[0],
            consequent: __env.consequent[0]
          };
        case 'LogicalExpression':
          __env.lhs = [optToplevelExpr(__env.ast[0].left)];
          __env.rhs = [optToplevelExpr(__env.ast[0].right)];
          return {
            type: 'LogicalExpression',
            operator: __env.ast[0].operator,
            left: __env.lhs[0],
            right: __env.rhs[0]
          };
        case 'BinaryExpression':
          __env.lhs = [optToplevelExpr(__env.ast[0].left)];
          __env.rhs = [optToplevelExpr(__env.ast[0].right)];
          return {
            type: 'BinaryExpression',
            operator: __env.ast[0].operator,
            left: __env.lhs[0],
            right: __env.rhs[0]
          };
        case 'MemberExpression':
          __env.obj = [optToplevelExpr(__env.ast[0].object)];
          if (__env.ast[0].computed) {
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: optToplevelExpr(__env.ast[0].property),
              computed: __env.ast[0].computed
            };
          } else {
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: __env.ast[0].property,
              computed: __env.ast[0].computed
            };
          }
        case 'ObjectExpression':
          __env.props = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].properties.length; __env.i ? ++__env.i[0] : ++i) {
            __env.prop = [__env.ast[0].properties[__env.i[0]]];
            __env.props[0].push({
              type: 'Property',
              key: __env.prop[0].key,
              value: optToplevelExpr(__env.prop[0].value),
              kind: __env.prop[0].kind
            });
          }
          return {
            type: 'ObjectExpression',
            properties: __env.props[0]
          };
        case 'ArrayExpression':
          __env.elts = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].elements.length; __env.i ? ++__env.i[0] : ++i) {
            __env.elt = [__env.ast[0].elements[__env.i[0]]];
            __env.elts[0].push(optToplevelExpr(__env.elt[0]));
          }
          return {
            type: 'ArrayExpression',
            elements: __env.elts[0]
          };
        case 'FunctionExpression':
          __env.id = [{
              type: 'Identifier',
              name: gensym()
            }];
          __env.fn = [{
              type: 'FunctionExpression',
              params: __env.ast[0].params,
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
                          value: __env.id[0].name
                        },
                        { type: 'ThisExpression' },
                        COPYGLOBAL,
                        {
                          type: 'ArrayExpression',
                          elements: __env.ast[0].params
                        }
                      ]
                    }
                  }]
              },
              id: __env.id[0],
              defaults: [],
              rest: null,
              generator: false,
              expression: false
            }];
          __env.mk = [{
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: '__mk'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: __env.id[0].name
                },
                COPYGLOBAL,
                __env.fn[0]
              ]
            }];
          __env.env = [{}];
          __env.body1 = [[]];
          if (__env.ast[0].id != null) {
            __env.env ? __env.env[0][__env.ast[0].id.name] = true : env[__env.ast[0].id.name] = true;
            __env.body1[0].push({
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
                  property: __env.ast[0].id
                },
                right: __env.mk[0]
              }
            });
          }
          for (__env.i = [0]; __env.i[0] < __env.ast[0].params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [__env.ast[0].params[__env.i[0]]];
            __env.env ? __env.env[0][__env.param[0].name] = true : env[__env.param[0].name] = true;
            __env.setParam = [{
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
                    property: __env.param[0]
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
                          value: __env.i[0]
                        }
                      }]
                  }
                }
              }];
            __env.body1[0].push(__env.setParam[0]);
          }
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          switch (__env.body[0].type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = __env.body1[0].concat(__env.body[0].body) : body1 = __env.body1[0].concat(__env.body[0].body);
            break;
          default:
            __env.body1[0].push(__env.body[0]);
          }
          appendCase({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: __env.id[0].name
            },
            consequent: __env.body1[0]
          });
          return __env.mk[0];
          ;
        case 'CallExpression':
          __env.callee = [optToplevelExpr(__env.ast[0].callee)];
          __env.args = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].arguments.length; __env.i ? ++__env.i[0] : ++i) {
            __env.args[0].push(optToplevelExpr(__env.ast[0].arguments[__env.i[0]]));
          }
          return {
            type: 'CallExpression',
            callee: __env.callee[0],
            arguments: __env.args[0]
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'optStmt':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        switch (__env.ast[0].type) {
        case 'EmptyStatement':
          return __env.ast[0];
        case 'BlockStatement':
          __env.body = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [__env.ast[0].body[__env.i[0]]];
            __env.stmt ? __env.stmt[0] = optStmt({
              ast: __env.stmt[0],
              env: __env.env[0]
            }) : stmt = optStmt({
              ast: __env.stmt[0],
              env: __env.env[0]
            });
            switch (__env.stmt[0].type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = __env.body[0].concat(__env.stmt[0].body) : body = __env.body[0].concat(__env.stmt[0].body);
              break;
            default:
              __env.body[0].push(__env.stmt[0]);
            }
          }
          return {
            type: 'BlockStatement',
            body: __env.body[0]
          };
        case 'ExpressionStatement':
          __env.expr = [optExpr({
              ast: __env.ast[0].expression,
              env: __env.env[0]
            })];
          return {
            type: 'ExpressionStatement',
            expression: __env.expr[0]
          };
        case 'IfStatement':
          __env.test = [optExpr({
              ast: __env.ast[0].test,
              env: __env.env[0]
            })];
          __env.consequent = [optStmt({
              ast: __env.ast[0].consequent,
              env: __env.env[0]
            })];
          __env.alternate = [__env.ast[0].alternate ? optStmt({
              ast: __env.ast[0].alternate,
              env: __env.env[0]
            }) : null];
          return {
            type: 'IfStatement',
            test: __env.test[0],
            consequent: __env.consequent[0],
            alternate: __env.alternate[0]
          };
        case 'LabeledStatement':
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'LabeledStatement',
            label: __env.ast[0].label,
            body: __env.body[0]
          };
        case 'BreakStatement':
          return __env.ast[0];
        case 'ContinueStatement':
          return __env.ast[0];
        case 'WithStatement':
          __env.obj = [optExpr({
              ast: __env.ast[0].object,
              env: __env.env[0]
            })];
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'WithStatement',
            object: __env.obj[0],
            body: __env.body[0]
          };
        case 'SwitchStatement':
          __env.discriminant = [optExpr({
              ast: __env.ast[0].discriminant,
              env: __env.env[0]
            })];
          __env.cases = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].cases.length; __env.i ? ++__env.i[0] : ++i) {
            __env.test = [__env.ast[0].cases[__env.i[0]].test ? optExpr({
                ast: __env.ast[0].cases[__env.i[0]].test,
                env: __env.env[0]
              }) : null];
            __env.body = [[]];
            for (__env.j = [0]; __env.j[0] < __env.ast[0].cases[__env.i[0]].consequent.length; __env.j ? ++__env.j[0] : ++j) {
              __env.body[0].push(optStmt({
                ast: __env.ast[0].cases[__env.i[0]].consequent[__env.j[0]],
                env: __env.env[0]
              }));
            }
            __env.cases[0].push({
              type: 'SwitchCase',
              test: __env.test[0],
              consequent: __env.body[0],
              lexical: __env.ast[0].lexical
            });
          }
          return {
            type: 'SwitchStatement',
            discriminant: __env.discriminant[0],
            cases: __env.cases[0],
            lexical: __env.ast[0].lexical
          };
        case 'ThrowStatement':
          __env.arg = [optExpr({
              ast: __env.ast[0].argument,
              env: __env.env[0]
            })];
          return {
            type: 'ThrowStatement',
            argument: __env.arg[0]
          };
        case 'TryStatement':
          __env.block = [optStmt({
              ast: __env.ast[0].block,
              env: __env.env[0]
            })];
          __env.handlers = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].handlers.length; __env.i ? ++__env.i[0] : ++i) {
            __env.handlers[0].push(optCatchClause({
              ast: __env.ast[0].handlers[__env.i[0]],
              env: __env.env[0]
            }));
          }
          __env.guardedHandlers = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].guardedHandlers.length; __env.i ? ++__env.i[0] : ++i) {
            __env.guardedHandlers[0].push(optCatchClause({
              ast: __env.ast[0].guardedHandlers[__env.i[0]],
              env: __env.env[0]
            }));
          }
          __env.finalizer = [__env.ast[0].finalizer ? optStmt({
              ast: __env.ast[0].finalizer,
              env: __env.env[0]
            }) : null];
          return {
            type: 'TryStatement',
            block: __env.block[0],
            handlers: __env.handlers[0],
            guardedHandlers: __env.guardedHandlers[0],
            finalizer: __env.finalizer[0]
          };
        case 'WhileStatement':
          __env.test = [optExpr({
              ast: __env.ast[0].test,
              env: __env.env[0]
            })];
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'WhileStatement',
            test: __env.test[0],
            body: __env.body[0]
          };
        case 'DoWhileStatement':
          __env.test = [optExpr({
              ast: __env.ast[0].test,
              env: __env.env[0]
            })];
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'DoWhileStatement',
            test: __env.test[0],
            body: __env.body[0]
          };
        case 'ForStatement':
          if (__env.ast[0].init == null) {
            __env.init = [null];
          } else {
            switch (__env.ast[0].init.type) {
            case 'VariableDeclaration':
              __env.init = [optVariableDeclaration({
                  ast: __env.ast[0].init,
                  env: __env.env[0]
                })];
              break;
            default:
              __env.init = [optExpr({
                  ast: __env.ast[0].init,
                  env: __env.env[0]
                })];
            }
          }
          __env.test = [__env.ast[0].test ? optExpr({
              ast: __env.ast[0].test,
              env: __env.env[0]
            }) : null];
          __env.update = [__env.ast[0].update ? optExpr({
              ast: __env.ast[0].update,
              env: __env.env[0]
            }) : null];
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'ForStatement',
            init: __env.init[0],
            test: __env.test[0],
            update: __env.update[0],
            body: __env.body[0]
          };
        case 'ForInStatement':
          if (__env.ast[0].left == null) {
            __env.left = [null];
          } else {
            switch (__env.ast[0].left.type) {
            case 'VariableDeclaration':
              __env.left_init = [optVariableDeclaration({
                  ast: __env.ast[0].left,
                  env: __env.env[0]
                })];
              __env.left = [{
                  type: 'MemberExpression',
                  object: {
                    type: 'MemberExpression',
                    object: {
                      type: 'Identifier',
                      name: '__env'
                    },
                    property: __env.ast[0].left.declarations[0].id
                  },
                  property: {
                    type: 'Literal',
                    value: 0
                  },
                  computed: true
                }];
              break;
            default:
              __env.left = [optExpr({
                  ast: __env.ast[0].init,
                  env: __env.env[0]
                })];
            }
          }
          __env.right = [optExpr({
              ast: __env.ast[0].right,
              env: __env.env[0]
            })];
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          return {
            type: 'BlockStatement',
            body: [
              {
                type: 'ExpressionStatement',
                expression: __env.left_init[0]
              },
              {
                type: 'ForInStatement',
                left: __env.left[0],
                right: __env.right[0],
                body: __env.body[0],
                each: __env.ast[0].each
              }
            ]
          };
        case 'DebuggerStatement':
          return __env.ast[0];
        case 'VariableDeclaration':
          return {
            type: 'ExpressionStatement',
            expression: optVariableDeclaration({
              ast: __env.ast[0],
              env: __env.env[0]
            })
          };
        case 'ReturnStatement':
          if (__env.ast[0].argument == null) {
            return { type: 'ReturnStatement' };
          }
          __env.argument = [optExpr({
              ast: __env.ast[0].argument,
              env: __env.env[0]
            })];
          switch (__env.ast[0].argument.type) {
          case 'CallExpression':
            switch (__env.ast[0].argument.callee.type) {
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
                        elements: __env.argument[0].arguments
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
                        object: __env.argument[0].callee,
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
                        object: __env.argument[0].callee,
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
                      right: __env.argument[0].callee.object
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
                        elements: __env.argument[0].arguments
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
                        object: __env.argument[0].callee,
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
                        object: __env.argument[0].callee,
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
              argument: __env.argument[0]
            };
          }
        case 'FunctionDeclaration':
          __env.env ? __env.env[0] = shallowCopy(__env.env[0]) : env = shallowCopy(__env.env[0]);
          __env.body1 = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [__env.ast[0].params[__env.i[0]]];
            __env.env ? __env.env[0][__env.param[0].name] = true : env[__env.param[0].name] = true;
            __env.setParam = [{
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
                    property: __env.param[0]
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
                          value: __env.i[0]
                        }
                      }]
                  }
                }
              }];
            __env.body1[0].push(__env.setParam[0]);
          }
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          switch (__env.body[0].type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = __env.body1[0].concat(__env.body[0].body) : body1 = __env.body1[0].concat(__env.body[0].body);
            break;
          default:
            __env.body1[0].push(__env.body[0]);
          }
          appendCase({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: __env.ast[0].id.name
            },
            consequent: __env.body1[0]
          });
          __env.fn = [{
              type: 'FunctionExpression',
              params: __env.ast[0].params,
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
                          value: __env.ast[0].id.name
                        },
                        {
                          type: 'Identifier',
                          name: '__this'
                        },
                        copyenv(__env.env[0]),
                        {
                          type: 'ArrayExpression',
                          elements: __env.ast[0].params
                        }
                      ]
                    }
                  }]
              },
              id: __env.ast[0].id,
              defaults: [],
              rest: null,
              generator: false,
              expression: false
            }];
          __env.mk = [{
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: '__mk'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: __env.ast[0].id.name
                },
                copyenv(__env.env[0]),
                __env.fn[0]
              ]
            }];
          __env.bind = [esprima.parse('(function (__env) { return; })()').body[0].expression];
          __env.bind ? __env.bind[0].callee.body.body[0].argument = __env.mk[0] : bind.callee.body.body[0].argument = __env.mk[0];
          __env.bind ? __env.bind[0].arguments[0] = copyenv(__env.env[0]) : bind.arguments[0] = copyenv(__env.env[0]);
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
                property: __env.ast[0].id
              },
              right: {
                type: 'ArrayExpression',
                elements: [__env.bind[0]]
              }
            }
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'optVariableDeclaration':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        __env.declarations = [[]];
        for (__env.i = [0]; __env.i[0] < __env.ast[0].declarations.length; __env.i ? ++__env.i[0] : ++i) {
          __env.declaration = [__env.ast[0].declarations[__env.i[0]]];
          __env.env ? __env.env[0][__env.declaration[0].id.name] = true : env[__env.declaration[0].id.name] = true;
          __env.declarations[0].push({
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: '__env'
              },
              property: __env.declaration[0].id
            },
            right: {
              type: 'ArrayExpression',
              elements: __env.declaration[0].init ? [optExpr({
                  ast: __env.declaration[0].init,
                  env: __env.env[0]
                })] : []
            }
          });
        }
        return {
          type: 'SequenceExpression',
          expressions: __env.declarations[0]
        };
      case 'optCatchClause':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        return {
          type: 'CatchClause',
          param: __env.ast[0].param,
          guard: __env.ast[0].guard ? optExpr({
            ast: __env.ast[0].guard,
            env: __env.env[0]
          }) : null,
          body: optStmt({
            ast: __env.ast[0].body,
            env: __env.env[0]
          })
        };
      case 'optExpr':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        switch (__env.ast[0].type) {
        case 'Literal':
          return __env.ast[0];
        case 'ThisExpression':
          return {
            type: 'Identifier',
            name: '__this'
          };
        case 'Identifier':
          if (__env.ast[0].name.lastIndexOf('__', 0) === 0) {
            console.warn('any identifier starting with ``__" is reserved.');
          }
          if (__env.env[0][__env.ast[0].name]) {
            return {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: __env.ast[0]
              },
              property: {
                type: 'Literal',
                value: 0
              },
              computed: true
            };
          } else {
            return __env.ast[0];
          }
          return {
            type: 'ConditionalExpression',
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: '__env'
              },
              property: __env.ast[0]
            },
            consequent: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: __env.ast[0]
              },
              property: {
                type: 'Literal',
                value: 0
              },
              computed: true
            },
            alternate: __env.ast[0]
          };
        case 'SequenceExpression':
          __env.exprs = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].expressions.length; __env.i ? ++__env.i[0] : ++i) {
            __env.exprs[0].push(optExpr({
              ast: __env.ast[0].expressions[__env.i[0]],
              env: __env.env[0]
            }));
          }
          return {
            type: 'SequenceExpression',
            expressions: __env.exprs[0]
          };
        case 'UnaryExpression':
          switch (__env.ast[0].operator) {
          case 'typeof':
            switch (__env.ast[0].argument.type) {
            case 'Identifier':
              return {
                type: 'ConditionalExpression',
                test: existsLhs1({
                  ast: __env.ast[0].argument,
                  env: __env.env[0]
                }),
                consequent: {
                  type: 'UnaryExpression',
                  prefix: __env.ast[0].prefix,
                  argument: optLhs1({
                    ast: __env.ast[0].argument,
                    env: __env.env[0]
                  }),
                  operator: __env.ast[0].operator
                },
                alternate: {
                  type: 'UnaryExpression',
                  prefix: __env.ast[0].prefix,
                  argument: optLhs2({
                    ast: __env.ast[0].argument,
                    env: __env.env[0]
                  }),
                  operator: __env.ast[0].operator
                }
              };
            default:
              return {
                type: 'UnaryExpression',
                prefix: __env.ast[0].prefix,
                argument: optExpr({
                  ast: __env.ast[0].argument,
                  env: __env.env[0]
                }),
                operator: __env.ast[0].operator
              };
            }
          default:
            return {
              type: 'UnaryExpression',
              prefix: __env.ast[0].prefix,
              argument: optExpr({
                ast: __env.ast[0].argument,
                env: __env.env[0]
              }),
              operator: __env.ast[0].operator
            };
          }
        case 'NewExpression':
          __env.callee = [optExpr({
              ast: __env.ast[0].callee,
              env: __env.env[0]
            })];
          __env.args = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].arguments.length; __env.i ? ++__env.i[0] : ++i) {
            __env.args[0].push(optExpr({
              ast: __env.ast[0].arguments[__env.i[0]],
              env: __env.env[0]
            }));
          }
          return {
            type: 'NewExpression',
            callee: __env.callee[0],
            arguments: __env.args[0]
          };
        case 'UpdateExpression':
          __env.arg1 = [optLhs1({
              ast: __env.ast[0].argument,
              env: __env.env[0]
            })];
          __env.arg2 = [optLhs2({
              ast: __env.ast[0].argument,
              env: __env.env[0]
            })];
          return {
            type: 'ConditionalExpression',
            test: existsLhs1({
              ast: __env.ast[0].argument,
              env: __env.env[0]
            }),
            consequent: {
              type: 'UpdateExpression',
              operator: __env.ast[0].operator,
              argument: __env.arg1[0],
              prefix: __env.ast[0].prefix
            },
            alternate: {
              type: 'UpdateExpression',
              operator: __env.ast[0].operator,
              argument: __env.arg2[0],
              prefix: __env.ast[0].prefix
            }
          };
        case 'AssignmentExpression':
          __env.lhs1 = [optLhs1({
              ast: __env.ast[0].left,
              env: __env.env[0]
            })];
          __env.lhs2 = [optLhs2({
              ast: __env.ast[0].left,
              env: __env.env[0]
            })];
          __env.rhs = [optExpr({
              ast: __env.ast[0].right,
              env: __env.env[0]
            })];
          return {
            type: 'ConditionalExpression',
            test: existsLhs1({
              ast: __env.ast[0].left,
              env: __env.env[0]
            }),
            consequent: {
              type: 'AssignmentExpression',
              operator: __env.ast[0].operator,
              left: __env.lhs1[0],
              right: __env.rhs[0]
            },
            alternate: {
              type: 'AssignmentExpression',
              operator: __env.ast[0].operator,
              left: __env.lhs2[0],
              right: __env.rhs[0]
            }
          };
        case 'ConditionalExpression':
          __env.test = [optExpr({
              ast: __env.ast[0].test,
              env: __env.env[0]
            })];
          __env.alternate = [optExpr({
              ast: __env.ast[0].alternate,
              env: __env.env[0]
            })];
          __env.consequent = [optExpr({
              ast: __env.ast[0].consequent,
              env: __env.env[0]
            })];
          return {
            type: 'ConditionalExpression',
            test: __env.test[0],
            alternate: __env.alternate[0],
            consequent: __env.consequent[0]
          };
        case 'BinaryExpression':
          __env.lhs = [optExpr({
              ast: __env.ast[0].left,
              env: __env.env[0]
            })];
          __env.rhs = [optExpr({
              ast: __env.ast[0].right,
              env: __env.env[0]
            })];
          return {
            type: 'LogicalExpression',
            operator: __env.ast[0].operator,
            left: __env.lhs[0],
            right: __env.rhs[0]
          };
        case 'LogicalExpression':
          __env.lhs = [optExpr({
              ast: __env.ast[0].left,
              env: __env.env[0]
            })];
          __env.rhs = [optExpr({
              ast: __env.ast[0].right,
              env: __env.env[0]
            })];
          return {
            type: 'BinaryExpression',
            operator: __env.ast[0].operator,
            left: __env.lhs[0],
            right: __env.rhs[0]
          };
        case 'MemberExpression':
          __env.obj = [optExpr({
              ast: __env.ast[0].object,
              env: __env.env[0]
            })];
          if (__env.ast[0].computed) {
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: optExpr({
                ast: __env.ast[0].property,
                env: __env.env[0]
              }),
              computed: __env.ast[0].computed
            };
          } else {
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: __env.ast[0].property,
              computed: __env.ast[0].computed
            };
          }
        case 'ObjectExpression':
          __env.props = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].properties.length; __env.i ? ++__env.i[0] : ++i) {
            __env.prop = [__env.ast[0].properties[__env.i[0]]];
            __env.props[0].push({
              type: 'Property',
              key: __env.prop[0].key,
              value: optExpr({
                ast: __env.prop[0].value,
                env: __env.env[0]
              }),
              kind: __env.prop[0].kind
            });
          }
          return {
            type: 'ObjectExpression',
            properties: __env.props[0]
          };
        case 'ArrayExpression':
          __env.elts = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].elements.length; __env.i ? ++__env.i[0] : ++i) {
            __env.elt = [__env.ast[0].elements[__env.i[0]]];
            __env.elts[0].push(optExpr({
              ast: __env.elt[0],
              env: __env.env[0]
            }));
          }
          return {
            type: 'ArrayExpression',
            elements: __env.elts[0]
          };
        case 'FunctionExpression':
          __env.id = [{
              type: 'Identifier',
              name: gensym()
            }];
          __env.env ? __env.env[0] = shallowCopy(__env.env[0]) : env = shallowCopy(__env.env[0]);
          __env.fn = [{
              type: 'FunctionExpression',
              params: __env.ast[0].params,
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
                          value: __env.id[0].name
                        },
                        {
                          type: 'Identifier',
                          name: '__this'
                        },
                        copyenv(__env.env[0]),
                        {
                          type: 'ArrayExpression',
                          elements: __env.ast[0].params
                        }
                      ]
                    }
                  }]
              },
              id: __env.id[0],
              defaults: [],
              rest: null,
              generator: false,
              expression: false
            }];
          __env.mk = [{
              type: 'CallExpression',
              callee: {
                type: 'Identifier',
                name: '__mk'
              },
              arguments: [
                {
                  type: 'Literal',
                  value: __env.id[0].name
                },
                copyenv(__env.env[0]),
                __env.fn[0]
              ]
            }];
          __env.bind = [esprima.parse('(function (__env) { return; })()').body[0].expression];
          __env.bind ? __env.bind[0].callee.body.body[0].argument = __env.mk[0] : bind.callee.body.body[0].argument = __env.mk[0];
          __env.bind ? __env.bind[0].arguments[0] = copyenv(__env.env[0]) : bind.arguments[0] = copyenv(__env.env[0]);
          __env.body = [optStmt({
              ast: __env.ast[0].body,
              env: __env.env[0]
            })];
          __env.body1 = [[]];
          if (__env.ast[0].id != null) {
            __env.env ? __env.env[0][__env.ast[0].id.name] = true : env[__env.ast[0].id.name] = true;
            __env.body1[0].push({
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
                  property: __env.ast[0].id
                },
                right: __env.bind[0]
              }
            });
          }
          for (__env.i = [0]; __env.i[0] < __env.ast[0].params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [__env.ast[0].params[__env.i[0]]];
            __env.env ? __env.env[0][__env.param[0].name] = true : env[__env.param[0].name] = true;
            __env.setParam = [{
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
                    property: __env.param[0]
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
                          value: __env.i[0]
                        }
                      }]
                  }
                }
              }];
            __env.body1[0].push(__env.setParam[0]);
          }
          switch (__env.body[0].type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = __env.body1[0].concat(__env.body[0].body) : body1 = __env.body1[0].concat(__env.body[0].body);
            break;
          default:
            __env.body1[0].push(__env.body[0]);
          }
          appendCase({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: __env.id[0].name
            },
            consequent: __env.body1[0]
          });
          return __env.bind[0];
        case 'CallExpression':
          __env.callee = [optExpr({
              ast: __env.ast[0].callee,
              env: __env.env[0]
            })];
          __env.args = [[]];
          for (__env.i = [0]; __env.i[0] < __env.ast[0].arguments.length; __env.i ? ++__env.i[0] : ++i) {
            __env.args[0].push(optExpr({
              ast: __env.ast[0].arguments[__env.i[0]],
              env: __env.env[0]
            }));
          }
          return {
            type: 'CallExpression',
            callee: __env.callee[0],
            arguments: __env.args[0]
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'optLhs2':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        switch (__env.ast[0].type) {
        case 'MemberExpression':
          if (__env.ast[0].computed) {
            return {
              type: 'MemberExpression',
              object: __env.ast[0].object,
              computed: __env.ast[0].computed,
              property: optExpr({
                ast: __env.ast[0].property,
                env: __env.env[0]
              })
            };
          } else {
            return __env.ast[0];
          }
        default:
          return __env.ast[0];
        }
      case 'optLhs1':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        switch (__env.ast[0].type) {
        case 'MemberExpression':
          if (__env.ast[0].computed) {
            __env.obj = [optLhs1({
                ast: __env.ast[0].object,
                env: __env.env[0]
              })];
            __env.prop = [optExpr({
                ast: __env.ast[0].property,
                env: __env.env[0]
              })];
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: __env.prop[0],
              computed: __env.ast[0].computed
            };
          } else {
            __env.obj = [optLhs1({
                ast: __env.ast[0].object,
                env: __env.env[0]
              })];
            return {
              type: 'MemberExpression',
              object: __env.obj[0],
              property: __env.ast[0].property,
              computed: __env.ast[0].computed
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
              property: __env.ast[0]
            },
            computed: true,
            property: {
              type: 'Literal',
              value: 0
            }
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'existsLhs1':
        __env.info = [__args[0]];
        __env.ast = [__env.info[0].ast];
        __env.env = [__env.info[0].env];
        switch (__env.ast[0].type) {
        case 'MemberExpression': {
            __args = [{
                ast: __env.ast[0].object,
                env: __env.env[0]
              }];
            __label = existsLhs1.__label;
            __env = existsLhs1.__env;
            continue __jmp;
          }
        case 'Identifier':
          return {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: __env.ast[0]
          };
        default:
          console.error('unrecognized ast: ' + __env.ast[0].type);
        }
      case 'isTailCallStmt':
        __env.ast = [__args[0]];
        switch (__env.ast[0].type) {
        case 'ExpressionStatement': {
            __args = [__env.ast[0].expression];
            __label = isTailCallExpr.__label;
            __env = isTailCallExpr.__env;
            continue __jmp;
          }
        case 'BlockStatement': {
            __args = [__env.ast[0].body[__env.ast[0].body.length - 1]];
            __label = isTailCallStmt.__label;
            __env = isTailCallStmt.__env;
            continue __jmp;
          }
        case 'ReturnStatement': {
            __args = [__env.ast[0].argument];
            __label = isTailCallExpr.__label;
            __env = isTailCallExpr.__env;
            continue __jmp;
          }
        case 'IfStatement':
          return isTailCallStmt(__env.ast[0].consequent) || isTailCallStmt(__env.ast[0].alternate);
        default:
          return false;
        }
      case 'isTailCallExpr':
        __env.ast = [__args[0]];
        switch (__env.ast[0].type) {
        case 'CallExpression':
          return true;
        default:
          return false;
        }
      case 'gensym':
        __env.i ? __env.i[0] += 1 : i += 1;
        return '__lambda_' + i;
      case 'appendGlobalVar':
        __env.ident = [__args[0]];
        return;
        __env.prop1 = [{
            type: 'Property',
            key: __env.ident[0],
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
                        value: __env.ident[0].name
                      },
                      kind: 'init'
                    }]
                }]
            },
            kind: 'init'
          }];
        OUTPUT.body[0].declarations[0].init.properties.push(__env.prop1[0]);
      case 'appendVar':
        __env.ident = [__args[0]];
        if (VARS[__env.ident[0].name]) {
          return;
        }
        __env.VARS ? __env.VARS[0][__env.ident[0].name] = true : VARS[__env.ident[0].name] = true;
        __env.stmt = [{
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                object: { type: 'ThisExpression' },
                property: __env.ident[0]
              },
              right: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: __env.ident[0]
              }
            }
          }];
        __env.stmt ? __env.stmt[0] = {
          type: 'IfStatement',
          test: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: __env.ident[0]
          },
          consequent: __env.stmt[0]
        } : stmt = {
          type: 'IfStatement',
          test: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: __env.ident[0]
          },
          consequent: __env.stmt[0]
        };
        OUTPUT.body[0].body.body.push(__env.stmt[0]);
      case 'appendProp':
        __env.a_prop = [__args[0]];
        return;
      case 'appendCase':
        __env.a_case = [__args[0]];
        OUTPUT.body[0].body.body[0].body.body.body[0].cases.unshift(__env.a_case[0]);
        return;
      case 'shallowCopy':
        __env.obj = [__args[0]];
        __env.cp = [{}];
        __env.k = [];
        for (__env.k[0] in __env.obj[0]) {
          __env.cp ? __env.cp[0][__env.k[0]] = __env.obj[0][__env.k[0]] : cp[__env.k[0]] = __env.obj[0][__env.k[0]];
        }
        return __env.cp[0];
      case 'copyenv':
        __env.env = [__args[0]];
        __env.cp = [{
            type: 'ObjectExpression',
            properties: []
          }];
        __env.k = [];
        for (__env.k[0] in __env.env[0]) {
          __env.prop = [{
              type: 'Property',
              key: {
                type: 'Identifier',
                name: __env.k[0]
              },
              value: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: {
                  type: 'Identifier',
                  name: __env.k[0]
                }
              },
              kind: 'init'
            }];
          __env.cp[0].properties.push(__env.prop[0]);
        }
        return __env.cp[0];
      default:
        console.error('unrecognized label: ' + __label);
        break __jmp;
      }
    }
}
function __call1(__label, __this, __env, __args) {
  var ret = __call(__label, __this, __env, __args);
  if (typeof ret === 'object' && ret.__label && ret.__env) {
    return function () {
      return __call1(ret.__label, this, ret.__env, [].slice.call(arguments));
    };
  } else {
    return ret;
  }
}
function __mk(__label, __env, fn) {
  fn.__label = __label;
  fn.__env = __env;
  return fn;
}
var fs;
fs = require('fs');
var escodegen;
escodegen = require('escodegen');
var esprima;
esprima = require('esprima');
var LOOP;
LOOP = 'function __call(__label, __this, __env, __args) { ' + '  __jmp:' + '  while(true) {' + '    switch(__label) {' + '    default:' + '      console.error(\'unrecognized label: \' + __label);' + '      break __jmp;' + '    }' + '  }' + '}' + 'function __call1(__label, __this, __env, __args) { var ret = __call(__label, __this, __env, __args); if (typeof ret === "object" && ret.__label && ret.__env){ return function () { return __call1(ret.__label,this,ret.__env,[].slice.call(arguments)) } } else { return ret; } }' + 'function __mk(__label,__env,fn){ fn.__label = __label;fn.__env = __env;return fn; }';
var OUTPUT;
OUTPUT = esprima.parse(LOOP);
var GLOBAL;
GLOBAL = {
  type: 'ObjectExpression',
  properties: []
};
var COPYENV;
COPYENV = esprima.parse('__env').body[0].expression;
var COPYGLOBAL;
COPYGLOBAL = esprima.parse('({})').body[0].expression;
function copyenv(env) {
  return __call('copyenv', this, {}, [env]);
}
copyenv.__label = 'copyenv';
copyenv.__env = {};
function shallowCopy(obj) {
  return __call('shallowCopy', this, {}, [obj]);
}
shallowCopy.__label = 'shallowCopy';
shallowCopy.__env = {};
function appendCase(a_case) {
  return __call('appendCase', this, {}, [a_case]);
}
appendCase.__label = 'appendCase';
appendCase.__env = {};
function appendProp(a_prop) {
  return __call('appendProp', this, {}, [a_prop]);
}
appendProp.__label = 'appendProp';
appendProp.__env = {};
var VARS;
VARS = {};
function appendVar(ident) {
  return __call('appendVar', this, {}, [ident]);
}
appendVar.__label = 'appendVar';
appendVar.__env = {};
function appendGlobalVar(ident) {
  return __call('appendGlobalVar', this, {}, [ident]);
}
appendGlobalVar.__label = 'appendGlobalVar';
appendGlobalVar.__env = {};
var i;
i = 0;
function gensym() {
  return __call('gensym', this, {}, []);
}
gensym.__label = 'gensym';
gensym.__env = {};
function isTailCallExpr(ast) {
  return __call('isTailCallExpr', this, {}, [ast]);
}
isTailCallExpr.__label = 'isTailCallExpr';
isTailCallExpr.__env = {};
function isTailCallStmt(ast) {
  return __call('isTailCallStmt', this, {}, [ast]);
}
isTailCallStmt.__label = 'isTailCallStmt';
isTailCallStmt.__env = {};
function existsLhs1(info) {
  return __call('existsLhs1', this, {}, [info]);
}
existsLhs1.__label = 'existsLhs1';
existsLhs1.__env = {};
function optLhs1(info) {
  return __call('optLhs1', this, {}, [info]);
}
optLhs1.__label = 'optLhs1';
optLhs1.__env = {};
function optLhs2(info) {
  return __call('optLhs2', this, {}, [info]);
}
optLhs2.__label = 'optLhs2';
optLhs2.__env = {};
function optExpr(info) {
  return __call('optExpr', this, {}, [info]);
}
optExpr.__label = 'optExpr';
optExpr.__env = {};
function optCatchClause(info) {
  return __call('optCatchClause', this, {}, [info]);
}
optCatchClause.__label = 'optCatchClause';
optCatchClause.__env = {};
function optVariableDeclaration(info) {
  return __call('optVariableDeclaration', this, {}, [info]);
}
optVariableDeclaration.__label = 'optVariableDeclaration';
optVariableDeclaration.__env = {};
function optStmt(info) {
  return __call('optStmt', this, {}, [info]);
}
optStmt.__label = 'optStmt';
optStmt.__env = {};
function optToplevelExpr(ast) {
  return __call('optToplevelExpr', this, {}, [ast]);
}
optToplevelExpr.__label = 'optToplevelExpr';
optToplevelExpr.__env = {};
function optToplevelCatchClause(ast) {
  return __call('optToplevelCatchClause', this, {}, [ast]);
}
optToplevelCatchClause.__label = 'optToplevelCatchClause';
optToplevelCatchClause.__env = {};
function optToplevelVariableDeclaration(ast) {
  return __call('optToplevelVariableDeclaration', this, {}, [ast]);
}
optToplevelVariableDeclaration.__label = 'optToplevelVariableDeclaration';
optToplevelVariableDeclaration.__env = {};
function optToplevelStmt(ast) {
  return __call('optToplevelStmt', this, {}, [ast]);
}
optToplevelStmt.__label = 'optToplevelStmt';
optToplevelStmt.__env = {};
function optProgram(ast) {
  return __call('optProgram', this, {}, [ast]);
}
optProgram.__label = 'optProgram';
optProgram.__env = {};
fs.readFile(process.argv[2], 'utf-8', __mk('__lambda_1', {}, function __lambda_1(err, code) {
  return __call('__lambda_1', this, {}, [
    err,
    code
  ]);
}));
