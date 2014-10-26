var __global = {
  infLoop: [{ __label: 'infLoop' }],
  mutualLoop1: [{ __label: 'mutualLoop1' }],
  mutualLoop2: [{ __label: 'mutualLoop2' }],
  identity: [{ __label: 'identity' }],
  x: [{ __label: 'x' }],
  discard: [{ __label: 'discard' }],
  y: [{ __label: 'y' }],
  constantly: [{ __label: 'constantly' }],
  x: [{ __label: 'x' }],
  incr: [{ __label: 'incr' }]
};
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
function infLoop() {
  return __call1('infLoop', this, __global, []);
}
function mutualLoop1() {
  return __call1('mutualLoop1', this, __global, []);
}
function mutualLoop2() {
  return __call1('mutualLoop2', this, __global, []);
}
function identity(x) {
  return x;
}
function discard(y) {
  return x;
}
function constantly(x) {
  function discard(y) {
    return x;
  }
  return discard;
}
function incr() {
  return this.x + 1;
}
