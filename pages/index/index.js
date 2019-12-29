// pages/test/test.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    item: 0,
    tab: 0,
    displayAllDevice: false,
    deviceList: [
      {
        deviceName: "二楼水阀 #1",
        deviceId: 0,
        deviceRemarkInformation: "备注信息",
        deviceStatus: "",
        deviceValvePosition: "56"
      },
      {
        deviceName: "二楼水阀 #2",
        deviceId: 1,
        deviceRemarkInformation: "备注信息",
        deviceStatus: "",
        deviceValvePosition: "60"
      },
      {
        deviceName: "二楼水阀 #3",
        deviceId: 2,
        deviceRemarkInformation: "备注信息",
        deviceStatus: "",
        deviceValvePosition: "60"
      },
      {
        deviceName: "二楼水阀 #4",
        deviceId: 3,
        deviceRemarkInformation: "备注信息",
        deviceStatus: "",
        deviceValvePosition: "60"
      },
      {
        deviceName: "二楼水阀 #5",
        deviceId: 4,
        deviceRemarkInformation: "备注信息",
        deviceStatus: "",
        deviceValvePosition: "60"
      }
    ]
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
    var deviceId = this.data.deviceList[e.target.id].deviceId;
    var deviceName = this.data.deviceList[e.target.id].deviceName;
    var deviceRemarkInformation = this.data.deviceList[e.target.id].deviceRemarkInformation;

    wx.navigateTo({
      url: "/pages/settings/settings?deviceId=" + encodeURIComponent(deviceId) +
        "&deviceName=" + encodeURIComponent(deviceName) + "&deviceRemarkInformation" +
        encodeURIComponent(deviceRemarkInformation),
    })
  },

  /* 跳转至 控制面板 页面 */
  jumpToControlPanel: function (e) {
    wx.navigateTo({
      url: "/pages/controlPannel/controlPannel",
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