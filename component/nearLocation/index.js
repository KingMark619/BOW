// component/nearLocation/index.js
Component({
  properties: {
    location: {
      type: Array,
      default: []
    },
    lang: {
      type: String,
      default: []
    },
    type: {
      type: Boolean,
      default: true
    },
    catId: {
      type: String,
      default: ''
    }
  },
  data: {
    locations: [
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chef%27s_table_at_Marcus.jpg/170px-Chef%27s_table_at_Marcus.jpg",
        title: "BEER BARN"
      },
      {
        image: "http://img2.chinadaily.com.cn/images/201810/31/5bd8eda7a310eff369037ccb.jpeg",
        title: "XHEERS BAR"
      },
      {
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chef%27s_table_at_Marcus.jpg/170px-Chef%27s_table_at_Marcus.jpg",
        title: "BOUNTY RHUMERIE"
      }]
  },
  methods: {
    goToTrip() {
      this.triggerEvent('goToTrip')
    },
  },
  onLoad: function (options) {

  }
})