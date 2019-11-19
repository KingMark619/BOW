// pages/merchant/search/search.js
Page({

  /**
   * Page initial data
   */
  data: {
    id:'',
    lang: 'en',
    curtain: '',
    loaded: '',
    location: [],
    categories: [],
    searchOkay: false,
    inputValue:'',
    noResult: false,
    userLocation: {},
    hidden: false,
    sortOpen: false,
    searchOpen: false,
    searchInput: '',
    searchResults: [],
    parent: '',
    currentParams: '',
    loadmore: false,
    nextpage: 2,
    placeholder: '',
    isSearch: false,
    amapSuggestions: [],
    nativeSuggestions: [],
    suggestions: []
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      id: options.id,
      type: options.type,
      curtain: 'show'
    })
    wx.request({
      url: `https://bestofwuhan.cn/wp-json/listing/category/${this.data.id}`,
      data: '',
      header: {},
      method: 'GET',
      dataType: 'json',
      responseType: 'text',
      success: (res) => {
        console.log(res.data)
        this.setData({
          location: res.data,
          loaded: 'loaded'
        })
        console.log(this.data.location)
      },
    })
  },
  
  openSort() {
    this.setData({
      sortOpen: !this.data.sortOpen
    })
  },
  clear() {
    wx.navigateBack({
      delta: 1,
    })
  },
  focusSearch(e) {
    if (false === this.data.searchOpen) {
      this.setData({
        searchOpen: true,
        sortOpen: false
      })
    }
  }, 
  toggleSearch(e) {
    if (e && 'close' === e.currentTarget.dataset.action) {
      this.setData({
        searchInput: '',
        searchResults: [],
        currentParams: ''
      })
    }

    this.setData({
      searchOpen: !this.data.searchOpen,
      sortOpen: false
    })
  },
  searchDone(e) {
    let query = encodeURIComponent(e.detail.value.trim())
    if (query) {
      this.performSearch(query)
    }
  },
  test(e) {
    this.setData({
      inputValue: e.detail.value
    })
    const findSearch = function (mySearch, title) {
      const titleReturned = mySearch.find(function (search, index) {
        return search.title.toLowerCase() === title.toLowerCase()
      })
      return titleReturned
    }

    let printMe = findSearch(this.data.location, this.data.inputValue)
    console.log(printMe) 
    if(printMe != undefined){
      this.setData({
        searchResults: printMe,
        searchOkay: true,
        noResult: false
      })
    }
    else {
      this.setData({
        noResult: true,
        searchOkay: false,
      })
    }
    
  },
  input(e){
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * Lifecycle function--Called when page is initially rendered
   */
  onReady: function () {

  },
  addListing() {
    wx.navigateTo({
      url: '/pages/article/index?url=https://mp.weixin.qq.com/s/p88j0BMIdVLbKlBrsO6c8Q',
    })
  },
  /**
   * Lifecycle function--Called when page show
   */
  onShow: function () {

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
})