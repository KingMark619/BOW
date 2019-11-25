// component/travelPoster/index.js
Component({
  properties: {
    // title: {
    //   type: String,
    //   default: ''
    // },
    poster: {
      type: String,
      default: ''
    },
    lang: {
      type: String,
      default: ''
    },
    title: {
      type: Array,
      default: []
    },
    event: {
      type: Array,
      default: []
    },
    trending: {
      type: Boolean,
      default: false
    }
  },
  data: {
    events: ["https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chef%27s_table_at_Marcus.jpg/170px-Chef%27s_table_at_Marcus.jpg", "http://img2.chinadaily.com.cn/images/201810/31/5bd8eda7a310eff369037ccb.jpeg","https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/Chef%27s_table_at_Marcus.jpg/170px-Chef%27s_table_at_Marcus.jpg"]
  },
  methods: {
    goToTrip() {
      this.triggerEvent('goToTrip')
    },
  },
  onLoad: function (options) {

  }
})