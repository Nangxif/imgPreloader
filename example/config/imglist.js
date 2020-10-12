let preLoadImg = [];
preLoadImg.push(require('../assets/images/logo12.png'));
///browser文件夹
if (/browser/i.test(navigator.userAgent)) {
  preLoadImg.push(
    require('../assets/images/browser/logo5.png'),
    require('../assets/images/browser/logo6.png')
  );
  //browser/i文件夹
  preLoadImg.push(
    require('../assets/images/browser/i/logo.png'),
    require('../assets/images/browser/i/logo1.png'),
    require('../assets/images/browser/i/logo2.png'),
    require('../assets/images/browser/i/logo3.png'),
    require('../assets/images/browser/i/logo4.png')
  );
}
///wechat文件夹
if (/MicroMessenger/i.test(navigator.userAgent)) {
  preLoadImg.push(
    require('../assets/images/wechat/logo10.png'),
    require('../assets/images/wechat/logo11.png'),
    require('../assets/images/wechat/logo7.png'),
    require('../assets/images/wechat/logo8.png'),
    require('../assets/images/wechat/logo9.png')
  );
}
export default preLoadImg;
