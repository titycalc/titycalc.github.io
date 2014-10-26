var fs = require('fs');
var escodegen = require('escodegen');
var esprima = require('esprima');
fs.readFile('tco.js', 'utf-8', function (err,dat) {
  if (err) { console.warn(err); return; }
  console.log(escodegen.generate(esprima.parse(dat), {indent:'  '}));
});
