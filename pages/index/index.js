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
    deviceList: [],

    // 用户登录，三个变量分别是用户登录信息，用户是否登录，该函数能否使用
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 用户登录,先判断用户是否登录
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 执行一个回调函数，因为可能getUserInfo会在page.onload之后才返回，回调函数可以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 兼容性处理，需要注意的是微信基本放弃了wx.getUserInfo将不再支持，所以这个部分没用
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
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
    return {
      title: '智能水阀微信小程序',
      path: '/pages/index/index',
      // 不再支持回调函数
    }
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
    var team = this.data.deviceList[e.target.id].team;
    var teamName = this.data.deviceList[e.target.id].team_name;
    var accessCtrl = this.data.deviceList[e.target.id].access_ctrl;
    
    wx.navigateTo({
      url: "/pages/settings/settings?device_id=" + encodeURIComponent(device_id)
        + "&show_name=" + encodeURIComponent(show_name)
        + "&remark=" + encodeURIComponent(remark)
        + "&team=" + encodeURIComponent(team)
        + "&teamName=" + encodeURIComponent(teamName)
        + "&accessCtrl=" + encodeURIComponent(accessCtrl),
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
  },

  // 登录按钮
  getUserInfo: function (e) {
    if(e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
    else {
      wx.showModal({
        title: '授权失败',
        content: '注意：不通过授权，多数功能将无法使用',
        success(res) {
          if(res.confirm || res.cancel) {
            return
          }
        }
      })
    }
  },
  // 退出登录
  loginOut: function(){
    app.globalData.userInfo = {}
    this.setData({
      hasUserInfo: false,
      userInfo: {}
    })
    wx.clearStorage()
  },
})