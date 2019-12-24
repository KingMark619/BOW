var t = getApp(), e = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));

// pages/merchant/join/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    location :[],
    curtain:'',
    loaded: '',
    catId: 338,
    id:338,
    lang:'',
    title:[],
    index:[]
  },
  
  onLoad(options) {
    let curtain
    this.setData({
      curtain: 'show'
    })
    wx.getSystemInfo({
      success: (res) => {
        const lang = res.language
        this.setData({
          lang: lang
        })
      },
    })
    wx.request({
      url: 'https://bestofwuhan.cn/wp-json/listing/category/338',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        this.setData({
          location: res.data,
          loaded: 'loaded'
        })
        this.translate()
        this.reorder()
      },
    })
  },
  reorder(){
    let location = this.data.location
    let index = []

    location.forEach(function(e){
      console.log(e.order_index)
      let id = e.order_index
      index.push(id)
    })
    index.sort(function (a, b) { return a - b });
    console.log(index)
    this.setData({
      index : index
    })
    this.rearange()
  },
  rearange(){
    let location = this.data.location
    let index = this.data.index

    let newArr = [];

    // for (var i = 0; i < index.length; i++) {
    //   newArr[i] = location[index[i]]
    // }

    location.forEach(function(e,id){
      if (e.order_index != null){
        let ide = e.order_index
        let newA = location.splice(id, 1, e)
        
        console.log(newA[0])
        location.splice(ide, 1, e)
      }
    })
    console.log(location)
  },
  translate(){
    let location = this.data.location
    let lang = this.data.lang
    let title = []

    location.forEach(function(e){
      let tit = e.title
      let index = tit.indexOf('|')
      let titl = tit.split('|')

      if (lang === 'zh_CN'){
        title.push(titl[1])
      }
      else {
        title.push(titl[0])
      }
    })
    this.setData({
      title : title
    })
  },
  // navigate() {
  //   wx.navigateTo({
  //     url: `/pages/merchant/search/search?id=338`,
  //   })
  // },
  goToListing () {
    wx.navigateTo({
      url: '/pages/merchant/join/index',
    })
  },
  clickToDetail: function () {

    let id = JSON.stringify(listing.id);
    wx.navigateTo({
      url: `../detail/index?id=${this.id}`,
      success: function (res) {
        console.log("success")
      },
      fail: function () {
        console.log("fail")
      }
    })
  },
  goToIndex() {
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  goToRec() {
    wx.navigateTo({
      url: '/pages/merchant/join/index',
    })
  },
  goToTravel() {
    wx.navigateTo({
      url: '/pages/travel/index/index',
    })
  },
  search() {
    wx.navigateTo({
      url: `/pages/merchant/search/search?id=${this.data.id}&list=${this.data.title}&catId=${this.data.id}&lang=${this.data.lang}`,
    })
  },
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    const image = '/image/logo.png '
    return {
      title: 'BESTOFWUHAN',
      imageUrl: image
    };
  },
})