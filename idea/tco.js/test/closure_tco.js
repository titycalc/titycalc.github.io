var __global = {
  add: [{ __label: 'add' }],
  mkCounter: [{ __label: 'mkCounter' }],
  i: [{ __label: 'i' }],
  __lambda_1: [{ __label: '__lambda_1' }],
  mkCounter1: [{ __label: 'mkCounter1' }],
  i: [{ __label: 'i' }]
};
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
function add() {
  return i += 1;
}
function mkCounter(i) {
  function add() {
    return i += 1;
  }
  return add;
}
function mkCounter1(i) {
  return function () {
    return i += 1;
  };
}
