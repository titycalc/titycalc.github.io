function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 2:
        __env.x = [__args[0]];
        if (__env.x[0] === 0) {
          return false;
        } else {
          __args = [__env.x[0] - 1];
          __label = isEven.__label;
          __env = isEven.__env;
          continue __jmp;
        }
      case 1:
        __env.x = [__args[0]];
        if (__env.x[0] === 0) {
          return true;
        } else {
          __args = [__env.x[0] - 1];
          __label = isOdd.__label;
          __env = isOdd.__env;
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
function __mk(__label, __env, fn) {
  fn.__label = __label;
  fn.__env = __env;
  return fn;
}
function isEven(x) {
  return __call(1, this, {}, [x]);
}
isEven.__label = 1;
isEven.__env = {};
function isOdd(x) {
  return __call(2, this, {}, [x]);
}
isOdd.__label = 2;
isOdd.__env = {};
exports.isEven = isEven;
exports.isOdd = isOdd;
console.log(isEven(1234567));
