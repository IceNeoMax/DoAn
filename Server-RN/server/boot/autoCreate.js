var axios = require('axios');


var lsgd = [];
var start = 0;

module.exports = function(app) {
  var path = require('path');
  var models = require(path.resolve(__dirname, '../model-config.json'));
  var datasources = require(path.resolve(__dirname, '../datasources.json'));
  var Gianuoc = app.models.Gianuoc;

  for (var i = 1; i <= 12; i++) {
    let money = 0;
    let temp = start + Math.floor(Math.random()*50+30);
    let num=temp-start;

      if(num>=30)
        money = 20*5000 + 10*7500 + (num-30)*13000;
      else if(num < 30 && num >= 20)
        money = 20*5000 + (num-20)*7500;
      else if(num < 20)
        money = num*5000;
    lsgd.push({
      "User_id": "58fc97f317c39b02c4d68a8c",
      "Thang": i,
      "Nam": 2015,
      "Sodau": start,
      "Socuoi": temp,
      "Tongso": num,
      "TongTien": money,
      "Nocuoc": false,
    });
    start = temp;
  }
  for (var i = 1; i <= 12; i++) {
    let money = 0;
    let temp = start + Math.floor(Math.random()*50+30);
    let num=temp-start;

      if(num>=30)
        money = 20*5000 + 10*7500 + (num-30)*13000;
      else if(num < 30 && num >= 20)
        money = 20*5000 + (num-20)*7500;
      else if(num < 20)
        money = num*5000;
    lsgd.push({
      "User_id": "58fc97f317c39b02c4d68a8c",
      "Thang": i,
      "Nam": 2016,
      "Sodau": start,
      "Socuoi": temp,
      "Tongso": num,
      "TongTien": money,
      "Nocuoc": false,
    });
    start = temp;
  }
  for (var i = 1; i <= 5; i++) {
    let money = 0;
    let temp = start + Math.floor(Math.random()*30+30);
    let num=temp-start;

      if(num>=30)
        money = 20*5000 + 10*7500 + (num-30)*13000;
      else if(num < 30 && num >= 20)
        money = 20*5000 + (num-20)*7500;
      else if(num < 20)
        money = num*5000;
    lsgd.push({
      "User_id": "58fc97f317c39b02c4d68a8c",
      "Thang": i,
      "Nam": 2017,
      "Sodau": start,
      "Socuoi": temp,
      "Tongso": num,
      "TongTien": money,
      "Nocuoc": false,
    });
    start = temp;
  }
  function createInstances() {
    var Lichsugd = app.models.Lichsugd;
    Lichsugd.create(lsgd, function (err, posts) {
        if (err) throw err;
      });
  }
  // createInstances();
};
