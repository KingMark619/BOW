// component/gallery/index.js

import { head } from '../../utils/ramda.min'

Component({
  properties: {
    galleryImages: {
      type: Array,
      default: []
    },
    poster: {
      type: String,
      default: ''
    }
  },

  data: {
    photo: ['http://wallpapercave.com/wp/7jKtgQb.jpg', 'https://cn.bing.com/th?id=OIP.mG6O8opcDictv9ikZFj07AHaEL&pid=Api&w=852&h=480&rs=1'],
    galleryData: [],
    intoView: '',
    showFullGallery: false,
    stopScrollOutside: false,
    gSet: {
      img2B2HW: undefined,
      img1B1HW: undefined,
      img2B1W: undefined,
      img2B1H: undefined,
      img1B2W: undefined,
      img1B2H: undefined,
      mTop: undefined,
      mBot: undefined
    },
    titleImage: null
  },
  methods: {
    preview(){
      this.triggerEvent('preview')
    },
    more(){
      this.triggerEvent('more')
    },
    setGalleryImages() {
      return new Promise((resolve, reject) => {
        let images = this.data.galleryImages
        const imgUrls = images.map(img =>
          img.image !== null ?
            img.image : null
        ).filter(url => url !== null)

        let titleImg = imgUrls.shift()
        imgUrls.push(titleImg)
        this.setData({ imgUrls })

        if (images.length === 0) {
          images = [{ url: "/resources/images/no-image.svg" }]
        }

        this.setGalleryWidthsAndHeights()
        this.setTitleImage(images)

        const galleryData = this.createGalleryData(images)
        if (galleryData.length > 0) {
          this.setData({ galleryData })
          resolve(true)
        }
      })
    },

    setGalleryWidthsAndHeights() {
      return this.promGetSystemInfo().then(device => {
        const margin = device.windowWidth / 64
        const oneWidth = (device.windowWidth - margin * 4) * 1 / 3
        const twoWidth = (device.windowWidth - margin * 4) * 2 / 3 + margin
        const threeWidth = (device.windowWidth - margin * 4) * 3 / 3 + 2 * margin

        const gSet = {
          img3B2W: threeWidth,
          img3B2H: twoWidth,
          img2B2HW: twoWidth,
          img1B1HW: oneWidth,
          img2B1W: twoWidth,
          img2B1H: oneWidth,
          img1B2W: oneWidth,
          img1B2H: twoWidth,
          containerPadding: margin,
          mTop: margin / 2,
          mBot: margin / 2,
          titleImageHeight: device.windowHeight / 3
        }
        this.setData({ gSet: gSet })
      })
    },

    setTitleImage(images) {
      const index = images.map((img, index) => (img.image !== null) ? index : undefined)
        .filter(index => index !== undefined)
      this.setData({
        titleImage: (
          images[head(index)]['url'] !== undefined)
          ? images[head(index)]['url']
          : images[head(index)]['image']
      })
      images.splice(index, 1)
    },

    promGetSystemInfo() {
      return new Promise((resolve, reject) => {
        wx.getSystemInfo({
          success: res => resolve(res),
          failure: res => reject(res)
        })
      })
    },

    createGalleryData(images) {
      const results = []
      let parsedImages = images.filter(img => img.image !== null)
      let state = 0
      const imagesLength = parsedImages.length + 1
      for (let i = 0; i < imagesLength; i++) {
        if (parsedImages.length === 0) return results

        let availableChoices = []

        if (state === 0) {
          if (parsedImages.length > 2) {
            availableChoices = [
              { newState: 1, type: 'one-by-one' },
              { newState: 2, type: 'two-by-one' },
              { newState: 4, type: 'one-by-two' },
              { newState: 3, type: 'two-by-two' },
              { newState: 4, type: 'vertical-two-small' },
              { newState: 0, type: 'three-by-two' }
            ]
          } else if (parsedImages.length === 2) {
            availableChoices = [
              { newState: 1, type: 'one-by-one' },
              { newState: 2, type: 'two-by-one' },
              { newState: 4, type: 'one-by-two' },
              { newState: 3, type: 'two-by-two' },
              { newState: 0, type: 'three-by-two' }
            ]
          } else {
            availableChoices = [
              { newState: 0, type: 'three-by-two', }
            ]
          }
        } else if (state === 1) {
          if (parsedImages.length > 1) {
            availableChoices = [
              { newState: 2, type: 'one-by-one' },
              { newState: 0, type: 'two-by-one' }
            ]
          } else {
            availableChoices = [
              { newState: 0, type: 'two-by-one' }
            ]
          }
        } else if (state === 2) {
          availableChoices = [
            { newState: 0, type: 'one-by-one' }
          ]
        } else if (state === 3) {
          if (parsedImages.length > 1) {
            availableChoices = [
              { newState: 0, type: 'one-by-two' },
              { newState: 0, type: 'vertical-two-small' }
            ]
          } else {
            availableChoices = [
              { newState: 0, type: 'one-by-two' }
            ]
          }
        } else if (state === 4) {
          if (parsedImages.length > 2) {
            availableChoices = [
              { newState: 3, type: 'one-by-two' },
              { newState: 3, type: 'vertical-two-small' },
              { newState: 0, type: 'two-by-two' }
            ]
          } else if (parsedImages.length === 2) {
            availableChoices = [
              { newState: 3, type: 'one-by-two' },
              { newState: 0, type: 'two-by-two' }
            ]
          } else {
            availableChoices = [
              { newState: 0, type: 'two-by-two' }
            ]
          }
        }

        let choice

        for (let availableChoice of availableChoices) {
          if (
            parsedImages[0]['text'] !== undefined &&
            availableChoice['type'] === parsedImages[0]['text'].trim()
          ) {
            choice = availableChoice
          }
        }
        if (choice === undefined) choice = this.pickRandom(availableChoices)

        if ([
          'one-by-one',
          'two-by-one',
          'one-by-two',
          'two-by-two',
          'three-by-two'
        ].includes(choice['type'])
        ) {
          results.push({
            images: [parsedImages[0]['image']],
            type: choice['type']
          })
          parsedImages.shift()
        } else if (choice['type'] === 'vertical-two-small') {
          results.push({
            images: [parsedImages[0]['image'], parsedImages[1]['image']],
            type: choice['type']
          })
          parsedImages.shift()
          parsedImages.shift()
        } else throw new Error('type not recognised: ' + choice['type'])
        state = choice['newState']
      }
    },

    pickRandom(array) {
      var index = this.pickRandomNumberBetween(0, array.length - 1)
      return array[index]
    },

    pickRandomNumberBetween(a, b) {
      return (a + Math.floor(Math.random() * (b - a + 1)))
    },

    imageTapped(item) {
      wx.previewImage({
        urls: this.data.imgUrls,
        current: item.currentTarget.id
      })
    },

    reachedTop(e) {
      this.setData({
        showFullGallery: true,
        stopScrollOutside: true,
        intoView3: 'red3'
      })
      this.triggerEvent('hideMap')
      this.triggerEvent('stopScroll')
    },

    reachedBottomInside(e) {
      this.setData({
        showFullGallery: false,
        stopScrollOutside: false
      })
      this.triggerEvent('showMap')
    }
  }
})

// Component({
//   properties: {
//     photos: {
//       type: Array,
//       default: []
//     }
//   },
//   data: {
//     photo: ['http://wallpapercave.com/wp/7jKtgQb.jpg','https://cn.bing.com/th?id=OIP.mG6O8opcDictv9ikZFj07AHaEL&pid=Api&w=852&h=480&rs=1']
//   },
//   methods: {

//   },
//   onLoad: function (options) {

//   },
//   onShow: function () {

//   }
// })