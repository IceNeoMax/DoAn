import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   TouchableHighlight,
   AsyncStorage,
   Modal
} from 'react-native';
import axios from 'axios';
import { localURL } from '../Global.js';
import Icon from 'react-native-vector-icons/Foundation';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");


class HistoryBill extends Component {
  state={
    num: '',
    modalVisible: false,
    User_id: '',
    YearData:[],
  };
  componentWillMount(){
    let temp = [];
    let date= new Date();
    let year = date.getFullYear();
    AsyncStorage.getItem("myKey")
    .then(val=>{
      this.setState({User_id : val});
      axios.get(localURL+'/Lichsugds?filter[where][Nam]=2017')
      .then(resu=>{
        //  console.log(resu.data);
        resu.data.map(value =>{
          if(value.User_id == val)
          temp.push(value);
        });
        // console.log(temp);
        this.setState({YearData:temp});
      });
    });
  }
  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }
  renderMonthData(month){
    let monthData = [];
    // console.log(this.state.YearData);
    this.state.YearData.map(val =>{
      //console.log(val);
      if(val.Thang==month)
      monthData = val;
    });
    // console.log(monthData);
     return (
      <View>
        <Text style={styles.text}>Trong tháng {monthData.Thang} - {monthData.Nam} quý khách đã sử dụng</Text>
        <Text style={styles.text}>Tổng số điện: {monthData.Sodau} - {monthData.Socuoi} = {monthData.Tongso}</Text>
        <Text style={styles.text}>Tổng số tiền: {monthData.TongTien}đ</Text>
      </View>
     );
  }
  renderData(){
    let date= new Date();
    let month = date.getMonth()+1;
    let temp = [];
    for(let i = 1; i < month; i++){
      temp.push(i);
    }
    // console.log(temp,month);
    return temp.map(val=>
        <View key={val}>
          <TouchableOpacity onPress={()=> {
            this.setState({num:val});
            this.setModalVisible(true);
          }}>
            <View style={styles.notifbox}>
              <Text style={styles.text}>
                tháng {val}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      );
  }
  // {this.renderMonthData(this.state.User_id,this.state.num)}

  render() {
    return(
      <View style={styles.container}>
        <Image source={background} style={styles.background}>
        <Text style={{padding:5, color:'white',}}>
          2017
        </Text>
        {this.renderData()}

        </Image>
        <Modal
            animationType={"slide"}
            transparent={false}
            visible={this.state.modalVisible}
            onRequestClose={() => {alert("Modal has been closed.")}}
            >
           <View style={{marginTop: 22}}>
            <View>
              <TouchableOpacity onPress={() => {
                this.setModalVisible(!this.state.modalVisible)
              }}>
              <Icon style={styles.icon} name="x-circle" size={40} color="black"/>
              </TouchableOpacity>
              {this.renderMonthData(this.state.num)}
            </View>
           </View>
          </Modal>
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    paddingTop:35,
    width,
    height,
  },
  icon:{
    alignSelf: 'flex-end',
    paddingRight:10
  },
  notifbox:{
    backgroundColor: '#F9F9F9',
    padding:10,
    margin:10,
    borderLeftWidth:4,
    borderColor: '#0074D9',
  },
  text: {
    padding:10,
    fontSize:18,
    color: 'black'
  }
});


export default HistoryBill;
