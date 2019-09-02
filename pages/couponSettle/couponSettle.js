Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponId:'',
    title:'',
    userId:'',
    type:'',
    typeId:'',
    money:0
  },

  settle:function(){
    wx.request({
      url: 'http://localhost:8888/test/couponType/save?couponId='
        + this.data.couponId + '&couponTypeId=' + this.data.typeId 
        +'&userId='+this.data.userId+'&money='+this.data.money,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      couponId:options.id,
      title: options.title,
      type: options.type,
      typeId: options.typeId,
      money: options.money,
      userId: wx.getStorageSync("userid")
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
    
  }
})