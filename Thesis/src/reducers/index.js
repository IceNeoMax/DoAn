import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import NVGSReducer from './NVGSReducer';
import NSDReducer from './NSDReducer';

export default combineReducers({
  auth: AuthReducer,
  nvgs: NVGSReducer,
  nsd: NSDReducer
});
