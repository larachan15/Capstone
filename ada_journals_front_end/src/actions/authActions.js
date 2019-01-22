import axios from 'axios';
import { GET_ERRORS } from './types';

// Registering a user
export const registerUser = (userData, history) => {
  return (dispatch) => {
    // dispatching data to our reducer. If returning an object, it must have a type.
    // type: TEST_DISPATCH,
    // // action creator
    // payload: userData

    axios.post('/api/users/registration', userData)
      .then((response) => {
        // console.log(response.data);
        history.push('/login')
      })
      .catch((errors) => {
        // console.log(error.response.data);
        dispatch({
          // Asynchronous call where thunk is used. Need to call dispatch instead of just returning
          type: GET_ERRORS,
          // error response
          payload: errors.response.data
        })
      })
  }
}
