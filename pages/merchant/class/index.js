var t = getApp(), xHttp = t.requirejs("core"), a = (t.requirejs("icons"), t.requirejs("jquery"));
Page({
  data: {
    classList: []
  },
  onLoad: function(options) {
    
    var that = this;
    xHttp.get("merchant/getAllCategory",{},function(e){
      console.log(e)
      that.setData({
          classList: e.result.data
        });
    })
  },
  onReady: function() {},
  onShow: function() {},
  onHide: function() {},
  onUnload: function() {},
  onPullDownRefresh: function() {},
  onReachBottom: function() {},
  onShareAppMessage: function() {}
});