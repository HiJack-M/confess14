<template>
  <div class="root-view">
    <div class="page-content">
      <div class="desired-summary" :class="{ iphoneX: isIphoneX }">
        <article class="confess-bg" v-if="confessType === 'Doing'"></article>
        <article class="confessed-text" v-else>
                              缺爱者往往有两种心态，一种是疯狂的证明别人不爱你而陷入焦虑，另一种是接受了没有人会爱自己的想法而陷入抑郁。但世界没有那么糟，总会有人偷偷爱着你。<br /><br />
                              把你的心声写在下面，看看谁在爱着你。
        </article>
      </div>
      <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_04.png" class="loving-heart" :class="{ iphoneX: isIphoneX }">
      <div class="operate-card">
        <div class="operate-letter">
          <textarea class="letter-input" v-model="confessContent"
                    :placeholder="confessType === 'Doing' ? '韩梅梅：我有个恋爱要和你谈一谈' : '2018年2月14日我不是一个人...'"
                    @input="testLength" :maxlength="maxLength"></textarea>
          <span>{{ letterLength }}/{{ maxLength }}</span>
        </div>
        <img src="http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_03.png" class="operate-btn" :class="{ iphoneX: isIphoneX }" @click="validate">
      </div>
    </div>
  </div>
</template>
<style scoped>
.page-content {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_2_01.jpg') center;
  background-size: cover;
  overflow-y: scroll;
}
.desired-summary {
  z-index: 99;
  width: 8rem;
  height: 5rem;
  margin: 1.5rem auto 1rem auto;
  color: #fff;
  text-align: justify;
  font-size: .5rem;
  position: relative;
}
.desired-summary.iphoneX {
  margin: 2.5rem auto 1.5rem auto;
}
.desired-summary article {
  width: 100%;
  height: 100%;
  font-family: 'HappyZcool102d4e3e721bd07';
}
.confess-bg {
  width: 100%;
  height: 100%;
  background: url('http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_2_02.png') no-repeat;
  background-size: contain;
}
.loving-heart {
  width: 7.66rem;
  position: absolute;
  top: 1rem;
  left: 1.5rem;
  z-index: 9;
}
.loving-heart.iphoneX {
  top: 3.5rem;
}
.operate-card {
  width: 7.47rem;
  height: auto;
  margin: 0 auto;
  font-size: 0;
  z-index: 8;
  position: relative;
  top: -1rem;
}
.operate-letter {
  width: 100%;
  height: 6.57rem;
  background: url("http://confessionh5.oss-cn-shanghai.aliyuncs.com/static/06_02.png");
  background-size: cover;
  position: relative;
}
.operate-letter span {
  position: absolute;
  right: .8rem;
  bottom: 2.2rem;
  font-size: .5rem;
}
.letter-input {
  width: 84%;
  height: 3.2rem;
  background: none;
  border: hidden;
  outline: none;
  position: absolute;
  top: .7rem;
  left: .6rem;
  font-size: .5rem;
  line-height: .8rem;
}
.operate-btn {
  display: block;
  width: 3.56rem;
  height: 1.16rem;
  margin: 1rem auto .5rem auto;
  object-fit: cover;
}
.operate-btn.iphoneX {
  margin: 2.5rem auto 1rem auto;
}
</style>
<script>
import {api, shareInfo} from './../config'
import {init} from './../init_wechat.js'
export default{
  data () {
    return {
      confessionId: null,
      isIphoneX: false, // 判断设备是否是iphoneX
      confessContent: '', // 表白内容
      confessType: null,
      letterLength: 0, // 表白内容长度
      maxLength: 40, // 表白内容最大长度
      confessBtnCrl: true
    }
  },
  mounted () {
    let _self = this
    _self.confessType = _self.$route.params.type
    _self.isIphoneX = _self.testIphoneX()
    _self.getWeChatConfig()
    _self.getConfessionId()
  },
  methods: {
    testIphoneX () {
      return /iphone/gi.test(navigator.userAgent) && (screen.height === 812 && screen.width === 375)
    },
    getWeChatConfig () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/signature'
      let u = navigator.userAgent
      let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1
      let link = ''
      let page = 'Confess'
      if (isAndroid) {
        link = 'http://confession.jinfeibiao.com/confess/' + _self.confessType
      } else {
        link = 'http://confession.jinfeibiao.com/'
      }
      let params = {
        url: link
      }
      _self.$http.post(sendUrl, params).then((res) => {
        let resData = res.data
        if (resData.code === 0) {
          init(resData.signatureVo, shareInfo.homepage, link, page)
        } else {
          console.log('res from getWeChatConfig: ' + JSON.stringify(res))
        }
      }).catch((error) => {
        console.log('err from getWeChatConfig: ' + JSON.stringify(error))
        alert('网络错误，请刷新')
      })
    },
    getConfessionId () {
      let _self = this
      let sendUrl = api.dev.dataUrl + '/confession/fetchConfessionId'
      _self.$http.get(sendUrl)
        .then((response) => {
          console.log('getConfessionId: ' + JSON.stringify(response))
          _self.confessionId = response.data.confessionId
        }).catch((error) => {
          console.log('err from getConfessionId: ' + error)
          alert('网络错误，请刷新')
        })
    },
    testLength () {
      let _self = this
      _self.letterLength = _self.confessContent.length
      if (_self.letterLength > _self.maxLength) {
        alert('您输入的文字过长！')
      }
    },
    validate () {
      let _self = this
      if (_self.letterLength === 0) {
        alert('请输入你想说的话')
        return false
      } else if (_self.letterLength > _self.maxLength) {
        alert('你想说的话太多了')
        return false
      } else {
        if (_self.confessBtnCrl) {
          _self.initiateConfess()
        } else {
          console.log('forbid click duplicate.')
        }
      }
    },
    initiateConfess () {
      let _self = this
      _self.confessBtnCrl = false
      let sendUrl = api.dev.dataUrl + '/confession/confess'
      let params = {
        confessionId: _self.confessionId,
        content: _self.confessContent,
        type: _self.confessType
      }
      _self.$http.post(sendUrl, params)
        .then((res) => {
          if (res.data.code === 0) {
            _self.$router.push('/gameView/' + _self.confessionId)
          } else {
            _self.confessBtnCrl = true
            console.log('res from initiateConfess: ' + res)
            alert('网络错误，请重试')
          }
        }).catch((error) => {
          console.log('err from initiateConfess: ' + error)
          alert('网络错误，请刷新')
        })
    }
  }
}
</script>
