// pages/event/index.js
Page({
  data: {
    id:'',
    toView:'',
    toViewid:'',
    mainImage:'',
    lang:'',
    content: '',
    title:'',
    locTitle:'',
    highTitle:[],
    previewGallery:[],
    description:'',
    event:[],
    highlight:[],
    location:[],
    fromQrcode:false,
    statusBar:'',
    trending:'',

    markers: {
      title: [],
      description: [],
      image: [],
    },
  },

  onLoad: function (options) {
    let curtain
    console.log(options)
    this.setData({
      curtain:'show',
      id: options.id,
      trending: options.trending
    })
    // get language 
    wx.getSystemInfo({
      success: (res) => {
        const lang = res.language
        this.setData({
          lang: lang,
          statusBar: res.statusBarHeight
        })
      },
    })

    if (options.trending === 'true') {
       console.log('trending')
      wx.request({
        url: `https://bestofwuhan.cn/wp-json/listing/trending/${this.data.id}`,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data[0])
          this.setData({
            event: res.data[0],
            mainImage: res.data[0].highlight[0].url,
            loaded: 'loaded'
          })
          
          this.transContent()
          this.transHighlight()
          this.parseHighlight()
          this.previewGallery()
          
          wx.request({
            url: `https://bestofwuhan.cn/wp-json/listing/${this.data.event.parent_id}`,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
              console.log(res.data)
              this.setData({
                location: res.data
              })
              this.splitTitle()
            },
          })
        },
        fail: (res) => { },
        complete: (res) => { },
      })
    }
    else {
      console.log('level A')
      wx.request({
        url: `https://bestofwuhan.cn/wp-json/listing/event/${this.data.id}`,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          this.setData({
            event: res.data[0],
            mainImage: res.data[0].highlight[0].url,
            loaded: 'loaded'
          })
          this.transContent()
          this.transHighlight()
          this.parseHighlight()
          this.previewGallery()

          wx.request({
            url: `https://bestofwuhan.cn/wp-json/listing/${this.data.event.parent_id}`,
            data: '',
            header: {},
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
              console.log(res.data)
              this.setData({
                location: res.data
              })
              this.splitTitle()
            },
          })
          console.log(this.data.event)
        },
        fail: (res) => { },
        complete: (res) => { },
      })
    }
   
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          statusBar: res.statusBarHeight
        })
      },
    })
  },
  splitTitle(){
    let lang = this.data.lang
    let title = this.data.location.title
    let test = title.split('|')
    if (title){
      let transTitle = title.split('|')
      if (lang === 'zh_CN'){
        this.setData({
          locTitle : transTitle[1]
        })
      }
      else {
        this.setData({
          locTitle: transTitle[0]
        })
      }
    }
    else {
      this.setData({
        locTitle: title
      })
    }
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
  navigate(){
    wx.navigateTo({
      url: `/pages/merchant/detail/index?id=${this.data.location.listing_id}&type=normal&logo=${this.data.location.logo}`,
      success: (res) => {console.log(res)},
      fail: (res) => {console.log(res)}
    })
  },
  previewGallery () {
    let highlight = this.data.event.highlight
    let image = []
    highlight.forEach(function (element) {
      image.push(element.url)
    })
    this.setData({
      previewGallery: image
    })
  },
  preview: function (e) {
    let src = e.currentTarget.dataset.index
    let image = this.data.previewGallery
    wx.previewImage({
      current: src,
      urls: image,
    })
  }, 
  previewMain(e) {
    console.log(e)
    let image = this.data.mainImage
    let index = e.currentTarget.id;
    wx.previewImage({
      current: image,
      urls: `${image}`
      
    })
  },
  parseHighlight(){
    // remove main image from highlight
    let highlight = this.data.event.highlight
    highlight.shift()
    this.setData({
      highlight: highlight
    })
          // end of remove
  },
  transHighlight(){
    let highlight = this.data.event.highlight
    let title = []
    let description = []
    let image = []
    highlight.forEach(function (element) {
      let tit = element.title.split('|')
      let des = element.description.split('|')
      let img = element.url
      let result = title.push(tit)
      let desResult = description.push(des)
      let imgResult = image.push(img)
    });
    let finishedTitle = title.shift()
    let finishedDescription = description.shift()
    let finishedImage = image.shift()
    this.setData({
      highTitle: title,
      description: description,
      markers:{
        title: title,
        description: description,
        image: image
      }
    })
  },
  transContent(){
    // split language title and content
    let test = this.data.event.content
    let cond = test.split('|')
    if (cond) {
      let transContent = this.data.event.content.split('|')
      let transTitle = this.data.event.title.split('|')
      if (this.data.lang === 'zh_CN') {
        this.setData({
          content: transContent[1],
          title: transTitle[1]
        })
      }
      else if (transTitle[0]) {
        this.setData({
          content: transContent[0],
          title: transTitle[0]
        })
      }
    }
    else {
      this.setData({
        content: this.data.event.content,
        title: this.data.event.title
      })
    }
  },
  changescroll: function (e) {
    var id = e.currentTarget.dataset.id
    console.log(id)
    this.setData({
      toView: id
    })

    var toViewid = "#" + this.data.toView //获取id
    var scrollTop;
    const query = wx.createSelectorQuery();  //创建节点查询器
    query.select(toViewid).boundingClientRect()  //选择toViewid获取位置信息
    query.selectViewport().scrollOffset()  //获取页面查询位置的
    query.exec(function (res) {
      console.log(res)
      scrollTop = 1000  
      res[1].scrollTop
      wx.createSelectorQuery().select('.page').boundingClientRect(function (rect) {
        wx.pageScrollTo({
          scrollTop: scrollTop,
          duration: 500
        })
      }).exec()
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
  onHide: function() {
    this.setData({
      id:'',
      event:[],
      location:[],
    })
  },
  onUnload: function() {
    // this.setData({
    //   id:'',
    //   event:[],
    //   location:[],
    // })
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
    let title = this.data.title
    return {
      title: title,
      image: this.data.event.poster_url
    }
  }
})