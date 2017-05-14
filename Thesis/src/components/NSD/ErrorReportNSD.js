import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   ScrollView,
   TextInput,
   AsyncStorage
} from 'react-native';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import axios from 'axios';
import { connect } from 'react-redux';
import { localURL } from '../Global.js';
import { errorChanged } from '../../actions';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");
const hongong = require("./hongong.jpg");
const suco = require("./suco.jpg");
const batthuong = require("./batthuong.jpg");
const doneImg = require('../NVGS/Done.png');

class ErrorReportNSD extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isOpen4: false,
      isDisabled: false,
      isDisabled4: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
  }
  componentWillMount(){
    // const User_id ='';
    // let username = this.props.user.email;
    // axios.get(localURL+'/Nsds')
    // .then(res => {
    //   res.data.map(val =>{
    //     // console.log(val.id);
    //     if (username == val.User_name) {
    //       this.setState({
    //         User_id : val.id
    //       });
    //     }
    //   })
    // });
    AsyncStorage.getItem("myKey")
    .then(val=>{
      this.setState({
              User_id : val
            });
    });
  }
  onErrorChange(text) {
    this.props.errorChanged(text);
  }
  onCancelButton = (props) =>{
    this.refs.modal3.close();
  }

  onSendButton = (props) =>{
    axios.post(localURL+'/Sucos',{
      "User_id": this.state.User_id,
      "Prob": this.props.error
    })
    .then(()=>{
      this.refs.modal4.open();
      this.onErrorChange('');
    });
    this.refs.modal3.close();
  }
  render() {

    return(
      <View style={styles.container}>
        <ScrollView>
        <Image source={background} style={styles.background}>
          <TextInput
            placeholder="Báo Lỗi"
            placeholderTextColor="gray"
            style={styles.input}
            onChangeText={this.onErrorChange.bind(this)}
            value={this.props.error}
          />
          <TouchableOpacity style={styles.prob} onPress={() => this.refs.modal3.open()}>
            <Text style={styles.text}>
              Gửi sự cố
            </Text>
          </TouchableOpacity>

        </Image>

        </ScrollView>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal4"} isDisabled={this.state.isDisabled4}>
          <Text>Thành Công</Text>

          <View style={{flex: 1}}>
            <Image
             source={doneImg}
             style={{flex: 1,width: 150,height: null,resizeMode: 'contain'
           }}/>
          </View>

        </Modal>

        <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isOpen={this.state.isOpen} onClosed={() => this.setState({isOpen: false})}>
          <Text>Gửi Sự Cố?</Text>
          <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
            <TouchableOpacity activeOpacity={.5} onPress={this.onSendButton}>
              <View style={styles.btn}>
                <Text style={styles.buttonText}>Đồng Ý</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity activeOpacity={.5}  onPress={this.onCancelButton}>
              <View style={styles.btn}>
                <Text style={styles.buttonText}>Không</Text>
              </View>
            </TouchableOpacity>
          </View>

        </Modal>
      </View>

    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 55,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  text: {
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  },
  input: {
    width,
    height:30,
    marginTop:30,
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 18,
  },
  prob: {
    marginHorizontal:30,
    marginVertical:20,
    paddingVertical:10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'white',
    alignItems: 'center',
  },
  probImg:{
    flex: 1,
     width: 300,
     height: null,
     resizeMode: 'contain'
  },
  modal: {
    paddingTop: 30,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal3: {
    height: 200,
    width: 250
  },
  btn: {
    backgroundColor: "#FFF",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    margin: 10,
    backgroundColor: 'transparent'

  },

  buttonText: {
    color: "#6495ed",
    fontSize: 18,
    backgroundColor: 'transparent'

  },
  inputText: {
      paddingHorizontal: 10,
      color: "#FFF",
      fontSize: 18,
      // backgroundColor: 'transparent'

    },
});
const mapStateToProps = (state) => {
  const {error} = state.nsd;
  return {  error };
};

export default connect(mapStateToProps, {errorChanged})(ErrorReportNSD);
