Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    userid:'',
    addre:''
  },

  choose:function(e){
    let Index = e.currentTarget.dataset.index;
    var addre = this.data.address[Index];
    wx.setStorage({
      key: 'address',
      data: addre.address,
    })
    wx.setStorage({
      key: 'addressid',
      data: addre.id,
    })
    wx.switchTab({
      url: '/pages/cartItems/cartItems'
    })

  },
  address:function(e){
    this.setData({
      addre: e.detail.value
    })
    console.log(this.data.addre)
  },
  save:function(){
    wx.request({
      url: 'http://localhost:8888/test/address/save?userid=' + this.data.userid +'&address='+this.data.addre,
      method: 'GET',
      success: req => {
        wx.setStorage({
          key: 'address',
          data: this.data.addre,
        })
        wx.switchTab({
          url: '/pages/cartItems/cartItems',
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var user = wx.getStorageSync("userid");
    this.setData({
      userid:user
    })
    wx.request({
      url: 'http://localhost:8888/test/address/findAllByOpenId?userid='+this.data.userid,
      method:'GET',
      success:req =>{
        this.setData({
          address:req.data
        })
      }
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