
Page({
  data: {
    id:'',
    type: true,
    lang:'',
    lat:'',
    long:'',
    startIndex: 9,
    location: [],
    locations:[],
    title:[],
    distance:[],
    curtain: '',
    loaded: '',
    fromQrcode: false,
    statusBar: '',
    articles:[],
  },

  onLoad: function(options) {
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        const lat = res.latitude
        const long = res.longitude
        this.setData({
          lat: lat,
          long: long
        })
      },
    })
    console.log(options)
    let curtain
    if (options.id === '312') {
      this.setData({
        type: false,
      })
    }
    else {
      this.setData({
        type: true
      })
    }
    this.setData({
      curtain: 'show',
      id: options.id
    })
    if (this.data.id != '') {
      wx.request({
        url: `https://bestofwuhan.cn/wp-json/listing/category/${this.data.id}`,
        data: '',
        header: {
        },
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: res => {
          console.log(res.data)
          let loc = res.data.slice(0, 9)
          this.setData({
            location: res.data,
            loaded: 'loaded',
            locations: res.data
          })
          this.translate()
        },
      })
    }
    else {
      console.log('the param didnt work')
    }
    wx.getSystemInfo({
      success: (res) => {
        this.setData({
          statusBar: res.statusBarHeight,
          lang: res.language
        })
      },
    })
  },
  navigate(){
    wx.navigateTo({
      url: `/pages/merchant/search/search?id=${this.data.id}`,
    })
  },
  // navigate code bellow, use switch 
  // not used for now
  goToSinglePage() {
    if (this.data.id != 194 ){
      wx.navigateTo({
        url: '/pages/merchant/detail/index',
      })
    }
    else {
      wx.navigateTo({
        url: '/pages/news/index',
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
  arrange(lat1, lon1, lat2, lon2, unit){
    let fixed = []
    let array = this.data.location
     lat2 = this.data.lat
     lon2 = this.data.long
    wx.getLocation({
      type: 'wgs84',
      altitude: true,
      success: (res) => {
        const lat = res.latitude
        const long = res.longitude
        this.setData({
          lat: lat,
          long: long
        })
      },
    })
    array.forEach(function(e){
      let lat = e.latitude
      let long = e.longitude

      lat1 = lat
      lon1 = long
      lat2 = lat2 //30.49984
      lon2 = lon2 //114.34253
      unit = 'K'
      if (lat2 != '') {
        if ((lat1 == lat2) && (lon1 == lon2)) {
          return 0;
        }
        else {
          var radlat1 = Math.PI * lat1 / 180;
          var radlat2 = Math.PI * lat2 / 180;
          var theta = lon1 - lon2;
          var radtheta = Math.PI * theta / 180;
          var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
          if (dist > 1) {
            dist = 1;
          }
          dist = Math.acos(dist);
          dist = dist * 180 / Math.PI;
          dist = dist * 60 * 1.1515;
          if (unit == "K") { dist = dist * 1.609344 }
          if (unit == "N") { dist = dist * 0.8684 }
          const rounded = Math.round(dist * 100) / 100
          console.log(rounded)
          return rounded;
        }
      }
    })
  },
  translate() {
    let location = this.data.location
    let lang = this.data.lang
    let title = []

    location.forEach(function (e) {
      let tit = e.title
      let index = tit.indexOf('|')
      let titl = tit.split('|')

      if (lang === 'en') {
        title.push(titl[0])
      }
      else {
        title.push(titl[1])
      }
    })
    this.setData({
      title: title
    })
  },
  onReady: function() {

  },
  onShow: function() {
    
  },
  onHide: function() {
    // this.setData({
    //   id:'',
    //   type:'',
    //   location: [],
    // })
  },
  onUnload: function() {
    this.setData({
      id:'',
      type:'',
      location: [],
    })
  },
  onPullDownRefresh: function() {
    console.log('refresh')
  },
  onReachBottom: function() {
    console.log('pull more')
    let locations = this.data.locations
    let location = this.data.location
    let startIndex = this.data.startIndex
    let finishIndex = startIndex + 9
    let plusLoc = location.slice(startIndex,finishIndex)
    let newLoc = locations.concat(plusLoc)
    this.setData({
      locations : newLoc,
      startIndex: finishIndex
    })
  },
  onShareAppMessage: function() {

  },
})