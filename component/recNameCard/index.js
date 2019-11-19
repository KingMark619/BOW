// component/recNameCard/index.js
Component({
  properties: {
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    },
    poster: {
      type: String,
      default: ''
    }
  },
  data: {
    // name: 'MOMENTs',
    // address: '湖北省武汉市洪山区东湖南路'
  },
  methods: {
    navigate() {
      this.triggerEvent('navigate')
    },
  },
  onLoad: function (options) {

  }
})