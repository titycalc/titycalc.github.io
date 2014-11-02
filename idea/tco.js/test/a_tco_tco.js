function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'sum':
        __env.xs = [__args[0]];
        __env.x = [0];
        for (__env.i = [0]; __env.i[0] < __env.xs[0].length; __env.x ? ++__env.x[0] : ++x) {
          __env.x ? __env.x[0] += __env.xs[0][__env.i[0]] : x += __env.xs[0][__env.i[0]];
        }
        return __env.x[0];
      case 'try_catch_finally':
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
      case 'incr':
        return __this.x + 1;
      case 'constantly1':
        __env.x = [__args[0]];
        __env.abcdeabcde = [__env.x[0]];
        return function (__env) {
          return __mk('__lambda_3', {
            x: __env.x,
            abcdeabcde: __env.abcdeabcde
          }, function __lambda_3(z) {
            return __call('__lambda_3', __this, {
              x: __env.x,
              abcdeabcde: __env.abcdeabcde
            }, [z]);
          });
        }({
          x: __env.x,
          abcdeabcde: __env.abcdeabcde
        });
      case '__lambda_3':
        __env.z = [__args[0]];
        return __env.abcdeabcde[0];
      case 'constantly':
        __env.x = [__args[0]];
        __env.discard = [function (__env) {
            return __mk('discard', {
              x: __env.x,
              y: __env.y
            }, function discard(y) {
              return __call('discard', __this, {
                x: __env.x,
                y: __env.y
              }, [y]);
            });
          }({
            x: __env.x,
            y: __env.y
          })];
        return discard;
      case 'discard':
        __env.y = [__args[0]];
        return __env.x[0];
      case 'identity':
        __env.x = [__args[0]];
        return __env.x[0];
      case 'mutualLoop2':
        __args = [];
        __label = mutualLoop1.__label;
        __env = mutualLoop1.__env;
        continue __jmp;
      case 'mutualLoop1':
        __args = [];
        __label = mutualLoop2.__label;
        __env = mutualLoop2.__env;
        continue __jmp;
      case '__lambda_2':
        __args = [];
        __label = __this.infLoop2.__label;
        __env = __this.infLoop2.__env;
        __this = __this;
        continue __jmp;
      case '__lambda_1':
        __args = [];
        __label = infLoop1.__label;
        __env = infLoop1.__env;
        continue __jmp;
      case 'infLoop':
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
  return __call('infLoop', this, {}, []);
}
infLoop.__label = 'infLoop';
infLoop.__env = {};
var infLoop1;
infLoop1 = __mk('__lambda_1', {}, function __lambda_1() {
  return __call('__lambda_1', this, {}, []);
});
var obj;
obj = {};
obj.infLoop2 = __mk('__lambda_2', {}, function __lambda_2() {
  return __call('__lambda_2', this, {}, []);
});
function mutualLoop1() {
  return __call('mutualLoop1', this, {}, []);
}
mutualLoop1.__label = 'mutualLoop1';
mutualLoop1.__env = {};
function mutualLoop2() {
  return __call('mutualLoop2', this, {}, []);
}
mutualLoop2.__label = 'mutualLoop2';
mutualLoop2.__env = {};
function identity(x) {
  return __call('identity', this, {}, [x]);
}
identity.__label = 'identity';
identity.__env = {};
function constantly(x) {
  return __call('constantly', this, {}, [x]);
}
constantly.__label = 'constantly';
constantly.__env = {};
function constantly1(x) {
  return __call('constantly1', this, {}, [x]);
}
constantly1.__label = 'constantly1';
constantly1.__env = {};
function incr() {
  return __call('incr', this, {}, []);
}
incr.__label = 'incr';
incr.__env = {};
function try_catch_finally(try_clause, catch_clause, finally_clause) {
  return __call('try_catch_finally', this, {}, [
    try_clause,
    catch_clause,
    finally_clause
  ]);
}
try_catch_finally.__label = 'try_catch_finally';
try_catch_finally.__env = {};
function sum(xs) {
  return __call('sum', this, {}, [xs]);
}
sum.__label = 'sum';
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
