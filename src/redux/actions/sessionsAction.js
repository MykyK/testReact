import { getSessions, createSessionByUser, getActiveSessions, deleteSession, updateSession, getSession } from "../../services/sessionsServices";
import { getMasterBySession } from "../../services/masterService";
import actionPromise from './promiseAction'


function actionGetSessions(){
  return async dispatch => {
      await dispatch(actionPromise(getSessions(), 'getSessions'))
  }
}

function actionGetActiveSessions(){
  return async dispatch => {
      await dispatch(actionPromise(getActiveSessions(), 'ActiveSessions'))
  }
}
function actionDeleteSession(id){
    return async dispatch => {
      await dispatch(actionPromise(deleteSession(id), 'DeletedSessions'))
  }
}

function actionGetSession(id, masterId){
  return async dispatch => {
      // await dispatch(actionPromise(getMasterBySession(masterId), 'MasterBySession'))
      await dispatch(actionPromise(getSession(id), 'getSession'))
  }
}

function actionCreateSession(masterId, clientId, startTime, endTime){
  createSessionByUser(masterId, clientId, startTime, endTime)
  return async dispatch => {
    await dispatch(actionPromise(getActiveSessions(), 'ActiveSessions'))
  }
}
function actionUpdateSession(sessionId, startTime, endTime){
  updateSession(sessionId, startTime, endTime)
  return async dispatch => {
    await dispatch(actionPromise(getActiveSessions(), 'ActiveSessions'))
  }
}

export {
  actionGetSessions,
  actionCreateSession,
  actionGetActiveSessions,
  actionDeleteSession,
  actionUpdateSession,
  actionGetSession
}

