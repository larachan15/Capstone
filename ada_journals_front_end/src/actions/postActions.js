import axios from 'axios';
import { ADD_POST, GET_ERRORS, GET_POSTS, GET_POST, POST_LOADING, DELETE_POST } from './types';

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

// Get posts
export const getPosts = () => {
  return (dispatch) => {
    dispatch(setPostLoading());
    axios.get('/api/posts')
      .then((response) => {
        dispatch({
          type: GET_POSTS,
          payload: response.data
        })
      }
    )
    .catch((errors) => {
      dispatch({
        type: GET_POSTS,
        payload: null
      })
    })
  }
}

// Get a post
export const getPost = (id) => {
  return (dispatch) => {
    dispatch(setPostLoading());
    axios.get(`/api/posts/${id}`)
      .then((response) => {
        dispatch({
          type: GET_POST,
          payload: response.data
        })
      }
    )
    .catch((errors) => {
      dispatch({
        type: GET_POST,
        payload: null
      })
    })
  }
}

// Delete a post
export const deletePost = (id) => {
  return (dispatch) => {
  axios
    .delete(`/api/posts/${id}`)
    .then((response) =>
      dispatch({
        type: DELETE_POST,
        payload: id
      })
    )
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    );
  }
};

// Add a like
export const addLike = (id) => {
  return (dispatch) => {
  axios
    .post(`/api/posts/like/${id}`)
    .then((response) => dispatch(getPosts()))
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    );
  }
};

// Remove a like
export const unLike = (id) => {
  return (dispatch) => {
  axios
    .post(`/api/posts/unlike/${id}`)
    .then((response) => dispatch(getPosts()))
    .catch((errors) =>
      dispatch({
        type: GET_ERRORS,
        payload: errors.response.data
      })
    );
  }
};

// Add a comment
export const addComment = (postId, commentData) => {
  return (dispatch) => {
    axios.post(`/api/posts/comment/${postId}`, commentData)
      .then((response) => {
        dispatch({
          type: GET_POST,
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


// Loading state
export const setPostLoading = () => {
  return {
    type: POST_LOADING
  };
};
