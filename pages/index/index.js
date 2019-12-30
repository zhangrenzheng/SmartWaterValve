const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    displayAllDevice: false,
    openID: app.globalData.openID,
    deviceList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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
    var openID = this.data.openID;

    /* 获取设备列表 */
    wx.request({
      url: 'https://swv.wuwz.net/UserDevices?openID=' + encodeURIComponent(openID),
      success: function (res) {
        that.setData({
          deviceList: res.data
        })
      }
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

  },

  displayAllDevice: function (e) {
    var display = this.data.displayAllDevice;
    this.setData({
      displayAllDevice: (display == true ? false : true)
    })
  },

  /* 禁止 swiper 手动滑动 */
  catchTouchMove: function (res) {
    return false
  },

  /* 跳转至 设置 页面 */
  jumpToSettings: function (e) {
    var device_id = this.data.deviceList[e.target.id].device_id;
    var show_name = this.data.deviceList[e.target.id].show_name;
    var remark = this.data.deviceList[e.target.id].remark;
    
    wx.navigateTo({
      url: "/pages/settings/settings?device_id=" + encodeURIComponent(device_id) +
        "&show_name=" + encodeURIComponent(show_name) + "&remark=" + encodeURIComponent(remark),
    })
  },

  /* 跳转至 控制面板 页面 */
  jumpToControlPanel: function (e) {
    var device_id = this.data.deviceList[e.target.id].device_id;
    var show_name = this.data.deviceList[e.target.id].show_name;

    wx.navigateTo({
      url: "/pages/controlPannel/controlPannel?device_id=" + encodeURIComponent(device_id) +
        "&show_name=" + encodeURIComponent(show_name),
    })
  },

  /**
   * 切换 TabBar 相关函数
   */
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
  },

  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })
  }
})