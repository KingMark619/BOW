// component/share/index.js
Component({
  properties: {
    title: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: ''
    }
  },
  methods: {
    wechat() {
      this.triggerEvent('wechat')
    },
    poster() {
      this.triggerEvent('poster')
    },
    cancel() {
      this.triggerEvent('cancel')
    }
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  }
})