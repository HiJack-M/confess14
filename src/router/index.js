import Vue from 'vue'
import Router from 'vue-router'
import {api} from './../config'
import Home from '@/components/homepage'
import Confess from '@/components/confess'
import GameView from '@/components/gameView'
import GameReply from '@/components/gameReply'
import Result from '@/components/result'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }, {
      path: '/confess/:type',
      name: 'Confess',
      component: Confess
    }, {
      path: '/gameView/:confessionId',
      name: 'gameView',
      component: GameView
    }, {
      path: '/gameReply/:confessionId',
      name: 'gameReply',
      component: GameReply
    }, {
      path: '/result/:confessionId/:replyId',
      name: 'Result',
      component: Result
    }
  ]
})
router.beforeEach((to, from, next) => {
  console.log('---to.path: ' + to.path)
  if (from.path.indexOf('/confess') > -1) {
    localStorage.setItem('isShare', true)
  }

  getOpenId(router.app, to.path)

  let temp = to.path.indexOf('/homepage')
  if (temp !== -1) {
    // 第一次进入，后台拿openid，在url后面追加了'/homepage'
    let go = to.path.substring(temp + 9)
    console.log('homepage...go: ' + go)
    if (go) {
      console.log('next: ' + go)
      next(go)
    } else {
      console.log('go is empty, go to homepage.')
      next('/')
    }
  } else {
    if (from.name !== 'Home' && to.path.indexOf('/confess') > -1) {
      next('/') // 如果不是从首页按流程进来的confess页面，就跳首页
    } else if ((from.name === 'gameReply' || from.name === 'Result') && to.name === 'Home') {
      console.log('to homepage.[router]')
      window.location.href = 'http://confession.jinfeibiao.com/'
      next(false)
    } else {
      console.log('to page natural.')
      next()
    }
  }
  console.log('browser.url[beforeEach]:' + window.location.href)
})

const getOpenId = (instance, url) => {
  console.log('enter func to check openId.')
  let sendUrl = api.dev.dataUrl + '/confession/openid'
  instance.$http.get(sendUrl).then(function (res) {
    let resData = res.data
    if (resData.code === 0) {
      console.log('[router]server got openId.')
    } else {
      console.log('[router]server did not get openId, reload.')
      let temp = url.indexOf('/homepage')
      if (temp !== -1) {
        let go = url.substring(temp + 9)
        window.location.href = 'http://confession.jinfeibiao.com' + go
      } else {
        window.location.href = 'http://confession.jinfeibiao.com' + url
      }
    }
  }).catch((err) => {
    console.log('err from getOpenId: ' + JSON.stringify(err))
  })
}

export default router
