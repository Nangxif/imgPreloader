module.exports = {
  filename: 'imglist.js',
  entry: '../example/assets',
  output: '../example/config/',
  judge: {
    '/images/wechat': `/MicroMessenger/i.test(navigator.userAgent)`,
    '/images/browser': {
      fileJudge: `/browser/i.test(navigator.userAgent)`,
      exclude: ['/images/browser/i']
    },
    '/images/none': {
      exclude: 'self'
    }
  }
};
