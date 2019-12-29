// pages/controlpannel/controlpannel.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    /* 标签页 swiper 当前页面 */
    item: 0,
    tab: 0,
    navigateBarTittle: [
      "阀门操作",
      "参数设置",
      "阀门状态",
      "运行记录"
    ],

    // 弹框展示与否
    showControlDialog: false,
    showSimulationDialog: false,
    showLockedrotorTimeDialog: false,

    // 参数和它的值
    /* 阀门开与关 1：打开 0 关闭 -1 停止 */
    valveSwitch: 1,


    /* 阀门模拟量 */
    simulationValue: '20',
    simulationValueChange: '',

    lockedrotorTime: '14',
    lockedrotorTimeChange: ''
  },

  showControlModal: function(){
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

  showSimulationModal: function () {
    this.setData({
      showSimulationDialog: true,
      simulationValueChange: this.data.simulationValue
    })
  },
  hideSimulationModal: function () {
    this.setData({
      showSimulationDialog: false
    })
  },
  inputSimulationValue: function(e){
    this.setData({ 
      simulationValueChange: e.detail.value 
    })
  },
  confirmSimulationValue: function(){
    if (!this.data.simulationValueChange) return
    this.setData({
      simulationValue: this.data.simulationValueChange,
      simulationValueChange: ''
    })
    this.hideSimulationModal();
  },
  cancelSimulationValue: function(){
    this.hideSimulationModal();
  },
  clearSimulationValue: function(){
    this.setData({ simulationValueChange: '0' })
  },

  showLockedrotorTimeModal: function(){
    this.setData({
      showLockedrotorTimeDialog: true,
      lockedrotorTimeChange: this.data.lockedrotorTime
    })
  },
  hideLockedrotorTimeModal: function(){
    this.setData({
      showLockedrotorTimeDialog: false
    })
  },
  inputLockedrotorTime: function(e){
    this.setData({
      lockedrotorTimeChange: e.detail.value
    })
  },
  confirmLockedrotorTime: function(){
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
  preventTouchMove: function() {},

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

  /* 底部 TabBar 和 swiper 关联切换 */
  changeItem: function (e) {
    this.setData({
      item: e.target.dataset.item
    })
    /* 切换标题栏标题 */
    wx.setNavigationBarTitle({
      title: this.data.navigateBarTittle[this.data.item]
    })  
  },

  changeTab: function (e) {
    this.setData({
      tab: e.detail.current
    })

    wx.setNavigationBarTitle({
      title: this.data.navigateBarTittle[this.data.tab]
    })  
  }
})