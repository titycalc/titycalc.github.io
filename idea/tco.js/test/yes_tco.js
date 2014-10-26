var __global = { yes: [{ label: 'yes' }] };
for (var k in __global) {
  __global[k][0].env = __global;
}
function __call(__label, __env, __args) {
  __jmp:
    while (true) {
      switch (__label) {
      case 'yes':
        console.log('y');
        {
          __args = [];
          __label = __env.yes[0].label;
          __env = __env.yes[0].env;
          continue __jmp;
        }
      default:
        console.warn('unrecognized label: ' + __label);
        break __jmp;
      }
    }
}
function yes() {
  return __call('yes', __global, []);
}
