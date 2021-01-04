import React, {  useEffect } from 'react';
import { actionGetSession } from './../redux/actions/sessionsAction'
import { connect } from 'react-redux'
import CCalendar from './sheduler'



const SessionProfile  = ({getSession, session, match: {params: {id}}}) => {
  useEffect(()=>{
    getSession(id)
  },[])
  if(session){

    console.log(session)
    return (
        <div>
          <h1>{id}.Hello!I am {session.status}</h1>
        </div>
      )
  } else {
     return (
      <h1>Hello!</h1>
     )
  }
}
function myMapStateToPropsMaster(state) {
  return {
    session: (state.promise.getSession &&
      state.promise.getSession.payload &&
      state.promise.getSession.payload.data &&
      state.promise.getSession.payload.data.getSession) || undefined
  }
}


const CMasterProfile = connect(myMapStateToPropsMaster, { getSession: actionGetSession })(SessionProfile)

export default CMasterProfile;
