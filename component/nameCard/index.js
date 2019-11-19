// component/nameCard/index.js
Component({
  properties: {
    location: {
      type: Object,
      default: {}
    },
    type: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    catId: {
      type: String,
      default: ''
    }
  },
  data: {
    
  },
  methods: {
    navigate() {
      this.triggerEvent('navigate')
    },
    follow() {
      this.triggerEvent('follow')
    }
  },
})