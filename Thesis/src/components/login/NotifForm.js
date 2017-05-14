import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity
} from 'react-native';
import { localURL } from '../Global.js';
import axios from 'axios';


const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");

class NVGS extends Component {
  componentWillMount(){
    let date = new Date();
    let month = date.getMonth()+2;
    this.state={
      muc1 :0, muc2:0, muc3:0,
      catnuoc:false,
      mess:''
    };
    axios.get(localURL+'/Gianuocs/58d9d4ad1732ce045e264cc5')
    .then(res=> {
      // console.log(res.data);
      this.setState({muc1 : res.data.Muc1,
      muc2 : res.data.Muc2,
      muc3 : res.data.Muc3,})
      // console.log(muc1);
    });
    // console.log(month);
    axios.get(localURL+'/lichsusds?filter[where][Thang]='+month+'&[where][Nam]=2017')
    .then(res =>{
      console.log(res.data);
      let mess = 'Tháng '+month+' Ngày';
      res.data[0].Ngaycat.map(val=>{mess+=' '+val});
      this.setState({catnuoc:true, mess});
    });
  }
  render() {
    return(
      <View style={styles.container}>
        <Image source={background} style={styles.background}>
          <Text style={styles.text1}>
            Thông báo giá nước:
          </Text>
          <Text style={styles.text}>
          Mức 20m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text> đầu tiên: {this.state.muc1}đ
          </Text>
          <Text style={styles.text}>
          Mức 20m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text>-30m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text> : {this.state.muc2}đ
          </Text>
          <Text style={styles.text}>
          Mức trên 30m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text>: {this.state.muc3}đ
          </Text>
          {(this.state.catnuoc)?<Text style={styles.text}>
          Thông báo lịch cắt nước: {this.state.mess}
          </Text>:null}
        </Image>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    width,
    height,
  },
  text1:{
    paddingTop: 60,
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  },
  text: {
    padding: 10,
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  }
});


export default NVGS;
