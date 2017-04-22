import {
  ID_CHANGED,
  NUM1_CHANGED,
  NUM2_CHANGED,
  CHECK_USER_SUCCESS,
  CHECK_USER_FAIL,
  CHECK_USER
} from '../actions/types';

const INITIAL_STATE = {
  id: '',
  num1: '',
  num2: '',
  user: null,
  error: '',
  loading: false,
  writeNum: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ID_CHANGED:
      return { ...state, id: action.payload };
    case NUM1_CHANGED:
        return { ...state, num1: action.payload };
    case NUM2_CHANGED:
          return { ...state, num2: action.payload };
    case CHECK_USER:
      return { ...state, loading: true, error: '' };
    case CHECK_USER_SUCCESS:
        return { ...state, ...INITIAL_STATE, writeNum:true, id:action.payload, user: action.payload };
    case CHECK_USER_FAIL:
      return { ...state, error: 'Sai ID', writeNum:false, loading: false };
    default:
      return state;
  }
};
