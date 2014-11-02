var __global = {};
function __ENV(__env) {
  if (__env.appendCase)
    this.appendCase = __env.appendCase;
  if (__env.a_case)
    this.a_case = __env.a_case;
  if (__env.appendProp)
    this.appendProp = __env.appendProp;
  if (__env.a_prop)
    this.a_prop = __env.a_prop;
  if (__env.stmt)
    this.stmt = __env.stmt;
  if (__env.appendVar)
    this.appendVar = __env.appendVar;
  if (__env.ident)
    this.ident = __env.ident;
  if (__env.prop1)
    this.prop1 = __env.prop1;
  if (__env.appendGlobalVar)
    this.appendGlobalVar = __env.appendGlobalVar;
  if (__env.gensym)
    this.gensym = __env.gensym;
  if (__env.isTailCallExpr)
    this.isTailCallExpr = __env.isTailCallExpr;
  if (__env.ast)
    this.ast = __env.ast;
  if (__env.isTailCallStmt)
    this.isTailCallStmt = __env.isTailCallStmt;
  if (__env.existsLhs1)
    this.existsLhs1 = __env.existsLhs1;
  if (__env.obj)
    this.obj = __env.obj;
  if (__env.prop)
    this.prop = __env.prop;
  if (__env.optLhs1)
    this.optLhs1 = __env.optLhs1;
  if (__env.optLhs2)
    this.optLhs2 = __env.optLhs2;
  if (__env.exprs)
    this.exprs = __env.exprs;
  if (__env.i)
    this.i = __env.i;
  if (__env.callee)
    this.callee = __env.callee;
  if (__env.args)
    this.args = __env.args;
  if (__env.arg1)
    this.arg1 = __env.arg1;
  if (__env.arg2)
    this.arg2 = __env.arg2;
  if (__env.lhs1)
    this.lhs1 = __env.lhs1;
  if (__env.lhs2)
    this.lhs2 = __env.lhs2;
  if (__env.rhs)
    this.rhs = __env.rhs;
  if (__env.test)
    this.test = __env.test;
  if (__env.alternate)
    this.alternate = __env.alternate;
  if (__env.consequent)
    this.consequent = __env.consequent;
  if (__env.lhs)
    this.lhs = __env.lhs;
  if (__env.props)
    this.props = __env.props;
  if (__env.elts)
    this.elts = __env.elts;
  if (__env.elt)
    this.elt = __env.elt;
  if (__env.id)
    this.id = __env.id;
  if (__env.fn)
    this.fn = __env.fn;
  if (__env.mk)
    this.mk = __env.mk;
  if (__env.bind)
    this.bind = __env.bind;
  if (__env.body)
    this.body = __env.body;
  if (__env.body1)
    this.body1 = __env.body1;
  if (__env.param)
    this.param = __env.param;
  if (__env.setParam)
    this.setParam = __env.setParam;
  if (__env.optExpr)
    this.optExpr = __env.optExpr;
  if (__env.optCatchClause)
    this.optCatchClause = __env.optCatchClause;
  if (__env.declarations)
    this.declarations = __env.declarations;
  if (__env.declaration)
    this.declaration = __env.declaration;
  if (__env.optVariableDeclaration)
    this.optVariableDeclaration = __env.optVariableDeclaration;
  if (__env.expr)
    this.expr = __env.expr;
  if (__env.discriminant)
    this.discriminant = __env.discriminant;
  if (__env.cases)
    this.cases = __env.cases;
  if (__env.j)
    this.j = __env.j;
  if (__env.arg)
    this.arg = __env.arg;
  if (__env.block)
    this.block = __env.block;
  if (__env.handlers)
    this.handlers = __env.handlers;
  if (__env.guardedHandlers)
    this.guardedHandlers = __env.guardedHandlers;
  if (__env.finalizer)
    this.finalizer = __env.finalizer;
  if (__env.init)
    this.init = __env.init;
  if (__env.update)
    this.update = __env.update;
  if (__env.argument)
    this.argument = __env.argument;
  if (__env.optStmt)
    this.optStmt = __env.optStmt;
  if (__env.optToplevelExpr)
    this.optToplevelExpr = __env.optToplevelExpr;
  if (__env.optToplevelCatchClause)
    this.optToplevelCatchClause = __env.optToplevelCatchClause;
  if (__env.optToplevelVariableDeclaration)
    this.optToplevelVariableDeclaration = __env.optToplevelVariableDeclaration;
  if (__env.decls)
    this.decls = __env.decls;
  if (__env.decl)
    this.decl = __env.decl;
  if (__env.optToplevelStmt)
    this.optToplevelStmt = __env.optToplevelStmt;
  if (__env.optProgram)
    this.optProgram = __env.optProgram;
  if (__env.program)
    this.program = __env.program;
  if (__env.__lambda_1)
    this.__lambda_1 = __env.__lambda_1;
  if (__env.err)
    this.err = __env.err;
  if (__env.code)
    this.code = __env.code;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_1':
        __env.err = [__args[0]];
        __env.code = [__args[1]];
        if (__env.err ? __env.err[0] : err) {
          (__env.console ? __env.console[0] : console).error(__env.err ? __env.err[0] : err);
          return;
        }
        __env.program = [(__env.optProgram ? __env.optProgram[0] : optProgram)((__env.esprima ? __env.esprima[0] : esprima).parse(__env.code ? __env.code[0] : code))];
        __env.OUTPUT ? __env.OUTPUT[0].body = (__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT).body.concat((__env.program ? __env.program[0] : program).body) : OUTPUT.body = (__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT).body.concat((__env.program ? __env.program[0] : program).body);
        (__env.console ? __env.console[0] : console).log((__env.escodegen ? __env.escodegen[0] : escodegen).generate(__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT, { indent: '  ' }));
        return;
      case 'optProgram':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'Program':
          __env.body = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [(__env.ast ? __env.ast[0] : ast).body[__env.i ? __env.i[0] : i]];
            __env.stmt ? __env.stmt[0] = (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)(__env.stmt ? __env.stmt[0] : stmt) : stmt = (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)(__env.stmt ? __env.stmt[0] : stmt);
            switch ((__env.stmt ? __env.stmt[0] : stmt).type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body) : body = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body);
              break;
            default:
              (__env.body ? __env.body[0] : body).push(__env.stmt ? __env.stmt[0] : stmt);
            }
          }
          return {
            type: 'Program',
            body: __env.body ? __env.body[0] : body
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'optToplevelStmt':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'EmptyStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'BlockStatement':
          __env.body = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [(__env.ast ? __env.ast[0] : ast).body[__env.i ? __env.i[0] : i]];
            __env.stmt ? __env.stmt[0] = (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)(__env.stmt ? __env.stmt[0] : stmt) : stmt = (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)(__env.stmt ? __env.stmt[0] : stmt);
            switch ((__env.stmt ? __env.stmt[0] : stmt).type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body) : body = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body);
              break;
            default:
              (__env.body ? __env.body[0] : body).push(__env.stmt ? __env.stmt[0] : stmt);
            }
          }
          return {
            type: 'BlockStatement',
            body: __env.body ? __env.body[0] : body
          };
        case 'ExpressionStatement':
          __env.expr = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).expression)];
          return {
            type: 'ExpressionStatement',
            expression: __env.expr ? __env.expr[0] : expr
          };
        case 'IfStatement':
          __env.test = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.consequent = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).consequent)];
          __env.alternate = [(__env.ast ? __env.ast[0] : ast).alternate ? (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).alternate) : null];
          return {
            type: 'IfStatement',
            test: __env.test ? __env.test[0] : test,
            consequent: __env.consequent ? __env.consequent[0] : consequent,
            alternate: __env.alternate ? __env.alternate[0] : alternate
          };
        case 'LabeledStatement':
          __env.body = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'LabeledStatement',
            label: (__env.ast ? __env.ast[0] : ast).label,
            body: __env.body ? __env.body[0] : body
          };
        case 'BreakStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'ContinueStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'WithStatement':
          __env.obj = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).object)];
          __env.body = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'WithStatement',
            object: __env.obj ? __env.obj[0] : obj,
            body: __env.body ? __env.body[0] : body
          };
        case 'SwitchStatement':
          __env.discriminant = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).discriminant)];
          __env.cases = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).cases.length; __env.i ? ++__env.i[0] : ++i) {
            __env.test = [(__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].test ? (__env.opTopleveltExpr ? __env.opTopleveltExpr[0] : opTopleveltExpr)((__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].test) : null];
            __env.body = [[]];
            for (__env.j = [0]; (__env.j ? __env.j[0] : j) < (__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].consequent.length; __env.j ? ++__env.j[0] : ++j) {
              (__env.body ? __env.body[0] : body).push((__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].consequent[__env.j ? __env.j[0] : j]));
            }
            (__env.cases ? __env.cases[0] : cases).push({
              type: 'SwitchCase',
              test: __env.test ? __env.test[0] : test,
              consequent: __env.body ? __env.body[0] : body,
              lexical: (__env.ast ? __env.ast[0] : ast).lexical
            });
          }
          return {
            type: 'SwitchStatement',
            discriminant: __env.discriminant ? __env.discriminant[0] : discriminant,
            cases: __env.cases ? __env.cases[0] : cases,
            lexical: (__env.ast ? __env.ast[0] : ast).lexical
          };
        case 'ThrowStatement':
          __env.arg = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).argument)];
          return {
            type: 'ThrowStatement',
            argument: __env.arg ? __env.arg[0] : arg
          };
        case 'TryStatement':
          __env.block = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).block)];
          __env.handlers = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).handlers.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.handlers ? __env.handlers[0] : handlers).push((__env.optToplevelCatchClause ? __env.optToplevelCatchClause[0] : optToplevelCatchClause)((__env.ast ? __env.ast[0] : ast).handlers[__env.i ? __env.i[0] : i]));
          }
          __env.guardedHandlers = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).guardedHandlers.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.guardedHandlers ? __env.guardedHandlers[0] : guardedHandlers).push((__env.optToplevelCatchClause ? __env.optToplevelCatchClause[0] : optToplevelCatchClause)((__env.ast ? __env.ast[0] : ast).guardedHandlers[__env.i ? __env.i[0] : i]));
          }
          __env.finalizer = [(__env.ast ? __env.ast[0] : ast).finalizer ? (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).finalizer) : null];
          return {
            type: 'TryStatement',
            block: __env.block ? __env.block[0] : block,
            handlers: __env.handlers ? __env.handlers[0] : handlers,
            guardedHandlers: __env.guardedHandlers ? __env.guardedHandlers[0] : guardedHandlers,
            finalizer: __env.finalizer ? __env.finalizer[0] : finalizer
          };
        case 'WhileStatement':
          __env.test = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.body = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'WhileStatement',
            test: __env.test ? __env.test[0] : test,
            body: __env.body ? __env.body[0] : body
          };
        case 'DoWhileStatement':
          __env.test = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.body = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'DoWhileStatement',
            test: __env.test ? __env.test[0] : test,
            body: __env.body ? __env.body[0] : body
          };
        case 'ForStatement':
          if ((__env.ast ? __env.ast[0] : ast).init == null) {
            __env.init = [null];
          } else {
            switch ((__env.ast ? __env.ast[0] : ast).init.type) {
            case 'VariableDeclaration':
              __env.init = [(__env.optToplevelVariableDeclaration ? __env.optToplevelVariableDeclaration[0] : optToplevelVariableDeclaration)((__env.ast ? __env.ast[0] : ast).init)];
              break;
            default:
              __env.init = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).init)];
            }
          }
          __env.test = [(__env.ast ? __env.ast[0] : ast).test ? (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).test) : null];
          __env.update = [(__env.ast ? __env.ast[0] : ast).update ? (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).update) : null];
          __env.body = [(__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'ForStatement',
            init: __env.init ? __env.init[0] : init,
            test: __env.test ? __env.test[0] : test,
            update: __env.update ? __env.update[0] : update,
            body: __env.body ? __env.body[0] : body
          };
        case 'DebuggerStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'VariableDeclaration':
          __env.decls = [[]];
          __env.body = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).declarations.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.decls ? __env.decls[0] : decls).push({
              type: 'VariableDeclaration',
              kind: (__env.ast ? __env.ast[0] : ast).kind,
              declarations: [{
                  type: 'VariableDeclarator',
                  id: (__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i].id
                }]
            });
          }
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).declarations.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.body ? __env.body[0] : body).push({
              type: 'ExpressionStatement',
              expression: {
                type: 'AssignmentExpression',
                operator: '=',
                left: (__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i].id,
                right: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i].init)
              }
            });
            (__env.body ? __env.body[0] : body).push({
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
                  property: (__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i].id
                },
                right: {
                  type: 'ArrayExpression',
                  elements: [(__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i].id]
                }
              }
            });
          }
          return {
            type: 'BlockStatement',
            body: (__env.decls ? __env.decls[0] : decls).concat(__env.body ? __env.body[0] : body)
          };
        case 'ReturnStatement':
          (__env.console ? __env.console[0] : console).error('unexpected ast: ReturnStatement');
          break;
        case 'FunctionDeclaration':
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          __env.body1 = [[]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.ast ? __env.ast[0] : ast).id);
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [(__env.ast ? __env.ast[0] : ast).params[__env.i ? __env.i[0] : i]];
            (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.param ? __env.param[0] : param);
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
                    property: __env.param ? __env.param[0] : param
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
                          value: __env.i ? __env.i[0] : i
                        }
                      }]
                  }
                }
              }];
            (__env.body1 ? __env.body1[0] : body1).push(__env.setParam ? __env.setParam[0] : setParam);
          }
          switch ((__env.body ? __env.body[0] : body).type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body) : body1 = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body);
            break;
          default:
            (__env.body1 ? __env.body1[0] : body1).push(__env.body ? __env.body[0] : body);
          }
          (__env.appendCase ? __env.appendCase[0] : appendCase)({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: (__env.ast ? __env.ast[0] : ast).id.name
            },
            consequent: __env.body1 ? __env.body1[0] : body1
          });
          __env.decl = [{
              type: 'FunctionDeclaration',
              params: (__env.ast ? __env.ast[0] : ast).params,
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
                          value: (__env.ast ? __env.ast[0] : ast).id.name
                        },
                        { type: 'ThisExpression' },
                        __env.COPYGLOBAL ? __env.COPYGLOBAL[0] : COPYGLOBAL,
                        {
                          type: 'ArrayExpression',
                          elements: (__env.ast ? __env.ast[0] : ast).params
                        }
                      ]
                    }
                  }]
              },
              id: (__env.ast ? __env.ast[0] : ast).id,
              defaults: [],
              rest: null,
              generator: false,
              expression: false
            }];
          return {
            type: 'BlockStatement',
            body: [
              __env.decl ? __env.decl[0] : decl,
              {
                type: 'ExpressionStatement',
                expression: {
                  type: 'AssignmentExpression',
                  operator: '=',
                  left: {
                    type: 'MemberExpression',
                    object: (__env.decl ? __env.decl[0] : decl).id,
                    property: {
                      type: 'Identifier',
                      name: '__label'
                    }
                  },
                  right: {
                    type: 'Literal',
                    value: (__env.decl ? __env.decl[0] : decl).id.name
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
                    object: (__env.decl ? __env.decl[0] : decl).id,
                    property: {
                      type: 'Identifier',
                      name: '__env'
                    }
                  },
                  right: __env.COPYGLOBAL ? __env.COPYGLOBAL[0] : COPYGLOBAL
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
                    property: (__env.decl ? __env.decl[0] : decl).id
                  },
                  right: {
                    type: 'ArrayExpression',
                    elements: [(__env.decl ? __env.decl[0] : decl).id]
                  }
                }
              }
            ]
          };
          ;
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'optToplevelVariableDeclaration':
        __env.ast = [__args[0]];
        __env.declarations = [[]];
        for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).declarations.length; __env.i ? ++__env.i[0] : ++i) {
          __env.declaration = [(__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.declaration ? __env.declaration[0] : declaration).id);
          if ((__env.declaration ? __env.declaration[0] : declaration).init) {
            (__env.declarations ? __env.declarations[0] : declarations).push({
              type: 'VariableDeclarator',
              id: (__env.declaration ? __env.declaration[0] : declaration).id,
              init: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.declaration ? __env.declaration[0] : declaration).init)
            });
          } else {
            (__env.declarations ? __env.declarations[0] : declarations).push(__env.declaration ? __env.declaration[0] : declaration);
          }
        }
        return {
          type: 'VariableDeclaration',
          declarations: __env.declarations ? __env.declarations[0] : declarations,
          kind: (__env.ast ? __env.ast[0] : ast).kind
        };
      case 'optToplevelCatchClause':
        __env.ast = [__args[0]];
        return {
          type: 'CatchClause',
          param: (__env.ast ? __env.ast[0] : ast).param,
          guard: (__env.ast ? __env.ast[0] : ast).guard ? (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).guard) : null,
          body: (__env.optToplevelStmt ? __env.optToplevelStmt[0] : optToplevelStmt)((__env.ast ? __env.ast[0] : ast).body)
        };
      case 'optToplevelExpr':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'Literal':
          return __env.ast ? __env.ast[0] : ast;
        case 'ThisExpression':
          return __env.ast ? __env.ast[0] : ast;
        case 'Identifier':
          if ((__env.ast ? __env.ast[0] : ast).name.lastIndexOf('__', 0) === 0) {
            (__env.console ? __env.console[0] : console).warn('any identifier starting with ``__" is reserved.');
          }
          return __env.ast ? __env.ast[0] : ast;
        case 'AssignmentExpression':
          __env.lhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'AssignmentExpression',
            operator: (__env.ast ? __env.ast[0] : ast).operator,
            left: __env.lhs ? __env.lhs[0] : lhs,
            right: __env.rhs ? __env.rhs[0] : rhs
          };
        case 'SequenceExpression':
          __env.exprs = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).expressions.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.exprs ? __env.exprs[0] : exprs).push((__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).expressions[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'SequenceExpression',
            expressions: __env.exprs ? __env.exprs[0] : exprs
          };
        case 'UpdateExpression':
          return {
            type: 'UpdateExpression',
            prefix: (__env.ast ? __env.ast[0] : ast).prefix,
            argument: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).argument),
            operator: (__env.ast ? __env.ast[0] : ast).operator
          };
        case 'UnaryExpression':
          return {
            type: 'UnaryExpression',
            prefix: (__env.ast ? __env.ast[0] : ast).prefix,
            argument: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).argument),
            operator: (__env.ast ? __env.ast[0] : ast).operator
          };
        case 'NewExpression':
          __env.callee = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).callee)];
          __env.args = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).arguments.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.args ? __env.args[0] : args).push((__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).arguments[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'NewExpression',
            callee: __env.callee ? __env.callee[0] : callee,
            arguments: __env.args ? __env.args[0] : args
          };
        case 'ConditionalExpression':
          __env.test = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.alternate = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).alternate)];
          __env.consequent = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).consequent)];
          return {
            type: 'ConditionalExpression',
            test: __env.test ? __env.test[0] : test,
            alternate: __env.alternate ? __env.alternate[0] : alternate,
            consequent: __env.consequent ? __env.consequent[0] : consequent
          };
        case 'LogicalExpression':
          __env.lhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'LogicalExpression',
            operator: (__env.ast ? __env.ast[0] : ast).operator,
            left: __env.lhs ? __env.lhs[0] : lhs,
            right: __env.rhs ? __env.rhs[0] : rhs
          };
        case 'BinaryExpression':
          __env.lhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'BinaryExpression',
            operator: (__env.ast ? __env.ast[0] : ast).operator,
            left: __env.lhs ? __env.lhs[0] : lhs,
            right: __env.rhs ? __env.rhs[0] : rhs
          };
        case 'MemberExpression':
          __env.obj = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).object)];
          if ((__env.ast ? __env.ast[0] : ast).computed) {
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).property),
              computed: (__env.ast ? __env.ast[0] : ast).computed
            };
          } else {
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: (__env.ast ? __env.ast[0] : ast).property,
              computed: (__env.ast ? __env.ast[0] : ast).computed
            };
          }
        case 'ObjectExpression':
          __env.props = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).properties.length; __env.i ? ++__env.i[0] : ++i) {
            __env.prop = [(__env.ast ? __env.ast[0] : ast).properties[__env.i ? __env.i[0] : i]];
            (__env.props ? __env.props[0] : props).push({
              type: 'Property',
              key: (__env.prop ? __env.prop[0] : prop).key,
              value: (__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.prop ? __env.prop[0] : prop).value),
              kind: (__env.prop ? __env.prop[0] : prop).kind
            });
          }
          return {
            type: 'ObjectExpression',
            properties: __env.props ? __env.props[0] : props
          };
        case 'ArrayExpression':
          __env.elts = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).elements.length; __env.i ? ++__env.i[0] : ++i) {
            __env.elt = [(__env.ast ? __env.ast[0] : ast).elements[__env.i ? __env.i[0] : i]];
            (__env.elts ? __env.elts[0] : elts).push((__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)(__env.elt ? __env.elt[0] : elt));
          }
          return {
            type: 'ArrayExpression',
            elements: __env.elts ? __env.elts[0] : elts
          };
        case 'FunctionExpression':
          __env.id = [{
              type: 'Identifier',
              name: (__env.gensym ? __env.gensym[0] : gensym)()
            }];
          __env.fn = [{
              type: 'FunctionExpression',
              params: (__env.ast ? __env.ast[0] : ast).params,
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
                          value: (__env.id ? __env.id[0] : id).name
                        },
                        { type: 'ThisExpression' },
                        __env.COPYGLOBAL ? __env.COPYGLOBAL[0] : COPYGLOBAL,
                        {
                          type: 'ArrayExpression',
                          elements: (__env.ast ? __env.ast[0] : ast).params
                        }
                      ]
                    }
                  }]
              },
              id: __env.id ? __env.id[0] : id,
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
                  value: (__env.id ? __env.id[0] : id).name
                },
                __env.COPYGLOBAL ? __env.COPYGLOBAL[0] : COPYGLOBAL,
                __env.fn ? __env.fn[0] : fn
              ]
            }];
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          __env.body1 = [[]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.id ? __env.id[0] : id);
          if ((__env.ast ? __env.ast[0] : ast).id != null) {
            (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.ast ? __env.ast[0] : ast).id);
            (__env.body1 ? __env.body1[0] : body1).push({
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
                  property: (__env.ast ? __env.ast[0] : ast).id
                },
                right: __env.mk ? __env.mk[0] : mk
              }
            });
          }
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [(__env.ast ? __env.ast[0] : ast).params[__env.i ? __env.i[0] : i]];
            (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.param ? __env.param[0] : param);
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
                    property: __env.param ? __env.param[0] : param
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
                          value: __env.i ? __env.i[0] : i
                        }
                      }]
                  }
                }
              }];
            (__env.body1 ? __env.body1[0] : body1).push(__env.setParam ? __env.setParam[0] : setParam);
          }
          switch ((__env.body ? __env.body[0] : body).type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body) : body1 = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body);
            break;
          default:
            (__env.body1 ? __env.body1[0] : body1).push(__env.body ? __env.body[0] : body);
          }
          (__env.appendCase ? __env.appendCase[0] : appendCase)({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: (__env.id ? __env.id[0] : id).name
            },
            consequent: __env.body1 ? __env.body1[0] : body1
          });
          return __env.mk ? __env.mk[0] : mk;
          ;
        case 'CallExpression':
          __env.callee = [(__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).callee)];
          __env.args = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).arguments.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.args ? __env.args[0] : args).push((__env.optToplevelExpr ? __env.optToplevelExpr[0] : optToplevelExpr)((__env.ast ? __env.ast[0] : ast).arguments[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'CallExpression',
            callee: __env.callee ? __env.callee[0] : callee,
            arguments: __env.args ? __env.args[0] : args
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'optStmt':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'EmptyStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'BlockStatement':
          __env.body = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).body.length; __env.i ? ++__env.i[0] : ++i) {
            __env.stmt = [(__env.ast ? __env.ast[0] : ast).body[__env.i ? __env.i[0] : i]];
            __env.stmt ? __env.stmt[0] = (__env.optStmt ? __env.optStmt[0] : optStmt)(__env.stmt ? __env.stmt[0] : stmt) : stmt = (__env.optStmt ? __env.optStmt[0] : optStmt)(__env.stmt ? __env.stmt[0] : stmt);
            switch ((__env.stmt ? __env.stmt[0] : stmt).type) {
            case 'BlockStatement':
              __env.body ? __env.body[0] = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body) : body = (__env.body ? __env.body[0] : body).concat((__env.stmt ? __env.stmt[0] : stmt).body);
              break;
            default:
              (__env.body ? __env.body[0] : body).push(__env.stmt ? __env.stmt[0] : stmt);
            }
          }
          return {
            type: 'BlockStatement',
            body: __env.body ? __env.body[0] : body
          };
        case 'ExpressionStatement':
          __env.expr = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).expression)];
          return {
            type: 'ExpressionStatement',
            expression: __env.expr ? __env.expr[0] : expr
          };
        case 'IfStatement':
          __env.test = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.consequent = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).consequent)];
          __env.alternate = [(__env.ast ? __env.ast[0] : ast).alternate ? (__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).alternate) : null];
          return {
            type: 'IfStatement',
            test: __env.test ? __env.test[0] : test,
            consequent: __env.consequent ? __env.consequent[0] : consequent,
            alternate: __env.alternate ? __env.alternate[0] : alternate
          };
        case 'LabeledStatement':
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'LabeledStatement',
            label: (__env.ast ? __env.ast[0] : ast).label,
            body: __env.body ? __env.body[0] : body
          };
        case 'BreakStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'ContinueStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'WithStatement':
          __env.obj = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).object)];
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'WithStatement',
            object: __env.obj ? __env.obj[0] : obj,
            body: __env.body ? __env.body[0] : body
          };
        case 'SwitchStatement':
          __env.discriminant = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).discriminant)];
          __env.cases = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).cases.length; __env.i ? ++__env.i[0] : ++i) {
            __env.test = [(__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].test ? (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].test) : null];
            __env.body = [[]];
            for (__env.j = [0]; (__env.j ? __env.j[0] : j) < (__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].consequent.length; __env.j ? ++__env.j[0] : ++j) {
              (__env.body ? __env.body[0] : body).push((__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).cases[__env.i ? __env.i[0] : i].consequent[__env.j ? __env.j[0] : j]));
            }
            (__env.cases ? __env.cases[0] : cases).push({
              type: 'SwitchCase',
              test: __env.test ? __env.test[0] : test,
              consequent: __env.body ? __env.body[0] : body,
              lexical: (__env.ast ? __env.ast[0] : ast).lexical
            });
          }
          return {
            type: 'SwitchStatement',
            discriminant: __env.discriminant ? __env.discriminant[0] : discriminant,
            cases: __env.cases ? __env.cases[0] : cases,
            lexical: (__env.ast ? __env.ast[0] : ast).lexical
          };
        case 'ThrowStatement':
          __env.arg = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).argument)];
          return {
            type: 'ThrowStatement',
            argument: __env.arg ? __env.arg[0] : arg
          };
        case 'TryStatement':
          __env.block = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).block)];
          __env.handlers = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).handlers.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.handlers ? __env.handlers[0] : handlers).push((__env.optCatchClause ? __env.optCatchClause[0] : optCatchClause)((__env.ast ? __env.ast[0] : ast).handlers[__env.i ? __env.i[0] : i]));
          }
          __env.guardedHandlers = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).guardedHandlers.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.guardedHandlers ? __env.guardedHandlers[0] : guardedHandlers).push((__env.optCatchClause ? __env.optCatchClause[0] : optCatchClause)((__env.ast ? __env.ast[0] : ast).guardedHandlers[__env.i ? __env.i[0] : i]));
          }
          __env.finalizer = [(__env.ast ? __env.ast[0] : ast).finalizer ? (__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).finalizer) : null];
          return {
            type: 'TryStatement',
            block: __env.block ? __env.block[0] : block,
            handlers: __env.handlers ? __env.handlers[0] : handlers,
            guardedHandlers: __env.guardedHandlers ? __env.guardedHandlers[0] : guardedHandlers,
            finalizer: __env.finalizer ? __env.finalizer[0] : finalizer
          };
        case 'WhileStatement':
          __env.test = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'WhileStatement',
            test: __env.test ? __env.test[0] : test,
            body: __env.body ? __env.body[0] : body
          };
        case 'DoWhileStatement':
          __env.test = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'DoWhileStatement',
            test: __env.test ? __env.test[0] : test,
            body: __env.body ? __env.body[0] : body
          };
        case 'ForStatement':
          if ((__env.ast ? __env.ast[0] : ast).init == null) {
            __env.init = [null];
          } else {
            switch ((__env.ast ? __env.ast[0] : ast).init.type) {
            case 'VariableDeclaration':
              __env.init = [(__env.optVariableDeclaration ? __env.optVariableDeclaration[0] : optVariableDeclaration)((__env.ast ? __env.ast[0] : ast).init)];
              break;
            default:
              __env.init = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).init)];
            }
          }
          __env.test = [(__env.ast ? __env.ast[0] : ast).test ? (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test) : null];
          __env.update = [(__env.ast ? __env.ast[0] : ast).update ? (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).update) : null];
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          return {
            type: 'ForStatement',
            init: __env.init ? __env.init[0] : init,
            test: __env.test ? __env.test[0] : test,
            update: __env.update ? __env.update[0] : update,
            body: __env.body ? __env.body[0] : body
          };
        case 'DebuggerStatement':
          return __env.ast ? __env.ast[0] : ast;
        case 'VariableDeclaration':
          return {
            type: 'ExpressionStatement',
            expression: (__env.optVariableDeclaration ? __env.optVariableDeclaration[0] : optVariableDeclaration)(__env.ast ? __env.ast[0] : ast)
          };
        case 'ReturnStatement':
          if ((__env.ast ? __env.ast[0] : ast).argument == null) {
            return { type: 'ReturnStatement' };
          }
          __env.argument = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).argument)];
          switch ((__env.ast ? __env.ast[0] : ast).argument.type) {
          case 'CallExpression':
            switch ((__env.ast ? __env.ast[0] : ast).argument.callee.type) {
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
                        elements: (__env.argument ? __env.argument[0] : argument).arguments
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
                        object: (__env.argument ? __env.argument[0] : argument).callee,
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
                        object: (__env.argument ? __env.argument[0] : argument).callee,
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
                      right: (__env.argument ? __env.argument[0] : argument).callee.object
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
                        elements: (__env.argument ? __env.argument[0] : argument).arguments
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
                        object: (__env.argument ? __env.argument[0] : argument).callee,
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
                        object: (__env.argument ? __env.argument[0] : argument).callee,
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
              argument: __env.argument ? __env.argument[0] : argument
            };
          }
        case 'FunctionDeclaration':
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          __env.body1 = [[]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.ast ? __env.ast[0] : ast).id);
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [(__env.ast ? __env.ast[0] : ast).params[__env.i ? __env.i[0] : i]];
            (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.param ? __env.param[0] : param);
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
                    property: __env.param ? __env.param[0] : param
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
                          value: __env.i ? __env.i[0] : i
                        }
                      }]
                  }
                }
              }];
            (__env.body1 ? __env.body1[0] : body1).push(__env.setParam ? __env.setParam[0] : setParam);
          }
          switch ((__env.body ? __env.body[0] : body).type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body) : body1 = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body);
            break;
          default:
            (__env.body1 ? __env.body1[0] : body1).push(__env.body ? __env.body[0] : body);
          }
          (__env.appendCase ? __env.appendCase[0] : appendCase)({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: (__env.ast ? __env.ast[0] : ast).id.name
            },
            consequent: __env.body1 ? __env.body1[0] : body1
          });
          __env.fn = [{
              type: 'FunctionExpression',
              params: (__env.ast ? __env.ast[0] : ast).params,
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
                          value: (__env.ast ? __env.ast[0] : ast).id.name
                        },
                        {
                          type: 'Identifier',
                          name: '__this'
                        },
                        __env.COPYENV ? __env.COPYENV[0] : COPYENV,
                        {
                          type: 'ArrayExpression',
                          elements: (__env.ast ? __env.ast[0] : ast).params
                        }
                      ]
                    }
                  }]
              },
              id: (__env.ast ? __env.ast[0] : ast).id,
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
                  value: (__env.ast ? __env.ast[0] : ast).id.name
                },
                __env.COPYENV ? __env.COPYENV[0] : COPYENV,
                __env.fn ? __env.fn[0] : fn
              ]
            }];
          __env.bind = [(__env.esprima ? __env.esprima[0] : esprima).parse('(function (__env) { return; })(new __ENV(__env))').body[0].expression];
          __env.bind ? __env.bind[0].callee.body.body[0].argument = __env.mk ? __env.mk[0] : mk : bind.callee.body.body[0].argument = __env.mk ? __env.mk[0] : mk;
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
                property: (__env.ast ? __env.ast[0] : ast).id
              },
              right: {
                type: 'ArrayExpression',
                elements: [__env.bind ? __env.bind[0] : bind]
              }
            }
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'optVariableDeclaration':
        __env.ast = [__args[0]];
        __env.declarations = [[]];
        for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).declarations.length; __env.i ? ++__env.i[0] : ++i) {
          __env.declaration = [(__env.ast ? __env.ast[0] : ast).declarations[__env.i ? __env.i[0] : i]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.declaration ? __env.declaration[0] : declaration).id);
          (__env.declarations ? __env.declarations[0] : declarations).push({
            type: 'AssignmentExpression',
            operator: '=',
            left: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: '__env'
              },
              property: (__env.declaration ? __env.declaration[0] : declaration).id
            },
            right: {
              type: 'ArrayExpression',
              elements: (__env.declaration ? __env.declaration[0] : declaration).init ? [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.declaration ? __env.declaration[0] : declaration).init)] : []
            }
          });
        }
        return {
          type: 'SequenceExpression',
          expressions: __env.declarations ? __env.declarations[0] : declarations
        };
      case 'optCatchClause':
        __env.ast = [__args[0]];
        return {
          type: 'CatchClause',
          param: (__env.ast ? __env.ast[0] : ast).param,
          guard: (__env.ast ? __env.ast[0] : ast).guard ? (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).guard) : null,
          body: (__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)
        };
      case 'optExpr':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'Literal':
          return __env.ast ? __env.ast[0] : ast;
        case 'ThisExpression':
          return {
            type: 'Identifier',
            name: '__this'
          };
        case 'Identifier':
          if ((__env.ast ? __env.ast[0] : ast).name.lastIndexOf('__', 0) === 0) {
            (__env.console ? __env.console[0] : console).warn('any identifier starting with ``__" is reserved.');
          }
          return {
            type: 'ConditionalExpression',
            test: {
              type: 'MemberExpression',
              object: {
                type: 'Identifier',
                name: '__env'
              },
              property: __env.ast ? __env.ast[0] : ast
            },
            consequent: {
              type: 'MemberExpression',
              object: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: __env.ast ? __env.ast[0] : ast
              },
              property: {
                type: 'Literal',
                value: 0
              },
              computed: true
            },
            alternate: __env.ast ? __env.ast[0] : ast
          };
        case 'SequenceExpression':
          __env.exprs = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).expressions.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.exprs ? __env.exprs[0] : exprs).push((__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).expressions[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'SequenceExpression',
            expressions: __env.exprs ? __env.exprs[0] : exprs
          };
        case 'UnaryExpression':
          switch ((__env.ast ? __env.ast[0] : ast).operator) {
          case 'typeof':
            switch ((__env.ast ? __env.ast[0] : ast).argument.type) {
            case 'Identifier':
              return {
                type: 'ConditionalExpression',
                test: (__env.existsLhs1 ? __env.existsLhs1[0] : existsLhs1)((__env.ast ? __env.ast[0] : ast).argument),
                consequent: {
                  type: 'UnaryExpression',
                  prefix: (__env.ast ? __env.ast[0] : ast).prefix,
                  argument: (__env.optLhs1 ? __env.optLhs1[0] : optLhs1)((__env.ast ? __env.ast[0] : ast).argument),
                  operator: (__env.ast ? __env.ast[0] : ast).operator
                },
                alternate: {
                  type: 'UnaryExpression',
                  prefix: (__env.ast ? __env.ast[0] : ast).prefix,
                  argument: (__env.optLhs2 ? __env.optLhs2[0] : optLhs2)((__env.ast ? __env.ast[0] : ast).argument),
                  operator: (__env.ast ? __env.ast[0] : ast).operator
                }
              };
            default:
              return {
                type: 'UnaryExpression',
                prefix: (__env.ast ? __env.ast[0] : ast).prefix,
                argument: (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).argument),
                operator: (__env.ast ? __env.ast[0] : ast).operator
              };
            }
          default:
            return {
              type: 'UnaryExpression',
              prefix: (__env.ast ? __env.ast[0] : ast).prefix,
              argument: (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).argument),
              operator: (__env.ast ? __env.ast[0] : ast).operator
            };
          }
        case 'NewExpression':
          __env.callee = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).callee)];
          __env.args = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).arguments.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.args ? __env.args[0] : args).push((__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).arguments[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'NewExpression',
            callee: __env.callee ? __env.callee[0] : callee,
            arguments: __env.args ? __env.args[0] : args
          };
        case 'UpdateExpression':
          __env.arg1 = [(__env.optLhs1 ? __env.optLhs1[0] : optLhs1)((__env.ast ? __env.ast[0] : ast).argument)];
          __env.arg2 = [(__env.optLhs2 ? __env.optLhs2[0] : optLhs2)((__env.ast ? __env.ast[0] : ast).argument)];
          return {
            type: 'ConditionalExpression',
            test: (__env.existsLhs1 ? __env.existsLhs1[0] : existsLhs1)((__env.ast ? __env.ast[0] : ast).argument),
            consequent: {
              type: 'UpdateExpression',
              operator: (__env.ast ? __env.ast[0] : ast).operator,
              argument: __env.arg1 ? __env.arg1[0] : arg1,
              prefix: (__env.ast ? __env.ast[0] : ast).prefix
            },
            alternate: {
              type: 'UpdateExpression',
              operator: (__env.ast ? __env.ast[0] : ast).operator,
              argument: __env.arg2 ? __env.arg2[0] : arg2,
              prefix: (__env.ast ? __env.ast[0] : ast).prefix
            }
          };
        case 'AssignmentExpression':
          __env.lhs1 = [(__env.optLhs1 ? __env.optLhs1[0] : optLhs1)((__env.ast ? __env.ast[0] : ast).left)];
          __env.lhs2 = [(__env.optLhs2 ? __env.optLhs2[0] : optLhs2)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'ConditionalExpression',
            test: (__env.existsLhs1 ? __env.existsLhs1[0] : existsLhs1)((__env.ast ? __env.ast[0] : ast).left),
            consequent: {
              type: 'AssignmentExpression',
              operator: (__env.ast ? __env.ast[0] : ast).operator,
              left: __env.lhs1 ? __env.lhs1[0] : lhs1,
              right: __env.rhs ? __env.rhs[0] : rhs
            },
            alternate: {
              type: 'AssignmentExpression',
              operator: (__env.ast ? __env.ast[0] : ast).operator,
              left: __env.lhs2 ? __env.lhs2[0] : lhs2,
              right: __env.rhs ? __env.rhs[0] : rhs
            }
          };
        case 'ConditionalExpression':
          __env.test = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).test)];
          __env.alternate = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).alternate)];
          __env.consequent = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).consequent)];
          return {
            type: 'ConditionalExpression',
            test: __env.test ? __env.test[0] : test,
            alternate: __env.alternate ? __env.alternate[0] : alternate,
            consequent: __env.consequent ? __env.consequent[0] : consequent
          };
        case 'BinaryExpression':
          __env.lhs = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'LogicalExpression',
            operator: (__env.ast ? __env.ast[0] : ast).operator,
            left: __env.lhs ? __env.lhs[0] : lhs,
            right: __env.rhs ? __env.rhs[0] : rhs
          };
        case 'LogicalExpression':
          __env.lhs = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).left)];
          __env.rhs = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).right)];
          return {
            type: 'BinaryExpression',
            operator: (__env.ast ? __env.ast[0] : ast).operator,
            left: __env.lhs ? __env.lhs[0] : lhs,
            right: __env.rhs ? __env.rhs[0] : rhs
          };
        case 'MemberExpression':
          __env.obj = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).object)];
          if ((__env.ast ? __env.ast[0] : ast).computed) {
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).property),
              computed: (__env.ast ? __env.ast[0] : ast).computed
            };
          } else {
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: (__env.ast ? __env.ast[0] : ast).property,
              computed: (__env.ast ? __env.ast[0] : ast).computed
            };
          }
        case 'ObjectExpression':
          __env.props = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).properties.length; __env.i ? ++__env.i[0] : ++i) {
            __env.prop = [(__env.ast ? __env.ast[0] : ast).properties[__env.i ? __env.i[0] : i]];
            (__env.props ? __env.props[0] : props).push({
              type: 'Property',
              key: (__env.prop ? __env.prop[0] : prop).key,
              value: (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.prop ? __env.prop[0] : prop).value),
              kind: (__env.prop ? __env.prop[0] : prop).kind
            });
          }
          return {
            type: 'ObjectExpression',
            properties: __env.props ? __env.props[0] : props
          };
        case 'ArrayExpression':
          __env.elts = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).elements.length; __env.i ? ++__env.i[0] : ++i) {
            __env.elt = [(__env.ast ? __env.ast[0] : ast).elements[__env.i ? __env.i[0] : i]];
            (__env.elts ? __env.elts[0] : elts).push((__env.optExpr ? __env.optExpr[0] : optExpr)(__env.elt ? __env.elt[0] : elt));
          }
          return {
            type: 'ArrayExpression',
            elements: __env.elts ? __env.elts[0] : elts
          };
        case 'FunctionExpression':
          __env.id = [{
              type: 'Identifier',
              name: (__env.gensym ? __env.gensym[0] : gensym)()
            }];
          __env.fn = [{
              type: 'FunctionExpression',
              params: (__env.ast ? __env.ast[0] : ast).params,
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
                          value: (__env.id ? __env.id[0] : id).name
                        },
                        {
                          type: 'Identifier',
                          name: '__this'
                        },
                        __env.COPYENV ? __env.COPYENV[0] : COPYENV,
                        {
                          type: 'ArrayExpression',
                          elements: (__env.ast ? __env.ast[0] : ast).params
                        }
                      ]
                    }
                  }]
              },
              id: __env.id ? __env.id[0] : id,
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
                  value: (__env.id ? __env.id[0] : id).name
                },
                __env.COPYENV ? __env.COPYENV[0] : COPYENV,
                __env.fn ? __env.fn[0] : fn
              ]
            }];
          __env.bind = [(__env.esprima ? __env.esprima[0] : esprima).parse('(function (__env) { return; })(new __ENV(__env))').body[0].expression];
          __env.bind ? __env.bind[0].callee.body.body[0].argument = __env.mk ? __env.mk[0] : mk : bind.callee.body.body[0].argument = __env.mk ? __env.mk[0] : mk;
          __env.body = [(__env.optStmt ? __env.optStmt[0] : optStmt)((__env.ast ? __env.ast[0] : ast).body)];
          __env.body1 = [[]];
          (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.id ? __env.id[0] : id);
          if ((__env.ast ? __env.ast[0] : ast).id != null) {
            (__env.appendVar ? __env.appendVar[0] : appendVar)((__env.ast ? __env.ast[0] : ast).id);
            (__env.body1 ? __env.body1[0] : body1).push({
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
                  property: (__env.ast ? __env.ast[0] : ast).id
                },
                right: __env.bind ? __env.bind[0] : bind
              }
            });
          }
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).params.length; __env.i ? ++__env.i[0] : ++i) {
            __env.param = [(__env.ast ? __env.ast[0] : ast).params[__env.i ? __env.i[0] : i]];
            (__env.appendVar ? __env.appendVar[0] : appendVar)(__env.param ? __env.param[0] : param);
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
                    property: __env.param ? __env.param[0] : param
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
                          value: __env.i ? __env.i[0] : i
                        }
                      }]
                  }
                }
              }];
            (__env.body1 ? __env.body1[0] : body1).push(__env.setParam ? __env.setParam[0] : setParam);
          }
          switch ((__env.body ? __env.body[0] : body).type) {
          case 'BlockStatement':
            __env.body1 ? __env.body1[0] = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body) : body1 = (__env.body1 ? __env.body1[0] : body1).concat((__env.body ? __env.body[0] : body).body);
            break;
          default:
            (__env.body1 ? __env.body1[0] : body1).push(__env.body ? __env.body[0] : body);
          }
          (__env.appendCase ? __env.appendCase[0] : appendCase)({
            type: 'SwitchCase',
            test: {
              type: 'Literal',
              value: (__env.id ? __env.id[0] : id).name
            },
            consequent: __env.body1 ? __env.body1[0] : body1
          });
          return __env.bind ? __env.bind[0] : bind;
        case 'CallExpression':
          __env.callee = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).callee)];
          __env.args = [[]];
          for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.ast ? __env.ast[0] : ast).arguments.length; __env.i ? ++__env.i[0] : ++i) {
            (__env.args ? __env.args[0] : args).push((__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).arguments[__env.i ? __env.i[0] : i]));
          }
          return {
            type: 'CallExpression',
            callee: __env.callee ? __env.callee[0] : callee,
            arguments: __env.args ? __env.args[0] : args
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'optLhs2':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'MemberExpression':
          if ((__env.ast ? __env.ast[0] : ast).computed) {
            return {
              type: 'MemberExpression',
              object: (__env.ast ? __env.ast[0] : ast).object,
              computed: (__env.ast ? __env.ast[0] : ast).computed,
              property: (__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).property)
            };
          } else {
            return __env.ast ? __env.ast[0] : ast;
          }
        default:
          return __env.ast ? __env.ast[0] : ast;
        }
      case 'optLhs1':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'MemberExpression':
          if ((__env.ast ? __env.ast[0] : ast).computed) {
            __env.obj = [(__env.optLhs1 ? __env.optLhs1[0] : optLhs1)((__env.ast ? __env.ast[0] : ast).object)];
            __env.prop = [(__env.optExpr ? __env.optExpr[0] : optExpr)((__env.ast ? __env.ast[0] : ast).property)];
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: __env.prop ? __env.prop[0] : prop,
              computed: (__env.ast ? __env.ast[0] : ast).computed
            };
          } else {
            __env.obj = [(__env.optLhs1 ? __env.optLhs1[0] : optLhs1)((__env.ast ? __env.ast[0] : ast).object)];
            return {
              type: 'MemberExpression',
              object: __env.obj ? __env.obj[0] : obj,
              property: (__env.ast ? __env.ast[0] : ast).property,
              computed: (__env.ast ? __env.ast[0] : ast).computed
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
              property: __env.ast ? __env.ast[0] : ast
            },
            computed: true,
            property: {
              type: 'Literal',
              value: 0
            }
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'existsLhs1':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'MemberExpression': {
            __args = [(__env.ast ? __env.ast[0] : ast).object];
            __label = (__env.existsLhs1 ? __env.existsLhs1[0] : existsLhs1).__label;
            __env = (__env.existsLhs1 ? __env.existsLhs1[0] : existsLhs1).__env;
            continue __jmp;
          }
        case 'Identifier':
          return {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: __env.ast ? __env.ast[0] : ast
          };
        default:
          (__env.console ? __env.console[0] : console).error('unrecognized ast: ' + (__env.ast ? __env.ast[0] : ast).type);
        }
      case 'isTailCallStmt':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'ExpressionStatement': {
            __args = [(__env.ast ? __env.ast[0] : ast).expression];
            __label = (__env.isTailCallExpr ? __env.isTailCallExpr[0] : isTailCallExpr).__label;
            __env = (__env.isTailCallExpr ? __env.isTailCallExpr[0] : isTailCallExpr).__env;
            continue __jmp;
          }
        case 'BlockStatement': {
            __args = [(__env.ast ? __env.ast[0] : ast).body[(__env.ast ? __env.ast[0] : ast).body.length - 1]];
            __label = (__env.isTailCallStmt ? __env.isTailCallStmt[0] : isTailCallStmt).__label;
            __env = (__env.isTailCallStmt ? __env.isTailCallStmt[0] : isTailCallStmt).__env;
            continue __jmp;
          }
        case 'ReturnStatement': {
            __args = [(__env.ast ? __env.ast[0] : ast).argument];
            __label = (__env.isTailCallExpr ? __env.isTailCallExpr[0] : isTailCallExpr).__label;
            __env = (__env.isTailCallExpr ? __env.isTailCallExpr[0] : isTailCallExpr).__env;
            continue __jmp;
          }
        case 'IfStatement':
          return (__env.isTailCallStmt ? __env.isTailCallStmt[0] : isTailCallStmt)((__env.ast ? __env.ast[0] : ast).consequent) || (__env.isTailCallStmt ? __env.isTailCallStmt[0] : isTailCallStmt)((__env.ast ? __env.ast[0] : ast).alternate);
        default:
          return false;
        }
      case 'isTailCallExpr':
        __env.ast = [__args[0]];
        switch ((__env.ast ? __env.ast[0] : ast).type) {
        case 'CallExpression':
          return true;
        default:
          return false;
        }
      case 'gensym':
        __env.i ? __env.i[0] += 1 : i += 1;
        return '__lambda_' + (__env.i ? __env.i[0] : i);
      case 'appendGlobalVar':
        __env.ident = [__args[0]];
        return;
        __env.prop1 = [{
            type: 'Property',
            key: __env.ident ? __env.ident[0] : ident,
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
                        value: (__env.ident ? __env.ident[0] : ident).name
                      },
                      kind: 'init'
                    }]
                }]
            },
            kind: 'init'
          }];
        (__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT).body[0].declarations[0].init.properties.push(__env.prop1 ? __env.prop1[0] : prop1);
      case 'appendVar':
        __env.ident = [__args[0]];
        if ((__env.VARS ? __env.VARS[0] : VARS)[(__env.ident ? __env.ident[0] : ident).name]) {
          return;
        }
        __env.VARS ? __env.VARS[0][(__env.ident ? __env.ident[0] : ident).name] = true : VARS[(__env.ident ? __env.ident[0] : ident).name] = true;
        __env.stmt = [{
            type: 'ExpressionStatement',
            expression: {
              type: 'AssignmentExpression',
              operator: '=',
              left: {
                type: 'MemberExpression',
                object: { type: 'ThisExpression' },
                property: __env.ident ? __env.ident[0] : ident
              },
              right: {
                type: 'MemberExpression',
                object: {
                  type: 'Identifier',
                  name: '__env'
                },
                property: __env.ident ? __env.ident[0] : ident
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
            property: __env.ident ? __env.ident[0] : ident
          },
          consequent: __env.stmt ? __env.stmt[0] : stmt
        } : stmt = {
          type: 'IfStatement',
          test: {
            type: 'MemberExpression',
            object: {
              type: 'Identifier',
              name: '__env'
            },
            property: __env.ident ? __env.ident[0] : ident
          },
          consequent: __env.stmt ? __env.stmt[0] : stmt
        };
        (__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT).body[1].body.body.push(__env.stmt ? __env.stmt[0] : stmt);
      case 'appendProp':
        __env.a_prop = [__args[0]];
        return;
      case 'appendCase':
        __env.a_case = [__args[0]];
        (__env.OUTPUT ? __env.OUTPUT[0] : OUTPUT).body[2].body.body[0].body.body.body[0].cases.unshift(__env.a_case ? __env.a_case[0] : a_case);
        return;
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
__global.fs = [fs];
var escodegen;
escodegen = require('escodegen');
__global.escodegen = [escodegen];
var esprima;
esprima = require('esprima');
__global.esprima = [esprima];
var LOOP;
LOOP = 'var __global = {}; function __ENV(__env){}' + 'function __call(__label, __this, __env, __args) { ' + '  __jmp:' + '  while(true) {' + '    switch(__label) {' + '    default:' + '      console.error(\'unrecognized label: \' + __label);' + '      break __jmp;' + '    }' + '  }' + '}' + 'function __call1(__label, __this, __env, __args) { var ret = __call(__label, __this, __env, __args); if (typeof ret === "object" && ret.__label && ret.__env){ return function () { return __call1(ret.__label,this,ret.__env,[].slice.call(arguments)) } } else { return ret; } }' + 'function __mk(__label,__env,fn){ fn.__label = __label;fn.__env = __env;return fn; }';
__global.LOOP = [LOOP];
var OUTPUT;
OUTPUT = esprima.parse(LOOP);
__global.OUTPUT = [OUTPUT];
var GLOBAL;
GLOBAL = {
  type: 'ObjectExpression',
  properties: []
};
__global.GLOBAL = [GLOBAL];
var COPYENV;
COPYENV = esprima.parse('__env').body[0].expression;
__global.COPYENV = [COPYENV];
var COPYGLOBAL;
COPYGLOBAL = esprima.parse('new __ENV(__global)').body[0].expression;
__global.COPYGLOBAL = [COPYGLOBAL];
function appendCase(a_case) {
  return __call('appendCase', this, new __ENV(__global), [a_case]);
}
appendCase.__label = 'appendCase';
appendCase.__env = new __ENV(__global);
__global.appendCase = [appendCase];
function appendProp(a_prop) {
  return __call('appendProp', this, new __ENV(__global), [a_prop]);
}
appendProp.__label = 'appendProp';
appendProp.__env = new __ENV(__global);
__global.appendProp = [appendProp];
var VARS;
VARS = {};
__global.VARS = [VARS];
function appendVar(ident) {
  return __call('appendVar', this, new __ENV(__global), [ident]);
}
appendVar.__label = 'appendVar';
appendVar.__env = new __ENV(__global);
__global.appendVar = [appendVar];
function appendGlobalVar(ident) {
  return __call('appendGlobalVar', this, new __ENV(__global), [ident]);
}
appendGlobalVar.__label = 'appendGlobalVar';
appendGlobalVar.__env = new __ENV(__global);
__global.appendGlobalVar = [appendGlobalVar];
var i;
i = 0;
__global.i = [i];
function gensym() {
  return __call('gensym', this, new __ENV(__global), []);
}
gensym.__label = 'gensym';
gensym.__env = new __ENV(__global);
__global.gensym = [gensym];
function isTailCallExpr(ast) {
  return __call('isTailCallExpr', this, new __ENV(__global), [ast]);
}
isTailCallExpr.__label = 'isTailCallExpr';
isTailCallExpr.__env = new __ENV(__global);
__global.isTailCallExpr = [isTailCallExpr];
function isTailCallStmt(ast) {
  return __call('isTailCallStmt', this, new __ENV(__global), [ast]);
}
isTailCallStmt.__label = 'isTailCallStmt';
isTailCallStmt.__env = new __ENV(__global);
__global.isTailCallStmt = [isTailCallStmt];
function existsLhs1(ast) {
  return __call('existsLhs1', this, new __ENV(__global), [ast]);
}
existsLhs1.__label = 'existsLhs1';
existsLhs1.__env = new __ENV(__global);
__global.existsLhs1 = [existsLhs1];
function optLhs1(ast) {
  return __call('optLhs1', this, new __ENV(__global), [ast]);
}
optLhs1.__label = 'optLhs1';
optLhs1.__env = new __ENV(__global);
__global.optLhs1 = [optLhs1];
function optLhs2(ast) {
  return __call('optLhs2', this, new __ENV(__global), [ast]);
}
optLhs2.__label = 'optLhs2';
optLhs2.__env = new __ENV(__global);
__global.optLhs2 = [optLhs2];
function optExpr(ast) {
  return __call('optExpr', this, new __ENV(__global), [ast]);
}
optExpr.__label = 'optExpr';
optExpr.__env = new __ENV(__global);
__global.optExpr = [optExpr];
function optCatchClause(ast) {
  return __call('optCatchClause', this, new __ENV(__global), [ast]);
}
optCatchClause.__label = 'optCatchClause';
optCatchClause.__env = new __ENV(__global);
__global.optCatchClause = [optCatchClause];
function optVariableDeclaration(ast) {
  return __call('optVariableDeclaration', this, new __ENV(__global), [ast]);
}
optVariableDeclaration.__label = 'optVariableDeclaration';
optVariableDeclaration.__env = new __ENV(__global);
__global.optVariableDeclaration = [optVariableDeclaration];
function optStmt(ast) {
  return __call('optStmt', this, new __ENV(__global), [ast]);
}
optStmt.__label = 'optStmt';
optStmt.__env = new __ENV(__global);
__global.optStmt = [optStmt];
function optToplevelExpr(ast) {
  return __call('optToplevelExpr', this, new __ENV(__global), [ast]);
}
optToplevelExpr.__label = 'optToplevelExpr';
optToplevelExpr.__env = new __ENV(__global);
__global.optToplevelExpr = [optToplevelExpr];
function optToplevelCatchClause(ast) {
  return __call('optToplevelCatchClause', this, new __ENV(__global), [ast]);
}
optToplevelCatchClause.__label = 'optToplevelCatchClause';
optToplevelCatchClause.__env = new __ENV(__global);
__global.optToplevelCatchClause = [optToplevelCatchClause];
function optToplevelVariableDeclaration(ast) {
  return __call('optToplevelVariableDeclaration', this, new __ENV(__global), [ast]);
}
optToplevelVariableDeclaration.__label = 'optToplevelVariableDeclaration';
optToplevelVariableDeclaration.__env = new __ENV(__global);
__global.optToplevelVariableDeclaration = [optToplevelVariableDeclaration];
function optToplevelStmt(ast) {
  return __call('optToplevelStmt', this, new __ENV(__global), [ast]);
}
optToplevelStmt.__label = 'optToplevelStmt';
optToplevelStmt.__env = new __ENV(__global);
__global.optToplevelStmt = [optToplevelStmt];
function optProgram(ast) {
  return __call('optProgram', this, new __ENV(__global), [ast]);
}
optProgram.__label = 'optProgram';
optProgram.__env = new __ENV(__global);
__global.optProgram = [optProgram];
fs.readFile(process.argv[2], 'utf-8', __mk('__lambda_1', new __ENV(__global), function __lambda_1(err, code) {
  return __call('__lambda_1', this, new __ENV(__global), [
    err,
    code
  ]);
}));
