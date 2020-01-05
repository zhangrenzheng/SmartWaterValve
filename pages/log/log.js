// pages/log/log.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    device_id: '',
    deviceLog: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      device_id: decodeURIComponent(options.device_id)
    })
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
    var that = this;
    var device_id = this.data.device_id;
    let dateArrayTemp = [
      ""
    ];

    wx.request({
      url: 'https://swv.wuwz.net/DeviceHistoryInfo?device_id=' + encodeURIComponent(device_id),
      success: function (res) {
        that.setData({
          deviceLog: res.data
        })
      }
    })
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
    var that = this;
    var device_id = this.data.device_id;
    let dateArrayTemp = [
      ""
    ];

    wx.request({
      url: 'https://swv.wuwz.net/DeviceHistoryInfo?device_id=' + encodeURIComponent(device_id),
      success: function (res) {
        that.setData({
          deviceLog: res.data
        })
      }
    })

    wx.stopPullDownRefresh();
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

  },

  /* 禁止 swiper 手动滑动 */
  catchTouchMove: function (res) {
    return false
  }
})