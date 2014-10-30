function ret(x) {
  return function (s, cont) {
    return cont(x, s);
  };
}
function bind(m,k) {
  return function (s, cont) {
    return m(s, function (x,s1) {
      return k(x)(s1,cont);
    });
  }
}
function get(s, cont) {
  return cont(s, s);
}
function put(s) {
  return function (_, cont) {
    return cont(null, s);
  };
}
function runState(m,s){
  return m(s, function(x,s1){ return {x:x,s:s1}; });
}
function evalState(m,s){
  return m(s, function(x,s1){ return x; });
}
function execState(m,s){
  return m(s, function(x,s1){ return s1; });
}
var tick = bind(get,function (i) { return bind(put(i+1), function (_){ return i; }) });
var plusOne = function (i) { return execState(tick,i) };
module.exports = { ret: ret, bind: bind, get: get, put: put,
runState: runState, evalState: evalState, execState: execState,
tick: tick, plusOne: plusOne }
