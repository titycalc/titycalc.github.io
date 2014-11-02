function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 13:
        __env.xs = [__args[0]];
        __env.x = [0];
        for (__env.i = [0]; __env.i[0] < __env.xs[0].length; ++__env.x[0]) {
          __env.x[0] += __env.xs[0][__env.i[0]];
        }
        return __env.x[0];
      case 12:
        __env.try_clause = [__args[0]];
        __env.catch_clause = [__args[1]];
        __env.finally_clause = [__args[2]];
        try {
          __env.try_clause[0]();
        } catch (e) {
          __env.catch_clause[0](e);
        } finally {
          __env.finally_clause[0]();
        }
      case 11:
        return __this.x + 1;
      case 9:
        __env.x = [__args[0]];
        __env.abcdeabcde = [__env.x[0]];
        return function (__env) {
          return __mk(10, __env, function __lambda_10(z) {
            return __call(10, __this, __env, [z]);
          });
        }({
          x: __env.x,
          abcdeabcde: __env.abcdeabcde
        });
      case 10:
        __env.z = [__args[0]];
        return __env.abcdeabcde[0];
      case 7:
        __env.x = [__args[0]];
        __env.discard = [function (__env) {
            return __mk(8, __env, function discard(y) {
              return __call(8, __this, __env, [y]);
            });
          }({
            x: __env.x,
            y: __env.y
          })];
        return discard;
      case 8:
        __env.y = [__args[0]];
        return __env.x[0];
      case 6:
        __env.x = [__args[0]];
        return __env.x[0];
      case 5:
        __args = [];
        __label = mutualLoop1.__label;
        __env = mutualLoop1.__env;
        continue __jmp;
      case 4:
        __args = [];
        __label = mutualLoop2.__label;
        __env = mutualLoop2.__env;
        continue __jmp;
      case 3:
        __args = [];
        __label = __this.infLoop2.__label;
        __env = __this.infLoop2.__env;
        __this = __this;
        continue __jmp;
      case 2:
        __args = [];
        __label = infLoop1.__label;
        __env = infLoop1.__env;
        continue __jmp;
      case 1:
        __args = [];
        __label = infLoop.__label;
        __env = infLoop.__env;
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
  return __call(1, this, {}, []);
}
infLoop.__label = 1;
infLoop.__env = {};
var infLoop1;
infLoop1 = __mk(2, {}, function __lambda__2() {
  return __call(2, this, {}, []);
});
var obj;
obj = {};
obj.infLoop2 = __mk(3, {}, function __lambda__3() {
  return __call(3, this, {}, []);
});
function mutualLoop1() {
  return __call(4, this, {}, []);
}
mutualLoop1.__label = 4;
mutualLoop1.__env = {};
function mutualLoop2() {
  return __call(5, this, {}, []);
}
mutualLoop2.__label = 5;
mutualLoop2.__env = {};
function identity(x) {
  return __call(6, this, {}, [x]);
}
identity.__label = 6;
identity.__env = {};
function constantly(x) {
  return __call(7, this, {}, [x]);
}
constantly.__label = 7;
constantly.__env = {};
function constantly1(x) {
  return __call(9, this, {}, [x]);
}
constantly1.__label = 9;
constantly1.__env = {};
function incr() {
  return __call(11, this, {}, []);
}
incr.__label = 11;
incr.__env = {};
function try_catch_finally(try_clause, catch_clause, finally_clause) {
  return __call(12, this, {}, [
    try_clause,
    catch_clause,
    finally_clause
  ]);
}
try_catch_finally.__label = 12;
try_catch_finally.__env = {};
function sum(xs) {
  return __call(13, this, {}, [xs]);
}
sum.__label = 13;
sum.__env = {};
module.exports = {
  infLoop: infLoop,
  infLoop1: infLoop1,
  obj: obj,
  mutualLoop1: mutualLoop1,
  mutualLoop2: mutualLoop2,
  identity: identity,
  constantly: constantly,
  constantly1: constantly1,
  incr: incr
};
