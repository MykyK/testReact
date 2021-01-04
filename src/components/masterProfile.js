import React, {  useEffect } from 'react';
import { actionGetMaster } from './../redux/actions/masterAction'
import { connect } from 'react-redux'
import CCalendar from './sheduler'



const MasterProfile  = ({getMaster, master, match: {params: {id}}}) => {
  useEffect(()=>{
    getMaster(id, id)
  },[])
  if(master){
    return (
        <div>
          <h1>{master.id}.Hello!I am {master.username}</h1>
          <CCalendar />
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
    master: (state.promise.Master &&
      state.promise.Master.payload &&
      state.promise.Master.payload.data &&
      state.promise.Master.payload.data.getMaster) || undefined
  }
}


const CMasterProfile = connect(myMapStateToPropsMaster, { getMaster: actionGetMaster })(MasterProfile)

export default CMasterProfile;
