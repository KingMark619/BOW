function t(t, a, e) {
  return a in t ? Object.defineProperty(t, a, {
    value: e,
    enumerable: !0,
    configurable: !0,
    writable: !0
  }) : t[a] = e, t;
}
import fullDate from '/../../utils/date.js'

var a, e, i = getApp(),
  s = i.requirejs("core"),
  o = i.requirejs("wxParse/wxParse"),
  n = i.requirejs("biz/diypage"),
  r = i.requirejs("biz/diyform"),
  d = i.requirejs("biz/goodspicker"),
  c = (i.requirejs("foxui"),
    i.requirejs("jquery"));

Page((e = {
  onPullDownRefresh: function () {

  },
  data: {
    title:[],
    lang: '',
    categories:[],
    article:[],
    event:[],
    ads:[],
    curtain: '',
    loaded: '',
    trending: true,
    realEvent:[],
    realAds:[],
    adsTitle:[],

    indicatorDotss: !0,
    autoplays: !0,
    showPopup: false,
    intervals: 2e3,
    durations: 800,
    circulars: !0,
    adveradmin: !0,

    indicatorDots: !0,
    autoplay: !0,
    interval: 3000,
    duration: 300,
    circular: !0,

    indicatorDotsHot: !1,
    autoplayHot: !0,
    intervalHot: 5e3,
    durationHOt: 1e3,
    circularHot: !0,

    date:'',

    checkedTime: {
      eDay: [],
      eMonth: []
    },

  },
  getShop: function () {

  },
  onReachBottom: function () {

  },
  getRecommand: function () {

  },

  onLoad: function (t,res,options) {
    let curtain
    this.setData({
      curtain: 'show'
    })
    this.loadEvent()
    this.loadTrending()
    this.loadArticle()

    // get language 
    wx.getSystemInfo({
      success: (res) => {
        const lang = res.language
        this.setData({
          lang: lang
        })
      },
    })
  },
  // load content
  loadEvent () {
    wx.request({
      url: 'https://bestofwuhan.cn/wp-json/listing/events',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        let date = (JSON.stringify(res.data[0].end_date))
        this.setData({
          event: res.data,
          loaded: 'loaded',
          date: date
        })
        this.checkDate()
      },
    })
  },
  loadTrending () {
    wx.request({
      url: 'https://bestofwuhan.cn/wp-json/listing/trendings',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data)
        this.setData({
          ads: res.data
        })
        this.transTitle()
        this.checkAds()
        //begin language
        res.data.forEach(function(e){
          let newTitle = e.title.split('|')
        }) 
        //end llanguage
      },
    })
  },
  loadArticle () {
    wx.request({
      url: 'https://bestofwuhan.cn/wp-json/listing/articles/',
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        let article = res.data.slice(0, 6)
        this.setData({
          article: article,
        })
      },
    })
  },
  transTitle() {
    // split language title and content
    // console.log('trantitle')
    // let title = this.data.event.title
    // console.log(title.indexOf('|'))
    // if (cond > -1) {
    //   let transTitle = this.data.event.title.split('|')
    //   if (this.data.lang === 'en') {
    //     this.setData({
    //       title: transTitle[0]
    //     })
    //   }
    //   else if (transTitle[1]) {
    //     this.setData({
    //       title: transTitle[1]
    //     })
    //   }
    // }
    // else {
    //   this.setData({
    //     title: this.data.event.title
    //   })
    // }
  },
  
// end load content
// time check 
  checkDate() {
    let realEvent = []
    let time = fullDate.split('/')
    const day = time[0]
    const month = time[1]
    const year = time[2]

    let eTime = this.data.event
    let eventDay = []
    let eventMonth = []
    eTime.forEach(function (element) {
      let eTime = element.end_date.split('/')
      
      const eDay = eTime[0]
      const eMonth = eTime[1]
      const eYear = eTime[2]
      
      if (eMonth > month) {
        realEvent: realEvent.push(element)
      }
      if (eMonth === month) {
        if (eDay > day) { 
          realEvent: realEvent.push(element)
        }
        else if (eDay === day){
          realEvent: realEvent.push(element)
        }
      }
      let eveDay = eventDay.push(eDay)
      let eveMonth = eventMonth.push(eMonth)
    })
    this.setData({
      realEvent: realEvent,
      checkedTime: {
        eDay: eventDay,
        eMonth: eventMonth
      }
    })
  },
  checkAds() {
    let realEvent = []
    let time = fullDate.split('/')
    const day = time[0]
    const month = time[1]
    const year = time[2]

    let eTime = this.data.ads
    let eventDay = []
    let eventMonth = []
    eTime.forEach(function (element) {
      let eTime = element.end_date.split('/')
      const eDay = eTime[0]
      const eMonth = eTime[1]
      const eYear = eTime[2]
      // console.log(eDay >= day && eMonth >= month)
      if (eMonth > month) {
          realEvent: realEvent.push(element)
        }
      if (eMonth === month){
        if (eDay >= day){
          realEvent: realEvent.push(element)
        }
      }
      let eveDay = eventDay.push(eDay)
      let eveMonth = eventMonth.push(eMonth)
    })
    this.setData({
      realAds: realEvent,
      checkedTime: {
        eDay: eventDay,
        eMonth: eventMonth
      }
    })
    this.translateAds()
  },
  translateAds(){
    let ads = this.data.realAds
    let adsTitle = []
    ads.forEach(function(ad){
      let tit = ad.title.split('|')
      adsTitle.push(tit)
    })
    this.setData({
      adsTitle: adsTitle
    })
  },
// end time check
// start of categories navigation
  openCategory1 () {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=193',
    })
  },
  openCategory2 () {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=216',
    })
  },
  openCategory3() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=344',
    })
  },
  openCategory4() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=212',
    })
  },
  openCategory5() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=309',
    })
  },
  openCategory6() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=185',
    })
  },
  openCategory7() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=310',
    })
  },
  openCategory8() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=311',
    })
  },
  openCategory9() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=27',
    })
  },
  openCategory10() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=314',
    })
  },
  openCategory11() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=312',
    })
  },
  openCategory12() {
    wx.navigateTo({
      url: '/pages/merchant/allmerchant/index?id=339',
    })
  },
// navigate to how to official account
  goToOa () {
    wx.navigateTo({
      url: '/pages/article/index?url=https://mp.weixin.qq.com/s/G8gcjkrFKgwzR7VCxAlq5A',
    })
  },
  goToTrip () {
    wx.navigateTo({
      url: '/pages/goods/detail/index',
    })
  },
  goToSinglePage (location) {
    wx.navigateTo({
      url: '/pages/merchant/detail/index',
    })
    console.log(this.data.location)
  },
  // navigate to add location
  addListing () {
    wx.navigateTo({
      url: '/pages/article/index?url=https://mp.weixin.qq.com/s/p88j0BMIdVLbKlBrsO6c8Q',
    })
  },
  goToIndex (){
    wx.navigateTo({
      url: '/pages/index/index',
    })
  },
  goToRec (){
    wx.navigateTo({
      url: '/pages/merchant/join/index',
    })
  },
  goToTravel (){
    wx.navigateTo({
      url: '/pages/travel/index/index',
    })
  },
// end of new code
  onHide: function () {
  
  },
  onShow: function () {

  },
  onShareAppMessage: function () {
    const image = '/image/logo.png'
    return {
      title: 'BESTOFWUHAN',
      imageUrl: image
    };
  },

  t1: function (t) {
    n.fixedsearch(this, t);
  },
  
}, t(e, "unpaidcolse", function (t) {
  var a = "";
  a = "open" == t.target.dataset.type, this.setData({
    unpaid: a
  });
}), t(e, "unpaidcolse2", function (t) {
  this.setData({
    unpaidhide: !0
  });
}), t(e, "selectPicker", function (t) {
  var a = this;
  wx.getSetting({
    success: function (e) {
      e.authSetting["scope.userInfo"] ? (d.selectpicker(t, a, "goodslist"), a.setData({
        cover: "",
        showvideo: !1
      })) : a.setData({
        modelShow: !0
      });
    }
  });
}), t(e, "specsTap", function (t) {
  var a = this;
  d.specsTap(t, a);
}), t(e, "emptyActive", function () {
  this.setData({
    active: "",
    slider: "out",
    tempname: "",
    specsTitle: ""
  });
}), t(e, "buyNow", function (t) {
  var a = this;
  d.buyNow(t, a);
}), t(e, "getCart", function (t) {
  var a = this;
  d.getCart(t, a);
}), t(e, "select", function () {
  var t = this;
  d.select(t);
}), t(e, "inputNumber", function (t) {
  var a = this;
  d.inputNumber(t, a);
}), t(e, "number", function (t) {
  var a = this;
  d.number(t, a);
}), t(e, "onChange", function (t) {
  return r.onChange(this, t);
}), t(e, "DiyFormHandler", function (t) {
  return r.DiyFormHandler(this, t);
}), t(e, "selectArea", function (t) {
  return r.selectArea(this, t);
}), t(e, "bindChange", function (t) {
  return r.bindChange(this, t);
}), t(e, "onCancel", function (t) {
  return r.onCancel(this, t);
}), t(e, "onConfirm", function (t) {
  return r.onConfirm(this, t);
}), t(e, "getIndex", function (t, a) {
  return r.getIndex(t, a);
}), t(e, "changevoice", function () {
  this.data.sound ? this.setData({
    sound: !1,
    soundpic: !0
  }) : this.setData({
    sound: !0,
    soundpic: !1
  });
}), t(e, "phone", function () {
  var t = this.data.phonenumber + "";
  wx.makePhoneCall({
    phoneNumber: t
  });
}), t(e, "cancelclick", function () {
  this.setData({
    modelShow: !1
  });
}), t(e, "confirmclick", function () {
  this.setData({
    modelShow: !1
  }), wx.openSetting({
    success: function (t) { }
  });
}), t(e, "navigate", function (t) {
  var a = t.currentTarget.dataset.url,
    e = t.currentTarget.dataset.phone,
    i = t.currentTarget.dataset.appid,
    s = t.currentTarget.dataset.appurl;
  a && wx.navigateTo({
    url: a
  }), e && wx.makePhoneCall({
    phoneNumber: e
  }), i && wx.navigateToMiniProgram({
    appId: i,
    path: s
  });
}), t(e, "closecoupon", function () {
  this.setData({
    showcoupon: !1
  });
}), t(e, "closecoupontips", function () {
  this.setData({
    showcoupontips: !1
  });
}), t(e, "tabtopmenu", function (t) {
  var a = this,
    e = a.data.diypages,
    i = (e.items, t.currentTarget.dataset.id, t.currentTarget.dataset.url),
    o = t.currentTarget.dataset.type,
    n = a.data.topmenu,
    r = t.currentTarget.dataset.index;
  if (a.setData({
    topmenuindex: r
  }), "" != i && void 0 != i) {
    if (1 == i.indexOf("pages")) {
      var d = i.lastIndexOf("="),
        u = i.substring(d + 1, i.length);
      s.get("diypage", {
        id: u
      }, function (t) {
        if (0 == t.error) {
          var e = [];
          for (var i in t.diypage.items) e.push(t.diypage.items[i]);
          e.unshift(n);
          var s = new Object();
          for (var r in e) s[r] = e[r], "topmenu" == e[r].id && (e[r].status = o);
          t.diypage.items = s, a.setData({
            diypages: t.diypage,
            topmenuDataType: ""
          });
        }
      });
    } else s.get("diypage/getInfo", {
      dataurl: i
    }, function (t) {
      a.data.topmenu, s.get("diypage", {
        type: "home"
      }, function (e) {
        var i = e.diypage;
        c.each(i.items, function (a, e) {
          if ("topmenu" == e.id) {
            e.status = o;
            for (var i in e.data) i == o && (e.data[i].data = t.goods.list, t.goods.list.length <= 8 && (console.log(t.goods.list.length),
              e.data[i].showmore = !0, console.log(e.data[i])));
          }
        }), 0 == e.error && a.setData({
          diypages: e.diypage,
          topmenuDataType: t.type
        });
      });
    });
    a.setData({
      diypages: e
    });
  }
}), t(e, "tabwidget", function (t) {
  var a = this,
    e = a.data.diypages,
    i = e.items,
    o = t.currentTarget.dataset.id,
    n = t.currentTarget.dataset.url,
    r = t.currentTarget.dataset.type;
  for (var d in i) d == o && (i[d].status = r);
  e.items = i, a.setData({
    diypages: e
  }), "" != n && void 0 != n && s.get("diypage/getInfo", {
    dataurl: n
  }, function (t) {
    console.error(e);
    for (var i in e.items) i == o && (e.items[i].data[r].data = t.goods.list, e.items[i].data[r].type = t.type,
      e.items[i].type = t.type, t.goods.list.length <= 8 && (e.items[i].data[r].showmore = !0),
      console.log(e.items[i]), a.setData({
        diypages: e
      }));
  });
}), t(e, "getstoremore", function (t) {
  var a = this,
    e = t.currentTarget.dataset.id,
    i = a.data.diypages;
  c.each(i.items, function (t, o) {
    if (t == e)
      if (void 0 == o.status || "" == o.status) {
        d = -1 != o.data[0].linkurl.indexOf("stores") ? "stores" : "goods";
        var n = o.data[0].linkurl,
          r = o.data[0].data.length;
        s.get("diypage/getInfo", {
          dataurl: n,
          num: r,
          paramsType: d
        }, function (t) {
          o.data[0].data = t.goods.list, console.error(t.goods), o.data[0].data.length == t.goods.count && (o.data[0].showmore = !0),
            a.setData({
              diypages: i
            });
        });
      } else {
        if (-1 != o.data[o.status].linkurl.indexOf("stores")) d = "stores";
        else var d = "goods";
        var n = o.data[o.status].linkurl,
          r = o.data[o.status].data.length;
        s.get("diypage/getInfo", {
          dataurl: n,
          num: r
        }, function (t) {
          o.data[o.status].data = t.goods.list, console.error(t.goods.count), o.data[o.status].data.length == t.goods.count && (o.data[o.status].showmore = !0),
            a.setData({
              diypages: i
            });
        });
      }
  });
}), t(e, "userinfo", function (t) {
  var a = t.detail.iv,
    e = t.detail.encryptedData;
  i.getUserInfo(null, null, {
    iv: a,
    encryptedData: e
  });
}), t(e, "close", function () {
  i.globalData.flag = !0, wx.reLaunch({
    url: "../index/index"
  });
}), t(e, "initSeckill", function (t) {
  var a = this,
    e = parseInt(t.status),
    s = t.starttime,
    o = t.endtime;
  if (-1 != e) {
    var n = 0,
      r = 0,
      d = i.globalData.approot;
    wx.request({
      url: d + "map.json",
      success: function (i) {
        var d = new Date(i.header.Date) / 1e3;
        n = 0 == e ? o - d : s - d, a.setData({
          lasttime: n
        }), clearInterval(a.data.timer), a.setTimer(t), r = a.setTimerInterval(t), a.setData({
          timer: r
        });
      }
    });
  }
}), t(e, "setTimer", function (t) {
  var a = this,
    e = 0;
  if (-1 != t.status && parseInt(a.data.lasttime) % 10 == 0) {
    var s = i.globalData.approot;
    wx.request({
      url: s + "map.json",
      success: function (i) {
        var s = new Date(i.header.Date) / 1e3;
        e = 0 == t.status ? t.endtime - s : t.starttime - s, a.setData({
          lasttime: e
        });
      }
    });
  }
  e = parseInt(a.data.lasttime) - 1;
  var o = a.formatSeconds(e);
  a.setData({
    lasttime: e,
    hour: o.hour,
    min: o.min,
    sec: o.sec
  }), e <= 0 && a.onLoad();
}), t(e, "setTimerInterval", function (t) {
  var a = this;
  return setInterval(function () {
    a.setTimer(t);
  }, 1e3);
}), t(e, "formatSeconds", function (t) {
  var a = parseInt(t),
    e = 0,
    i = 0;
  return a > 60 && (e = parseInt(a / 60), a = parseInt(a % 60), e > 60 && (i = parseInt(e / 60),
    e = parseInt(e % 60))), {
      hour: i < 10 ? "0" + i : i,
      min: e < 10 ? "0" + e : e,
      sec: a < 10 ? "0" + a : a
    };
}), e));