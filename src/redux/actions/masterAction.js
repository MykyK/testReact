import { getMasters, getMaster, getMasterSessions } from "../../services/masterService";
import { actionGetActiveSessions }from './sessionsAction'
import actionPromise from './promiseAction'


function actionGetMasters(){
  return async dispatch => {
      await dispatch(actionPromise(getMasters(), 'getMasters'))
      await dispatch(actionGetActiveSessions())
  }
}
function actionGetMaster(id, masterId){
  return async dispatch => {
      await dispatch(actionPromise(getMaster(id), 'Master'))
      await dispatch(actionGetMasterSession(masterId))
  }
}
function actionGetMasterSession(masterId){
  return async dispatch => {
      await dispatch(actionGetActiveSessions())
      await dispatch(actionPromise(getMasterSessions(masterId), 'getMasterSessions'))
  }
}

export {
  actionGetMasters,
  actionGetMaster,
  actionGetMasterSession
}
