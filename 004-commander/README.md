# 作用
一个命令行工具， `process.argv` 的封装

# 安装
```javascript
$ npm install commander --save
```

# 使用方法及注意事项

```js
program
.version(require('../package').version,'-v, --version')
.usage('<command> <dir>  [options]')
.option('-t, --type [value]', 'technology stack: react|vue','react')
.option('-s, --is-spa [value]', 'is spa: spa|multipage','multipage')


program
.command('webpack <dir>')
.alias('w')
.description('create a new webpack react/vue multipage project from a template')
.action(function(dir, cmd){
	
})    
//自定义帮助信息
.on('--help', function() {
	console.log('例如:')
	console.log('')
	console.log('create w react-demo -t vue -s spa')
});
	
// 此句必须可少，否则无法接收任何参数
program.parse(process.argv)

```

- version：设置版本，`.version('0.0.1')`默认是 -V,--version, 添加第二个参数可以自定义设置
- usage: 当前命令行工具的使用方式，如，必须有<command> <dir>命令、路径两个参数，[options] 选填
- option: 第一个参数接受一个包含选项简写、选项全称和可选的接收值 (<> 表示必填，[] 表示选填) 的字符串，第二个参数是使用说明，第三个参数是默认值
- command: 设置一个命令
- alias：命名的别名，例如 webpack == w
- description：命令的描述，它会在help里面展示
- action: 配置命令时的回调函数，dir：必须参数，cmd==progrram
- parse: 解析命令行
- help: 自定义帮助信息，针对命令，例如 create m --help 时输出自定义的帮助信息



> 特别注意：<> 表示必填，[] 表示选填

# 使用场景及实战提示
书写命令行工具.


```js
#!/usr/bin/env node
var program = require('commander');

program
.version(require('../package').version,'-v, --version')
.usage('<command> <dir>  [options]')
.option('-t, --type [value]', 'technology stack: react|vue','react')
.option('-s, --is-spa [value]', 'is spa: spa|multipage','multipage')

program
.command('webpack <dir>')
.description('create a new webpack react/vue multipage project from a template')
.action(function(dir, cmd){
	
});
	
program
.command('parcel <dir>')
.description('create a new parcel react/vue multipage project from a template')
.action(function(dir, cmd){

});

program.parse(process.argv);

```
以上代码摘自 `create-starter-cli` 包，可以亲自下载体验