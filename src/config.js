const baseApi = 'http://confession.jinfeibiao.com'

const confessionApi = baseApi + '/confession'

const api = {
  dev: {
    dataUrl: confessionApi,
    baseUrl: baseApi
  }
}

const shareInfo = {
  homepage: {
    title: '今年的情人节，我想对你说',
    desc: '爱很简单，所有海枯石烂不过是一句话'
  },
  gameDoing: {
    title: '你收到一封告白',
    desc: '不负时光不负卿'
  },
  gameDesired: {
    title: '喂，能不能喜欢我一下',
    desc: '骚动不安的灵魂让我们早相逢'
  },
  result: {
    title: '‘链’爱发声，因你永恒',
    desc: '愿爱被温柔以待'
  }
}

module.exports = {
  api,
  shareInfo
}
