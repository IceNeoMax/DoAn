import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity
} from 'react-native';
import Bill  from './Bill';
import HistoryBill  from './HistoryBill';
import NotifNsd  from './NotifNsd';

import { TabViewAnimated, TabBar } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/Ionicons';

const { width, height } = Dimensions.get("window");
const background = require("../common/login1_bg.png");

class NSD extends Component {
  componentWillMount(){
    this.state = {
      index: 0,
      routes: [
        { key: '1', title: 'Hóa Đơn', icon:'ios-bookmark-outline' },
        { key: '2', title: 'Lịch Sử', icon:'ios-bookmarks-outline' },
        { key: '3', title: 'Thông Báo', icon:'ios-alert-outline' },
      ],
    };
    this._handleChangeTab= this._handleChangeTab.bind(this);
  }
  _handleChangeTab(index) {
   this.setState({ index });
 }

 _renderHeader(props){
   return <TabBar {...props} />;
 }
 _renderScene({ route }){
   switch (route.key) {
     case '1':
        return(
          <View style={[styles.page]}>
            <Bill />
          </View>
        );
      case '2':
      return(
        <View style={[styles.page]}>
          <HistoryBill />
        </View>
      );
      case '3':
            return(
              <View style={[styles.page]}>
                <NotifNsd />
              </View>
            );
      default:
        return null;
   }
 }
 _renderIcon({ route }){
    return (
      <Icon name={route.icon} size={25} color="#FFF"/>
    );
  }
 _renderBadge({ route }){
   if (route.key === '3') {
     return (
       <View style={styles.badge}>
         <Text style={styles.count}>2</Text>
       </View>
     );
   }
   return null;
 }
 _renderFooter = (props) => {
    return (
      <TabBar
        {...props}
        renderIcon={this._renderIcon}
        renderBadge={this._renderBadge}
        renderIndicator={this._renderIndicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
      />
    );
  }

  render() {
    return(
      <TabViewAnimated
        style={[ styles.container, this.props.style ]}
        navigationState={this.state}
        renderScene={this._renderScene}
        renderFooter={this._renderFooter}
        onRequestChangeTab={this._handleChangeTab}
      />

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
    paddingTop: 60,
    padding: 10,
    fontSize:18,
    color: 'white',
    backgroundColor: 'transparent'

  },
  tabbar: {
    backgroundColor: '#222',
  },
  tab: {
    padding: 0,
  },
  icon: {
    backgroundColor: 'transparent',
    color: 'white',
  },
  indicator: {
    flex: 1,
    backgroundColor: '#0084ff',
    margin: 4,
    borderRadius: 2,
  },
  badge: {
    marginTop: 4,
    marginRight: 30,
    backgroundColor: '#f44336',
    height: 20,
    width: 20,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
  },
  count: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
    marginTop: -2,
  },
  page: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});


export default NSD;
