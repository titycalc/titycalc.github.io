function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 17:
        __env.i = [__args[0]];
        __args = [
          tick,
          __env.i[0]
        ];
        __label = execState.__label;
        __env = execState.__env;
        continue __jmp;
      case 15:
        __env.i = [__args[0]];
        __args = [
          put(__env.i[0] + 1),
          function (__env) {
            return __mk(16, __env, function __lambda_16(_) {
              return __call(16, __this, __env, [_]);
            });
          }({ i: __env.i })
        ];
        __label = bind.__label;
        __env = bind.__env;
        continue __jmp;
      case 16:
        __env._ = [__args[0]];
        return __env.i[0];
      case 13:
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk(14, __env, function __lambda_14(x, s1) {
              return __call(14, __this, __env, [
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
      case 14:
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return __env.s1[0];
      case 11:
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk(12, __env, function __lambda_12(x, s1) {
              return __call(12, __this, __env, [
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
      case 12:
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return __env.x[0];
      case 9:
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk(10, __env, function __lambda_10(x, s1) {
              return __call(10, __this, __env, [
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
      case 10:
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return {
          x: __env.x[0],
          s: __env.s1[0]
        };
      case 7:
        __env.s = [__args[0]];
        return function (__env) {
          return __mk(8, __env, function __lambda_8(_, cont) {
            return __call(8, __this, __env, [
              _,
              cont
            ]);
          });
        }({ s: __env.s });
      case 8:
        __env._ = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          null,
          __env.s[0]
        ];
        __label = __env.cont[0].__label;
        __env = __env.cont[0].__env;
        continue __jmp;
      case 6:
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.s[0],
          __env.s[0]
        ];
        __label = __env.cont[0].__label;
        __env = __env.cont[0].__env;
        continue __jmp;
      case 3:
        __env.m = [__args[0]];
        __env.k = [__args[1]];
        return function (__env) {
          return __mk(4, __env, function __lambda_4(s, cont) {
            return __call(4, __this, __env, [
              s,
              cont
            ]);
          });
        }({
          m: __env.m,
          k: __env.k
        });
      case 4:
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.s[0],
          function (__env) {
            return __mk(5, __env, function __lambda_5(x, s1) {
              return __call(5, __this, __env, [
                x,
                s1
              ]);
            });
          }({
            m: __env.m,
            k: __env.k,
            s: __env.s,
            cont: __env.cont
          })
        ];
        __label = __env.m[0].__label;
        __env = __env.m[0].__env;
        continue __jmp;
      case 5:
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        __args = [
          __env.s1[0],
          __env.cont[0]
        ];
        __label = __env.k[0](__env.x[0]).__label;
        __env = __env.k[0](__env.x[0]).__env;
        continue __jmp;
      case 1:
        __env.x = [__args[0]];
        return function (__env) {
          return __mk(2, __env, function __lambda_2(s, cont) {
            return __call(2, __this, __env, [
              s,
              cont
            ]);
          });
        }({ x: __env.x });
      case 2:
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.x[0],
          __env.s[0]
        ];
        __label = __env.cont[0].__label;
        __env = __env.cont[0].__env;
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
  return __call(1, this, {}, [x]);
}
ret.__label = 1;
ret.__env = {};
function bind(m, k) {
  return __call(3, this, {}, [
    m,
    k
  ]);
}
bind.__label = 3;
bind.__env = {};
function get(s, cont) {
  return __call(6, this, {}, [
    s,
    cont
  ]);
}
get.__label = 6;
get.__env = {};
function put(s) {
  return __call(7, this, {}, [s]);
}
put.__label = 7;
put.__env = {};
function runState(m, s) {
  return __call(9, this, {}, [
    m,
    s
  ]);
}
runState.__label = 9;
runState.__env = {};
function evalState(m, s) {
  return __call(11, this, {}, [
    m,
    s
  ]);
}
evalState.__label = 11;
evalState.__env = {};
function execState(m, s) {
  return __call(13, this, {}, [
    m,
    s
  ]);
}
execState.__label = 13;
execState.__env = {};
var tick;
tick = bind(get, __mk(15, {}, function __lambda__15(i) {
  return __call(15, this, {}, [i]);
}));
var plusOne;
plusOne = __mk(17, {}, function __lambda__17(i) {
  return __call(17, this, {}, [i]);
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
