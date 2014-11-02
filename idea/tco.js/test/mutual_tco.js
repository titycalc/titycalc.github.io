function __ENV(__env) {
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'isOdd':
        __env.x = [__args[0]];
        if ((__env.x ? __env.x[0] : x) === 0) {
          return false;
        } else {
          __args = [(__env.x ? __env.x[0] : x) - 1];
          __label = (__env.isEven ? __env.isEven[0] : isEven).__label;
          __env = (__env.isEven ? __env.isEven[0] : isEven).__env;
          continue __jmp;
        }
      case 'isEven':
        __env.x = [__args[0]];
        if ((__env.x ? __env.x[0] : x) === 0) {
          return true;
        } else {
          __args = [(__env.x ? __env.x[0] : x) - 1];
          __label = (__env.isOdd ? __env.isOdd[0] : isOdd).__label;
          __env = (__env.isOdd ? __env.isOdd[0] : isOdd).__env;
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
  return __call('isEven', this, {}, [x]);
}
isEven.__label = 'isEven';
isEven.__env = {};
function isOdd(x) {
  return __call('isOdd', this, {}, [x]);
}
isOdd.__label = 'isOdd';
isOdd.__env = {};
exports.isEven = isEven;
exports.isOdd = isOdd;
console.log(isEven(1234567));
