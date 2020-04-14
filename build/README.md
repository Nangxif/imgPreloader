# ImgPreload

一个图片预加载组件

## 一、用法

```javascript
import ImgPreload from 'ImgPreloader';

components: {
	ImgPreloader
}

<ImgPreloader
  :imgs="imgsList"
  :preset="preset"
  @finish="finish"
  @error="error"
>
  <template v-slot="{ loaded, total }">
      <!--自定义加载样式，在这里可以写自己的进度条等等，loaded为已加载，total为总的加载数-->
  </template>
</ImgPreloader>
```

## 二、参数的含义

| 参数    | 传入的值                       | 备注                                                         |
| ------- | ------------------------------ | ------------------------------------------------------------ |
| imgs    | 图片数组                       | 例：<br />[<br />'http://www.xxx.com/1.jpg',<br />'http://www.xxx.com/2.jpg'<br />]<br />或者<br />[<br />require('./images/logo.png'),<br />require('./images/logo.png')<br />]<br />因为预加载的图片可能会很多，所以可以单独把这个数组放在一个文件里面，在文件里面甚至还可以自定义在不同的端机，预加载相应的图片集 |
| preset  | 一个对象                       | 该对象只有atLeastTime一个键，默认值为0，表示加载进度条到百分之百所需消耗的时间至少为atLeastTime，当atLeastTime为0的时候，表示进度条的进度根据实际加载图片的进度来显示，单位为s |
| @finish | 一个接收图片加载完成信息的函数 | 该事件在图片全部加载完成的时候会触发，在接收的函数中可以定义图片加载完成后的相关工作，比如图片加载完，再跳转其他页面，或者显示其他东西 |

## 三、demo

https://nangxif.github.io/imgPreloader/dist/index.html