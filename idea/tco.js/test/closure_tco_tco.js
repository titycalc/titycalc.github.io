var __global = {};
function __ENV(__env) {
  this.add = __env.add;
  this.mkCounter = __env.mkCounter;
  this.i = __env.i;
  this.__lambda_1 = __env.__lambda_1;
  this.mkCounter1 = __env.mkCounter1;
  this.i = __env.i;
  this.i = __env.i;
  this.x = __env.x;
  this.__lambda_2 = __env.__lambda_2;
  this.__lambda_3 = __env.__lambda_3;
  this.mkClosure = __env.mkClosure;
  this.id = __env.id;
  this.x = __env.x;
  this.aaabbb = __env.aaabbb;
  this.f = __env.f;
  this.__lambda_5 = __env.__lambda_5;
  this.__lambda_4 = __env.__lambda_4;
  this.f = __env.f;
  this.__lambda_6 = __env.__lambda_6;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case '__lambda_6':
        __env.f = [(__env.bar ? __env.bar[0] : bar)()];
        (__env.console ? __env.console[0] : console).log((__env.f ? __env.f[0] : f)());
        (__env.console ? __env.console[0] : console).log((__env.f ? __env.f[0] : f)());
        (__env.console ? __env.console[0] : console).log((__env.f ? __env.f[0] : f)());
      case '__lambda_4':
        __env.aaabbb = [0];
        __env.f = [function (__env) {
            return __mk('__lambda_5', new __ENV(__env), function __lambda_5() {
              return __call('__lambda_5', __this, new __ENV(__env), []);
            });
          }(__env)];
        __args = [__env.f ? __env.f[0] : f];
        __label = (__env.id ? __env.id[0] : id).__label;
        __env = (__env.id ? __env.id[0] : id).__env;
        continue __jmp;
      case '__lambda_5':
        return __env.aaabbb ? __env.aaabbb[0] : aaabbb;
      case 'id':
        __env.x = [__args[0]];
        return __env.x ? __env.x[0] : x;
      case 'mkClosure':
        return [
          function (__env) {
            return __mk('__lambda_2', new __ENV(__env), function __lambda_2() {
              return __call('__lambda_2', __this, new __ENV(__env), []);
            });
          }(__env),
          function (__env) {
            return __mk('__lambda_3', new __ENV(__env), function __lambda_3() {
              return __call('__lambda_3', __this, new __ENV(__env), []);
            });
          }(__env)
        ];
      case '__lambda_3':
        if ((__env.x ? typeof __env.x[0] : typeof x) !== 'undefined') {
          (__env.console ? __env.console[0] : console).log('Oops: ' + (__env.x ? __env.x[0] : x));
        }
      case '__lambda_2':
        __env.x = [1];
      case 'mkCounter1':
        __env.i = [__args[0]];
        return function (__env) {
          return __mk('__lambda_1', new __ENV(__env), function __lambda_1() {
            return __call('__lambda_1', __this, new __ENV(__env), []);
          });
        }(__env);
      case '__lambda_1':
        return __env.i ? __env.i[0] += 1 : i += 1;
      case 'mkCounter':
        __env.i = [__args[0]];
        __env.add = [function (__env) {
            return __mk('add', new __ENV(__env), function add() {
              return __call('add', __this, new __ENV(__env), []);
            });
          }(__env)];
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
  return __call('mkCounter', this, new __ENV(__global), [i]);
}
mkCounter.__label = 'mkCounter';
mkCounter.__env = new __ENV(__global);
__global.mkCounter = [mkCounter];
function mkCounter1(i) {
  return __call('mkCounter1', this, new __ENV(__global), [i]);
}
mkCounter1.__label = 'mkCounter1';
mkCounter1.__env = new __ENV(__global);
__global.mkCounter1 = [mkCounter1];
var c;
c = mkCounter1(0);
__global.c = [c];
for (var i = 0; i < 3; ++i) {
  console.log(c());
}
function mkClosure() {
  return __call('mkClosure', this, new __ENV(__global), []);
}
mkClosure.__label = 'mkClosure';
mkClosure.__env = new __ENV(__global);
__global.mkClosure = [mkClosure];
var k;
k = mkClosure();
__global.k = [k];
var k1;
k1 = k[0];
__global.k1 = [k1];
var k2;
k2 = k[1];
__global.k2 = [k2];
k2();
k1();
k2();
function id(x) {
  return __call('id', this, new __ENV(__global), [x]);
}
id.__label = 'id';
id.__env = new __ENV(__global);
__global.id = [id];
var bar;
bar = __mk('__lambda_4', new __ENV(__global), function __lambda_4() {
  return __call('__lambda_4', this, new __ENV(__global), []);
});
__global.bar = [bar];
var foo;
foo = __mk('__lambda_6', new __ENV(__global), function __lambda_6() {
  return __call('__lambda_6', this, new __ENV(__global), []);
});
__global.foo = [foo];
foo();
