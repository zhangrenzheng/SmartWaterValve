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
    openControlDialogVisible: false,
    modifyPositionDialogVisible: false,
    controlTypeDialogVisible: false,
    modifyAccuracyDialogVisible: false,
    
    /* 阀门开关量 2: 打开 1: 关闭 0: 停止 */
    openControl: '',

    /* 阀门开度 */
    position: '',
    positionToDisplay: '',

    /* 控制方式 1：高字节 2：低字节 */
    controlType: '',

    /* 控制精度 */
    accuracy: '',
    accuracyToDisplay: '',

    /* 保存返回结果 */
    result: ''
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
          deviceInfo: res.data,
          position: res.data.position,
          openControl: res.data.open_ctrl,
          controlType: res.data.ctrl_type,
          accuracy: res.data.accuracy
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

  /**
   * 阀门操作页面
   */

  /* 修改阀门开度弹窗 相关函数 */
  preventTouchMove: function () {},

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


  /* 修改阀门开关量 相关函数 */
  showOpenControlDialog: function () {
    this.setData({
      openControlDialogVisible: true
    })
  },

  hideOpenControlDialog: function () {
    this.setData({
      openControlDialogVisible: false
    })
  },

  requestOpenControl: function () {
    var that = this;
    var openControl = this.data.openControl;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/OpenDeviceCtrl?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&type=' + encodeURIComponent(openControl),

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

  openValve: function () {
    this.setData({
      openControl: 2
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    wx.showToast({
      title: '已经打开',
      icon: 'success',
      duration: 1000
    });
    this.hideOpenControlDialog();
  },

  closeValve: function () {
    this.setData({
      openControl: 1
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    wx.showToast({
      title: '已经关闭',
      icon: 'success',
      duration: 1000
    })
    this.hideOpenControlDialog();
  },

  stopValve: function () {
    this.setData({
      openControl: 0
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    wx.showToast({
      title: '已经停止',
      icon: 'success',
      duration: 1000
    })
    this.hideOpenControlDialog();
  },

  /**
   * 参数设置 页面
   */

  /* 修改控制方式弹窗 相关函数 */
  showControlTypeDialog: function () {
    this.setData({
      controlTypeDialogVisible: true
    })
  },

  hideControlTypeDialog: function () {
    this.setData({
      controlTypeDialogVisible: false
    })
  },

  requestControlType: function () {
    var that = this;
    var controlType = this.data.controlType;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/setCtrlType?type=' + encodeURIComponent(controlType)
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

  highByte: function () {
    this.setData({
      controlType: 1
    });
    // console.log(this.data.openControl);
    this.requestControlType();
    wx.showToast({
      title: '控制方式改为高字节',
      icon: 'success',
      duration: 1000
    });
    this.hideControlTypeDialog();
  },

  lowByte: function () {
    this.setData({
      controlType: 2
    });
    // console.log(this.data.openControl);
    this.requestControlType();
    wx.showToast({
      title: '控制方式改为低字节',
      icon: 'success',
      duration: 1000
    })
    this.hideControlTypeDialog();
  },

  /* 修改控制精度弹窗 相关函数 */
  showModifyAccuracyDialog: function () {
    this.setData({
      modifyAccuracyDialogVisible: true,
      accuracyToDisplay: this.data.deviceInfo.accuracy
    })
  },

  hideModifyAccuracyDialog: function () {
    this.setData({
      modifyAccuracyDialogVisible: false
    })
  },

  inputAccuracy: function (e) {
    this.setData({
      accuracyToDisplay: e.detail.value
    })
  },

  clearAccuracy: function (e) {
    this.setData({
      accuracyToDisplay: ''
    })
  },

  requestModifyAccuracy: function () {
    var that = this;
    var accuracy = this.data.accuracy;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/setAccuracy?accuracy=' + encodeURIComponent(accuracy)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID),

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

  confirmModifyAccuracy: function () {
    if (!this.data.accuracyToDisplay)
      return;
    this.setData({
      accuracy: this.data.accuracyToDisplay,
      accuracyToDisplay: ''
    });
    this.requestModifyAccuracy();
    this.hideModifyAccuracyDialog();
  },
})