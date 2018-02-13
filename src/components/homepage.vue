<template>
  <div class="root-view">
    <a class="music-warp" @click="playing = !playing" :class="playing ? 'go' : ''">
      <audio id="music" loop="loop" autoplay="autoplay">
        <source src="/static/bgm.mp3" type="audio/mpeg">
      </audio>
    </a>
    <div class="main" v-show="!showTips">
      <div class="welcome" v-if="picIndex < 4" :style="{height:fr_height+'px'}" @click="quickSwitch">
        <img v-for="(pic, index) in picsArr" :key="index" v-show="picIndex <= index" class="welcome-pics"
           :style="{zIndex: 100-index}" :class="picIndex == index ? 'pic-anima' : ''" :src="pic">
      </div>
      <div class="intro-content" v-else>
        <article class="tips">
          <em>2.14在路上</em><br />
                              记录你的<i><a @click="showTips = true">"链"爱</a><span @click="showTips = true"></span></i>
          <br />
                              爱就大声说出来<br />
                              我们帮你链上告白！
        </article>
        <div class="option-btns">
          <img class="option-btn" src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/05_02.png" @click="changePage('Doing')">
          <img class="option-btn" src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/05_03.png" @click="changePage('Desired')">
        </div>
      </div>
      <article class="footer" :class="{ iphoneX: isIphoneX }">由深圳金汇财富金融服务有限公司提供技术支持</article>
    </div>
    <span class="close" v-show="showTips" @click="showTips = false"></span>
    <div class="content" v-show="showTips">
      <article class="statement">
                        链爱，即使用区块链技术分布式存储你的告白，不可篡改。只要世上还有互联网，你的山盟海誓就会一直篆刻在链条上，天长地久。<br />
                        请把你的告白或呼唤发送给心中的“Ta”，又或者分享到朋友圈，也许会有意想不到的收获哦~<br />
        <br />
        <div class="stateword">
                        注：<br />
        <span>·</span>本活动仅为娱乐，隐私数据不会被外泄或用于任何商业用途。<br />
        <span>·</span>活动最终解释权归深圳金汇财富金融服务有限公司所有。<br />
        </div>
      </article>
    </div>
  </div>
</template>
<style scoped>
.music-warp {
  position: absolute;
  right: .4rem;
  top: .4rem;
  width: .6rem;
  height: .6rem;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/music.png");
  background-size: 100%;
  z-index: 300;
}
.go {
  animation: goCircle 3.5s linear 0s infinite forwards;
}
@keyframes goCircle {
  0% {
    transform: rotateZ(0);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
.main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.content {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/05_01.jpg") center;
  background-size: cover;
}
.content:before {
  content: '';
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .4);
}
.close {
  position: absolute;
  right: .4rem;
  top: 1.2rem;
  width: .6rem;
  height: .6rem;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/close.png") no-repeat;
  background-size: 100%;
  z-index: 200;
}
.statement {
  position: absolute;
  top: 50%;
  left: 0;
  width: 70%;
  margin: -55% 0 0 15%;
  text-align: justify;
  font-size: .44rem;
  line-height: .8rem;
  color: #fff;
  font-family: Hiragino Sans GB,Helvetica,Arial,STHeiti,WenQuanYi Micro Hei,sans-serif;
}
.stateword {
  font-size: .35rem;
  line-height: .66rem;
}
.stateword span {
  position: relative;
  top: .1rem;
  font-size: .6rem;
}
.welcome {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
  top: 0;
  left: 0;
}
.welcome-pics {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  margin: 0;
  pading: 0;
  object-fit: cover;
}
.pic-anima {
  animation: 3s vanish linear forwards;
}
@keyframes vanish {
  0% {
    -webkit-filter: opacity(100%);
    filter: opacity(100%);
  }
  80% {
    -webkit-filter: opacity(100%);
    filter: opacity(100%);
  }
  100% {
    -webkit-filter: opacity(0);
    filter: opacity(0);
  }
}
.intro-content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/05_01.jpg") center;
  background-size: cover;
}
.option-btns {
  position: absolute;
  bottom: 15%;
  width: 100%;
}
.option-btn {
  width: 3.56rem;
  height: 1.16rem;
  margin: 0 .5rem;
}
.tips {
  position: absolute;
  top: 50%;
  left: 0;
  width: 70%;
  margin: -48% 0 0 15%;
  text-align: left;
  font-size: .6rem;
  line-height: 1.6rem;
  color: #fff;
  font-family: 'HappyZcool102d4e3e721bd07';
}
.tips em {
  display: inline-block;
  position: relative;
  left: -.46rem;
  width: 4.94rem;
  height: 1.01rem;
  line-height: 1.3rem;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/05_05.png");
  background-size: cover;
  font-style: normal;
  font-size: .8rem;
  text-align: center;
}
.tips i {
  font-style: normal;
  font-size: 1rem;
  position: relative;
  text-shadow: .05rem .05rem .08rem rgb(225, 100, 107);
}
.tips span {
  position: absolute;
  top: -.6rem;
  right: -1rem;
  width: 1rem;
  height: 1rem;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/tips.png") no-repeat;
  background-size: 100%;
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
</style>
<script>
import {api, shareInfo} from './../config'
import {init} from './../init_wechat'
export default{
  data () {
    return {
      fr_height: 0,
      picIndex: 0,
      isIphoneX: false, // 判断设备是否是iphoneX
      picsArr: [
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/pic1.jpg',
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/pic2.jpg',
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/pic3.jpg',
        'http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/pic4.jpg'
      ],
      switchPic: null, // 切换动画的计时
      showTips: false, // 是否展示提示申明
      playing: true // 音乐是否在播放
    }
  },
  mounted () {
    let _self = this
    _self.fr_height = document.getElementsByClassName('root-view')[0].offsetHeight
    _self.animation(_self.picIndex)
    _self.isIphoneX = _self.testIphoneX()
    _self.getWeChatConfig()
  },
  watch: {
    'playing' (val) {
      let music = document.querySelector('#music')
      if (val) {
        music.play()
      } else {
        music.pause()
      }
    }
  },
  methods: {
    testIphoneX () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getWeChatConfig () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/signature'
      let link = 'http://confession.jinfeibiao.com/'
      let page = 'Home'
      let params = {
        url: link
      }
      _self.$http.post(sendUrl, params).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          init(resData.signatureVo, shareInfo.homepage, link, page)
          console.log('init WeChat...')
        } else {
          console.log('res from getWeChatConfig: ' + JSON.stringify(res))
        }
      }).catch((error) => {
        console.log('err from getWeChatConfig: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    changePage (type) {
      let _self = this
      _self.$router.push('/confess/' + type)
    },
    quickSwitch () {
      let _self = this
      clearInterval(_self.switchPic)
      _self.picIndex++
      _self.animation(_self.picIndex)
    },
    animation (picIndex) {
      let _self = this
      if (picIndex < 4) {
        _self.switchPic = setInterval(() => {
          _self.picIndex++
          if (_self.picIndex >= 4) {
            clearInterval(_self.switchPic)
          }
        }, 3500)
      }
    }
  }
}
</script>
