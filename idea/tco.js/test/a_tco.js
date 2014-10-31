var __global = {};
for (var k in __global) {
  __global[k][0].__env = __global;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_6':
      case '__lambda_5':
        __env.callback = [__args[0]];
        __args = [];
        __label = (__env.callback ? __env.callback[0] : callback)[0].__label;
        __env = (__env.callback ? __env.callback[0] : callback)[0].__env;
        __this = __env.callback ? __env.callback[0] : callback;
        continue __jmp;
      case '__lambda_4':
      case '__lambda_3':
        __env.callback = [__args[0]];
        __args = [];
        __label = (__env.callback ? __env.callback[0] : callback).__label;
        __env = (__env.callback ? __env.callback[0] : callback).__env;
        continue __jmp;
      case 'sum':
        __env.xs = [__args[0]];
        __env.x = [0];
        for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.xs ? __env.xs[0] : xs).length; ++(__env.x ? __env.x[0] : x)) {
          __env.x[0] ? __env.x[0] += (__env.xs ? __env.xs[0] : xs)[i] : x += (__env.xs ? __env.xs[0] : xs)[i];
        }
        return __env.x ? __env.x[0] : x;
      case 'try_catch_finally':
        __env.try_clause = [__args[0]];
        __env.catch_clause = [__args[1]];
        __env.finally_clause = [__args[2]];
        try {
          (__env.try_clause ? __env.try_clause[0] : try_clause)();
        } catch (e) {
          (__env.catch_clause ? __env.catch_clause[0] : catch_clause)(__env.e ? __env.e[0] : e);
        } finally {
          (__env.finally_clause ? __env.finally_clause[0] : finally_clause)();
        }
      case 'incr':
        return __this.x + 1;
      case 'constantly':
        __env.x = [__args[0]];
        __env.discard = [{
            __env: Object.create(__env),
            __label: 'discard'
          }];
        return __env.discard ? __env.discard[0] : discard;
      case 'discard':
        __env.y = [__args[0]];
        return __env.x ? __env.x[0] : x;
      case 'identity':
        __env.x = [__args[0]];
        return __env.x ? __env.x[0] : x;
      case 'mutualLoop2':
        __args = [];
        __label = (__env.mutualLoop1 ? __env.mutualLoop1[0] : mutualLoop1).__label;
        __env = (__env.mutualLoop1 ? __env.mutualLoop1[0] : mutualLoop1).__env;
        continue __jmp;
      case 'mutualLoop1':
        __args = [];
        __label = (__env.mutualLoop2 ? __env.mutualLoop2[0] : mutualLoop2).__label;
        __env = (__env.mutualLoop2 ? __env.mutualLoop2[0] : mutualLoop2).__env;
        continue __jmp;
      case '__lambda_2':
        __args = [];
        __label = __this.infLoop2.__label;
        __env = __this.infLoop2.__env;
        __this = __this;
        continue __jmp;
      case '__lambda_1':
        __args = [];
        __label = (__env.infLoop1 ? __env.infLoop1[0] : infLoop1).__label;
        __env = (__env.infLoop1 ? __env.infLoop1[0] : infLoop1).__env;
        continue __jmp;
      case 'infLoop':
        __args = [];
        __label = (__env.infLoop ? __env.infLoop[0] : infLoop).__label;
        __env = (__env.infLoop ? __env.infLoop[0] : infLoop).__env;
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
function infLoop() {
  return __call1('infLoop', this, __global, []);
}
infLoop.__label = 'infLoop';
infLoop.__env = __global;
__global.infLoop = [infLoop];
var infLoop1;
infLoop1 = __mk('__lambda_1', this, function __lambda_1() {
  return __call1('__lambda_1', this, __global, []);
});
__global.infLoop1 = [infLoop1];
var obj;
obj = {};
__global.obj = [obj];
obj.infLoop2 = __mk('__lambda_2', this, function __lambda_2() {
  return __call1('__lambda_2', this, __global, []);
});
function mutualLoop1() {
  return __call1('mutualLoop1', this, __global, []);
}
mutualLoop1.__label = 'mutualLoop1';
mutualLoop1.__env = __global;
__global.mutualLoop1 = [mutualLoop1];
function mutualLoop2() {
  return __call1('mutualLoop2', this, __global, []);
}
mutualLoop2.__label = 'mutualLoop2';
mutualLoop2.__env = __global;
__global.mutualLoop2 = [mutualLoop2];
function identity(x) {
  return __call1('identity', this, __global, [x]);
}
identity.__label = 'identity';
identity.__env = __global;
__global.identity = [identity];
function constantly(x) {
  return __call1('constantly', this, __global, [x]);
}
constantly.__label = 'constantly';
constantly.__env = __global;
__global.constantly = [constantly];
function incr() {
  return __call1('incr', this, __global, []);
}
incr.__label = 'incr';
incr.__env = __global;
__global.incr = [incr];
function try_catch_finally(try_clause, catch_clause, finally_clause) {
  return __call1('try_catch_finally', this, __global, [
    try_clause,
    catch_clause,
    finally_clause
  ]);
}
try_catch_finally.__label = 'try_catch_finally';
try_catch_finally.__env = __global;
__global.try_catch_finally = [try_catch_finally];
function sum(xs) {
  return __call1('sum', this, __global, [xs]);
}
sum.__label = 'sum';
sum.__env = __global;
__global.sum = [sum];
__mk('__lambda_3', this, function __lambda_3(callback) {
  return __call1('__lambda_3', this, __global, [callback]);
})(__mk('__lambda_4', this, function __lambda_4() {
  return __call1('__lambda_4', this, __global, []);
}));
__mk('__lambda_5', this, function __lambda_5(callback) {
  return __call1('__lambda_5', this, __global, [callback]);
})([__mk('__lambda_6', this, function __lambda_6() {
    return __call1('__lambda_6', this, __global, []);
  })]);
module.exports = {
  infLoop: infLoop,
  infLoop1: infLoop1,
  obj: obj,
  mutualLoop1: mutualLoop1,
  mutualLoop2: mutualLoop2,
  identity: identity,
  constantly: constantly,
  incr: incr
};
