var __global = {};
for (var k in __global) {
  __global[k][0].__env = __global;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'incr':
        return __this.x + 1;
      case 'constantly':
        __env.x = [__args[0]];
        __env.discard = [{
            __env: {
              infLoop: __env.infLoop,
              __lambda_1: __env.__lambda_1,
              __lambda_2: __env.__lambda_2,
              mutualLoop1: __env.mutualLoop1,
              mutualLoop2: __env.mutualLoop2,
              identity: __env.identity,
              x: __env.x,
              discard: __env.discard,
              y: __env.y,
              constantly: __env.constantly,
              x: __env.x,
              incr: __env.incr
            },
            __label: 'discard'
          }];
        return __env.discard[0];
      case 'discard':
        __env.y = [__args[0]];
        return __env.x[0];
      case 'identity':
        __env.x = [__args[0]];
        return __env.x[0];
      case 'mutualLoop2':
        __args = [];
        __label = __env.mutualLoop1[0].__label;
        __env = __env.mutualLoop1[0].__env;
        continue __jmp;
      case 'mutualLoop1':
        __args = [];
        __label = __env.mutualLoop2[0].__label;
        __env = __env.mutualLoop2[0].__env;
        continue __jmp;
      case '__lambda_2':
        __args = [];
        __label = __this.infLoop2.__label;
        __env = __this.infLoop2.__env;
        continue __jmp;
      case '__lambda_1':
        __args = [];
        __label = __env.infLoop1[0].__label;
        __env = __env.infLoop1[0].__env;
        continue __jmp;
      case 'infLoop':
        __args = [];
        __label = __env.infLoop[0].__label;
        __env = __env.infLoop[0].__env;
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
{
  function infLoop() {
    return __call1('infLoop', this, __global, []);
  }
  infLoop.__label = 'infLoop';
  infLoop.__env = __global;
  __global.infLoop = [infLoop];
}
{
  var infLoop1;
  infLoop1 = __mk('__lambda_1', this, function __lambda_1() {
    return __call1('__lambda_1', this, __global, []);
  });
  __global.infLoop1 = [infLoop1];
}
{
  var obj;
  obj = {};
  __global.obj = [obj];
}
obj.infLoop2 = __mk('__lambda_2', this, function __lambda_2() {
  return __call1('__lambda_2', this, __global, []);
});
{
  function mutualLoop1() {
    return __call1('mutualLoop1', this, __global, []);
  }
  mutualLoop1.__label = 'mutualLoop1';
  mutualLoop1.__env = __global;
  __global.mutualLoop1 = [mutualLoop1];
}
{
  function mutualLoop2() {
    return __call1('mutualLoop2', this, __global, []);
  }
  mutualLoop2.__label = 'mutualLoop2';
  mutualLoop2.__env = __global;
  __global.mutualLoop2 = [mutualLoop2];
}
{
  function identity(x) {
    return x;
  }
  identity.__label = 'identity';
  identity.__env = __global;
  __global.identity = [identity];
}
{
  function constantly(x) {
    function discard(y) {
      return x;
    }
    return discard;
  }
  constantly.__label = 'constantly';
  constantly.__env = __global;
  __global.constantly = [constantly];
}
{
  function incr() {
    return this.x + 1;
  }
  incr.__label = 'incr';
  incr.__env = __global;
  __global.incr = [incr];
}
module.exports = {
  infLoop: infLoop,
  infLoop1: infLoop1,
  obj: obj,
  mutualLoop1: mutualLoop1,
  mutualLoop2: mutualLoop2,
  identity: identity,
  constantly: constantly,
  incr: incr
};
