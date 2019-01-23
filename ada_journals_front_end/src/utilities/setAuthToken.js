import axios from 'axios';

// If user is logged in, this will attach the token to the authorization header
const setAuthToken = (token) => {
  if(token) {
    // apply this token to every request
    axios.defaults.headers.common['Authorization'] = token;
  } else {
    // remove the authorization header
    delete axios.defaults.headers.common['Authorization'];
  }
}

export default setAuthToken;
