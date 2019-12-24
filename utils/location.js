let coordinates = {
  latitude : '',
  longitude : ''
}
wx.getLocation({
  type: 'wgs84',
  altitude: true,
  success: (res) => {
    const latitude = res.latitude
    const longitude = res.longitude
    coordinates.latitude = res.latitude
    coordinates.longitude = res.longitude
  },
})