var __global = {};
for (var k in __global) {
  __global[k][0].__env = __global;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'mkCounter1':
        __env.i = [__args[0]];
        return {
          __env: {
            add: __env.add,
            mkCounter: __env.mkCounter,
            i: __env.i,
            __lambda_1: __env.__lambda_1,
            mkCounter1: __env.mkCounter1,
            i: __env.i
          },
          __label: '__lambda_1'
        };
      case '__lambda_1':
        return __env.i[0] += 1;
      case 'mkCounter':
        __env.i = [__args[0]];
        __env.add = [{
            __env: {
              add: __env.add,
              mkCounter: __env.mkCounter,
              i: __env.i,
              __lambda_1: __env.__lambda_1,
              mkCounter1: __env.mkCounter1,
              i: __env.i
            },
            __label: 'add'
          }];
        return __env.add[0];
      case 'add':
        return __env.i[0] += 1;
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
function mkCounter(i) {
  function add() {
    return i += 1;
  }
  return add;
}
mkCounter.__label = 'mkCounter';
mkCounter.__env = __global;
__global.mkCounter = [mkCounter];
function mkCounter1(i) {
  return function () {
    return i += 1;
  };
}
mkCounter1.__label = 'mkCounter1';
mkCounter1.__env = __global;
__global.mkCounter1 = [mkCounter1];
var c;
c = mkCounter1(0);
__global.c = [c];
for (var i = 0; i < 1000000; ++i) {
  c();
}
