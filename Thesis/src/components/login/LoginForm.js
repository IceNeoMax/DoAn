import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser, seeNotif } from '../../actions';
import { Spinner } from '../common';
import TestNoti from '../NSD/TestNoti';

const { width, height } = Dimensions.get("window");

const background = require("../common/login1_bg.png");
const mark = require("./login.jpg");
const lockIcon = require("./login1_lock.png");
const personIcon = require("./login1_person.png");

class LoginForm extends Component {
  componentWillMount(){
    AsyncStorage.getItem("myKey").then((value) => {
            // console.log(value);
        }).done();
  }
  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }
  seeNotif(){
    this.props.seeNotif();
  }
  onButtonPress() {
    const { email, password } = this.props;

    this.props.loginUser({ email, password });
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size="large" />;
    }

    return (
      <TouchableOpacity activeOpacity={.5} onPress={this.onButtonPress.bind(this)}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>Đăng Nhập</Text>
        </View>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View style={styles.container}>
      <TestNoti />

        <Image source={background} style={styles.background}>
          <View style={styles.markWrap}>
            <Image source={mark} style={styles.mark} resizeMode="contain" />
          </View>
          <View style={styles.wrapper}>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={personIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholder="Username"
                placeholderTextColor="black"
                style={styles.input}
                onChangeText={this.onEmailChange.bind(this)}
                value={this.props.email}
              />
            </View>
            <View style={styles.inputWrap}>
              <View style={styles.iconWrap}>
                <Image source={lockIcon} style={styles.icon} resizeMode="contain" />
              </View>
              <TextInput
                placeholderTextColor="black"
                placeholder="Password"
                style={styles.input}
                secureTextEntry
                onChangeText={this.onPasswordChange.bind(this)}
                value={this.props.password}
              />
            </View>
            <Text style={styles.errorTextStyle}>
              {this.props.error}
            </Text>
            {this.renderButton()}
          </View>
          <View style={styles.container}>
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Xem Thông Báo?</Text>
              <TouchableOpacity activeOpacity={.5} onPress={this.seeNotif.bind(this)}>
                <View>
                  <Text style={styles.signupLinkText}>Click Here</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Image>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  errorTextStyle: {
    fontSize: 20,
    alignSelf: 'center',
    color: 'red',
    backgroundColor:'transparent'

  },
  markWrap: {
    flex: 1,
    paddingVertical: 30,
  },
  mark: {
    width: null,
    height: null,
    flex: 1,
  },
  background: {
    width,
    height,
  },
  wrapper: {
    paddingVertical: 30,
  },
  inputWrap: {
    flexDirection: "row",
    marginVertical: 10,
    height: 40,
    borderBottomWidth: 1,
    borderBottomColor: "#CCC"
  },
  iconWrap: {
    paddingHorizontal: 7,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    height: 20,
    width: 20,
  },
  input: {
    flex: 1,
    paddingHorizontal: 10,
    color: "#FFF",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#FF3366",
    paddingVertical: 20,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
  },
  signupWrap: {
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  accountText: {
    color: "#D8D8D8"
  },
  signupLinkText: {
    color: "#FFF",
    marginLeft: 5,
  }
});

const mapStateToProps = ({ auth }) => {
  const { email, password, error, loading } = auth;

  return { email, password, error, loading };
};

export default connect(mapStateToProps, {
  emailChanged, passwordChanged, loginUser,seeNotif
})(LoginForm);
