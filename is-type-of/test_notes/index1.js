var is = require('is-type-of');
var assert = require('assert');
var fn = function(){

}
var fn2 = function* (){

}
assert(is.function(fn2), 'app.use() requires a function');

console.log(is.NaN(NaN) === true);

class F {}
function G() {}

console.log(is.class(F)); // true
console.log(is.class(G)); // false