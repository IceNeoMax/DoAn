import {
  ERROR_CHANGED,

} from '../actions/types';

const INITIAL_STATE = {
  error: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ERROR_CHANGED:
      return { ...state, error: action.payload };
        default:
      return state;
  }
};
