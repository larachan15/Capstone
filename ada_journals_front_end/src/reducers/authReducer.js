// import { TEST_DISPATCH } from '../actions/types';

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
    default:
      return state;
  }
}
