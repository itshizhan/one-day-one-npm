var is = require('is-type-of');
var assert = require('assert');
var fn = function(){

}
var fn2 = function* (){

}
// assert(is.function(fn2), 'app.use() requires a function');

// console.log(is.NaN(NaN) === true);



// console.log(is.class(F)); // true
// console.log(is.class(G)); // false
function Log(str){
    console.log(str);
}
// Log(F.toString());

// Log(G.toString());

function Log(str){
    console.log(str);
}
class A {}
function B() {}
var C = [2,3];
var D = new Date();

var objToString = Object.prototype.toString;
var fnToString = Function.prototype.toString;

Log(objToString.call(A));
Log(fnToString.call(A));

Log(objToString.call(B));
Log(fnToString.call(B));

Log(objToString.call(C));
Log(objToString.call(D));

// [object Function]
// class A {}
// [object Function]
// function B() {}
// [object Array]
// [object Date]
