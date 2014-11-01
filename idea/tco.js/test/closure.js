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

for (var i = 0; i < 3; ++i) {
  c();
}

function mkClosure() {
  return [function (){var x = 1;}, function (){ if (typeof x !== 'undefined') {console.log('Oops: ' + x);} }]
}

var k = mkClosure();
var k1 = k[0];
var k2 = k[1];
k2();
k1();
k2();
