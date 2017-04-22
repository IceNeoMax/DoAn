import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  ID_CHANGED,
  NUM1_CHANGED,
  NUM2_CHANGED,
  CHECK_USER_SUCCESS,
  CHECK_USER_FAIL,
  CHECK_USER,
} from './types';
import {localURL} from '../components/Global.js';

export const idChanged = (text) => {
  return {
    type: ID_CHANGED,
    payload: text
  };
};
export const num1Changed = (text) => {
  return {
    type: NUM1_CHANGED,
    payload: text
  };
};
export const num2Changed = (text) => {
  return {
    type: NUM2_CHANGED,
    payload: text
  };
};

export const checkUser = ({ id }) => {
  return (dispatch) => {
    dispatch({ type: CHECK_USER });
    axios.get(localURL+'/NSDs')
    .then(res => {
      let check = false;
        res.data.map(
          val => {
           if(val.id==id)
           check = true;
         });
         if(check) this.setTimeout(() =>checkUserSuccess(dispatch, id),500);
         else checkUserFail(dispatch);
    }).catch(err => console.log(err));
   };
};

const checkUserSuccess = (dispatch, id) => {
  dispatch({
    type: CHECK_USER_SUCCESS,
    payload: id
  });
};
const checkUserFail = (dispatch) => {
  dispatch({ type: CHECK_USER_FAIL });
};
