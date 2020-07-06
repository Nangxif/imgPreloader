# imgPreloader

插件的具体使用方法请访问：

https://github.com/Nangxif/imgPreloader/tree/master/build

## 图片数组文件生成工具createImage的使用方法：

1.进入createImage安装依赖

```javascript
npm i
```

2.配置config.js配置文件

参数解析

| 参数     | 含义                                     | 默认值               | 备注                                                         |
| -------- | ---------------------------------------- | -------------------- | ------------------------------------------------------------ |
| filename | 生成的文件名称                           | imglist.js           | 需要带上文件后缀.js                                          |
| entry    | 图片存放的文件夹相对该配置文件地址       | ../src/assets/images |                                                              |
| output   | 输出的文件存放的文件夹相对该配置文件地址 | ../src/config/       |                                                              |
| judge    | 判断条件                                 | undefined            | judge是一个对象，该对象的键是文件夹的名称，值是是否加载该文件夹的判断条件，值如果是字符串的话，则一定是判断条件，如果是对象的话，则该对象有两个已被认知的键，一个是fileJudge（判断条件），一个是exclude（如果exclude为数组，则为去除加载的文件夹地址数组，若为字符串self，则表示改文件夹全部剔除） |

judge举例

```javascript
judge: {
  wechat: `/MicroMessenger/i.test(navigator.userAgent)`,
  browser: {
      fileJudge: `/browser/i.test(navigator.userAgent)`,
      exclude: ['../example/assets/images/browser/i']
    },
  none: {
    exclude: 'self'
  }
}
```

3.在根目录的package.json下配置script命令

```
"image": "node ./createImage/index.js"
```

