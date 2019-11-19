// pages/news/index.js
Page({
  data: {
    id:'',
    type:'',
    duration: 300,
    indicatorDots: true,
    interval: 300
  },

  onLoad: function (options) {
  console.log(options)
   this.setData({
     id: options.id,
     type: options.type
   })
  //  wx.request({
  //    url: this.data.id,
  //    data: '',
  //    header: {},
  //    method: 'GET',
  //    dataType: 'json',
  //    responseType: 'text',
  //    success: (res) => {},
  //    fail: (res) => {},
  //  })
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
  onShareAppMessage: function () {

  }
})
