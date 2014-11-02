function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_10':
        __env.i = [__args[0]];
        __args = [
          tick,
          __env.i[0]
        ];
        __label = execState.__label;
        __env = execState.__env;
        continue __jmp;
      case '__lambda_8':
        __env.i = [__args[0]];
        __args = [
          put(__env.i[0] + 1),
          function (__env) {
            return __mk('__lambda_9', { i: __env.i }, function __lambda_9(_) {
              return __call('__lambda_9', __this, { i: __env.i }, [_]);
            });
          }({ i: __env.i })
        ];
        __label = bind.__label;
        __env = bind.__env;
        continue __jmp;
      case '__lambda_9':
        __env._ = [__args[0]];
        return __env.i[0];
      case 'execState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk('__lambda_7', {
              m: __env.m,
              s: __env.s
            }, function __lambda_7(x, s1) {
              return __call('__lambda_7', __this, {
                m: __env.m,
                s: __env.s
              }, [
                x,
                s1
              ]);
            });
          }({
            m: __env.m,
            s: __env.s
          })
        ];
        __label = __env.m[0].__label;
        __env = __env.m[0].__env;
        continue __jmp;
      case '__lambda_7':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return s1;
      case 'evalState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk('__lambda_6', {
              m: __env.m,
              s: __env.s
            }, function __lambda_6(x, s1) {
              return __call('__lambda_6', __this, {
                m: __env.m,
                s: __env.s
              }, [
                x,
                s1
              ]);
            });
          }({
            m: __env.m,
            s: __env.s
          })
        ];
        __label = __env.m[0].__label;
        __env = __env.m[0].__env;
        continue __jmp;
      case '__lambda_6':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return x;
      case 'runState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk('__lambda_5', {
              m: __env.m,
              s: __env.s
            }, function __lambda_5(x, s1) {
              return __call('__lambda_5', __this, {
                m: __env.m,
                s: __env.s
              }, [
                x,
                s1
              ]);
            });
          }({
            m: __env.m,
            s: __env.s
          })
        ];
        __label = __env.m[0].__label;
        __env = __env.m[0].__env;
        continue __jmp;
      case '__lambda_5':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return {
          x: x,
          s: s1
        };
      case 'put':
        __env.s = [__args[0]];
        return function (__env) {
          return __mk('__lambda_4', { s: __env.s }, function __lambda_4(_, cont) {
            return __call('__lambda_4', __this, { s: __env.s }, [
              _,
              cont
            ]);
          });
        }({ s: __env.s });
      case '__lambda_4':
        __env._ = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          null,
          __env.s[0]
        ];
        __label = cont.__label;
        __env = cont.__env;
        continue __jmp;
      case 'get':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.s[0],
          __env.s[0]
        ];
        __label = __env.cont[0].__label;
        __env = __env.cont[0].__env;
        continue __jmp;
      case 'bind':
        __env.m = [__args[0]];
        __env.k = [__args[1]];
        return function (__env) {
          return __mk('__lambda_2', {
            m: __env.m,
            k: __env.k
          }, function __lambda_2(s, cont) {
            return __call('__lambda_2', __this, {
              m: __env.m,
              k: __env.k
            }, [
              s,
              cont
            ]);
          });
        }({
          m: __env.m,
          k: __env.k
        });
      case '__lambda_2':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          s,
          function (__env) {
            return __mk('__lambda_3', {
              m: __env.m,
              k: __env.k
            }, function __lambda_3(x, s1) {
              return __call('__lambda_3', __this, {
                m: __env.m,
                k: __env.k
              }, [
                x,
                s1
              ]);
            });
          }({
            m: __env.m,
            k: __env.k
          })
        ];
        __label = __env.m[0].__label;
        __env = __env.m[0].__env;
        continue __jmp;
      case '__lambda_3':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        __args = [
          s1,
          cont
        ];
        __label = __env.k[0](x).__label;
        __env = __env.k[0](x).__env;
        continue __jmp;
      case 'ret':
        __env.x = [__args[0]];
        return function (__env) {
          return __mk('__lambda_1', { x: __env.x }, function __lambda_1(s, cont) {
            return __call('__lambda_1', __this, { x: __env.x }, [
              s,
              cont
            ]);
          });
        }({ x: __env.x });
      case '__lambda_1':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.x[0],
          s
        ];
        __label = cont.__label;
        __env = cont.__env;
        continue __jmp;
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
function ret(x) {
  return __call('ret', this, {}, [x]);
}
ret.__label = 'ret';
ret.__env = {};
function bind(m, k) {
  return __call('bind', this, {}, [
    m,
    k
  ]);
}
bind.__label = 'bind';
bind.__env = {};
function get(s, cont) {
  return __call('get', this, {}, [
    s,
    cont
  ]);
}
get.__label = 'get';
get.__env = {};
function put(s) {
  return __call('put', this, {}, [s]);
}
put.__label = 'put';
put.__env = {};
function runState(m, s) {
  return __call('runState', this, {}, [
    m,
    s
  ]);
}
runState.__label = 'runState';
runState.__env = {};
function evalState(m, s) {
  return __call('evalState', this, {}, [
    m,
    s
  ]);
}
evalState.__label = 'evalState';
evalState.__env = {};
function execState(m, s) {
  return __call('execState', this, {}, [
    m,
    s
  ]);
}
execState.__label = 'execState';
execState.__env = {};
var tick;
tick = bind(get, __mk('__lambda_8', {}, function __lambda_8(i) {
  return __call('__lambda_8', this, {}, [i]);
}));
var plusOne;
plusOne = __mk('__lambda_10', {}, function __lambda_10(i) {
  return __call('__lambda_10', this, {}, [i]);
});
module.exports = {
  ret: ret,
  bind: bind,
  get: get,
  put: put,
  runState: runState,
  evalState: evalState,
  execState: execState,
  tick: tick,
  plusOne: plusOne
};
