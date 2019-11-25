function t(t, e, a) {
  return e in t ? Object.defineProperty(t, e, {
    value: a,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[e] = a, t;
}

var e, a, o = getApp(), i = o.requirejs("core"), s = (o.requirejs("icons"), o.requirejs("foxui")), n = o.requirejs("biz/diypage"), r = o.requirejs("biz/diyform"), c = o.requirejs("biz/goodspicker"), d = o.requirejs("jquery"), l = o.requirejs("wxParse/wxParse"), u = 0, g = o.requirejs("biz/selectdate");

var xApp = getApp(),
  xHttp = xApp.requirejs("core"),
  xIcons = (xApp.requirejs("icons"), xApp.requirejs("jquery"));

import coordinates from '../../../utils/location.js'
// pages/merchant/detail/index.js
Page({
  data: {
    indicatorDots: true,  //是否显示面板指示点
    autoplay: true,      //是否自动切换
    interval: 3000,       //自动切换时间间隔
    duration: 1000,       //滑动动画时长
    inputShowed: false,
    inputVal: "",

    lang:'',

    longitude:'',
    latitude:'',
    lat:'',
    long:'',
    distance:'',
    location:[],
    photosFull:[],
    photos:[],
    photos150:[],
    photos250:[],
    photos350:[],
    avgPrice:'',
    parsedContent:'',
    school_description:'',
    hide:'',
    address:'',
    content:'',
    listing_id:'',
    type:'',
    type2:'',
    curtain:'',
    loaded:'',
    showSlide:'',
    fromQrcode: false,
    statusBar: '',
    album:[],
    pics:[],
    more:'',
    logo:'',
    preHighlight:'',
    highlight: [{
      title: [],
      description:[],
      pricture: []
    }],

    category_id:'',
    nearType: true,
    nearLocation:[],

    markers: [{
      id: 0,
      iconPath: "/image/maps.svg",
      latitude: '',
      longitude: '',
      title:'',
      width: 15,
      height: 15
    }],
  },
 
  onShareAppMessage: function () {
    const pageTitle = this.data.title
    const image = this.data.location.logo
    return {
      title: pageTitle,
      imageUrl: image
    };
  },
  sharePoster: function () {
    wx.navigateTo({
      url: "/pages/goods/poster/poster?id=" + this.data.listing_id
    });
  },
  shareTest : function () {
    
  },
  
  clickToMap: function (event) {
    let loc = this.data.location
    let name = this.data.title
 
    console.log(event);
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({
          latitude: parseFloat(loc.latitude),
          longitude: parseFloat(loc.longitude),
          scale: 18,
          name: name,
          address: loc.address
        })
      }
    })
  },
  onReady: function (e) {
    
  },
  
  onLoad: function (options) {
    // starting the curtain
    let curtain
    let type
    this.setData({
      curtain: 'show'
    })
    //ending the curtain
    // get language 
    this.getLanguage()
    let lat
    let long
    this.getLoc()

    console.log(options)
    let listing_id
    let logo
    this.setData({
      listing_id: options.id,
      category_id: options.catId,
      type: options.type,
      logo: options.logo
    })
    if (listing_id != '') {
      wx.request({
        url: `https://bestofwuhan.cn/wp-json/listing/${this.data.listing_id}`,
        data: '',
        header: {},
        method: 'GET',
        dataType: 'json',
        responseType: 'text',
        success: (res) => {
          console.log(res.data)
          let preHighlight = res.data.image_gallery
          let stripedHtml = res.data.content.replace(/<[^>]+>/g, '')
          let parsed = stripedHtml.replace(/&nbsp/g, '')
          let parsedContent = parsed.replace(/[/\\*]/g, "")
          let album = res.data.image_gallery.replace(/a:\d:/g,'')
          let album2 = album.replace(/i:\d;s:\d\d?:/g,'')
          let album3 = album2.replace(/\{/g,'')
          let album4 = album3.replace(/"/g,'')
          let album5 = album4.replace(/\}/g,'')
          let album6 = album5.split(';')
          let pics = album6.pop()
          
          let name = res.data.title
          let latitude = res.data.latitude
          let longitude = res.data.longitude
          let transContent = parsedContent.split('|')
          let transName = name.split('|')
          
          // school notice 
          let transNotice
          if (res.data.school_description){
             transNotice = res.data.school_description.split('|')
             if (this.data.lang=== 'zh_CN'){
               this.setData({
                 school_description: transNotice[1]
               })
             }
             else {
               this.setData({
                 school_description: transNotice[0]
               })
             }
          }

          // remove HTML tags from text content
          // split language
          if (this.data.lang === 'zh_CN') {
            this.setData({
              title: transName[1],
              content: transContent[1],
            })
          }
          else if (transName[0]) {
            this.setData({
              title: transName[0],
              content: transContent[0],
            })
          }
          else if (parsedContent.indexOf('|') === -1 ){
            this.setData({
              content: parsedContent,
              title: name
            })
          }

          this.setData({
            location: res.data,
            photos: album6,
            loaded: 'loaded',
            preHighlight : preHighlight,
            markers: [{
            latitude: latitude,
            longitude: longitude,
            iconPath: "/image/maps.svg",
            }]
          })
          this.picture()
          // this.getLoc()
          this.checkDistance()
          this.checkPrice()
          this.loadNearby()
          this.setHighlight()
        },
      })
    }
  },
  getLanguage(){
    wx.getSystemInfo({
      success: (res) => {
        const lang = res.language
        this.setData({
          lang: lang,
          statusBar: res.statusBarHeight
        })
      },
    })
  },
  picture: function (){
    let photo = this.data.photos
    let album150x150 = []
    let album250x250 = []
    let album350x350 = []
    
    photo.forEach(function(e){
      
      let alb = e.replace(/a:\d\d:/,'')
      let albu = alb.replace(/s:\d\d:/,'')
      let album = albu.replace(/i:\d\d:/,'')  
      let album1 = albu.replace('logo150x150','')
      let album2 = album1.replace('logo250x250','')
      let album3 = album2.replace('logo350x350','') 
      let album4 = album3.replace(/i:\d\d?/,'')
      let album5 = album4.replace(/s:\d\d?\d?:/,'')
        album150x150.push(album5)
    })
    this.setData({
      album: album150x150
    })
    this.deleting()
  },
  deleting(){
    // delete empty elements 
    let array = this.data.album
    let album150x150 = []
    let album250x250 = []
    let album350x350 = []
    let albumFull = []
    let alb = []
    let album = []
    let filtered = array.filter(function (el) {
      return el != "";
    });
    // console.log(filtered)
    filtered.forEach(function(e){
      if (e.includes('-150x')){
        album150x150.push(e)
      }
      else if (e.includes('150.')){
        album150x150.push(e)
      }
      else if(e.includes('-250x')){
        album250x250.push(e)
      }
      else if (e.includes('250.')) {
        album250x250.push(e)
      }
      else if (e.includes('-350x')){
        album350x350.push(e)
      }
      else if (e.includes('350.')) {
        album350x350.push(e)
      }
      else if (e.includes('-')){
        alb.push(e)
      }
      else {
        // albumFull.push(e)
      }
    }) 
// remove duplicates
    function removeDuplicates(arr) {
      let unique_array = []
      for (let i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
          unique_array.push(arr[i])
        }
      }
      return unique_array
    }
    albumFull = removeDuplicates(alb); // [ 'DELHI', 'NEWYORK', 'GOA', 'MUMBAI', 'CALIFORNIA' ]

    // these is a pb,ometimes 250 doesnt show tho its there, fix it , or find a better way => use switch
    if (album250x250.length < 1){
      console.log('not many image sizes ')
      this.setData({
        photos250: albumFull,
        photos350: albumFull,
        photosFull: albumFull
      })
    }
    else {
      console.log('image sizes different')
      this.setData({
        pics: filtered,
        photos150: album150x150,
        photos250: album250x250,
        photos350: album350x350,
        photosFull: albumFull
      })
    } 
  },
  makeCall () {
    wx.makePhoneCall({
      phoneNumber: this.data.location.telephone,
    })
  },
  hide() {
    this.setData({
      hide: 'none',
      address: ''
    })
  },
  showWechat(){
    wx.setClipboardData({
      data: this.data.location.wechat,
      success: (res) => {
        wx.showToast({
          title: 'ID Copied',
          icon: 'success',
          duration: 2500,
          mask: true,
        })
      },
    })
  },
  didi() {
    wx.setClipboardData({
      data: this.data.location.address,
      success: (res) => {
        wx.showToast({
          title: 'Paste Address in Didi',
          icon: 'success',
          duration: 1500,
          mask: true,
        })
      },
      fail: (res) => {
        console.log(res)
      },
    })
  },
  showTaxi() {
    this.setData({
      address: 'address'
    })
  },
  copyAddress(){
    wx.setClipboardData({
      data: this.data.location.address,
      success: (res) => {
        wx.showToast({
          title: 'Address Copied',
          icon: 'Success',
          mask: true,
          success: (res)  => {},
          fail: (res) => {},
        })
      },
    })
  },
  preview (e) {
    let src = e.currentTarget.dataset.index
    wx.previewImage({
      current: src,
      urls: this.data.photosFull,
      success: (res)=> {},
      fail: (res) => {},
    })
  },
  moreText (){
    console.log('more text')
    this.setData({
      more: 'more'
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
  album (){
    const photo = this.data.photosFull
    console.log(photo)
    if (photo != []) {
      const queries = {
        pics: photo
      }
      wx.navigateTo({
        url: `/pages/gallery/index?pic=${photo}&title=${this.data.title}&lang=${this.data.lang}`,
      })
    } else {
      console.log('no work ')
    }
  },
  onhide(){
    this.setData({
      listing_id: '',
      type: '',
      type2: ''
    })
  },
  onUnload: function () {
    this.setData({
      listing_id: '',
      type: '',
      type2: ''
    })
  },
  getLoc (){
    console.log('getting loc')
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
  },
  checkDistance: function (lat1, lon1, lat2, lon2, unit){
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
     lat1 = this.data.location.latitude
     lon1 = this.data.location.longitude
     lat2 = this.data.lat //30.49984
     lon2 = this.data.long //114.34253
     unit = 'K'
     console.log(lat2)
     if (lat2 != ''){
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
         console.log(rounded + 'km')
         this.setData({
           distance: rounded
         })
         return dist;
       }
     }
     else {
       this.setData({
         distance: ''
       })
     }
    },
  checkPrice(){
    let min = parseInt(this.data.location.min_price)
    let max = parseInt(this.data.location.max_price)
    if (min && max){
      let sum = min + max
      let avg = sum / 2
      this.setData({
        avgPrice : avg
      })
    }
    else {
      this.setData({
        avgPrice : ''
      })
    }
  },
  loadNearby(){
    wx.request({
      url: `https://bestofwuhan.cn/wp-json/listing/category/${this.data.category_id}`,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success:(res) => {
        this.setData({
          nearLocation : res.data
        })
        this.sliceNearby()
      },
    })
  },
  sliceNearby(){
    let loc = this.data.nearLocation
    if (loc != []) {
      let slic = loc.slice(0, 5)
      let slice = slic.sort(() => Math.random() - 0.5)
      this.setData({
        nearLocation: slice
      })
    }
  },
  setHighlight(){
    let preHighlight = this.data.preHighlight
    let images = this.data.photosFull
    let title = []
    let description = []
    let tit = []
    let des = []

    let alb = preHighlight.replace(/a:\d\d:/, '')
    let albu = alb.replace('', '')
    let album = albu.replace(/i:\d\d:/, '')
    let album1 = albu.replace('logo150x150', '')
    let album2 = album1.replace('logo250x250', '')
    let album3 = album2.replace('logo350x350', '')
    let album4 = album3.replace(/i:\d\d?/, '')
    let album5 = album4.split(/{s:\d?:"title";s:\d\d?:/)
    album5.shift()

    album5.forEach(function(e){
      let rep = e.replace(/i:\d\d?;a:\d\d?:s:\d\d?:/,'')
      let re = rep.replace(/i:\d\d?;a:\d\d?:/,'')
      let r = re.split('}')
      tit.push(r[0])
      des.push(r[1])
    })
    // cleaning title and translating it.
    tit.forEach(function(element){
      let tit = element.replace(';','')
      let titl = tit.replace('"','')
      let titles = titl.replace('"','')
      let splitTitle = titles.split('|')
     
      title.push(splitTitle)
    })
    des.forEach(function(element){
      let des = element.replace(/{s:\d\d?:"description";s:\d\d?:/,'')
      let desc = des.replace(';','')
      let descr = desc.replace(/{s:\d\d?:"description"s:\d\d?\d?:"/,'')
      let descri = descr.replace('";','')
      let descrip = descri.replace('"','')
      let descript = descrip.replace('"','')
      let descripti = descript.replace(/{s:\d\d?:descriptionN;/,'')
      let splitDesc = descripti.split('|')

      description.push(splitDesc)
    })
    this.setData({
      highlight:[{
        title: title,
        description: description,
        picture: images
      }]
    })
    console.log(this.data.highlight)
  }
  // imgYu: function (event) {
  //   console.log(1);
  //   var src = event.currentTarget.dataset.src;//获取data-src
  //   var imgList = event.currentTarget.dataset.list;//获取data-list
  //   //图片预览
  //   wx.previewImage({
  //     current: src, // 当前显示图片的http链接
  //     urls: [imgList] // 需要预览的图片http链接列表
  //   })
  // }
})

