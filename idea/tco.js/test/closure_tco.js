function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 11:
        __env.f = [bar()];
        console.log(__env.f[0]());
        console.log(__env.f[0]());
        console.log(__env.f[0]());
      case 9:
        __env.aaabbb = [0];
        __env.f = [function (__env) {
            return __mk(10, __env, function __lambda_10() {
              return __call(10, __this, __env, []);
            });
          }({
            aaabbb: __env.aaabbb,
            f: __env.f
          })];
        __args = [__env.f[0]];
        __label = id.__label;
        __env = id.__env;
        continue __jmp;
      case 10:
        return __env.aaabbb[0];
      case 8:
        __env.x = [__args[0]];
        return __env.x[0];
      case 5:
        return [
          function (__env) {
            return __mk(6, __env, function __lambda_6() {
              return __call(6, __this, __env, []);
            });
          }({}),
          function (__env) {
            return __mk(7, __env, function __lambda_7() {
              return __call(7, __this, __env, []);
            });
          }({})
        ];
      case 7:
        if (typeof x !== 'undefined') {
          console.log('Oops: ' + x);
        }
      case 6:
        __env.x = [1];
      case 3:
        __env.i = [__args[0]];
        return function (__env) {
          return __mk(4, __env, function __lambda_4() {
            return __call(4, __this, __env, []);
          });
        }({ i: __env.i });
      case 4:
        return __env.i[0] += 1;
      case 1:
        __env.i = [__args[0]];
        __env.add = [function (__env) {
            return __mk(2, __env, function add() {
              return __call(2, __this, __env, []);
            });
          }({ i: __env.i })];
        return add;
      case 2:
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
  return __call(1, this, {}, [i]);
}
mkCounter.__label = 1;
mkCounter.__env = {};
function mkCounter1(i) {
  return __call(3, this, {}, [i]);
}
mkCounter1.__label = 3;
mkCounter1.__env = {};
var c;
c = mkCounter1(0);
for (var i = 0; i < 3; ++i) {
  console.log(c());
}
function mkClosure() {
  return __call(5, this, {}, []);
}
mkClosure.__label = 5;
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
  return __call(8, this, {}, [x]);
}
id.__label = 8;
id.__env = {};
var bar;
bar = __mk(9, {}, function __lambda__9() {
  return __call(9, this, {}, []);
});
var foo;
foo = __mk(11, {}, function __lambda__11() {
  return __call(11, this, {}, []);
});
foo();
