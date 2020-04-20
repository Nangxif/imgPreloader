let imgsList = [];
if (/browser/i.test(navigator.userAgent)) {
  //../example/assets/images/browser
  imgsList.push(
    require('../assets/images/browser/logo5.png'),
    require('../assets/images/browser/logo6.png')
  );
}
//公共图片
imgsList.push(require('../assets/images/logo12.png'));
if (/MicroMessenger/i.test(navigator.userAgent)) {
  //../example/assets/images/wechat
  imgsList.push(
    require('../assets/images/wechat/logo10.png'),
    require('../assets/images/wechat/logo11.png'),
    require('../assets/images/wechat/logo7.png'),
    require('../assets/images/wechat/logo8.png'),
    require('../assets/images/wechat/logo9.png')
  );
}
export default imgsList;
