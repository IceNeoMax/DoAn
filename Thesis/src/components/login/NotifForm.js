import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity
} from 'react-native';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");

class NVGS extends Component {
  render() {
    return(
      <View style={styles.container}>
        <Image source={background} style={styles.background}>
          <Text style={styles.text1}>
            Thông báo giá nước:
          </Text>
          <Text style={styles.text}>
          Mức 20m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text> đầu tiên: 5000đ
          </Text>
          <Text style={styles.text}>
          Mức 20m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text>-30m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text> : 6000đ
          </Text>
          <Text style={styles.text}>
          Mức trên 30m<Text style={{fontSize: 9, lineHeight: 35}}>3</Text>: 7000đ
          </Text>
          <Text style={styles.text}>
          Thông báo lịch cắt nước: Trên toàn địa bàn thành phố vào các ngày 3 6 9 13
          </Text>
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
