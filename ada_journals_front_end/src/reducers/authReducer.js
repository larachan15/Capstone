// import { TEST_DISPATCH } from '../actions/types';
import isEmpty from '../validation/isEmpty';
import { SET_CURRENT_USER } from '../actions/types';

const initialState = {
  isAuthenticated: false,
  user: {},
  // greeting: 'testing hello world!'
}

export default function(state = initialState, action) {
  switch(action.type) {
    // case TEST_DISPATCH:
    //   return {
    //     // making copy of state here, don't change or mutate it. Use spread operator.
    //     ...state,
    //     // fill user in with payload from userData
    //     user: action.payload
    //   }
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default:
      return state;
  }
}
