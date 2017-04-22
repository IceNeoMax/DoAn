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
});


export default NVGS;
