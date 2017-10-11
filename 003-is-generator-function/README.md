# 作用
判断一个函数是不是ES6 的generator 函数

# 安装
```javascript
npm install is-generator-function
```

# 使用方法
```javascript
var isGeneratorFunction = require('is-generator-function');
assert(!isGeneratorFunction(function () {}));
assert(!isGeneratorFunction(null));
assert(isGeneratorFunction(function* () { yield 42; return Infinity; }));
```

# 使用场景
koa.js中。

> 注意,在egg.js中使用 is-type-of 模块里面的工具方法`is.generator(gen),is.generatorFunction(fn)` 可以达到同样的效果。