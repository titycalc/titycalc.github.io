var __global = {
  isEven: [{ __label: 'isEven' }],
  x: [{ __label: 'x' }],
  isOdd: [{ __label: 'isOdd' }],
  x: [{ __label: 'x' }]
};
for (var k in __global) {
  __global[k][0].__env = __global;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'isOdd':
        __env.x = [__args[0]];
        if (__env.x[0] === 0) {
          return false;
        } else {
          __args = [__env.x[0] - 1];
          __label = __env.isEven[0].__label;
          __env = __env.isEven[0].__env;
          continue __jmp;
        }
      case 'isEven':
        __env.x = [__args[0]];
        if (__env.x[0] === 0) {
          return true;
        } else {
          __args = [__env.x[0] - 1];
          __label = __env.isOdd[0].__label;
          __env = __env.isOdd[0].__env;
          continue __jmp;
        }
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
function isEven(x) {
  return __call1('isEven', this, __global, [x]);
}
function isOdd(x) {
  return __call1('isOdd', this, __global, [x]);
}
exports.isEven = isEven;
exports.isOdd = isOdd;
console.log(isEven(12345));
