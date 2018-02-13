<template>
  <div class="root-view">
    <div class="root-view" v-show="isShow">
      <div class="page-content">
        <article class="confess-title" v-if="type === 'Doing'">你收到一封告白</article>
        <article class="confess-title" v-else>喂 能不能喜欢我一下</article>
        <div class="letter-bg" :class="{ iphoneX: isIphoneX }">
          <article class="letter-detail">
            {{ content }}
            <span class="nick-name">——{{ nickname }}</span>
          </article>
          <div class="img-warp">
            <img :src="fileBaseUrl + imageUrl" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'"/>
          </div>
        </div>
        <div v-if="!isReplied">
          <div class="response">
            <section class="res-bg">
              <textarea placeholder="写下你想对TA说的话..." v-model="resLetter" @input="testLength" :maxlength="maxLength"></textarea>
              <span>{{ letterLength }}/{{ maxLength }}</span>
            </section>
          </div>
          <div class="button-warp" :class="{ iphoneX: isIphoneX }" v-if="type === 'Doing'">
            <a v-for="(button,index) in buttonList" :key="index" @click="validate(index)">
              <img :src="button"/>
            </a>
          </div>
          <div class="button-desire" :class="{ iphoneX: isIphoneX }" v-else>
            <a @click="validate(3)">
              <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_09.png"/>
            </a>
          </div>
        </div>
        <div class="reply-content" v-else>
          <div v-for="(item, index) in allReplies" :key="index" class="reply-item">
            <img :src="fileBaseUrl + item.replyUser.imageUrl" class="reply-avatar" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'">
            <span class="reply-words">{{ item.replyContent }}</span>
            <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/07_05.png" class="together">
          </div>
        </div>
        <router-link tag="div" class="to-play" to='/'>
          <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_06.png"/>
        </router-link>
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_07.jpg') center;
  background-size: cover;
  overflow-x: hidden;
  overflow-y: scroll;
}
.confess-title {
  width: 80%;
  line-height: 1rem;
  margin: .8rem auto 0 auto;
  font-size: .7rem;
  text-align: left;
  color: #fff;
  font-family: 'HappyZcool102d4e3e721bd07';
}
.letter-bg {
  width: 9.42rem;
  height: 8.09rem;
  margin: 0 auto;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_02.png");
  background-size: cover;
  position: relative;
}
.letter-bg.iphoneX {
  margin: 1rem auto;
}
.letter-detail {
  position: absolute;
  top: 1.22rem;
  left: 1.6rem;
  width: 6rem;
  height: 3.4rem;
  font-size: .5rem;
  line-height: .88rem;
  text-align: left;
  word-wrap: break-word;
}
.nick-name {
  position: absolute;
  bottom: 0;
  right: 0;
}
.img-warp {
  position: absolute;
  bottom: 0.16rem;
  left: 50%;
  width: 3.04rem;
  height: 3.04rem;
  margin-left: -1.46rem;
  border-radius: 50%;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
}
.response {
  width: 80%;
  margin: 0 auto;
  color: #fff;
}
.response .res-tips {
  display: block;
  line-height: 1.4rem;
  text-align: left;
  font-size: .6rem;
}
.response .res-bg {
  width: 100%;
  height: 2.6rem;
  background: rgba(0, 0, 0, .4);
  border-radius: .2rem;
  position: relative;
}
.response .res-bg textarea {
  width: 100%;
  height: 100%;
  background: none;
  border: hidden;
  outline: none;
  font-size: .5rem;
  line-height: .86rem;
  color: #fff;
}
.response .res-bg span {
  position: absolute;
  right: 0;
  bottom: 0;
  font-size: .5rem;
}
.response .res-bg textarea::-webkit-input-placeholder {
  color:#fff;
}
.button-warp {
  display: flex;
  width: 88%;
  height: 1.1rem;
  margin: .8rem auto .4rem auto;
}
.button-warp.iphoneX {
  margin: 1.5rem auto 1rem auto;
}
.button-warp a {
  flex: 1;
  margin: 0 .3rem;
}
.button-desire {
  width: 30%;
  height: 1.1rem;
  margin: .8rem auto .4rem auto;
}
.button-desire.iphoneX {
  margin: 1.5rem auto 1rem auto;
}
.button-desire a {
  display: block;
  margin: 0 .3rem;
}
.reply-content {
  width: 10rem;
  height: auto;
  position: absolute;
  top: 9rem;
  left: 50%;
  margin-left: -5rem;
  padding-bottom: .3rem;
  text-align: left;
  font-size: .4rem;
}
.reply-item {
  width: 100%;
  height: auto;
  font-size: 0;
  padding: .3rem .2rem;
  background-color: rgba(0,0,0,0.4);
  border-radius: .2rem;
  margin-bottom: .3rem;
  box-sizing: border-box;
  position: relative;
}
.reply-avatar {
  width: 1.6rem;
  height: auto;
  border: solid 0.03rem #ee8f94;
  border-radius: 0.8rem;
}
.reply-words {
  width: 5rem;
  font-size: .5rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  transform: translate(0.2rem, -50%);
}
.together {
  position: absolute;
  width: 1.2rem;
  height: 1.2rem;
  top: .58rem;
  right: .3rem;
}
.to-play {
  float: right;
  width: 2.45rem;
  height: 2.42rem;
  margin-right: .4rem;
}
</style>
<script>
import {api, shareInfo} from './../config'
import {init} from './../init_wechat.js'
export default{
  data () {
    return {
      fileBaseUrl: api.dev.dataUrl,
      isIphoneX: false, // 判断设备是否是iphoneX
      resLetter: '', // 回复内容
      letterLength: 0, // 回复信息长度
      maxLength: 20, // 回复信息最大长度
      buttonList: [
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_03.png',
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_04.png',
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_05.png'
      ],
      confessionId: '', // 告白id
      confessionUid: '', // 发起者id
      content: '', // 告白内容
      nickname: '', // 发起者昵称
      imageUrl: '', // 发起者头像url
      type: '', // 发起告白还是想被告白
      isReplied: false, // 是否已经回复过了
      allReplies: [], // 所有回复信息
      commitBtnCrl: true,
      isShow: false
    }
  },
  mounted () {
    let _self = this
    _self.isIphoneX = _self.testIphoneX()
    _self.confessionId = _self.$route.params.confessionId
    _self.getConfession()
  },
  methods: {
    getWeChatConfig (info) {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/signature'
      let link = 'http://confession.jinfeibiao.com/gameReply/' + _self.confessionId
      let page = 'gameReply'
      let params = {
        url: link
      }
      _self.$http.post(sendUrl, params).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          init(resData.signatureVo, info, link, page)
        } else {
          console.log('res from getWeChatConfig: ' + JSON.stringify(res))
        }
      }).catch((error) => {
        console.log('err from getWeChatConfig: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    testIphoneX () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getConfession () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/findConfession?confessionId=' + _self.confessionId
      _self.$http.get(sendUrl).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          if (resData.isConfessor) {
            _self.$router.push('/gameView/' + _self.confessionId)
          } else {
            _self.allReplies = resData.confessionVo.replies
            if (!_self.allReplies || _self.allReplies.length === 0) {
              _self.isShow = true
              _self.type = resData.confessionVo.type
              _self.confessionUid = resData.confessionVo.user.uid
              _self.nickname = resData.confessionVo.user.nickname
              _self.imageUrl = resData.confessionVo.user.imageUrl
              _self.content = resData.confessionVo.content
              if (resData.confessionVo.type === 'Doing') {
                console.log('init confession.')
                _self.getWeChatConfig(shareInfo.gameDoing)
              } else {
                console.log('init being confess.')
                _self.getWeChatConfig(shareInfo.gameDesired)
              }
            } else {
              _self.$router.push('/result/' + _self.confessionId + '/' + resData.confessionVo.replies[0].replyId)
            }
          }
        } else {
          _self.isShow = true
          console.log('err from getConfession: ' + JSON.stringify(resData))
        }
      }).catch((error) => {
        console.log('err from getConfession: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    testLength () {
      let _self = this
      _self.letterLength = _self.resLetter.length
      if (_self.letterLength > _self.maxLength) {
        alert('您输入的文字过长！')
      }
    },
    commit (type) {
      let _self = this
      _self.commitBtnCrl = false
      let typeArr = ['Like', 'Unknown', 'Dislike', 'Pending']
      let sendUrl = api.dev.dataUrl + '/confession/reply'
      let params = {
        confessionId: _self.confessionId,
        confessionUid: _self.confessionUid,
        replyContent: _self.resLetter,
        replyType: typeArr[type]
      }
      _self.$http.post(sendUrl, params).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          _self.$router.push('/result/' + _self.confessionId + '/' + resData.replyId)
        } else {
          _self.commitBtnCrl = true
          console.log('err from commitReply: ' + JSON.stringify(res))
        }
      }).catch((error) => {
        console.log('err from commitReply: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    validate (type) {
      let _self = this
      if (_self.letterLength > _self.maxLength) {
        alert('你想对TA说的话太多了')
        return false
      } else {
        if (_self.commitBtnCrl) {
          _self.commit(type)
        } else {
          console.log('forbid click duplicate.')
        }
      }
    }
  }
}
</script>
