// component/travelCard/index.js
Component({
  properties: {
    // name: {
    //   type: String,
    //   default: ''
    // },
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
    name: 'Trip To Beijing',
    price: 'Y 1400'
  },
  methods: {
    navigate() {
      this.triggerEvent('navigate')
    },
  },
  onLoad: function (options) {

  }
})