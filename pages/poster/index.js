// pages/poster/index.js
Page({

  /**
   * Page initial data
   */
  data: {
    mainImage : '',
    image:'',
    lang:'',
    post:'',
    code:'/image/qrCode.png',
    qrCode:'',
    mainHeight:'',
    mainWidth:'',
    screenHeight:'',
    screenWidth:'',
    tempFilePath:'',
    statusBar:''
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      mainImage: options.poster,
      lang: options.lang,
      post: options.post
    })

    this.draw()
  },

  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  draw(){
    console.log('drawing')
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          screenHeight: res.screenHeight * 0.65,
          screenWidth: res.screenWidth * 0.8,
          statusBar: res.statusBarHeight
        })
        wx.getImageInfo({
          src: this.data.post,
          success: (res) => {
            this.setData({
              qrCode: res.path
            })
          },
        })
        wx.getImageInfo({
          src: this.data.mainImage,
          success: (res) => {
            console.log(res)
            this.setData({
              mainHeight: res.height,
              mainWidth: res.width,
              image: res.path
            })
            this.canva()
          },
        })
      },
    })
  },
  canva(){
    const image = this.data.image
    const code = this.data.post
    const height = this.data.screenHeight
    const width = this.data.screenWidth

    
    console.log(image)
    console.log(code)
    const ctx = wx.createCanvasContext('myCanvas')

   
    ctx.drawImage(image, 0, 0, width, height)
    ctx.drawImage(code, 20, 20, 80, 80)
    
    ctx.draw()
    // ctx.save()

  },
  saveCanva(){
    wx.canvasToTempFilePath({
      canvasId: 'myCanvas',
      quality: 1,
      success: (res) => {
        console.log(res.tempFilePath)
        this.setData({
          tempFilePath: res.tempFilePath
        })
        var tempFilePath = res.tempFilePath;
        wx.saveImageToPhotosAlbum({
          filePath: tempFilePath,
          success(res) {
            wx.showModal({
              content: 'Picture Saved to Album',
              showCancel: false,
              confirmText: 'OK',
              confirmColor: '#333',
              fail: (res) => {
                console.error(res)
              }
            })
          },

        })
      },
    }, this)
  },
  preview: function () {
    wx.previewImage({
      current: this.data.mainImage,
      urls: [this.data.mainImage]
    });
  },
  save: function () {
    const test = this.data.tempFilePath
    console.log(test)
    var e = this;
    wx.getSetting({
      success: function (t) {
        t.authSetting["scope.writePhotosAlbum"] ? (wx.showLoading({
          title: "图片下载中..."
        }), setTimeout(function () {
          wx.hideLoading();
        }, 1e3), wx.downloadFile({
          url: e.data.mainImage,
          success: function (t) {
            wx.saveImageToPhotosAlbum({
              filePath: t.tempFilePath,
              success: function (t) {
                o.toast(e, "保存图片成功");
              },
              fail: function (t) {
                e.setData({
                  errMsg: t.errMsg
                }), o.toast(e, "保存图片失败");
              }
            });
          }
        })) : wx.authorize({
          scope: "scope.writePhotosAlbum",
          success: function () {
            wx.showLoading({
              title: "图片下载中..."
            }), setTimeout(function () {
              wx.hideLoading();
            }, 1e3), wx.downloadFile({
              url: e.data.mainImage,
              success: function (t) {
                wx.saveImageToPhotosAlbum({
                  filePath: t.tempFilePath,
                  success: function (t) {
                    o.toast(e, "保存图片成功");
                  },
                  fail: function (t) {
                    e.setData({
                      errMsg: t.errMsg
                    }), o.toast(e, "保存图片失败");
                  }
                });
              }
            });
          },
          fail: function () {
            wx.showModal({
              title: "警告",
              content: "您点击了拒绝授权，将无法正常使用保存图片或视频的功能体验，请删除小程序重新进入。"
            });
          }
        });
      }
    });
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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