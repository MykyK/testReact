function actionPromise(promise, name){
  const actionPending = (name) => ({type: 'SET_STATUS',
                                name,
                                status: 'PENDING',
                                payload: null,
                                error: null})

const actionResolved = (name, payload) => ({type: 'SET_STATUS',
                                name,
                                status: 'RESOLVED',
                                payload,
                                error: null})

const actionRejected = (name, error) => ({type: 'SET_STATUS',
                                name,
                                status: 'REJECTED',
                                payload: null,
                                error})

  return async dispatch => {
      dispatch(actionPending(name))
      try {
          let result = await promise
           dispatch(actionResolved(name, result))
          return result;
      }
      catch(e){
          dispatch(actionRejected(name, e))
      }
  }
}

export default actionPromise;
