// component/moreEvent/index.js
Component({
  properties: {
    event: {
      type: Object,
      default: {}
    },
    lang: {
      type: String,
      default: []
    },
    trending: {
      type: Boolean,
      default: true
    },
  },
  data: {
    locations: [
      {
        image: "/image/event-icon/bbq.svg",
        title: "BBQ",
        name: "CHEERS"
      },
      {
        image: "/image/event-icon/cocktail.svg",
        title: "DRINKS",
        name: "COMMUNE"
      },
      {
        image: "/image/event-icon/stand-up.svg",
        title: "STAND-UP",
        name: "9763"
      },
      {
        image: "/image/event-icon/food.svg",
        title: "FOOD",
        name: "INDIAN MARKA"
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