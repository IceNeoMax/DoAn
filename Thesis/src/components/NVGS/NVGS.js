import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   TextInput
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icon1 from 'react-native-vector-icons/Entypo';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import axios from 'axios';

import { Spinner } from '../common';
import { connect } from 'react-redux';
import { idChanged, num1Changed, num2Changed, checkUser } from '../../actions';
import { localURL } from '../Global.js';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");
const doneImg = require('./Done.png');
let date = new Date();
let month = date.getMonth()+1;
let year = date.getFullYear();
class NVGS extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3,
      soDau:0,
    };
  }
  // componentWillMount(){
  //   AsyncStorage.getItem("myKey")
  //   .then(val=>{
  //     axios.get(localURL+'/Lichsugds?filter[where][Thang]=5&[where][Nam]=2017')
  //     .then(res=>{
  //       res.data.map(data=>{
  //         if(data.User_id == val) console.log(data);
  //       })
  //     })
  //   })
  // }
  onIdChange(text) {
    this.props.idChanged(text);
  }
  onNum1Change(text) {
    this.props.num1Changed(text);
  }
  onNum2Change(text) {
    this.props.num2Changed(text);
  }

  onCheckPress() {
    const { id } = this.props;

    this.props.checkUser({ id });
  }
  onSendPress() {
    const { Socuoi,num2, id } = this.props;
    let num = parseInt(num2) - parseInt(Socuoi);

    axios.get(localURL+'/Gianuocs/58d9d4ad1732ce045e264cc5')
    .then(res => {
      let money = 0;
      if(num>=30)
        money = 20*res.data.Muc1 + 10*res.data.Muc2 + (num-30)*res.data.Muc3;
      else if(num < 30 && num >= 20)
        money = 20*res.data.Muc1 + (num-20)*res.data.Muc2;
      else if(num < 20)
        money = num*res.data.Muc1;
      axios.post(localURL+'/Lichsugds',{
        "User_id": id,
        "Thang": month,
        "Nam":year,
        "Sodau": parseInt(Socuoi),
        "Socuoi": parseInt(num2),
        "Tongso": num,
        "TongTien": money,
        "Nocuoc": true,
      }).then(res=>{
        let headers = new Headers({
      		"Content-Type": "application/json",
          "Authorization": "key=AIzaSyDFgzzvZv6vtVeo8R7BGJ1cgi2X0xb2HyI"
      	});
        let body = {
          //my fucking iporn6

        	"to": "esStwfXSyo8:APA91bEtKS-d1szKYZPBgCC3i9DE4xuval7yarJ7ZGkVAZQjLsHn83hPsvvViJIXlUQabbWNdkCs-rZbv53jyPRWTPJu92Ya9ab-YleuPa682rEVQxg-xUccpdLKZBlBYYqlXXQYxqtz",
          //my fucking iporn 6 simulator
          // "to": "fEOLctSTWL8:APA91bGF8wEjdbQS4U9rVKHdjDTCOIiYSTZbsV2DBGyFG4WCFSuowJ2oawyeH6IMix_AwGoVujlGcof-tS5VpJs_Y0UtK7yoqY8-zxLPvNWLO7-RfRlNHXgBOtE88supqKvRvJMeSLL0",
          "notification":{
        		"title": "Thesis",
        		"body": "Thông báo tiền nước tháng "+ month,
        		"sound": "default",
        		"click_action": "fcm.ACTION.HELLO"
        	}
        }
        fetch('https://fcm.googleapis.com/fcm/send', { method: "POST", headers, body:JSON.stringify(body) })
      		.then(response => console.log("Send "+response));
    }).catch(err => {
        console.log(err);
      });
    });
    axios.get(localURL+'/NSDs/'+id)
    .then(res => {
      axios.post(localURL+'/CN3s',{
        "User_id": id,
        "Thang": month,
        "Nam":year,
        "Sonuoc": num,
        "AddCode": res.data.AddCode,
        "Nocuoc": true,
        "Khoa":false
      }).then(res=> {
        // this.onNum1Change('');
        this.onNum2Change('');
        this.refs.modal3.open();
      });
    });

    // this.refs.modal3.open();
    // console.log(num);
  }

  renderButton(){

    if (this.props.loading) {
      return <Spinner style={{marginTop:20}} size="large" />;
    }
    return (
      <TouchableOpacity activeOpacity={.5} onPress={this.onCheckPress.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Kiểm Tra</Text>
        </View>
      </TouchableOpacity>
    );
  }
  renderWriteNum(){
    if (this.props.writeNum) {
      return(
        <View style={styles.textWarp}>
          <Icon1 style={styles.icon} name="classic-computer" size={40} color="#FFF"/>
          <View style={{flexDirection:'row', justifyContent:'space-around',marginBottom:50 }}>
            <View style={{width:150, height:50}}>
              <Text style={styles.textInside}>
                Số Đầu:
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder="Số Nước Đầu"
                placeholderTextColor="#a9a9a9"

                value={this.props.Socuoi.toString()}
              />
            </View>
            <View style={{width:150, height:50}}>
              <Text style={styles.textInside}>
                Số Cuối:
              </Text>
              <TextInput
                style={styles.inputText}
                placeholder="Số Nước Cuối"
                placeholderTextColor="#a9a9a9"
                onChangeText={this.onNum2Change.bind(this)}
                value={this.props.num2}
              />
            </View>
          </View>

            <TouchableOpacity activeOpacity={.5} onPress={this.onSendPress.bind(this)}>
              <View style={styles.buttonSend}>
                <Text style={styles.buttonText}>Gửi</Text>
              </View>
            </TouchableOpacity>
        </View>
      );
    }
  }
  render() {
    return(
      <View style={styles.container}>
        <Image source={background} style={styles.background}>
          <View style={styles.wrapper}>
              <View>
                <Icon style={styles.icon} name="ios-people-outline" size={40} color="#FFF"/>
                  <Text style={styles.textInside}>
                    ID Khách hàng:
                  </Text>
                  <TextInput
                    style={styles.inputText}
                    placeholder="ID Người dùng"
                    placeholderTextColor="#a9a9a9"
                    onChangeText={this.onIdChange.bind(this)}
                    value={this.props.id}
                  />
              </View>

              <Text style={styles.errorTextStyle}>
                {this.props.error}
              </Text>
              {this.renderButton()}
              {this.renderWriteNum()}
            </View>
            <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
              <Text>Thành Công</Text>

              <View style={{flex: 1}}>
                <Image
                 source={doneImg}
                 style={{flex: 1,width: 150,height: null,resizeMode: 'contain'
               }}/>
              </View>

            </Modal>
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
  wrapper: {
    paddingTop: 60,
    padding: 10,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    padding:20,
    backgroundColor: 'transparent',
  },
  modal: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 250,
    width: 250
  },
  icon: {
    padding:10,
    backgroundColor: 'transparent'
  },
  textInside: {
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  },
  inputText: {
      flex: 1,
      color: '#FFF',
      fontSize: 20,
      marginVertical:10,
      minHeight:50,
      borderBottomWidth: 1,
      borderBottomColor: "#CCC"
    },
    button: {
      backgroundColor: "#FF3366",
      paddingVertical: 10,
      alignItems: "center",
      justifyContent: "center",
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

const mapStateToProps = ({ nvgs }) => {
  const { id,Socuoi, num1, num2, error, loading, writeNum } = nvgs;

  return { id,Socuoi, num1, num2, error, loading, writeNum };
};

export default connect(mapStateToProps, {
  idChanged, num1Changed, num2Changed, checkUser
})(NVGS);
