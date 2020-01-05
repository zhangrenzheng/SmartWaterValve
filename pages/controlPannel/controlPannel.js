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
    deviceLog: [],

    // 弹窗显示控制
    openControlDialogVisible: false,
    modifyPositionDialogVisible: false,
    controlTypeDialogVisible: false,
    modifyAccuracyDialogVisible: false,
    getAccessControlDialogVisible: false,
    
    /* 阀门开关量 2: 打开 1: 关闭 0: 停止 */
    openControl: '',
    openControlToDisplay: '',
    titleToDisplay: '',

    /* 阀门开度 */
    position: '',
    positionToDisplay: '',

    /* 控制方式 1：高字节 2：低字节 */
    controlType: '',
    controlTypeToDisplay: '',

    /* 控制精度 */
    accuracy: '',
    accuracyToDisplay: '',

    /* 输入的访问控制密码 */
    controlPassword: '',

    /* 保存返回结果 */
    result: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openID: app.globalData.openID,
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
      positionToDisplay: this.data.position
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
    var positionToDisplay = this.data.positionToDisplay;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/OpenDegreeCtrl?degree=' + encodeURIComponent(positionToDisplay)
        + '&openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("操作成功")
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 2000
          })
          that.setData({
            position: that.data.positionToDisplay,
            positionToDisplay: ''
          });
          if(positionToDisplay != 0 && that.data.openControl == 1)
          {
            that.setData({
              openControl: 2
            })
          }
          if(positionToDisplay == 0 && that.data.openControl == 2)
          {
            that.setData({
              openControl: 1
            })
          }
        }
        if (that.data.result == 2)
        {
          console.log("无权限")
          that.hideModifyPositionDialog();
          that.showGetAccessControlDialog();
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'success',
            duration: 2000
          })
        }
        if (that.data.result == 3)
        {
          console.log("阀门处于关闭状态")
          wx.showToast({
            title: '阀门为关闭状态',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  confirmModifyPosition: function () {
    if (!this.data.positionToDisplay)
    {
      return;
    }
    if(!/^(?:[1-9]?\d|100)$/.test(this.data.positionToDisplay))
    {
      this.clearPosition();
      return;
    }
    this.requestModifyPosition();
    this.hideModifyPositionDialog();
  },


  /* 修改阀门开关量 相关函数 */
  showOpenControlDialog: function () {
    this.setData({
      openControlDialogVisible: true,
      openControlToDisplay: this.data.openControl
    })
  },

  hideOpenControlDialog: function () {
    this.setData({
      openControlDialogVisible: false
    })
  },

  requestOpenControl: function () {
    var that = this;
    var openControlToDisplay = this.data.openControlToDisplay;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/OpenDeviceCtrl?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&type=' + encodeURIComponent(openControlToDisplay),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          wx.showToast({
            title: that.data.titleToDisplay,
            icon: 'success',
            duration: 1000
          });
          console.log("操作成功")
          that.setData({
            openControl: that.data.openControlToDisplay,
            openControlToDisplay: '',
            position: that.data.positionToDisplay
          })
        }
        if (that.data.result == 2)
        {
          that.hideOpenControlDialog();
          that.showGetAccessControlDialog();
        }
          
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  openValve: function () {
    this.setData({
      openControlToDisplay: 2,
      titleToDisplay: '打开成功',
      positionToDisplay: 100
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    this.hideOpenControlDialog();
  },

  closeValve: function () {
    this.setData({
      openControlToDisplay: 1,
      titleToDisplay: '关闭成功',
      positionToDisplay: 0
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    this.hideOpenControlDialog();
  },

  stopValve: function () {
    this.setData({
      openControlToDisplay: 0,
      titleToDisplay: '停止成功',
      positionToDisplay: this.data.position
    });
    // console.log(this.data.openControl);
    this.requestOpenControl();
    this.hideOpenControlDialog();
  },

  /**
   * 参数设置 页面
   */

  /* 修改控制方式弹窗 相关函数 */
  showControlTypeDialog: function () {
    this.setData({
      controlTypeDialogVisible: true,
      controlTypeToDisplay: this.data.controlType
    })
  },

  hideControlTypeDialog: function () {
    this.setData({
      controlTypeDialogVisible: false
    })
  },

  requestControlType: function () {
    var that = this;
    var controlTypeToDisplay = this.data.controlTypeToDisplay;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/setCtrlType?type=' + encodeURIComponent(controlTypeToDisplay)
        + '&openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("操作成功");
          wx.showToast({
            title: that.data.titleToDisplay,
            icon: 'success',
            duration: 1000
          });
          that.setData({
            controlType: that.data.controlTypeToDisplay,
            controlTypeToDisplay: ''
          })
        }
        if (that.data.result == 2)
        {
          console.log("无权限");
          that.hideControlTypeDialog();
          that.showGetAccessControlDialog();
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          })
        }
      }
    })
  },

  highByte: function () {
    this.setData({
      controlTypeToDisplay: 1,
      titleToDisplay: '改为高字节'
    });
    // console.log(this.data.openControl);
    this.requestControlType();
    this.hideControlTypeDialog();
  },

  lowByte: function () {
    this.setData({
      controlTypeToDisplay: 2,
      titleToDisplay: '改为低字节'
    });
    // console.log(this.data.openControl);
    this.requestControlType();
    this.hideControlTypeDialog();
  },

  /* 修改控制精度弹窗 相关函数 */
  showModifyAccuracyDialog: function () {
    this.setData({
      modifyAccuracyDialogVisible: true,
      accuracyToDisplay: this.data.accuracy
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
    var accuracyToDisplay = this.data.accuracyToDisplay;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/setAccuracy?accuracy=' + encodeURIComponent(accuracyToDisplay)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("操作成功");
          wx.showToast({
            title: '操作成功',
            icon: 'success',
            duration: 1000
          });
          that.setData({
            accuracy: that.data.accuracyToDisplay,
            accuracyToDisplay: ''
          })
        }
        if (that.data.result == 2)
        {
          console.log("无权限");
          that.hideModifyAccuracyDialog();
          that.showGetAccessControlDialog();
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 1000
          });
        }
      }
    })
  },

  confirmModifyAccuracy: function () {
    if (!this.data.accuracyToDisplay || this.data.accuracyToDisplay < 5 || this.data.accuracyToDisplay > 100)
    {
      this.clearAccuracy();
      return;
    }
    this.requestModifyAccuracy();
    this.hideModifyAccuracyDialog();
  },

  /* 获取用户控制权限弹出框 相关函数 */
  showGetAccessControlDialog: function () {
    this.setData({
      getAccessControlDialogVisible: true,
      controlPassword: "",
    })
  },

  hideGetAccessControlDialog: function () {
    this.setData({
      getAccessControlDialogVisible: false
    })
  },

  inputControlPassword: function (e) {
    this.setData({
      controlPassword: e.detail.value
    })
  },

  clearControlPassword: function () {
    this.setData({
      controlPassword: ""
    })
  },

  requestGetAccessControl: function () {
    var that = this;
    var controlPassword = this.data.controlPassword;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/getAccessCtrl?cpassword=' + encodeURIComponent(controlPassword)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("操作成功")
          wx.showToast({
            title: '获取权限成功',
            icon: 'success',
            duration: 1000
          });
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '获取权限失败',
            icon: 'none',
            duration: 1000
          });
        }
      }
    })
  },

  confirmGetAccessControl: function () {
    if (!this.data.controlPassword)
      return
    this.requestGetAccessControl()
    this.hideGetAccessControlDialog()
  }
})