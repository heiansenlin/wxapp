//login.js
//获取应用实例
var app = getApp();
Page({
  data: {
    remind: '加载中',
    angle: 0
  },
  goToIndex: function () {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },
  onLoad: function () {
    var that = this
    that.setData({
      background_color: '#00afb4',
      bgRed: '0',
      bgGreen: '175',
      bgBlue: '180'
    })
  },
  onShow: function () {

  },
  onReady: function () {
    var that = this;
    setTimeout(function () {
      that.setData({
        remind: ''
      });
    }, 1000);
    wx.onAccelerometerChange(function (res) {
      var angle = -(res.x * 30).toFixed(1);
      if (angle > 14) { angle = 14; }
      else if (angle < -14) { angle = -14; }
      if (that.data.angle !== angle) {
        that.setData({
          angle: angle
        });
      }
    });
  },
});