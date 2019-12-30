// pages/controlpannel/controlpannel.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: app.globalData.openID,
    device_id: 0,
    show_name: "",

    /* 标签页 swiper 当前页面 */
    item: 0,
    tab: 0,
    navigateBarTittle: [
      "阀门操作",
      "参数设置",
      "阀门状态",
      "运行记录"
    ],
    deviceInfo: {

    },

    // 弹窗显示控制
    showControlDialog: false,
    modifyPositionDialogVisible: false,
    showLockedrotorTimeDialog: false,

    // 参数和它的值
    /* 阀门开与关 1：打开 0 关闭 -1 停止 */
    valveSwitch: 1,


    /* 阀门开度 */
    position: '',
    positionToDisplay: '',

    lockedrotorTime: '14',
    lockedrotorTimeChange: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      device_id: decodeURIComponent(options.device_id),
      show_name: decodeURIComponent(options.show_name)
    })
    wx.setNavigationBarTitle({
      title: this.data.navigateBarTittle[this.data.tab] + ' - ' + this.data.show_name
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
    var openID = this.data.openID;
    var device_id = this.data.device_id;

    /* 获取设备信息 */
    wx.request({
      url: 'https://swv.wuwz.net/UserDevice?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id),
      success: function (res) {
        that.setData({
          deviceInfo: res.data
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

  /* 底部 TabBar 和 swiper 关联切换 */
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
    /* 切换标题栏标题 */
    wx.setNavigationBarTitle({
      title: this.data.navigateBarTittle[this.data.item] + ' - ' + this.data.show_name
    })  
  },

  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })

    wx.setNavigationBarTitle({
      title: this.data.navigateBarTittle[this.data.tab] + ' - ' + this.data.show_name
    })  
  },

  /* 修改阀门开度弹窗 相关函数 */
  showModifyPositionDialog: function () {
    this.setData({
      modifyPositionDialogVisible: true,
      positionToDisplay: this.data.deviceInfo.position
    })
  },

  hideModifyPositionDialog: function () {
    this.setData({
      modifyPositionDialogVisible: false
    })
  },

  inputPosition: function (e) {
    this.setData({
      positionToDisplay: e.detail.value
    })
  },

  clearPosition: function (e) {
    this.setData({
      positionToDisplay: ''
    })
  },

  requestModifyPosition: function () {
    var that = this;
    var position = this.data.position;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/OpenDegreeCtrl?degree=' + encodeURIComponent(position)
        + '&openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
          console.log("操作成功")
        if (that.data.result == 2)
          console.log("无权限")
        if (that.data.result == 0)
          console.log("操作失败")
      }
    })
  },

  confirmModifyPosition: function () {
    if (!this.data.positionToDisplay) 
      return;
    this.setData({
      position: this.data.positionToDisplay,
      positionToDisplay: ''
    });
    this.requestModifyPosition();
    this.hideModifyPositionDialog();
  },








  showControlModal: function () {
    this.setData({
      showControlDialog: true
    })
  },

  hideControlModal: function () {
    this.setData({
      showControlDialog: false
    })
  },

  openControl: function () {
    this.setData({
      valveSwitch: 1
    });
    wx.showToast({
      title: '已经打开',
      icon: 'success',
      duration: 1000
    });
    this.hideControlModal();
  },

  closeControl: function () {
    this.setData({
      valveSwitch: 0
    });
    wx.showToast({
      title: '已经关闭',
      icon: 'success',
      duration: 1000
    })
    this.hideControlModal();
  },

  stopControl: function () {
    this.setData({
      valveSwitch: -1
    });
    wx.showToast({
      title: '已经停止',
      icon: 'success',
      duration: 1000
    })
    this.hideControlModal();
  },

  showLockedrotorTimeModal: function () {
    this.setData({
      showLockedrotorTimeDialog: true,
      lockedrotorTimeChange: this.data.lockedrotorTime
    })
  },

  hideLockedrotorTimeModal: function () {
    this.setData({
      showLockedrotorTimeDialog: false
    })
  },

  inputLockedrotorTime: function (e) {
    this.setData({
      lockedrotorTimeChange: e.detail.value
    })
  },

  confirmLockedrotorTime: function () {
    if (!this.data.lockedrotorTimeChange) return
    this.setData({
      lockedrotorTime: this.data.lockedrotorTimeChange,
      lockedrotorTimeChange: ''
    })
    this.hideLockedrotorTimeModal()
  },

  cancelLockedrotorTime: function () {
    this.hideLockedrotorTimeModal();
  },

  clearLockedrotorTime: function () {
    this.setData({ lockedrotorTimeChange: this.data.lockedrotorTime })
  },

  preventTouchMove: function () {}
})