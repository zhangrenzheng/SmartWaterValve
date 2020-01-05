// pages/shareDevice/shareDevice.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: app.globalData.openID,
    switch1Checked: false,
    switch2Checked: false,
    u_openID: '',
    device_id: '',
    userPhone: '',
    type: '',

    /*设备分享弹出框 可见性 */
    shareDeviceDialogVisible: false,

    /* 保存 request 返回结果 */
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      device_id: decodeURIComponent(options.device_id),
      openID: app.globalData.openID,
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

  switch1Change: function (e) {
    this.setData({
      switch1Checked: e.detail.value
    })

    if (this.data.switch1Checked == true) {
      this.setData({
        switch2Checked: false
      })
    }

    if (this.data.switch2Checked == true) {
      if (this.data.switch1Checked == true) {
        this.setData({
          type: ''
        })
      } else {
        this.setData({
          type: '1'
        })
      }
    } else if (this.data.switch1Checked == true) {
      this.setData({
        type: '0'
      })
    } else {
      this.setData({
        type: ''
      })
    }
  },

  switch2Change: function (e) {
    this.setData({
      switch2Checked: e.detail.value
    })

    if (this.data.switch2Checked == true) {
      this.setData({
        switch1Checked: false
      })
    }

    if (this.data.switch2Checked == true) {
      if (this.data.switch1Checked == true) {
        this.setData({
          type: ''
        })
      } else {
        this.setData({
          type: '1'
        })
      }
    } else if (this.data.switch1Checked == true) {
      this.setData({
        type: '0'
      })
    } else {
      this.setData({
        type: ''
      })
    }
  },

  /* 设备分享弹出框 相关函数 */
  showShareDeviceDialog: function () {
    this.setData({
      shareDeviceDialogVisible: true,
    })
  },

  hideShareDeviceDialog: function () {
    this.setData({
      shareDeviceDialogVisible: false,
      userPhone: ''
    })
  },

  inputUserPhone: function (e) {
    this.setData({
      userPhone: e.detail.value
    })
  },

  clearUserPhone: function () {
    this.setData({
      userPhone: ""
    })
  },

  requestAddAccessCtrlUser: function () {
    var that = this;
    var openID = that.data.openID;
    var userPhone = that.data.userPhone;
    var device_id = that.data.device_id;
    var type = that.data.type;
    
    wx.request({
      url: 'https://swv.wuwz.net/addAccessCtrlUsers?a_openID=' + encodeURIComponent(openID)
        + '&phone=' + encodeURIComponent(userPhone)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&type=' + encodeURIComponent(type),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("添加用户访问控制权限：操作成功")
          wx.showToast({
            title: '操作成功',
            icon: 'succsses',
            duration: 2000
          });
        }
        if (that.data.result == 2)
        {
          console.log("添加用户访问控制权限：无权限，不是管理员")
          wx.showToast({
            title: '无权限',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 3)
        {
          console.log("添加用户访问控制权限：无此用户")
          wx.showToast({
            title: '无此用户',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 0)
        {
          console.log("添加用户访问控制权限：操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  confirmShareDevice: function () {
    if (!this.data.type || !this.data.userPhone)
      return
    this.requestAddAccessCtrlUser()
    this.hideShareDeviceDialog()
  }
})