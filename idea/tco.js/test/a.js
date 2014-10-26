function infLoop() {
  return infLoop();
}

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
