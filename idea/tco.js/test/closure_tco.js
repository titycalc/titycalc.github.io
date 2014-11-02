function __ENV(__env) {
  if (__env.add)
    this.add = __env.add;
  if (__env.i)
    this.i = __env.i;
  if (__env.x)
    this.x = __env.x;
  if (__env.aaabbb)
    this.aaabbb = __env.aaabbb;
  if (__env.f)
    this.f = __env.f;
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
            return __mk('__lambda_5', __env, function __lambda_5() {
              return __call('__lambda_5', __this, __env, []);
            });
          }(new __ENV(__env))];
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
            return __mk('__lambda_2', __env, function __lambda_2() {
              return __call('__lambda_2', __this, __env, []);
            });
          }(new __ENV(__env)),
          function (__env) {
            return __mk('__lambda_3', __env, function __lambda_3() {
              return __call('__lambda_3', __this, __env, []);
            });
          }(new __ENV(__env))
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
          return __mk('__lambda_1', __env, function __lambda_1() {
            return __call('__lambda_1', __this, __env, []);
          });
        }(new __ENV(__env));
      case '__lambda_1':
        return __env.i ? __env.i[0] += 1 : i += 1;
      case 'mkCounter':
        __env.i = [__args[0]];
        __env.add = [function (__env) {
            return __mk('add', __env, function add() {
              return __call('add', __this, __env, []);
            });
          }(new __ENV(__env))];
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
  return __call('mkCounter', this, {}, [i]);
}
mkCounter.__label = 'mkCounter';
mkCounter.__env = {};
function mkCounter1(i) {
  return __call('mkCounter1', this, {}, [i]);
}
mkCounter1.__label = 'mkCounter1';
mkCounter1.__env = {};
var c;
c = mkCounter1(0);
for (var i = 0; i < 3; ++i) {
  console.log(c());
}
function mkClosure() {
  return __call('mkClosure', this, {}, []);
}
mkClosure.__label = 'mkClosure';
mkClosure.__env = {};
var k;
k = mkClosure();
var k1;
k1 = k[0];
var k2;
k2 = k[1];
k2();
k1();
k2();
function id(x) {
  return __call('id', this, {}, [x]);
}
id.__label = 'id';
id.__env = {};
var bar;
bar = __mk('__lambda_4', {}, function __lambda_4() {
  return __call('__lambda_4', this, {}, []);
});
var foo;
foo = __mk('__lambda_6', {}, function __lambda_6() {
  return __call('__lambda_6', this, {}, []);
});
foo();
