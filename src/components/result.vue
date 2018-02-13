<template>
  <div class="root-view">
    <!--喜欢的结果-->
    <div v-show="replyType === 'Like' || replyType === 'Pending'" class="page-content like">
      <div class="like-bg">
        <article class="name-left player-name" v-text="userName"></article>
        <aside class="img-warp img-left">
          <img :src="fileBaseUrl + userImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <article class="name-right player-name" v-text="replierName"></article>
        <aside class="img-warp img-right">
          <img :src="fileBaseUrl + replierImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <div class="like-user-info">
          <article>{{ letterDetail }}</article>
          <div>-- {{ userName }}</div>
        </div>
        <div class="like-replier-info" v-show="replyContent">
          <article>{{ replyContent }}</article>
          <div>-- {{ replierName }}</div>
        </div>
      </div>
    </div>
    <!--回复人‘你猜’的结果-->
    <div v-show="replyType === 'Unknown' && !isConfessor" class="page-content replier-unknown">
      <div class="replier-unknown-bg">
        <article class="replier-unknown-repliername player-name" v-text="replierName" v-show="!replyContent"></article>
        <aside class="replier-unknown-replierimg img-warp">
          <img :src="fileBaseUrl + replierImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <aside class="replier-unknown-userimg img-warp">
          <img :src="fileBaseUrl + userImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <div class="guess-user-words" v-show="replyContent">
          <article>{{ replyContent }}</article>
          <div>-- {{ replierName }}</div>
        </div>
        <div class="unknown-user-info">
          <article>{{ letterDetail }}</article>
          <div>-- {{ userName }}</div>
        </div>
      </div>
    </div>
    <!--发起人‘你猜’的结果-->
    <div v-show="replyType === 'Unknown' && isConfessor" class="page-content user-unknown">
      <div class="user-unknown-bg">
        <aside class="user-unknown-userimg img-warp">
          <img :src="fileBaseUrl + userImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <article class="user-unknown-repliername player-name" v-text="replierName"></article>
        <aside class="user-unknown-replierimg img-warp">
          <img :src="fileBaseUrl + replierImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <div class="guess-replier-words">
          {{ replyContent }}
        </div>
        <div class="unknown-user-letter">
          <article>{{ letterDetail }}</article>
          <div>-- {{ userName }}</div>
        </div>
      </div>
    </div>
    <!--回复人‘不喜欢’的结果-->
    <div v-show="replyType === 'Dislike' && !isConfessor" class="page-content replier-dislike">
      <div class="replier-dislike-bg">
      	<article class="replier-dislike-username player-name" v-text="userName"></article>
        <aside class="replier-dislike-userimg img-warp">
          <img :src="fileBaseUrl + userImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <aside class="replier-dislike-replierimg img-warp">
          <img :src="fileBaseUrl + replierImg" onerror="this.src='http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/share.jpg'" />
        </aside>
        <div class="reply-detail" v-show="replyContent">
          {{ replyContent }}
          <div>-- {{ replierName }}</div>
        </div>
        <div class="dislike-user-info">
          <article>{{ letterDetail }}</article>
        </div>
      </div>
    </div>
    <!--发起人‘不喜欢’的结果-->
    <div v-show="replyType === 'Dislike' && isConfessor" class="page-content user-dislike">
      <div class="dislike-words" v-show="replyContent">
        {{ replyContent }}
        <div>-- {{ replierName }}</div>
      </div>
      <div class="dislike-user-letter">
        <article>{{ letterDetail }}</article>
        <div>-- {{ userName }}</div>
      </div>
    </div>
    <div class="code" :class="{ iphoneX: isIphoneX }">
      <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/code.png"/>
    </div>
    <article class="footer" :class="{ iphoneX: isIphoneX }">由深圳金汇财富金融服务有限公司提供技术支持</article>
    <router-link tag="div" class="to-play" to='/' :class="{ iphoneX: isIphoneX }">
      <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/08_06.png"/>
    </router-link>
  </div>
</template>
<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  background-position: center;
  background-size: cover;
  position: relative;
}
.like {
  background-image: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/09_01.jpg');
}
.user-unknown {
  background-image: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_6_01.jpg');
}
.replier-unknown {
  background-image: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_4_01.jpg');
}
.replier-dislike {
  background-image: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_5_01.jpg');
}
.user-dislike {
  background-image: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_7_01.jpg');
}
.like-bg {
  position: absolute;
	left: 50%;
	top: 50%;
  width: 10.8rem;
  height: 10.13rem;
  margin: -7.7rem 0 0 -5.4rem;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/09_02.png');
  background-size: 100%;
}
.replier-unknown-bg {
	position: absolute;
	left: 50%;
	top: 50%;
  width: 9.97rem;
  height: 14.78rem;
  margin: -9rem 0 0 -4.99rem;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_4_02.png');
  background-size: 100%;
}
.replier-unknown-userimg {
  margin: 1.21rem 0 0 -3.04rem;
}
.replier-unknown-replierimg {
  margin: -6.35rem 0 0 -.13rem;
}
.user-unknown-bg {
  position: absolute;
	left: 50%;
	top: 50%;
  width: 8.73rem;
  height: 14.16rem;
  margin: -8.3rem 0 0 -4.37rem;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_6_02.png');
  background-size: 100%;
}
.user-unknown-userimg {
  margin: .32rem 0 0 -4.34rem;
}
.user-unknown-replierimg {
  margin: -4.48rem 0 0 -1.96rem;
}
.replier-dislike-bg {
	position: absolute;
	left: 50%;
	top: 50%;
  width: 10.12rem;
  height: 13.66rem;
  margin: -8.3rem 0 0 -5.06rem;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/10_5_02.png') no-repeat;
  background-size: 100%;
}
.replier-dislike-userimg {
  margin: -1.526rem 0 0 -3.603rem;
}
.replier-dislike-replierimg {
  margin: -2.8rem 0 0 1.04rem;
}
.img-warp {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  overflow: hidden;
}
.img-left {
  margin: -3.63rem 0 0 -3.88rem;
}
.img-right {
  margin: -3.63rem 0 0 1.152rem;
}
.player-name {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 4rem;
  height: .8rem;
  line-height: .8rem;
  color: #fff;
  font-size: .44rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.name-left {
  margin: -4.5rem 0 0 -4.38rem;
}
.name-right {
  margin: -4.5rem 0 0 .62rem;
}
.letter-detail {
  position: absolute;
  left: 15%;
  top: 50%;
  width: 70%;
  word-break: break-all;
  font-size: .44rem;
  line-height: 1rem;
  text-align: justify;
}
.user-right-name {
  text-align: right;
}
.replier-unknown-repliername {
  width: 4.2rem;
  margin: -3.6rem 0 0 -5rem;
  text-align: right;
}
.user-unknown-repliername {
  margin: -3rem 0 0 1.3rem;
  text-align: left;
}
.replier-dislike-username {
  margin: -2.3rem 0 0 -4rem;
}
.reply-detail {
  position: absolute;
  right: .4rem;
  bottom: -.2rem;
  width: 5rem;
  text-align: justify;
  color: #fff;
  font-size: .44rem;
}
.reply-detail div {
  text-align: right;
}
.dislike-words {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 5rem;
  margin: 4.3rem 0 0 -2.2rem;
  text-align: justify;
  color: #fff;
  font-size: .44rem;
}
.dislike-words div {
  text-align: right;
}
.like-user-info {
  position: absolute;
  top: 70%;
  left: 50%;
  width: 7rem;
  margin-left: -3.5rem;
  font-size: .44rem;
  text-align: justify;
}
.like-user-info article {
	float: left;
  width: 100%;
}
.like-user-info div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.like-replier-info {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 7rem;
  margin-left: -3.5rem;
  font-size: .44rem;
  text-align: justify;
  color: #fff;
}
.like-replier-info article {
	float: left;
  width: 100%;
}
.like-replier-info div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.guess-user-words {
  position: absolute;
  top: 50%;
  left: 14%;
  width: 7rem;
  margin-top: -1.5rem;
  font-size: .44rem;
  text-align: justify;
}
.guess-user-words article {
	float: left;
  width: 100%;
}
.guess-user-words div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.unknown-user-info {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5rem;
  margin: 4.4rem 0 0 -.3rem;
  font-size: .44rem;
  text-align: justify;
  color: #fff;
}
.unknown-user-info article {
	float: left;
  width: 100%;
}
.unknown-user-info div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.unknown-user-letter {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5rem;
  margin: 1.5rem 0 0 -.6rem;
  font-size: .44rem;
  text-align: justify;
  color: #fff;
}
.unknown-user-letter article {
	float: left;
  width: 100%;
}
.unknown-user-letter div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.dislike-user-info {
  position: absolute;
  top: 19.5%;
  left: 4%;
  width: 7rem;
  font-size: .44rem;
  text-align: justify;
  color: #fff;
}
.dislike-user-info article {
	float: left;
  width: 100%;
}
.dislike-user-letter {
  position: absolute;
  bottom: 50%;
  left: 50%;
  width: 5rem;
  margin: 0 0 3rem -2.2rem;
  font-size: .44rem;
  text-align: justify;
  color: #fff;
}
.dislike-user-letter article {
	float: left;
  width: 100%;
}
.dislike-user-letter div {
	width: 5rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  text-align: right;
  float: right;
  clear: both;
}
.guess-replier-words {
  position: absolute;
  top: 1rem;
  left: 2.5rem;
  width: 5rem;
  font-size: .44rem;
  color: #fff;
  text-align: justify;
}


.code {
  position: absolute;
  left: .4rem;
  bottom: .6rem;
  width: 2.5rem;
  height: 3.25rem;
}
.code.iphoneX {
  bottom: .9rem;
}
.to-play {
  position: absolute;
  right: .4rem;
  bottom: .6rem;
  width: 2.45rem;
  height: 2.42rem;
}
.to-play.iphoneX {
  bottom: .9rem;
}
.footer {
  position: absolute;
  bottom: .1rem;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  font-size: .3rem;
  color: #fff;
}
.footer.iphoneX {
  bottom: .4rem;
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
      confessionId: null,
      isIphoneX: false, // 判断设备是否是iphoneX
      isConfessor: false, // 是否是发起人
      replyId: null, // 回复id
      userImg: '', // 发起人微信imgurl
      userName: '', // 发起人微信昵称
      letterDetail: '', // 告白内容
      replierImg: '', // 回复人微信imgurl
      replierName: '', // 回复人微信昵称
      replyType: '', // 回应类型
      replyContent: '' // 回复内容
    }
  },
  mounted () {
    let _self = this
    _self.confessionId = _self.$route.params.confessionId
    _self.replyId = _self.$route.params.replyId ? _self.$route.params.replyId : null
    _self.getWeChatConfig()
    _self.isIphoneX = _self.testIphoneX()
    _self.getConfession()
  },
  methods: {
    testIphoneX () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getWeChatConfig () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/signature'
      let link = 'http://confession.jinfeibiao.com/result/' + _self.confessionId + '/' + _self.replyId
      let page = 'result'
      let params = {
        url: link
      }
      _self.$http.post(sendUrl, params).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          init(resData.signatureVo, shareInfo.result, link, page)
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
      let sendUrl = api.dev.dataUrl + '/confession/findConfessionResult?confessionId=' + _self.confessionId
      _self.$http.get(sendUrl).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          _self.isConfessor = resData.isConfessor
          _self.userImg = resData.confessionVo.user.imageUrl
          _self.userName = resData.confessionVo.user.nickname
          _self.letterDetail = resData.confessionVo.content
          for (let i = 0; i < resData.confessionVo.replies.length; i++) {
            if (parseInt(_self.replyId) === resData.confessionVo.replies[i].replyId) {
              _self.replyType = resData.confessionVo.replies[i].replyType
              _self.replyContent = resData.confessionVo.replies[i].replyContent
              _self.replierImg = resData.confessionVo.replies[i].replyUser.imageUrl
              _self.replierName = resData.confessionVo.replies[i].replyUser.nickname
            }
          }
        }
      }).catch((error) => {
        console.log('err from getWeChatConfig: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    }
  }
}
</script>
