var __global = {};
function __ENV(__env) {
  this.add = __env.add;
  this.mkCounter = __env.mkCounter;
  this.i = __env.i;
  this.__lambda_1 = __env.__lambda_1;
  this.mkCounter1 = __env.mkCounter1;
  this.i = __env.i;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'mkCounter1':
        __env.i = [__args[0]];
        return __mk('__lambda_1', __env, function __lambda_1() {
          return __call1('__lambda_1', __this, __env, []);
        });
      case '__lambda_1':
        return __env.i ? __env.i[0] += 1 : i += 1;
      case 'mkCounter':
        __env.i = [__args[0]];
        __env.add = [__mk('add', new __ENV(__env), function add() {
            return __call1('add', __this, __env, []);
          })];
        return __env.add ? __env.add[0] : add;
      case 'add':
        return __env.i ? __env.i[0] += 1 : i += 1;
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
  return __call1('mkCounter', this, new __ENV(__global), [i]);
}
mkCounter.__label = 'mkCounter';
mkCounter.__env = new __ENV(__global);
__global.mkCounter = [mkCounter];
function mkCounter1(i) {
  return __call1('mkCounter1', this, new __ENV(__global), [i]);
}
mkCounter1.__label = 'mkCounter1';
mkCounter1.__env = new __ENV(__global);
__global.mkCounter1 = [mkCounter1];
var c;
c = mkCounter1(0);
__global.c = [c];
for (var i = 0; i < 1000000; ++i) {
  c();
}
