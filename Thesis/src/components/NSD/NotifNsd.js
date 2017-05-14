import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   AsyncStorage,
   ScrollView
} from 'react-native';
import axios from 'axios';
// import TestNoti from './TestNoti';
import { localURL } from '../Global.js';
import { connect } from 'react-redux';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");

class NotifNsd extends Component {
  state= {
    notifs:[],
    User_id: ''
   };

  componentWillMount(){
    //let username = this.props.user.email;
    // axios.get(localURL+'/Nsds')
    // .then(res => {
    //   res.data.map(val =>{
    //     let temp = [];
    //     if (username == val.User_name) {
    //       this.setState({
    //         User_id : val.id
    //       });
    AsyncStorage.getItem("myKey")
    .then(val=>{
      let temp = [];
      this.setState({
            User_id : val
      });
        axios.get(localURL+'/Thongbaos')
        .then(resu=>{
          // console.log(resu.data);
          resu.data.map(value =>{
            if(value.User_id == val||value.User_id=='none')
            temp.push(value);
          });
          this.setState({notifs:temp.reverse()});
        });
    });

  }
  renderData(){
    return this.state.notifs.map(val=>
      (<TouchableOpacity key={val.id}>
        <View style={styles.notifbox}>
          <Text style={styles.texttime}>
            {val.Thoigian}
          </Text>
          <Text style={styles.text}>
            {val.Noidung}
          </Text>
        </View>
      </TouchableOpacity>)
    );
  }
  render() {
    return(
      <View style={styles.container}>
        <Image source={background} style={styles.background}>
          <ScrollView>
              {this.renderData()}
          </ScrollView>
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
    paddingTop:60,
    width,
    height,
  },
  notifbox:{
    backgroundColor: '#F9F9F9',
    padding:10,
    margin:10,
    borderLeftWidth:4,
    borderColor: '#0074D9',
  },
  texttime:{
    fontSize:12,
    color:'black',
    position: 'absolute',
    top:2,
    left:2
  },
  text: {
    margin:10,
    fontSize:18,
    color: 'black'
  }
});

// const mapStateToProps = (state) => {
//    const { user } = state.auth;
//    return { user };
// };

export default connect()(NotifNsd);
