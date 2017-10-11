
# 作用
返回一组事件中第一个触发的事件，同时也可以进行取消


## 安装
```sh
$ npm install ee-first
```

## 引入
```js
var first = require('ee-first')
```
## API
### first(arr, listener)

- 第一个参数arr必须为数组，数组中的元素也必须是数组，格式为：`[ee, ...event]`，且不少于两个参数，否则会报类型错误
- 当arr数组元素中的事件列表中的事件首次触发时，listener监听器会调用。
- listener监听器只会调用一次。
- 如果事件列表中有`error`事件，且是最先触发，listener会接收err参数。
- listener监听器，接收四个参数 `listener(err, ee, event, args)`，err是当`error`事件触发时的参数，ee是触发的事件，event是触发事件的事件名称，args是触发事件时传递的参数


#### 使用方法
```js
var ee1 = new EventEmitter()
var ee2 = new EventEmitter()

first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error']
], function (err, ee, event, args) {
  // listener invoked
})
```

#### .cancel()
取消`first(arr, listener)` arr 事件列表中绑定的事件。实际上是调用了`removeListener`方法

```js
var thunk = first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error']
], function (err, ee, event, args) {
  // listener invoked
})

// cancel and clean up
thunk.cancel()
```

# 实战提示1

```js
var EventEmitter = require('events').EventEmitter;
var first = require('./index.js');

var ee1 = new EventEmitter();
var ee2 = new EventEmitter();

ee2.on('error',function(){
    console.log("错误发生了");
})

var thunk = first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error','zdyEv']
], function (err, ee, event, args) {
    // listener invoked
    if(err){
        console.log("err:-----------");
        console.log(err);
    }else{
        console.log(ee);
        console.log("event 名："+event);
        console.log(args);
    }
})

//thunk.cancel();  若先调用cancel()，则不会有任何输出
ee1.emit('close',"我是参数1");
ee2.emit('zdyEv',"我是参数2");

// 输入如下：
EventEmitter {
  domain: null,
  _events: {},
  _eventsCount: 0,
  _maxListeners: undefined }
event 名：close
[ '我是参数1' ]


```



# 实战提示2

```js
var EventEmitter = require('events').EventEmitter;
var first = require('./index.js');

var ee1 = new EventEmitter();
var ee2 = new EventEmitter();

ee2.on('error',function(){
    console.log("错误发生了");
})

var thunk = first([
  [ee1, 'close', 'end', 'error'],
  [ee2, 'error','zdyEv']
], function (err, ee, event, args) {
    // listener invoked
    if(err){
        console.log("err:-----------");
        console.log(err);
    }else{
        console.log(ee);
        console.log("event 名："+event);
        console.log(args);
    }
})

//thunk.cancel();  若先调用cancel()，则不会有任何输出
ee1.emit('error',"我是参数1");
ee2.emit('zdyEv',"我是参数2");

// 输入如下：
错误发生了
err:-----------
我是参数2


```