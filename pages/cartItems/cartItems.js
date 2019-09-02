// 在需要使用的js文件中，导入js  
var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cartItems: [],
    money: '',
    address: '',
    addressId: '',
    coupons:[]
  },
  add: function(e) {
    wx.navigateTo({
      url: '/pages/address/address',
    })
  },
  submit: function(e) {
    var arr = wx.getStorageSync("cartItems") || [];
    var mon = wx.getStorageSync("money");
    var addre = wx.getStorageSync("address");
    var addressid = wx.getStorageSync("addressid");
    var userId = wx.getStorageSync("userid");
    var channelId = wx.getStorageSync("channelId");
    var str = '';
    for (var i = 0; i < arr.length; i++) {
      var a = arr[i];
      str = a.id + ',' + a.quantity + ';'
    }
    wx.request({
      url: 'http://localhost:8888/test/order/save',
      method: 'POST',
      data: {
        goodsAndNum: str,
        userId: userId,
        channelId: channelId,
        addressId: addressid
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success: req => {
        if (req.data == 1) {
          var time = new Date().getTime();
          wx.requestPayment({
            timeStamp: '',
            nonceStr: '',
            package: '',
            signType: 'MD5',
            paySign: '',
          })
        } else {
          wx.showToast({
            title: "订单创建失败",
            icon: "lose",
            durantion: 2000
          })
          console.log("订单创建失败")
        }
      }
    })
  },
  //点击加减按钮  
  numchangeTap: function(e) {
    let Index = e.currentTarget.dataset.index, //点击的商品下标值        
    shopcar = this.data.cartItems,
    types = e.currentTarget.dataset.types //是加号还是减号      
    var money4 = 0;
    switch (types) {
      case 'add':
        var num = shopcar[Index].quantity;
        shopcar[Index].quantity++; //对应商品的数量+1      
        var num2 = shopcar[Index].quantity;
        var money = num * shopcar[Index].price;
        var money2 = num2 * shopcar[Index].price;
        var money3 = wx.getStorageSync("money");
        money4 = money3 - money + money2;
        break;
      case 'minus':
        var num = shopcar[Index].quantity;
        if (num == 1) {
          money4 = wx.getStorageSync("money");
          break;
        }
        shopcar[Index].quantity--; //对应商品的数量-1   
        var num2 = shopcar[Index].quantity;
        var money = num * shopcar[Index].price;
        var money2 = num2 * shopcar[Index].price;
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
    var exist = cartItems.find(function(ele) {
      return ele.id === shopcar[Index].id
    })
    console.log(exist)
    if (exist) {
      //如果存在，则增加该货品的购买数量
      exist.quantity = shopcar[Index].quantity
    } else {
      //如果不存在，传入该货品信息
      cartItems.push({
        id: shopcar[Index].id,
        quantity: shopcar[Index].quantity,
        price: shopcar[Index].price,
        title: shopcar[Index].title,
        company: shopcar[Index].company,
        type: 1
      })
    }
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
    })
    wx.setStorage({
      key: 'money',
      data: money4,
    })
    this.onLoad()
  },
  del: function(e) {
    let Index = e.currentTarget.dataset.index, //点击的商品下标值        
      shopcar = this.data.cartItems,
      types = e.currentTarget.dataset.types //是加号还是减号      
    var money4 = 0;
    var num = shopcar[Index].quantity;
    var money = num * shopcar[Index].price;
    var money3 = wx.getStorageSync("money");
    money4 = money3 - money;
    shopcar.splice(Index, 1);
    var cartItems = shopcar;
    //加入购物车数据，存入缓存
    wx.setStorage({
      key: 'cartItems',
      data: cartItems,
    })
    wx.setStorage({
      key: 'money',
      data: money4,
    })
    this.onLoad()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var arr = wx.getStorageSync("cartItems") || [];
    var mon = wx.getStorageSync("money");
    var addre = wx.getStorageSync("address");
    var addressid = wx.getStorageSync("addressid");
    console.info("缓存数据：" + mon);
    var str = '';
    for(var a=0;a<arr.length;a++){
      str += arr[a].id+",";
    }
    this.setData({
      cartItems: arr,
      money: mon,
      address: addre,
      addressId: addressid
    })
    wx.request({
      url: 'http://localhost:8888/test/couponTypeUser/getByOpenIdAndGoodsId?openId='
      +wx.getStorageSync("userid")+'&goodsIds='+str,
      method:'GET',
      success:req =>{
        this.setData({
          coupons:req.data
        })
        console.log(this.data.coupons);
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {
    this.onLoad();
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})