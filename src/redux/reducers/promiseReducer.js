const promiseReducer = (state, action) => {
  if (action.type === 'SET_STATUS') {
      return {
          ...state,
          [action.name]: {
              status: action.status,
              payload: action.payload,
              error: action.error
          }
      }
  }
  if (!state) {
      return {}
  }
  return state
}


export default promiseReducer;
