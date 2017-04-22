import React, { Component } from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Modal from 'react-native-modalbox';
import Slider from 'react-native-slider';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  Dimensions,
  TouchableOpacity,
  AsyncStorage,
} from 'react-native';

import LoginForm from './components/login/LoginForm';
import NVGS from './components/NVGS/NVGS';
import NSD from './components/NSD/NSD';
import ErrorReportNSD from './components/NSD/ErrorReportNSD';
import NotifForm from './components/login/NotifForm';

class RouterComponent extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
      isDisabled: false,
      swipeToClose: true,
      sliderValue: 0.3
    };
    AsyncStorage.getItem("myKey")
    .then(val=>{
      if(val!=null)
      Actions.main2();
    });
  }
  onCancelButton = (props) =>{
    this.refs.modal3.close();
  }
  onLogOutButton = (props) =>{
    this.refs.modal3.close();
    AsyncStorage.removeItem("myKey",() =>Actions.auth());
  }
  render(){
    return (
      <View style={styles.wrapper}>
      <Router>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} initial hideNavBar={true}/>
        <Scene
          onLeft={() => Actions.login()}
          leftTitle="Back"
          key="notif"
          component={NotifForm}
          title="Thông Báo"
          hideNavBar={false}
        />
      </Scene>
      <Scene key="main2">
        <Scene
        onLeft={() => this.refs.modal3.open()}
        leftTitle="Thoát"
        onRight={() => Actions.errNSD()}
        rightTitle="Sự Cố"
        key="nsd"
        component={NSD}
         title="Người Dùng"
        initial/>
        <Scene
          onLeft={() => Actions.nsd()}
          leftTitle="Back"
          key="errNSD"
          component={ErrorReportNSD}
          title="Báo Lỗi"/>
      </Scene>
        <Scene key="main">
          <Scene
            onLeft={() => this.refs.modal3.open()}
            leftTitle="Thoát"
            key="nvgs"
            component={NVGS}
            title="Nhân Viên"
            initial/>
        </Scene>

      </Router>


         <Modal style={[styles.modal, styles.modal3]} position={"center"} ref={"modal3"} isDisabled={this.state.isDisabled}>
           <Text style={styles.text}>Đăng Xuất?</Text>

           <View style={{flex: 1, flexDirection: 'row', justifyContent:'space-between'}}>
             <TouchableOpacity activeOpacity={.5} onPress={this.onLogOutButton}>
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
}
  const styles = StyleSheet.create({
  wrapper: {
    flex: 1
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
    backgroundColor:'transparent'
  },

  buttonText: {
    color: "red",
    fontSize: 18,
  },

  text: {
    color: "black",
    fontSize: 18
  }
});

export default RouterComponent;
