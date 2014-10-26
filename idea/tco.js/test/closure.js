function mkCounter(i) {
  function add() { return i += 1; }
  return add;
}
function mkCounter1(i) {
  return function () { return i += 1; };
}

//var add = mkCounter(0);
//console.log(add());
//console.log(add());
//console.log(add());

var c = mkCounter1(0);

for (var i = 0; i < 1000000; ++i) {
  c();
}
