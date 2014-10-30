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

function incr() {
  return this.x + 1;
}

function try_catch_finally(try_clause, catch_clause, finally_clause) {
  try { try_clause(); }
  catch(e) { catch_clause(e); }
  finally { finally_clause(); }
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
}
