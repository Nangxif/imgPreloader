let imgsList = [];
//公共图片
imgsList.push(require('../assets/images/logo12.png'));
if (/PARS/i.test(navigator.userAgent)) {
  //../example/assets/images/pars/i
  imgsList.push(
    require('../assets/images/pars/i/logo.png'),
    require('../assets/images/pars/i/logo1.png'),
    require('../assets/images/pars/i/logo2.png'),
    require('../assets/images/pars/i/logo3.png'),
    require('../assets/images/pars/i/logo4.png')
  );
  //../example/assets/images/pars
  imgsList.push(
    require('../assets/images/pars/logo5.png'),
    require('../assets/images/pars/logo6.png')
  );
}
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
