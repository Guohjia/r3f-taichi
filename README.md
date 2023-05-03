## 直接预览
* [点击直接访问](https://guohjia.github.io/r3f-taichi/?name=xxx)
* github登录回调后，直接将username写入到query中由前端读取，因此query中的name可以直接更改成任意string
* 功能列表：
  * 1、⽀持⿏标拖动⽂字⼏何体
  * 2、参数⾯板，支持修改文字几何体的形状参数、位置参数、颜色参数等
  * 3、上述拖动⼏何体的操作和使⽤参数⾯板修改参数的操作，均可以通过 Ctrl+Z/Ctrl+Y 实现 Redo
Undo

## 使用github登录
1、git clone git@github.com:Guohjia/r3f-taichi.git

2、安装依赖，启动node server
```shell
$ git checkout feature/main
$ npm i
$ node src/server/node.js
```

3、启动项目，访问链接，点击登录按钮测试
```shell
$ npm start
$ open http://localhost:8000/r3f-taichi/login
```