module.exports = {
  filename: 'imglist.js',
  entry: '../example/assets/images',
  output: '../example/config/',
  judge: {
    '/wechat': `/MicroMessenger/i.test(navigator.userAgent)`,
    '/browser': {
      fileJudge: `/browser/i.test(navigator.userAgent)`,
      exclude: ['/browser/i']
    },
    '/none': {
      exclude: 'self'
    }
  }
};
