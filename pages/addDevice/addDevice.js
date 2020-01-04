const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: app.globalData.openID,
    device_id: '',
    source: '',
    result: '',
    addDeviceDialogVisable: false
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

  requestAddDevice: function () {
    var that = this;
    var device_id = that.data.device_id;
    var openID = that.data.openID;
    var source = that.data.source;

    wx.request({
      url: 'https://swv.wuwz.net/addDevice?device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID)
        + '&source=' + encodeURIComponent(source),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("添加设备：操作成功")
          that.setData({
            source: ''
          })
          wx.navigateBack()
        }
        if (that.data.result == 0)
          console.log("添加设备：操作失败")
      }
    })
  },

  /* 扫描二维码添加设备 */
  addDeviceByScanCode: function () {
    var that = this;

    that.setData({
      source: '0'
    })

    wx.scanCode({
      onlyFromCamera: true,
      scanType: 'QR_CODE',
      success (res) {
        console.log(res.result)
        that.setData({
          device_id: res.result
        })
        that.requestAddDevice();
      }
    })
  },

  addDeviceByInput: function () {
    this.setData({
      addDeviceDialogVisable: !this.data.addDeviceDialogVisable,
      source: '1'
    })
  },

  cancelAddDevice: function () {
    this.setData({
      addDeviceDialogVisable: false
    });
  },

  inputDeviceId: function (e) {
    this.setData({
      device_id: e.detail.value
    });
  },

  confirmAddDevice: function () {
    if (!this.data.device_id)
      return
    this.requestAddDevice()
    this.setData({
      addDeviceDialogVisable: false
    })
  }
})