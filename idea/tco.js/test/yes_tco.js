var __global = {};
function __ENV(__env) {
  this.yes = __env.yes;
}
function __call(__label, __this, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'yes':
        (__env.console ? __env.console[0] : console).log('y');
        __args = [];
        __label = (__env.yes ? __env.yes[0] : yes).__label;
        __env = (__env.yes ? __env.yes[0] : yes).__env;
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
function yes() {
  return __call1('yes', this, __global, []);
}
yes.__label = 'yes';
yes.__env = __global;
__global.yes = [yes];
yes();
