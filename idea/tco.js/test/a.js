function infLoop() {
  return infLoop();
}

var infLoop1 = function () {
  return infLoop1();
};

var obj = {};
obj.infLoop2 = function () {
  return this.infLoop2();
};

function mutualLoop1() {
  return mutualLoop2();
}

function mutualLoop2() {
  return mutualLoop1();
}

function identity(x) {
  return x;
}

function constantly(x) {
  function discard(y) { return x; }
  return discard;
}

function constantly1(x) {
  var abcdeabcde = x;
  return function (z) { return abcdeabcde; }
}

function incr() {
  return this.x + 1;
}

function try_catch_finally(try_clause, catch_clause, finally_clause) {
  try { try_clause(); }
  catch(e) { catch_clause(e); }
  finally { finally_clause(); }
}

function sum(xs) {
  var x = 0;
  for (var i = 0; i < xs.length; ++x) {
    x += xs[i];
  }
  return x;
}

//(function (callback){ return callback(); })(function (){return});
//(function f(callback){ return callback(); })(function (){return});
//(function (callback){ return callback[0](); })([function (){return}]);

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
}
