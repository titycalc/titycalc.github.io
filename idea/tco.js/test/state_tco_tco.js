var __global = {};
function __ENV(__env) {
  this.__lambda_1 = __env.__lambda_1;
  this.s = __env.s;
  this.cont = __env.cont;
  this.ret = __env.ret;
  this.x = __env.x;
  this.__lambda_3 = __env.__lambda_3;
  this.x = __env.x;
  this.s1 = __env.s1;
  this.__lambda_2 = __env.__lambda_2;
  this.s = __env.s;
  this.cont = __env.cont;
  this.bind = __env.bind;
  this.m = __env.m;
  this.k = __env.k;
  this.get = __env.get;
  this.s = __env.s;
  this.cont = __env.cont;
  this.__lambda_4 = __env.__lambda_4;
  this._ = __env._;
  this.cont = __env.cont;
  this.put = __env.put;
  this.s = __env.s;
  this.__lambda_5 = __env.__lambda_5;
  this.x = __env.x;
  this.s1 = __env.s1;
  this.runState = __env.runState;
  this.m = __env.m;
  this.s = __env.s;
  this.__lambda_6 = __env.__lambda_6;
  this.x = __env.x;
  this.s1 = __env.s1;
  this.evalState = __env.evalState;
  this.m = __env.m;
  this.s = __env.s;
  this.__lambda_7 = __env.__lambda_7;
  this.x = __env.x;
  this.s1 = __env.s1;
  this.execState = __env.execState;
  this.m = __env.m;
  this.s = __env.s;
  this.__lambda_9 = __env.__lambda_9;
  this._ = __env._;
  this.__lambda_8 = __env.__lambda_8;
  this.i = __env.i;
  this.__lambda_10 = __env.__lambda_10;
  this.i = __env.i;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_10':
        __env.i = [__args[0]];
        __args = [
          __env.tick ? __env.tick[0] : tick,
          __env.i ? __env.i[0] : i
        ];
        __label = (__env.execState ? __env.execState[0] : execState).__label;
        __env = (__env.execState ? __env.execState[0] : execState).__env;
        continue __jmp;
      case '__lambda_8':
        __env.i = [__args[0]];
        __args = [
          (__env.put ? __env.put[0] : put)((__env.i ? __env.i[0] : i) + 1),
          __mk('__lambda_9', __env, function __lambda_9(_) {
            return __call1('__lambda_9', __this, __env, [_]);
          })
        ];
        __label = (__env.bind ? __env.bind[0] : bind).__label;
        __env = (__env.bind ? __env.bind[0] : bind).__env;
        continue __jmp;
      case '__lambda_9':
        __env._ = [__args[0]];
        return __env.i ? __env.i[0] : i;
      case 'execState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s ? __env.s[0] : s,
          __mk('__lambda_7', __env, function __lambda_7(x, s1) {
            return __call1('__lambda_7', __this, __env, [
              x,
              s1
            ]);
          })
        ];
        __label = (__env.m ? __env.m[0] : m).__label;
        __env = (__env.m ? __env.m[0] : m).__env;
        continue __jmp;
      case '__lambda_7':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return __env.s1 ? __env.s1[0] : s1;
      case 'evalState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s ? __env.s[0] : s,
          __mk('__lambda_6', __env, function __lambda_6(x, s1) {
            return __call1('__lambda_6', __this, __env, [
              x,
              s1
            ]);
          })
        ];
        __label = (__env.m ? __env.m[0] : m).__label;
        __env = (__env.m ? __env.m[0] : m).__env;
        continue __jmp;
      case '__lambda_6':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return __env.x ? __env.x[0] : x;
      case 'runState':
        __env.m = [__args[0]];
        __env.s = [__args[1]];
        __args = [
          __env.s ? __env.s[0] : s,
          __mk('__lambda_5', __env, function __lambda_5(x, s1) {
            return __call1('__lambda_5', __this, __env, [
              x,
              s1
            ]);
          })
        ];
        __label = (__env.m ? __env.m[0] : m).__label;
        __env = (__env.m ? __env.m[0] : m).__env;
        continue __jmp;
      case '__lambda_5':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        return {
          x: __env.x ? __env.x[0] : x,
          s: __env.s1 ? __env.s1[0] : s1
        };
      case 'put':
        __env.s = [__args[0]];
        return __mk('__lambda_4', __env, function __lambda_4(_, cont) {
          return __call1('__lambda_4', __this, __env, [
            _,
            cont
          ]);
        });
      case '__lambda_4':
        __env._ = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          null,
          __env.s ? __env.s[0] : s
        ];
        __label = (__env.cont ? __env.cont[0] : cont).__label;
        __env = (__env.cont ? __env.cont[0] : cont).__env;
        continue __jmp;
      case 'get':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.s ? __env.s[0] : s,
          __env.s ? __env.s[0] : s
        ];
        __label = (__env.cont ? __env.cont[0] : cont).__label;
        __env = (__env.cont ? __env.cont[0] : cont).__env;
        continue __jmp;
      case 'bind':
        __env.m = [__args[0]];
        __env.k = [__args[1]];
        return __mk('__lambda_2', __env, function __lambda_2(s, cont) {
          return __call1('__lambda_2', __this, __env, [
            s,
            cont
          ]);
        });
      case '__lambda_2':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.s ? __env.s[0] : s,
          __mk('__lambda_3', __env, function __lambda_3(x, s1) {
            return __call1('__lambda_3', __this, __env, [
              x,
              s1
            ]);
          })
        ];
        __label = (__env.m ? __env.m[0] : m).__label;
        __env = (__env.m ? __env.m[0] : m).__env;
        continue __jmp;
      case '__lambda_3':
        __env.x = [__args[0]];
        __env.s1 = [__args[1]];
        __args = [
          __env.s1 ? __env.s1[0] : s1,
          __env.cont ? __env.cont[0] : cont
        ];
        __label = (__env.k ? __env.k[0] : k)(__env.x ? __env.x[0] : x).__label;
        __env = (__env.k ? __env.k[0] : k)(__env.x ? __env.x[0] : x).__env;
        continue __jmp;
      case 'ret':
        __env.x = [__args[0]];
        return __mk('__lambda_1', __env, function __lambda_1(s, cont) {
          return __call1('__lambda_1', __this, __env, [
            s,
            cont
          ]);
        });
      case '__lambda_1':
        __env.s = [__args[0]];
        __env.cont = [__args[1]];
        __args = [
          __env.x ? __env.x[0] : x,
          __env.s ? __env.s[0] : s
        ];
        __label = (__env.cont ? __env.cont[0] : cont).__label;
        __env = (__env.cont ? __env.cont[0] : cont).__env;
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
  return __call1('ret', this, new __ENV(__global), [x]);
}
ret.__label = 'ret';
ret.__env = new __ENV(__global);
__global.ret = [ret];
function bind(m, k) {
  return __call1('bind', this, new __ENV(__global), [
    m,
    k
  ]);
}
bind.__label = 'bind';
bind.__env = new __ENV(__global);
__global.bind = [bind];
function get(s, cont) {
  return __call1('get', this, new __ENV(__global), [
    s,
    cont
  ]);
}
get.__label = 'get';
get.__env = new __ENV(__global);
__global.get = [get];
function put(s) {
  return __call1('put', this, new __ENV(__global), [s]);
}
put.__label = 'put';
put.__env = new __ENV(__global);
__global.put = [put];
function runState(m, s) {
  return __call1('runState', this, new __ENV(__global), [
    m,
    s
  ]);
}
runState.__label = 'runState';
runState.__env = new __ENV(__global);
__global.runState = [runState];
function evalState(m, s) {
  return __call1('evalState', this, new __ENV(__global), [
    m,
    s
  ]);
}
evalState.__label = 'evalState';
evalState.__env = new __ENV(__global);
__global.evalState = [evalState];
function execState(m, s) {
  return __call1('execState', this, new __ENV(__global), [
    m,
    s
  ]);
}
execState.__label = 'execState';
execState.__env = new __ENV(__global);
__global.execState = [execState];
var tick;
tick = bind(get, __mk('__lambda_8', new __ENV(__global), function __lambda_8(i) {
  return __call1('__lambda_8', this, new __ENV(__global), [i]);
}));
__global.tick = [tick];
var plusOne;
plusOne = __mk('__lambda_10', new __ENV(__global), function __lambda_10(i) {
  return __call1('__lambda_10', this, new __ENV(__global), [i]);
});
__global.plusOne = [plusOne];
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
