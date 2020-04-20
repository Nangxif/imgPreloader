module.exports = {
  filename: 'imglist.js',
  entry: '../example/assets/images',
  output: '../example/config/',
  judge: {
    wechat: `/MicroMessenger/i.test(navigator.userAgent)`,
    browser: [
      `/browser/i.test(navigator.userAgent)`,
      {
        exclude: ['../example/assets/images/browser/i']
      }
    ]
  }
};
