// component/address/index.js
Component({
  properties: {
    location: {
      type: Object,
      default: {}
    },
  },
  methods: {
    dismiss() {
      this.triggerEvent('dismiss')
    },
    didi() {
      this.triggerEvent('didi')
    }
  },
  onLoad: function (options) {

  },
  onReady: function () {

  },
  onShow: function () {

  }
})