function __ENV(__env) {
  if (__env.discard)
    this.discard = __env.discard;
  if (__env.y)
    this.y = __env.y;
  if (__env.abcdeabcde)
    this.abcdeabcde = __env.abcdeabcde;
  if (__env.z)
    this.z = __env.z;
  if (__env.x)
    this.x = __env.x;
  if (__env.i)
    this.i = __env.i;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'sum':
        __env.xs = [__args[0]];
        __env.x = [0];
        for (__env.i = [0]; (__env.i ? __env.i[0] : i) < (__env.xs ? __env.xs[0] : xs).length; __env.x ? ++__env.x[0] : ++x) {
          __env.x ? __env.x[0] += (__env.xs ? __env.xs[0] : xs)[__env.i ? __env.i[0] : i] : x += (__env.xs ? __env.xs[0] : xs)[__env.i ? __env.i[0] : i];
        }
        return __env.x ? __env.x[0] : x;
      case 'try_catch_finally':
        __env.try_clause = [__args[0]];
        __env.catch_clause = [__args[1]];
        __env.finally_clause = [__args[2]];
        try {
          (__env.try_clause ? __env.try_clause[0] : try_clause)();
        } catch (e) {
          (__env.catch_clause ? __env.catch_clause[0] : catch_clause)(__env.e ? __env.e[0] : e);
        } finally {
          (__env.finally_clause ? __env.finally_clause[0] : finally_clause)();
        }
      case 'incr':
        return __this.x + 1;
      case 'constantly1':
        __env.x = [__args[0]];
        __env.abcdeabcde = [__env.x ? __env.x[0] : x];
        return function (__env) {
          return __mk('__lambda_3', __env, function __lambda_3(z) {
            return __call('__lambda_3', __this, __env, [z]);
          });
        }(new __ENV(__env));
      case '__lambda_3':
        __env.z = [__args[0]];
        return __env.abcdeabcde ? __env.abcdeabcde[0] : abcdeabcde;
      case 'constantly':
        __env.x = [__args[0]];
        __env.discard = [function (__env) {
            return __mk('discard', __env, function discard(y) {
              return __call('discard', __this, __env, [y]);
            });
          }(new __ENV(__env))];
        return __env.discard ? __env.discard[0] : discard;
      case 'discard':
        __env.y = [__args[0]];
        return __env.x ? __env.x[0] : x;
      case 'identity':
        __env.x = [__args[0]];
        return __env.x ? __env.x[0] : x;
      case 'mutualLoop2':
        __args = [];
        __label = (__env.mutualLoop1 ? __env.mutualLoop1[0] : mutualLoop1).__label;
        __env = (__env.mutualLoop1 ? __env.mutualLoop1[0] : mutualLoop1).__env;
        continue __jmp;
      case 'mutualLoop1':
        __args = [];
        __label = (__env.mutualLoop2 ? __env.mutualLoop2[0] : mutualLoop2).__label;
        __env = (__env.mutualLoop2 ? __env.mutualLoop2[0] : mutualLoop2).__env;
        continue __jmp;
      case '__lambda_2':
        __args = [];
        __label = __this.infLoop2.__label;
        __env = __this.infLoop2.__env;
        __this = __this;
        continue __jmp;
      case '__lambda_1':
        __args = [];
        __label = (__env.infLoop1 ? __env.infLoop1[0] : infLoop1).__label;
        __env = (__env.infLoop1 ? __env.infLoop1[0] : infLoop1).__env;
        continue __jmp;
      case 'infLoop':
        __args = [];
        __label = (__env.infLoop ? __env.infLoop[0] : infLoop).__label;
        __env = (__env.infLoop ? __env.infLoop[0] : infLoop).__env;
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
