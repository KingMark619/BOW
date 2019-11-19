// pages/article/index.js
Page({
  data: {
    url:''
  },

  onLoad: function (options) {
    console.log(options)
    this.setData({
      url : options.url
    })
  },
  onReady: function () {

  },
  onShow: function () {

  },
  onHide: function () {

  },
  onUnload: function () {

  },
  onPullDownRefresh: function () {

  },
  onReachBottom: function () {

  },
  // onShareAppMessage: function (options) {
  //   console.log(options)
  //   let url = options.url
  //   return {
  //     title: 'Best Of Wuhan',
  //     path: url
  //   };
  // },
})