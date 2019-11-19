// pages/merchant/allmerchant/direction/direction.js
Page({

  /**
   * Page initial data
   */
  data: {

  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    let lat = parseFloat(decodeURIComponent(options.lat))
    let long = parseFloat(decodeURIComponent(options.long))
    let address = decodeURIComponent(options.address)
    let title = decodeURIComponent(options.title)
    console.log(options)
    this.setData({
      lat: lat,
      long: long,
      address: address,
      markers: [
        {
          latitude: lat,
          longitude: long,
          title: title,
          label: {
            content: title,
            bgColor: "red"
          }
        }
      ]
    })
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },

  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

  },

  /**
   * Lifecycle function--Called when page hide
   */
  onHide: function () {

  },

  /**
   * Lifecycle function--Called when page unload
   */
  onUnload: function () {

  },

  /**
   * Page event handler function--Called when user drop down
   */
  onPullDownRefresh: function () {

  },

  /**
   * Called when page reach bottom
   */
  onReachBottom: function () {

  },

  /**
   * Called when user click on the top right corner to share
   */
  onShareAppMessage: function () {

  }
})