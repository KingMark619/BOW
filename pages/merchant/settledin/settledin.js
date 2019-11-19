var t = getApp(), e = t.requirejs("core"), a = t.requirejs("foxui"), i = t.requirejs("biz/diyform"), n = t.requirejs("jquery");

Page({

  /**
   * 页面的初始数据
   */
  data: {
    istip:false,
    issubmit:false,
    ispass:false,
    applytitle:'',
    applycontent:'',
    submit: !1,
    diyform: {},
    postData: {},
    shop:{},
    url:'',
    checkStatus:0,
    checks:false,
    id:0,
    img:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },
  showTip:function(){
    var that=this;
    e.get("merchant/getprotocol", {}, function (res) {
      console.log(res)
      that.setData({
        applytitle:res.data.applytitle,
        applycontent:res.data.applycontent,
        istip: true
      });
    });
  },
  closeTip: function () {
    var that = this;
    that.setData({
      istip: false
    });
  },
  onChange: function (t) {
    var a = t.detail.value, i = e.pdata(t).type, r = this.data.postData;
    r[i] = n.trim(a), this.setData({
      postData: r
    }); 
  },
  pleaseLogin:function(){
    var that=this;
    let url = encodeURIComponent(that.data.url)
    wx.navigateTo({
      url: '/pages/merchant/settledin/index/index?url='+url,
    })
  },
  submit: function (op) {
    console.log(op)
    var t = this, r = t.data, o = r.diyform;  
    console.log(r.postData.realname)  
    if (!r.postData.name) return void
      wx.showToast({
        title: "请填写商户名称",
        icon: 'none',
        duration: 1500
      });
    if (!r.postData.introduction) return void 
    wx.showToast({
      title: "请填写商户简介",
      icon: 'none',
      duration: 1500
    });
    if (!r.postData.businessname) return void 
      wx.showToast({
        title: "请填写主营项目",
        icon: 'none',
        duration: 1500
      });
    if (!r.postData.city) return void 
      wx.showToast({
        title: "请填写所在城市",
        icon: 'none',
        duration: 1500
      });
    if (!r.postData.weixin) return void 
      wx.showToast({
        title: "请填写微信",
        icon: 'none',
        duration: 1500
      });
    if (!r.postData.realname) return void 
      wx.showToast({
        title: "请填写联系人",
        icon: 'none',
        duration: 1500
      });
    if (!n.isMobile(r.postData.mobile)) return void 
      wx.showToast({
        title: "请填写手机号",
        icon: 'none',
        duration: 1500
      });
    
    if (t.data.checkStatus==0) return void
      wx.showToast({
        title: "请阅读入驻协议",
        icon: 'none',
        duration: 1500
      });
      t.setData({
        submit: !0
      });
    var s = {
      data: t.data.postData,
      rules: t.data.checkStatus,
      id: op.currentTarget.dataset.id
    };
    e.post("merchant/submit", s , function (e) {
      console.log(e)
      if (e.status==1){
      wx.showToast({
        title: "提交成功",
        icon: 'none',
        duration: 1500
      });
        // wx.navigateBack({
        //   delta:1
        // });
        wx.switchTab({
          url: '/pages/index/index',
        });
      }else{
        wx.showToast({
          title: "提交失败",
          icon: 'none',
          duration: 1500
        });
      }
      });
   
  },
  checkboxChange:function(e){
    var that=this;
    console.log(e)
    if (that.data.checks==false){
      var selected = 1;
      that.setData({
        checkStatus: selected,
        checks: true
      });
    }else{
      var selected = 0;
      that.setData({
        checkStatus: selected,
        checks: false
      });
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.getmessage();
  },
  getmessage: function () {
    var t = this;
    e.get("merchant/checkmerch", {}, function (e) {
      console.log(e)
      if (e.data != ''){
        if (e.data.status==0){
          t.setData({
            issubmit: true,
            img: e.thumb
          });
        }
        else{
          var a = e.data, i = {
            shop: a,
            img: e.thumb
          };
          
          t.setData({
            ispass: true,
            url:e.url
          });
        }
        
      }else{
        t.setData({
          issubmit: false,
          img: e.thumb
        });
      }
      var a = e.data, i = {
        shop: a,
      };
       e.data!='' && (i.postData = {
       name: a.merchname,
       introduction: a.salecate,
       businessname: a.desc,
       city: a.city,
       email: a.email,
       weixin: a.weixin,
       realname: a.realname,
       mobile: a.mobile,
       contact: a.contact,
       passworld:a.passworld
      }), t.setData(i);
    });
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})