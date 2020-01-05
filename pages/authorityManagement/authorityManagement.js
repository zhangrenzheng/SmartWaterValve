// pages/authorityManagement/authorityManagement.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    openID: app.globalData.openID,
    device_id: '',
    accessCtrlUsers: [],

    result: ''
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.setData({
        openID: app.globalData.openID,
        device_id: decodeURIComponent(options.device_id)
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
    var device_id = this.data.device_id;

    wx.request({
      url: 'https://swv.wuwz.net/getAccessCtrlUsers?device_id=' + encodeURIComponent(device_id),
      success: function (res) {
        that.setData({
          accessCtrlUsers: res.data
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
    var that = this;
    var device_id = this.data.device_id;

    wx.request({
      url: 'https://swv.wuwz.net/getAccessCtrlUsers?device_id=' + encodeURIComponent(device_id),
      success: function (res) {
        that.setData({
          accessCtrlUsers: res.data
        })
      }
    });

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

  requestDeleteAccessControlUser: function (index) {
    var that = this;
    var a_openID = this.data.openID;
    var device_id = this.data.accessCtrlUsers[index].device_id;
    var openID = this.data.accessCtrlUsers[index].u_openid;
    var accessCtrlUsers = this.data.accessCtrlUsers;


    wx.request({
      url: 'https://swv.wuwz.net/delAccessCtrlUsers?a_openID=' + encodeURIComponent(a_openID)
        + '&device_id=' + encodeURIComponent(device_id)
        + '&openID=' + encodeURIComponent(openID),

      success: function (res) {
        that.setData({
          result: res.data.result
        })

        if (that.data.result == 1)
        {
          console.log("删除用户访问控制权限：操作成功")
          wx.showToast({
            title: '删除成功',
            icon: 'success',
            duration: 2000
          })
          accessCtrlUsers.splice(index, 1);
        }
        if (that.data.result == 2)
        {
          console.log("删除用户访问控制权限：无权限，不是管理员")
          wx.showToast({
            title: '无权限，不是管理员',
            icon: 'none',
            duration: 2000
          })
        }
        if (that.data.result == 3)
        {
          console.log("删除用户访问控制权限：管理员权限不可删除")
          wx.showToast({
            title: '管理员权限不可删除',
            icon: 'none',
            duration: 2000
          })
        }
        if (that.data.result == 0)
        {
          console.log("删除用户访问控制权限：操作失败")
          wx.showToast({
            title: '删除失败',
            icon: 'none',
            duration: 2000
          })
        }

        that.setData({
          accessCtrlUsers
        })
      }
    })

  },

  showDeleteAccessControlUserDialog: function (e) {
    var that = this;
    var index = e.target.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除此用户权限？',
      success: function (res) {
        if (res.confirm)
        {
          console.log('点击确定了');
          that.requestDeleteAccessControlUser(index);
        }
        else if (res.cancel)
        {
           console.log('点击取消了');
           return false;
        }
      }
    })
  }
})