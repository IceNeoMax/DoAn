import firebase from 'firebase';
import axios from 'axios';
import {AsyncStorage} from 'react-native';
import { Actions } from 'react-native-router-flux';
import {
  EMAIL_CHANGED,
  PASSWORD_CHANGED,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  LOGIN_USER,
  SEE_NOTIF
} from './types';

import {localURL} from '../components/Global';

export const emailChanged = (text) => {
  return {
    type: EMAIL_CHANGED,
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: PASSWORD_CHANGED,
    payload: text
  };
};
export const seeNotif = (dispatch) => {
  return(dispatch) => Actions.notif();
};
export const loginUser = ({ email, password }) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_USER });

    firebase.auth().signInWithEmailAndPassword(email, password)
      .then(user => loginUserSuccess(dispatch, user))
      .catch(() =>  loginUserFail(dispatch));
  };
};

const loginUserFail = (dispatch) => {
  dispatch({ type: LOGIN_USER_FAIL });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: LOGIN_USER_SUCCESS,
    payload: user
  });
  let check= user.email.includes('nvgs');
  //console.log(check,user.email);
  if(check)
    Actions.main();
  else {
    // axios.get(localURL+'/Nsds')
    // .then(res => {
    //   res.data.map(val =>{
    //     if (user.email == val.User_name) {
    //
    //     }
    //   })
    // });
    axios.get(localURL+'/Nsds?filter'+'[where][User_name]='+user.email)
    .then(res=>{
      // console.log(res.data[0]);
      AsyncStorage.setItem("myKey",res.data[0].id);
      Actions.main2();
    })

  }
};
