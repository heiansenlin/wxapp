Page({

  /**
   * 页面的初始数据
   */
  data: {
    id: '1',
    goods: {},
    cache:{},
    changeName:''
  },
  //点击加减按钮  
  // numchangeTap: function (e) {
  //   let Index = e.currentTarget.dataset.index,//点击的商品下标值        
  //     shopcar = this.data.goods,
  //     types = e.currentTarget.dataset.types//是加号还是减号         
  //   switch (types) {
  //     case 'add':
  //       var num = shopcar[Index].num;
  //       shopcar[Index].num++;//对应商品的数量+1      
  //       var num2 = shopcar[Index].num;
  //       var money = num * shopcar[Index].money;
  //       var money2 = num2 * shopcar[Index].money;
  //       wx.getStorage({
  //         key: 'money',
  //         success: function (res) {
  //           var money3 = res.data - money + money2;
  //           wx.setStorage({
  //             key: 'money',
  //             data: money3,
  //           })
  //         },
  //       })
  //       break;
  //     case 'minus':
  //       var num = shopcar[Index].num;
  //       shopcar[Index].num--;//对应商品的数量-1   
  //       var num2 = shopcar[Index].num;
  //       var money = num * shopcar[Index].money;
  //       var money2 = num2 * shopcar[Index].money;
  //       wx.getStorage({
  //         key: 'money',
  //         success: function (res) {
  //           var money3 = res.data - money + money2;
  //           wx.setStorage({
  //             key: 'money',
  //             data: money3,
  //           })
  //           console.log(money3)
  //         },
  //       })
  //       break;
  //   }
  //   //将购物车数据添加到缓存
  //   var that = this
  //   //获取缓存中的已添加购物车信息
  //   var cartItems = wx.getStorageSync('cartItems') || []
  //   //判断购物车缓存中是否已存在该货品
  //   var exist = cartItems.find(function (ele) {
  //     return ele.id === shopcar[Index].id
  //   })
  //   if (exist) {
      
  //     //如果存在，则增加该货品的购买数量
  //     exist.quantity = shopcar[Index].num
  //     exist.price = shopcar[Index].money
      
  //   } else {
  //     //如果不存在，传入该货品信息
  //     cartItems.push({
  //       id: shopcar[Index].id,
  //       quantity: shopcar[Index].num,
  //       price: shopcar[Index].money,
  //       title: shopcar[Index].name,
  //       company: shopcar[Index].company,
  //       type:2
  //     })
  //   }
  //   //加入购物车数据，存入缓存
  //   wx.setStorage({
  //     key: 'cartItems',
  //     data: cartItems,
  //     success: function (res) {
  //       //添加购物车的消息提示框
  //       wx.showToast({
  //         title: "添加购物车",
  //         icon: "success",
  //         durantion: 2000
  //       })
  //     }
  //   })
  //   console.log(wx.getStorageSync("cartItems"))
  //   this.setData({
  //     goods: shopcar
  //   });
  // },
  change:function(e){
    let Index = e.currentTarget.dataset.index;//点击的商品下标值       
    var name = e.currentTarget.dataset.name;//点击的商品规格名称       
    var shopcar = this.data.goods;
    var money = e.currentTarget.dataset.money;
    shopcar[Index].money = money;
    shopcar[Index].num = 0;
    console.log(money);
    this.setData({
      goods : shopcar,
      changeName:name
    })
  },
  buyCoupon:function(e){
    let Index = e.currentTarget.dataset.index;//点击的商品下标值       
    var shopcar = this.data.goods;
    var item = shopcar[Index];
    wx.navigateTo({
      url: '/pages/couponSettle/couponSettle?id='+item.id+'&title='+item.name
      +'&type='+this.data.changeName+'&money='+item.money,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getStorage({
      key: 'channelId',
      success: function (res) {
        id: res.data
      },
    })
    wx.request({
      url: 'http://localhost:8888/test/coupon/findAllByChannelId?channelId=' + this.data.id,
      success: req => {
        this.setData({
          goods: req.data
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
  tologs: function () {     //按钮的绑定事件，点击跳转至logs

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