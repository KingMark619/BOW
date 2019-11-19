var t = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(t) {
    return typeof t;
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : typeof t;
}, e = "function" == typeof Symbol && "symbol" == t(Symbol.iterator) ? function(e) {
    return void 0 === e ? "undefined" : t(e);
} : function(e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : void 0 === e ? "undefined" : t(e);
}, o = "function" == typeof Symbol && "symbol" == e(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : e(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : e(t);
}, n = "function" == typeof Symbol && "symbol" == o(Symbol.iterator) ? function(t) {
    return void 0 === t ? "undefined" : o(t);
} : function(t) {
    return t && "function" == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? "symbol" : void 0 === t ? "undefined" : o(t);
}, i = require("jquery");

module.exports = {
    toQueryPair: function(t, e) {
        return void 0 === e ? t : t + "=" + encodeURIComponent(null === e ? "" : String(e));
    },
    getUrl: function(t, e, o) {
        t = t.replace(/\//gi, ".");
        var r = getApp().getConfig().api + "&r=" + t;
        return e && ("object" == (void 0 === e ? "undefined" : n(e)) ? r += "&" + i.param(e) : "string" == typeof e && (r += "&" + e)), 
        r;
    },
    json: function(t, e, o, n, r, a) {
        var s = getApp(), c = s.getCache("userinfo_openid"), u = s.getCache("usermid"), f = s.getCache("authkey");
        (e = e || {}).comefrom = "wxapp", e.openid = "sns_wa_" + c, u && (e.mid = u.mid, 
        e.merchid = e.merchid || u.merchid);
        var d = this;
        n && d.loading(), e && (e.authkey = f || "");
        var l = {
            url: (r ? this.getUrl(t) : this.getUrl(t, e)) + "&timestamp=" + +new Date(),
            method: r ? "POST" : "GET",
            header: {
                "Content-type": r ? "application/x-www-form-urlencoded" : "application/json",
                Cookie: "PHPSESSID=" + c
            }
        };
        a || delete l.header.Cookie, r && (l.data = i.param(e)), o && (l.success = function(t) {
            if (n && d.hideLoading(), "request:ok" == t.errMsg && "function" == typeof o) {
                if (s.setCache("authkey", t.data.authkey || ""), void 0 !== t.data.sysset) {
                    if (1 == t.data.sysset.isclose) return void wx.redirectTo({
                        url: "/pages/message/auth/index?close=1&text=" + t.data.sysset.closetext
                    });
                    s.setCache("sysset", t.data.sysset);
                }
                o(t.data);
            }
        }), l.fail = function(t) {
            n && d.hideLoading(), d.alert(t.errMsg);
        }, wx.request(l);
    },
    post: function(t, e, o, n, i) {
        this.json(t, e, o, n, !0, i);
    },
    get: function(t, e, o, n, i) {
        this.json(t, e, o, n, !1, i);
    },
    getDistanceByLnglat: function(t, e, o, n) {
        function i(t) {
            return t * Math.PI / 180;
        }
        var r = i(e), a = i(n), s = r - a, c = i(t) - i(o), u = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(s / 2), 2) + Math.cos(r) * Math.cos(a) * Math.pow(Math.sin(c / 2), 2)));
        return u *= 6378137, u = Math.round(1e4 * u) / 1e7;
    },
    alert: function(t, e) {
        "object" === (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), wx.showModal({
            title: "提示",
            content: t,
            showCancel: !1,
            success: function(t) {
                t.confirm && "function" == typeof confirm && e();
            }
        });
    },
    confirm: function(t, e, o) {
        "object" === (void 0 === t ? "undefined" : n(t)) && (t = JSON.stringify(t)), wx.showModal({
            title: "提示",
            content: t,
            showCancel: !0,
            success: function(t) {
                t.confirm ? "function" == typeof e && e() : "function" == typeof o && o();
            }
        });
    },
    loading: function(t) {
        void 0 !== t && "" != t || (t = "加载中"), wx.showToast({
            title: t,
            icon: "loading",
            duration: 5e6
        });
    },
    hideLoading: function() {
        wx.hideToast();
    },
    toast: function(t, e) {
        e || (e = "success"), wx.showToast({
            title: t,
            icon: e,
            duration: 1e3
        });
    },
    success: function(t) {
        wx.showToast({
            title: t,
            icon: "success",
            duration: 1e3
        });
    },
    upload: function(t) {
        var e = this;
        wx.chooseImage({
            success: function(o) {
                e.loading("正在上传...");
                var n = e.getUrl("util/uploader/upload", {
                    file: "file"
                }), i = o.tempFilePaths;
                wx.uploadFile({
                    url: n,
                    filePath: i[0],
                    name: "file",
                    success: function(o) {
                        e.hideLoading();
                        var n = JSON.parse(o.data);
                        if (0 != n.error) e.alert("上传失败"); else if ("function" == typeof t) {
                            var i = n.files[0];
                            t(i);
                        }
                    }
                });
            }
        });
    },
    pdata: function(t) {
        return t.currentTarget.dataset;
    },
    data: function(t) {
        return t.target.dataset;
    },
    phone: function(t) {
        var e = this.pdata(t).phone;
        wx.makePhoneCall({
            phoneNumber: e
        });
    },
    pay: function(t, e, o) {
        return "object" == (void 0 === t ? "undefined" : n(t)) && "function" == typeof e && (t.success = e, 
        "function" == typeof o && (t.fail = o), void wx.requestPayment(t));
    },
    cartcount: function(t) {
        this.get("member/cart/count", {}, function(e) {
            t.setData({
                cartcount: e.cartcount
            });
        });
    },
    onShareAppMessage: function(t, e) {
        var o = getApp(), n = o.getCache("sysset"), i = n.share || {}, r = o.getCache("userinfo_id"), a = n.shopname || "", s = n.description || "";
        return i.title && (a = i.title), e && (a = e), i.desc && (s = i.desc), t = t || "/pages/index/index", 
        t = -1 != t.indexOf("?") ? t + "&" : t + "?", {
            title: a,
            desc: s,
            path: t + "mid=" + r
        };
    },
    str2Obj: function(t) {
        if ("string" != typeof t) return t;
        if (t.indexOf("&") < 0 && t.indexOf("=") < 0) return {};
        var e = t.split("&"), o = {};
        return i.each(e, function(t, e) {
            if (e.indexOf("=") > -1) {
                var n = e.split("=");
                o[n[0]] = n[1];
            }
        }), o;
    }
};