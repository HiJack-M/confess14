<template>
  <div class="root-view">
    <div class="root-view" v-show="isConfessor">
      <div class="share-bg" v-show="isShare">
        <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/07_03.png" class="send-to">
      </div>
      <div class="page-content">
        <div class="confess-title" v-if="confessionInfo.type === 'Doing'">
          <img :src="fileBaseUrl + confessor.imageUrl" class="confess-avatar" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'">
        </div>
        <div class="beconfessed-title" v-else>喂 能不能喜欢我一下</div>
        <div class="confess-content" v-if="confessionInfo">
          <div class="confess-words">{{ confessionInfo.content }}
            <p class="confess-author">——{{ confessor.nickname }}</p>
          </div>
        </div>
        <div class="reply-content" v-show="!isShare">
          <div v-for="(item, index) in confessionInfo.replies" :key="index" class="reply-item" v-if="confessionInfo.replies.length" @click="getResult(item.replyId)">
            <img :src="fileBaseUrl + item.replyUser.imageUrl" class="reply-avatar" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'">
            <span class="reply-words">{{ item.replyContent }}</span>
            <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/07_4_02.png" class="img-like" v-show="item.replyType === 'Like' || item.replyType === 'Pending'"/>
            <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/guess.png" class="img-unknown" v-show="item.replyType === 'Unknown'"/>
            <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/07_4_03.png" class="img-dislike" v-show="item.replyType === 'Dislike'"/>
          </div>
          <p class="no-reply" style="padding: 0.3rem;" v-show="!confessionInfo.replies.length">
            别着急，没消息就是最好的消息。稍后请刷新页面查看回复。
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.share-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  z-index: 99;
}
.page-content {
  width: 100%;
  height: 100%;
  position: relative;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_2_01.jpg') center;
  background-size: cover;
  color: #fff;
  overflow-y: scroll;
}
.send-to {
  width: 4.36rem;
  height: 2.71rem;
  object-fit: cover;
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
}
.confess-title {
  width: 7.29rem;
  height: 2.75rem;
  position: relative;
  top: 1rem;
  left: .8rem;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/07_02.png');
  background-size: cover;
}
.beconfessed-title {
  width: 7.29rem;
  position: relative;
  top: 2.5rem;
  left: 1.2rem;
  text-align: left;
  font-size: .7rem;
  color: #fff;
  font-family: 'HappyZcool102d4e3e721bd07';
}
.confess-avatar {
  width: 2.54rem;
  height: auto;
  position: absolute;
  left: 0.02rem;
  top: 0.03rem;
  border-radius: 1.5rem;
}
.confess-content {
  position: absolute;
  top: 4rem;
  left: 50%;
  width: 7.5rem;
  height: 4.5rem;
  margin-left: -3.75rem;
  text-align: justify;
  font-size: .53rem;
}
.confess-words {
  position: absolute;
  width: 100%;
  margin: 0;
  word-break: break-all;
  top: 48%;
  line-height: .8rem;
  transform: translate(0, -50%);
}
.confess-author {
  text-align: right;
}
.no-reply {
  margin: 0;
  word-break: break-all;
  background-color: rgba(0,0,0,0.4);
  border-radius: 0.2rem;
  font-family: 'HappyZcool102d4e3e721bd07';
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
  padding: .3rem;
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
  width: 6rem;
  font-size: .5rem;
  display: inline-block;
  position: absolute;
  top: 50%;
  text-align: justify;
  transform: translate(0.3rem, -50%);
}
.img-like {
  position: absolute;
  width: .78rem;
  height: .68rem;
  top: .86rem;
  right: .6rem;
}
.img-unknown {
  position: absolute;
  width: .9rem;
  height: .98rem;
  top: .66rem;
  right: .6rem;
}
.img-dislike {
  position: absolute;
  width: .94rem;
  height: .72rem;
  top: .86rem;
  right: .5rem;
}
img {
  width: 100%;
  height: 100%;
}
</style>
<script>
import {api, shareInfo} from './../config'
import {init} from './../init_wechat.js'
export default{
  data () {
    return {
      fileBaseUrl: api.dev.dataUrl,
      confessionInfo: {
        type: null,
        confessionId: null,
        content: null,
        replies: []
      },
      confessor: {
        uid: null,
        nickname: null,
        imageUrl: null
      },
      isShare: false,
      isConfessor: false
    }
  },
  mounted () {
    let _self = this
    _self.isShare = localStorage.getItem('isShare') ? localStorage.getItem('isShare') : false
    _self.confessionInfo.confessionId = _self.$route.params.confessionId
    _self.getConfession()
  },
  methods: {
    getWeChatConfig (info) {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/signature'
      let link = 'http://confession.jinfeibiao.com/gameView/' + _self.confessionInfo.confessionId
      let page = 'gameView'
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
    getConfession () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/findConfession?confessionId=' + _self.confessionInfo.confessionId
      _self.$http.get(sendUrl).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          if (resData.isConfessor) {
            _self.isConfessor = resData.isConfessor
            for (let item in _self.confessionInfo) {
              _self.confessionInfo[item] = resData.confessionVo[item]
            }
            if (_self.confessionInfo.replies.length > 0) {
              _self.isShare = false
            }
            for (let item in _self.confessor) {
              _self.confessor[item] = resData.confessionVo.user[item]
            }
            if (_self.confessionInfo.type === 'Doing') {
              _self.getWeChatConfig(shareInfo.gameDoing)
            } else {
              _self.getWeChatConfig(shareInfo.gameDesired)
            }
          } else {
            _self.$router.push('/gameReply/' + _self.confessionInfo.confessionId)
          }
        } else {
          _self.isConfessor = true
          console.log('err from getConfession: ' + JSON.stringify(res))
        }
      }).catch((error) => {
        console.log('err from getConfession: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    getResult (replyId) {
      let _self = this
      _self.$router.push('/result/' + _self.confessionInfo.confessionId + '/' + replyId)
    }
  }
}
</script>
