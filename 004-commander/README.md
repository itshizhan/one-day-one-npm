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

# 常用API

#### `version`
自动生成版本信息，见上

#### `option`
`.option('-n, --name <name>', 'description', 'default value')`

- 第一个参数是选项定义，分为短定义和长定义。用|，,，连接。
参数可以用<>或者[]修饰，前者意为必须参数，后者意为可选参数。
- 第二个参数为选项描述
- 第三个参数为选项参数默认值，可选。


#### `command`
`.command('name <path>', 'description',opts)`
最复杂的一个命令
- 第一个为命令定义，第二个命令描述，第三个为命令辅助修饰对象。
- 第一个参数中可以使用<>或者[]修饰命令参数
- 第二个参数可选。
  - 当没有第二个参数时，commander.js将返回Command对象，若有第二个参数，将返回原型对象。
  - 当带有第二个参数，并且没有显示调用action(fn)时，则将会使用子命令模式。
  - 所谓子命令模式即，./pm，./pm-install，./pm-search等。这些子命令跟主命令在不同的文件中。

- 第三个参数一般不用，它可以设置是否显示的使用子命令模式。

> 提示： 如果第一个参数name是“*”，则未匹配的命令名会传入第一个参数

源码如下：
```js
Command.prototype.command = function(name, desc, opts) {
  opts = opts || {};
  var args = name.split(/ +/);
  var cmd = new Command(args.shift());

  if (desc) {
    cmd.description(desc);
    this.executables = true;
    this._execs[cmd._name] = true;
    if (opts.isDefault) this.defaultExecutable = cmd._name;
  }

  cmd._noHelp = !!opts.noHelp;
  this.commands.push(cmd);
  cmd.parseExpectedArgs(args);
  cmd.parent = this;

  if (desc) return this;
  return cmd;
};
```

#### `description`
`.description('command description')`

用于设置命令的描述或整体的描述

#### `action`
用于设置命令执行的相关回调。fn可以接受命令的参数为函数形参，顺序与command()中定义的顺序一致。

#### `parse`
`program.parse(process.argv)`
此api一般是最后调用，用于解析process.argv。


#### `outputHelp`

一般用于未录入参数时自动打印帮助信息。

```js
if (!process.argv.slice(2).length) {
    program.outputHelp(make_red);
}

function make_red(txt) {
    return colors.red(txt); //display the help text in red on the console
}
```

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