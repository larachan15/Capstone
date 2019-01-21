const initialState = {
  isAuthenticated: false,
  user: {},
  greeting: 'testing hello world!'
}

export default function(state = initialState, action) {
  switch(action.type) {
    default:
      return state;
  }
}
