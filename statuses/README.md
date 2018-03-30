

## 作用

适用于node环境的http状态码工具

## 安装

```sh
$ npm install statuses 
```

## 主要API

<!-- eslint-disable no-unused-vars -->

```js
var status = require('statuses')
```

### var code = status(Integer || String)

参数Integer || String 如果是有效的http 状态码或状态码短语，则返回状态码code，否则抛出错误

<!-- eslint-disable no-undef -->

```js
status(403) // => 403
status('403') // => 403
status('forbidden') // => 403
status('Forbidden') // => 403
status(306) // throws, as it's not supported by node.js

```

```js
var code  = status(Integet || String)
status(403);
status('forbidden');
status('Forbidden');
```



### status.codes

返回所有支持的状态码的数字数组。

即：

```js
[ 100,  101,102,200,201,…………,510, 511 ]
```



### var msg = status[code]

返回状态码对应的消息短语，如果状态码不合法，返回`undefined`,例如：

```js
status[404] // => 'Not Found'
var msg = status[code]
```

### var code = status[msg]

返回状态码消息短语对应的状态码，msg参数可以是 title-cased 或lower-cased 格式。如果是非法的消息短语，返回`undefined`，例如：

```js
status['not found'] // => 404
status['Not Found'] // => 404
```

### status.redirect[code]

如果状态码是一个有效的重定向状态码，返回 `true` ，否则返回`undefined`

```js

status.redirect[200] // => undefined
status.redirect[301] // => true

```

### status.empty[code]

Returns `true` if a status code expects an empty body.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.empty[200] // => undefined
status.empty[204] // => true
status.empty[304] // => true
```

### status.retry[code]

Returns `true` if you should retry the rest.

<!-- eslint-disable no-undef, no-unused-expressions -->

```js
status.retry[501] // => undefined
status.retry[503] // => true
```

## Adding Status Codes

The status codes are primarily sourced from
https://www.iana.org/assignments/http-status-codes/http-status-codes-1.csv.
Additionally, custom codes are added from
https://en.wikipedia.org/wiki/List_of_HTTP_status_codes. These are added
manually in the `lib/*.json` files. If you would like to add a status code,
add it to the appropriate JSON file.

To rebuild `codes.json`, run the following:

```bash
# update src/iana.json
npm run fetch
# build codes.json
npm run build

```