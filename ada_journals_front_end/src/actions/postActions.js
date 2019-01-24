import axios from 'axios';
import { GET_ERRORS, ADD_POST } from './types';

// Add a post
export const addPost = (postData) => {
  return (dispatch) => {
    axios.post('/api/posts', postData)
      .then((response) => {
        dispatch({
          type: ADD_POST,
          payload: response.data
        })
      }
    )
    .catch((errors) => {
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    })
  }
}
