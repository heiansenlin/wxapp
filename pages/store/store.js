Page({

  /**
   * 页面的初始数据
   */
  data: {
    id:'',
    goods:{}
  },
  //点击加减按钮  
  numchangeTap: function (e) {
    let Index = e.currentTarget.dataset.index,//点击的商品下标值        
      shopcar = this.data.goods,
      types = e.currentTarget.dataset.types//是加号还是减号  
    var money4 = 0;  
    var num = 0;
    var num2 = 0;        
    switch (types) {
      case 'add':
        num = shopcar[Index].num;
        shopcar[Index].num++;//对应商品的数量+1      
        num2 = shopcar[Index].num;
        var money = num*shopcar[Index].money;
        var money2 = num2*shopcar[Index].money;
        var money3 = wx.getStorageSync("money");
        money4 = money3 - money + money2;
        break;
      case 'minus':
        num = shopcar[Index].num;     
        shopcar[Index].num--;//对应商品的数量-1   
        num2 = shopcar[Index].num;
        var money = num * shopcar[Index].money;
        var money2 = num2 * shopcar[Index].money;
        var money3 = wx.getStorageSync("money");
        money4 = money3 - money + money2; 
        break;
    }
    //将购物车数据添加到缓存
    var that = this
    //获取缓存中的已添加购物车信息
    var cartItems = wx.getStorageSync('cartItems') || []
    console.log(cartItems)
    //判断购物车缓存中是否已存在该货品
    var exist = cartItems.find(function (ele) {
      return ele.id === shopcar[Index].id
    })
    if (exist) {
      //如果存在，则增加该货品的购买数量
      exist.quantity = exist.quantity - num + num2;
    } else {
      //如果不存在，传入该货品信息
      cartItems.push({
        id: shopcar[Index].id,
        quantity: shopcar[Index].num,
        price: shopcar[Index].money,
        title: shopcar[Index].name,
        company: shopcar[Index].company,
        type:1
      })
    }
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
      success: function (res) {
        //添加购物车的消息提示框
        wx.showToast({
          title: "添加购物车",
          icon: "success",
          durantion: 2000
        })
      }
    })
    wx.setStorage({
      key: shopcar[Index].id,
      data: shopcar[Index],
    })
    wx.setStorage({
      key: 'money',
      data: money4,
    })
    console.log(wx.getStorageSync("cartItems"))
    this.setData({
      goods: shopcar
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var id = wx.getStorageSync('channelId');
    console.log(id);
    this.setData({
      id: id
    })
    this.onReady();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.request({
      url: 'http://localhost:8888/test/goods/findAllByChannelId?channelId=' + this.data.id +'&categoryId=1',
      success: req => {
        this.setData({
          goods: req.data
        })
      }
    })
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
    this.onReady();
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