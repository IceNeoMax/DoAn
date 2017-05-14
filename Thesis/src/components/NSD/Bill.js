import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   ScrollView,
   TouchableOpacity,
   AsyncStorage
} from 'react-native';
import { localURL } from '../Global.js';
import axios from 'axios';
import TestNoti from './TestNoti';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");

class Bill extends Component {
  state= {
    data:{},
    User_id: '',
    user:{}
   };

  componentWillMount(){
    AsyncStorage.getItem("myKey")
    .then(val=>{
      let temp = [];
      let date = new Date();
      let month = date.getMonth()+1;
      let year = date.getFullYear();
      this.setState({User_id : val});
        axios.get(localURL+'/NSDs/'+val)
        .then(res=>{
          //  console.log(res);
          this.setState({user : res.data});
        });
        axios.get(localURL+'/Lichsugds?filter[where][Thang]='+month+'&filter[where][Nam]='+year)
        .then(res => {
          // console.log(res);
          res.data.map(value =>{
            if(value.User_id == val){
              // console.log(value);
              this.setState({data : value});
            }
          });
        });
    });
  }
  // <TestNoti />

  renderBill(){
    // console.log(this.state.data);
    return(
      <View>

        <Text style={[styles.text, styles.textTop]}>
          Hóa Đơn tháng {this.state.data.Thang}-{this.state.data.Nam}:
        </Text>
        <Text style={styles.text}>
          Khách Hàng : {this.state.user.Ten}
        </Text>
        <Text style={styles.text}>
          ID : {this.state.user.id}
        </Text>
        <Text style={styles.text}>
          Chỉ Số Cũ : {this.state.data.Sodau}. Chỉ Số Mới: {this.state.data.Socuoi}
        </Text>
        <Text style={styles.text}>
          Tổng Số Tiêu Thụ : {this.state.data.Tongso}
        </Text>
        <Text style={styles.text}>
          Thành Tiền : {this.state.data.TongTien}đ
        </Text>
      </View>
    );
  }
  render() {
    return(
      <ScrollView>
        <View style={styles.container}>
          <Image source={background} style={styles.background}>
            {this.renderBill()}
          </Image>
          <TestNoti />
        </View>
        </ScrollView>
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
  text: {
    padding: 20,
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  },
  textTop:{
    paddingTop: 70
  },
  buttonSend:{
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  buttonText: {
    color: "#FFF",
    fontSize: 22,
    backgroundColor: 'transparent'

  },
});


export default Bill;
