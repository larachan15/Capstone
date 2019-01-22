import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';
import setAuthToken from '../utilities/setAuthToken';
import jwt_decode from 'jwt-decode';

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
};

// Login/Get user token
export const loginUser = (userData) => {
  return (dispatch) => {
    axios.post('/api/users/login', userData)
    .then((response) => {
      // Saving token to local storage
      const { token } = response.data;
      // Setting token to local storage which only stores strings.
      localStorage.setItem('jwtToken', token);
      // Set token to authorization header
      setAuthToken(token);
      // Decoding token to get user data to get issued at date
      const decoded = jwt_decode(token);
      // Setting the current user
      dispatch(setCurrentUser(decoded));

    }).catch((errors) => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    })
  }
}

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  }
}
