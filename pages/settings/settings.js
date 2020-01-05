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
    accessCtrl: "",
    accessControlPassword: "",
    accessControlPasswordToUpdate: "",
    team: "",
    teamName: "",
    controlPassword: '',

    /* 弹窗显示控制 */
    modifyDeviceNameDialogVisible: false,
    deleteDeviceDialogVisible: false,
    deviceGroupingDialogVisible: false,
    enableAccessDialogVisible: false,
    updateAccessCtrlPasswordDialogVisible: false,
    getAccessControlDialogVisible: false,

    result: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      openID: app.globalData.openID,
      device_id: decodeURIComponent(options.device_id),
      show_name: decodeURIComponent(options.show_name),
      remark: decodeURIComponent(options.remark),
      team: decodeURIComponent(options.team),
      teamName: decodeURIComponent(options.teamName),
      accessCtrl: decodeURIComponent(options.accessCtrl)
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
    var showNameToDisplay = this.data.showNameToDisplay;
    var remarkToDisplay = this.data.remarkToDisplay;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/UpdateDeviceName?remark=' + encodeURIComponent(remarkToDisplay) +
        '&show_name=' + encodeURIComponent(showNameToDisplay)
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
            duration: 2000
          });
          that.setData({
            show_name: that.data.showNameToDisplay,
            remark: that.data.remarkToDisplay,
            showNameToDisplay: "",
            remarkToDisplay: ""
          })
        }
        if (that.data.result == 2)
        {
          console.log("无权限");
          that.hideModifyDeviceNameDialog();
          that.showGetAccessControlDialog();
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  confirmModifyDeviceName: function () {
    if (!this.data.showNameToDisplay || !this.data.remarkToDisplay)
      return
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
        {
          console.log("操作成功")
        }
        if (that.data.result == 0)
        {
          console.log("操作失败");
          wx.showToast({
            title: '删除设备失败',
            icon: 'none',
            duration: 2000
          });
        }
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

  /* 启用访问权限弹出框 相关函数 */
  showEnableAccessDialog: function () {
    this.setData({
      enableAccessDialogVisible: true,
    })
  },

  hideEnableAccessDialog: function () {
    this.setData({
      enableAccessDialogVisible: false
    })
  },

  inputAccessControlPassword: function (e) {
    this.setData({
      accessControlPassword: e.detail.value
    })
  },

  clearAccessControlPassword: function () {
    this.setData({
      accessControlPassword: ""
    })
  },

  requestEnableAccess: function () {
    var that = this;
    var accessControlPassword = this.data.accessControlPassword;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/startAccessCtrl?apassword=' + encodeURIComponent(accessControlPassword)
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
            title: '操作成功',
            icon: 'success',
            duration: 2000
          });
          that.setData({
            accessCtrl: 1
          })
        }
        if (that.data.result == 2)
        {
          console.log("此设备已有管理员")
          wx.showToast({
            title: '已有管理员',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 3)
        {
          console.log("未找到设备或用户");
          wx.showToast({
            title: '未找到设备或用户',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 0)
        {
          console.log("密码错误");
          wx.showToast({
            title: '密码错误',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  confirmEnableAccess: function () {
    if (!this.data.accessControlPassword)
      return
    this.requestEnableAccess()
    this.hideEnableAccessDialog()
  },

  /* 修改设备控制密码弹出框 相关函数 */
  showUpdateAccessCtrlPasswordDialog: function () {
    this.setData({
      updateAccessCtrlPasswordDialogVisible: true,
    })
  },

  hideUpdateAccessCtrlPasswordDialog: function () {
    this.setData({
      updateAccessCtrlPasswordDialogVisible: false
    })
  },

  inputAccessControlPasswordToUpdate: function (e) {
    this.setData({
      accessControlPasswordToUpdate: e.detail.value
    })
  },

  clearAccessControlPasswordToUpdate: function () {
    this.setData({
      accessControlPasswordToUpdate: ""
    })
  },

  requestUpdateAccessCtrlPassword: function () {
    var that = this;
    var accessControlPasswordToUpdate = this.data.accessControlPasswordToUpdate;
    var device_id = this.data.device_id;
    var openID = this.data.openID;

    wx.request({
      url: 'https://swv.wuwz.net/updateAccessCtrlPassword?cPassword=' + encodeURIComponent(accessControlPasswordToUpdate)
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
            title: '操作成功',
            icon: 'succsses',
            duration: 2000
          });
        }
        if (that.data.result == 2)
        {
          console.log("无权限");
          wx.showToast({
            title: '无权限',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 0)
        {
          console.log("操作失败");
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  confirmUpdateAccessCtrlPassword: function () {
    if (!this.data.accessControlPasswordToUpdate)
      return
    this.requestUpdateAccessCtrlPassword()
    this.hideUpdateAccessCtrlPasswordDialog()
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
      url: 'https://swv.wuwz.net/setDeviceTeam?openID=' + encodeURIComponent(openID)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&team=' + encodeURIComponent(team)
        + '&team_name=' + encodeURIComponent(teamName),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("操作成功")
          wx.showToast({
            title: '操作成功',
            icon: 'succsses',
            duration: 2000
          });
        }
        if (that.data.result == 2)
        {
          console.log("无权限");
          wx.showToast({
            title: '无权限',
            icon: 'none',
            duration: 2000
          });
        }
        if (that.data.result == 0)
        {
          console.log("操作失败");
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
        }
      }
    })
  },

  confirmDeviceGrouping: function () {
    if (!this.data.teamToDisplay || !this.data.teamNameToDisplay)
      return
    if (this.data.teamToDisplay < 1 || this.data.teamToDisplay > 10)
    {
      this.clearTeam();
      return
    }
    this.setData({
      team: this.data.teamToDisplay,
      teamName: this.data.teamNameToDisplay,
      teamToDisplay: "",
      teamNameToDisplay: ""
    })
    this.requestDeviceGrouping()
    this.hideDeviceGroupingDialog()
  },

  /* 获取用户控制权限弹出框 相关函数 */
  showGetAccessControlDialog: function () {
    this.setData({
      getAccessControlDialogVisible: true,
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
            title: '操作成功',
            icon: 'succsses',
            duration: 2000
          });
        }
        if (that.data.result == 0)
        {
          console.log("操作失败")
          wx.showToast({
            title: '操作失败',
            icon: 'none',
            duration: 2000
          });
          that.clearControlPassword();
        }
      }
    })
  },

  confirmGetAccessControl: function () {
    if (!this.data.controlPassword)
      return
    this.requestGetAccessControl()
    this.hideGetAccessControlDialog()
  },

  /* 跳转到日志页面 */
  jumpToLog: function (e) {
    var device_id = this.data.device_id;
  
    wx.navigateTo({
      url: "/pages/log/log?device_id=" + encodeURIComponent(device_id),
    })
  },

  /* 跳转到设备共享页面 */
  jumpToShareDevice: function (e) {
    var device_id = this.data.device_id;

    wx.navigateTo({
      url: "/pages/shareDevice/shareDevice?device_id=" + encodeURIComponent(device_id),
    })
  },

  /* 跳转到权限管理页面 */
  jumpToAuthorityManagement: function (e) {
    var device_id = this.data.device_id;

    wx.navigateTo({
      url: "/pages/authorityManagement/authorityManagement?device_id=" + encodeURIComponent(device_id),
    })
  }
})