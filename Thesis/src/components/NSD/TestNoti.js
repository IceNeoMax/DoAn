import React, { Component } from 'react';
import {
  Text,
   View,
   StyleSheet,
   Dimensions,
   Image,
   TouchableOpacity,
   Platform
} from 'react-native';

import FCM, {FCMEvent, RemoteNotificationResult, WillPresentNotificationResult, NotificationType} from 'react-native-fcm';

class TestNoti extends Component {
  // componentWillMount(){
  //
  // }
  componentWillMount() {
    this.state={
      token:'',
    }
    FCM.requestPermissions();

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({token})
    });

    FCM.getInitialNotification().then(notif => {
      console.log("INITIAL NOTIFICATION", notif)
    });

    // FCM.scheduleLocalNotification({
    //         fire_date: new Date().getTime()+4000,      //RN's converter is used, accept epoch time and whatever that converter supports
    //         id: "UNIQ_ID_STRING",    //REQUIRED! this is what you use to lookup and delete notification. In android notification with same ID will override each other
    //         body: "from future past",
    //         repeat_interval: "week" //day, hour
    //     })
    this.notificationListner = FCM.on(FCMEvent.Notification, notif => {
      console.log("Notification", notif);
      if(notif.local_notification){
        return;
      }
      if(notif.opened_from_tray){
        return;
      }
      if(Platform.OS ==='ios'){
              //optional
              //iOS requires developers to call completionHandler to end notification process. If you do not call it your background remote notifications could be throttled, to read more about it see the above documentation link.
              //This library handles it for you automatically with default behavior (for remote notification, finish with NoData; for WillPresent, finish depend on "show_in_foreground"). However if you want to return different result, follow the following code to override
              //notif._notificationType is available for iOS platfrom
              switch(notif._notificationType){
                case NotificationType.Remote:
                  notif.finish(RemoteNotificationResult.NewData) //other types available: RemoteNotificationResult.NewData, RemoteNotificationResult.ResultFailed
                  break;
                case NotificationType.NotificationResponse:
                  notif.finish();
                  break;
                case NotificationType.WillPresent:
                  notif.finish(WillPresentNotificationResult.All) //other types available: WillPresentNotificationResult.None
                  break;
              }
            }
    });

    this.refreshTokenListener = FCM.on(FCMEvent.RefreshToken, token => {
      console.log("TOKEN (refreshUnsubscribe)", token);
      this.props.onChangeToken(token);
    });
  }
  render(){
    return (
      null
    )
  }
}

export default TestNoti;
