import firebase from 'firebase';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';
import {
  ERROR_CHANGED,

} from './types';
import {localURL} from '../components/Global.js';

export const errorChanged = (text) => {
  return {
    type: ERROR_CHANGED,
    payload: text
  };
};
