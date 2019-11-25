// pages/gallery/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    listing_id:'',
    photos: [],
    statusBar:'',
    title:'',
    lang:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    const tit = options.title.split('|')
    const lang = options.lang
    const pics = options.pic
    let photo = pics.split(',')
    const index = options.title.indexOf('|')
    if (index != -1){
      if (lang === 'zh_CN') {
        this.setData({
          title: tit[1],
          photos: photo,
        })
      }
      else {
        this.setData({
          title: tit[0],
          photos: photo,
        })
      }
    }
    else {
      this.setData({
        photos: photo,
        title: options.title
      })
    }
    console.log(photo)
    
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          statusBar: res.statusBarHeight
        })
      },
    })
  },
  preview(e) {
    let src = e.currentTarget.dataset.index
    wx.previewImage({
      current: src,
      urls: this.data.photos,
      success: (res) => { },
      fail: (res) => { },
    })
  },
  onHome() {
    wx.reLaunch({
      url: '/pages/index/index',
    })
  },
  goback() {
    if (this.data.fromQrcode) {
      wx.reLaunch({
        url: '/pages/locations/index/index',
      })
    } else {
      wx.navigateBack({
        delta: 1
      })
    }
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