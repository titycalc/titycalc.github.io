function infLoop() {
  return infLoop();
}

var infLoop1 = function () {
  return infLoop1();
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
