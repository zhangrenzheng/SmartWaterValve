// pages/settings/settings.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: app.globalData.openID,
    device_id: 0,
    show_name: "",
    showNameToDisplay: "",
    remark: "",
    remarkToDisplay: "",
    team: "",
    teamName: "",

    /* 弹窗显示控制 */
    modifyDeviceNameDialogVisible: false,
    deleteDeviceDialogVisible: false,
    deviceGroupingDialogVisible: false,

    result: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      device_id: decodeURIComponent(options.device_id),
      show_name: decodeURIComponent(options.show_name),
      remark: decodeURIComponent(options.remark),
      team: decodeURIComponent(options.team),
      teamName: decodeURIComponent(options.teamName)
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

  checkResult: function () {
    console.log("操作成功")
  },



  /* 修改设备名称弹出框 相关函数 */
  showModifyDeviceNameDialog: function () {
    this.setData({
      modifyDeviceNameDialogVisible: true,
      showNameToDisplay: this.data.show_name,
      remarkToDisplay: this.data.remark
    })
  },

  hideModifyDeviceNameDialog: function () {
    this.setData({
      modifyDeviceNameDialogVisible: false
    })
  },

  inputShowName: function (e) {
    this.setData({
      showNameToDisplay: e.detail.value
    })
  },

  inputRemark: function (e) {
    this.setData({
      remarkToDisplay: e.detail.value
    })
  },

  clearShowName: function () {
    this.setData({
      showNameToDisplay: ""
    })
  },

  clearRemark: function () {
    this.setData({
      remarkToDisplay: ""
    })
  },

  requestModifyDeviceName: function () {
    var that = this;
    var show_name = this.data.show_name;
    var remark = this.data.remark;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/UpdateDeviceName?remark=' + encodeURIComponent(remark) +
        '&show_name=' + encodeURIComponent(show_name)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
          that.checkResult()
        if (that.data.result == 2)
          console.log("无权限")
        if (that.data.result == 0)
          console.log("操作失败")
      }
    })
  },

  confirmModifyDeviceName: function () {
    if (!this.data.showNameToDisplay || !this.data.remarkToDisplay)
      return
    this.setData({
      show_name: this.data.showNameToDisplay,
      remark: this.data.remarkToDisplay,
      showNameToDisplay: "",
      remarkToDisplay: ""
    })
    this.requestModifyDeviceName()
    this.hideModifyDeviceNameDialog()
  },

  /* 删除设备弹出框 相关函数 */
  showDeleteDeviceDialog: function () {
    this.setData({
      deleteDeviceDialogVisible: true
    })
  },

  hideDeleteDeviceDialog: function () {
    this.setData({
      deleteDeviceDialogVisible: false
    })
  },

  requestDeleteDevice:function () {
    var that = this;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/delDevice?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
          that.checkResult()
        if (that.data.result == 2)
          console.log("无权限")
        if (that.data.result == 0)
          console.log("操作失败")
      }
    })
  },

  deleteDevice: function () {
    this.requestDeleteDevice();
    this.hideDeleteDeviceDialog();
    wx.navigateBack({
      delta: 1,
    })
  },


  /* 设备分组弹出框 相关函数 */
  showDeviceGroupingDialog: function () {
    this.setData({
      deviceGroupingDialogVisible: true,
      teamToDisplay: this.data.team,
      teamNameToDisplay: this.data.teamName
    })
  },

  hideDeviceGroupingDialog: function () {
    this.setData({
      deviceGroupingDialogVisible: false
    })
  },

  inputTeam: function (e) {
    this.setData({
      teamToDisplay: e.detail.value
    })
  },

  inputTeamName: function (e) {
    this.setData({
      teamNameToDisplay: e.detail.value
    })
  },

  clearTeam: function () {
    this.setData({
      teamToDisplay: ""
    })
  },

  clearTeamName: function () {
    this.setData({
      teamNameToDisplay: ""
    })
  },

  requestDeviceGrouping: function () {
    var that = this;
    var team = this.data.team;
    var teamName = this.data.teamName;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      // https://swv.wuwz.net/setDeviceTeam?openID=100000000151&device_id=100001&team=1&team_name=highTeam
      url: 'https://swv.wuwz.net/setDeviceTeam?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&team=' + encodeURIComponent(team)
        + '&team_name=' + encodeURIComponent(teamName),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
          that.checkResult()
        if (that.data.result == 2)
          console.log("无权限")
        if (that.data.result == 0)
          console.log("操作失败")
      }
    })
  },

  confirmDeviceGrouping: function () {
    if (!this.data.teamToDisplay || !this.data.teamNameToDisplay)
      return
    this.setData({
      team: this.data.teamToDisplay,
      teamName: this.data.teamNameToDisplay,
      teamToDisplay: "",
      teamNameToDisplay: ""
    })
    this.requestDeviceGrouping()
    this.hideDeviceGroupingDialog()
  }
})