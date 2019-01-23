import axios from 'axios';
import { GET_PROFILE, PROFILE_LOADING, CLEAR_CURRENT_PROFILE, GET_ERRORS, SET_CURRENT_USER, GET_PROFILES } from './types';

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

export const getProfiles = () => {
  return(dispatch) => {
    dispatch(setProfileLoading());

    axios.get('/api/profile/all')
    .then((response) => {
      dispatch({
        type: GET_PROFILES,
        payload: response.data
      })
    })
    .catch((errors) => {
      dispatch({
        type: GET_PROFILES,
        payload: null
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

// Will delete both user and profile
export const deleteMyAccount = () => {
  return(dispatch) => {
    if(window.confirm('Are you sure you want to delete your account forever?'))
    axios.delete('/api/profile')
    .then((response) => {
      dispatch({
        type: SET_CURRENT_USER,
        payload: {}
      })
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
