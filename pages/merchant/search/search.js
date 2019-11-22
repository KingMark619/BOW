// pages/merchant/search/search.js
Page({

  /**
   * Page initial data
   */
  data: {
    id:'',
    catId:'',
    type:true,
    lang: 'en',
    curtain: '',
    loaded: '',
    location: [],
    title:[],
    categories: [],
    suggestedIndex:[],
    suggestions: [],
    answers:[],

    inputValue:'',
    userLocation: {},
    searchInput: '',
    searchResults: [],
    nativeSuggestions: [],
    
  },

  /**
   * Lifecycle function--Called when page load
   */
  onLoad: function (options) {
    
    console.log(options)
    this.setData({
      id: options.id,
      title: options.list,
      catId: options.catId,
      curtain: 'show',
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
  look (e){
    let value = e.detail.value.toUpperCase()
    // let value = val.toLowerCase()
    let list = this.data.title.split(',')
    let locat = this.data.location
    let newList = []
    let results = []
    let newLoc = []
    let ind = []

    list.forEach( function (ele){
      let newElement = ele.toUpperCase()
      newList.push(newElement)
    })
    newList.forEach(function (element,index) {
        if (element.search(value) > -1){
          if (value != ''){
            ind.push(index)
            results.push(element)
          }
        }
        else {
          console.log('nope')
        }
      })

    ind.forEach(function(li){
      newLoc.push(locat[li])
    })  
    this.setData({
      suggestedIndex : ind,
      suggestions: results,
      answers: newLoc
    })
  },
  displaySearch (){
    // let showResult = []
    // let index = this.data.suggestedIndex
    // let list = this.data.location

    // index.forEach(function(li,id){
    //   console.log(list[li])
    // })
  },
  test(e) {
    // this.setData({
    //   inputValue: e.detail.value
    // })
    // const findSearch = function (mySearch, title) {
    //   const titleReturned = mySearch.find(function (search, index) {
    //     return search.title.toLowerCase() === title.toLowerCase()
    //   })
    //   return titleReturned
    // }

    // let printMe = findSearch(this.data.location, this.data.inputValue)
    // console.log(printMe) 
    // if(printMe != undefined){
    //   this.setData({
    //     searchResults: printMe,
    //     searchOkay: true,
    //     noResult: false
    //   })
    // }
    // else {
    //   this.setData({
    //     noResult: true,
    //     searchOkay: false,
    //   })
    // }
    
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