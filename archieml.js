(function() {
'use strict';

var archieml =
// @include ./dist/aml.parser.js

archieml.compile =
// @include ./aml.compiler.js

archieml.load = function load(input) {
  var tokens = archieml.parse(input);
  return archieml.compile(tokens);
};

var root = this;
  
if (typeof exports !== 'undefined') {
  if (typeof module !== 'undefined' && module.exports) {
    exports = module.exports = archieml;
  }
  exports.archieml = archieml;
} else {
  this.archieml = archieml;
}

if (typeof define === 'function' && define.amd) {
  define('archieml', [], function() {
    return archieml;
  });
}
}.call(this))
