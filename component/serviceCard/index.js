// component/serviceCard/index.js
Component({
  properties: {
    mainTitle: {
      type: String,
      default: ''
    },
    leftTitle: {
      type: String,
      default: ''
    },
    rightTitle: {
      type: String,
      default: ''
    },
    mainCaption: {
      type: String,
      default: ''
    },
    leftCaption: {
      type: String,
      default: ''
    },
    rightCaption: {
      type: String,
      default: ''
    },
    mainPoster: {
      type: String,
      default: ''
    },
    leftPoster: {
      type: String,
      default: ''
    },
    rightPoster: {
      type: String,
      default: ''
    },
  },
  data: {
    
  },
  // navTop() {
  //   wx.navigateTo({
  //     url: '/pages/article/index?url=https://mp.weixin.qq.com/s/G8gcjkrFKgwzR7VCxAlq5A',
  //     success: (res) => {},
  //     fail: (res) => {},
  //   })
  // },
  methods: {
    goToOa() {
      this.triggerEvent('nav-Top')
    },
    goToLeftOa() {
      this.trigerEvent('nav-left')
    },
    goToRightOa() {
      this.trigerEvent('nav-right')
    },
    goToClub(){
      this.trigerEvent('nav-low')
    }

  },
  onLoad: function (options) {

  }
})