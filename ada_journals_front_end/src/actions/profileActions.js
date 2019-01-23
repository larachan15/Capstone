import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS } from './types';

export const getCurrentProfile = () => {
  return(dispatch) => {
    dispatch(setProfileLoading());

    axios.get('/api/profile')
    .then((response) => {
      dispatch({
        type: GET_PROFILE,
        payload: response.data
      })
    })
    .catch((errors) => {
      dispatch({
        type: GET_PROFILE,
        // return empty object if there isn't a profile
        payload: {}
      })
    })
  }
}

export const createProfile = (profileData, history) => {
  return(dispatch) => {
    axios.post('/api/profile', profileData)
    .then((response) => {
      history.push('/dashboard')
    })
    .catch((errors) => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    })
  }
}

export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  }
}

export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  }
}
