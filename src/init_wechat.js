// 初始化微信sdk，前提是当前环境已经引入sdk

function initWeChat (wxConfigs, shareConfigs, shareLink, sharePage) {
  wx.config({
    debug: false,
    appId: '',
    timestamp: parseInt(wxConfigs.timestamp),
    nonceStr: wxConfigs.nonceStr,
    signature: wxConfigs.signature,
    jsApiList: [
      'onMenuShareTimeline',
      'onMenuShareAppMessage',
      'onMenuShareQQ',
      'onMenuShareQZone'
    ]
  })

  wx.error(function (res) {
    console.log('wx.error: ' + res.errMsg)
    let u = navigator.userAgent
    let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
    if (res.errMsg.indexOf('config:ok') === -1 && !isAndroid && (sharePage === 'gameView' || sharePage === 'result' || sharePage === 'gameReply')) {
      console.log('force refresh[onErr]: ' + shareLink)
      window.location.href = shareLink
    } else {
      console.log('signature success.')
    }
  })

  window.isWxReady = false

  wx.ready(function () {
    window.isWxReady = true

    if (sharePage === 'Home') {
      let music = document.querySelector('#music')
      music.play()
    }

    wx.onMenuShareTimeline({
      title: shareConfigs.title,
      link: shareLink,
      imgUrl: 'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg',
      success: function () {
        localStorage.removeItem('isShare')
        if (shareLink.indexOf('gameView') !== -1) {
          window.location.href = shareLink
        }
      },
      complete: function () {
        localStorage.removeItem('isShare')
        console.log('share complete.')
      }
    })
    wx.onMenuShareAppMessage({
      title: shareConfigs.title,
      desc: shareConfigs.desc,
      link: shareLink,
      imgUrl: 'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg',
      success: function () {
        localStorage.removeItem('isShare')
        if (shareLink.indexOf('gameView') !== -1) {
          window.location.href = shareLink
        }
      },
      complete: function () {
        localStorage.removeItem('isShare')
        console.log('share complete.')
      }
    })
    wx.onMenuShareQQ({
      title: shareConfigs.title,
      desc: shareConfigs.desc,
      link: shareLink,
      imgUrl: 'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg',
      success: function () {
        localStorage.removeItem('isShare')
        if (shareLink.indexOf('gameView') !== -1) {
          window.location.href = shareLink
        }
      },
      complete: function () {
        localStorage.removeItem('isShare')
        console.log('share complete.')
      }
    })
    wx.onMenuShareQZone({
      title: shareConfigs.title,
      desc: shareConfigs.desc,
      link: shareLink,
      imgUrl: 'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg',
      success: function () {
        localStorage.removeItem('isShare')
        if (shareLink.indexOf('gameView') !== -1) {
          window.location.href = shareLink
        }
      },
      complete: function () {
        localStorage.removeItem('isShare')
        console.log('share complete.')
      }
    })
  })
}

export const init = function (wxConfigs, shareConfigs, link, page) {
  if (wxConfigs && shareConfigs && link && page) {
    initWeChat(wxConfigs, shareConfigs, link, page)
    console.log('initWeChat with: ' + JSON.stringify(wxConfigs) + ', ' + JSON.stringify(shareConfigs) + ', ' + link + ', ' + page)
  } else {
    // todo 处理参数不足的情况(刷新？)
    console.log('initWeChat[Error]: ' + JSON.stringify(wxConfigs) + ', ' + JSON.stringify(shareConfigs) + ', ' + link + ', ' + page)
  }
}
