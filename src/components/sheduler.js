import React, { Component, useEffect, useState } from 'react';
import { connect } from 'react-redux'
import Scheduler from '../plugins/index';
import { actionGetMasterSession } from './../redux/actions/masterAction'
import moment from 'moment';


const Calendar = ({ gestSession, data }) => {

  console.log('masterID', data.master.masterId)
    const date = []
    if (data.user.role  == 'client')  {
      console.log('userID', data.user.clientId)
        if (data.sessions) {
            data.sessions.forEach(item =>{
                date.push({
                    start_date:moment(item.startTime).utc().format(),
                    end_date:moment(item.endTime).utc().format(),
                    text:item.status,
                    id: item.id,
                    clientId: item.clientId
                })
            })
            return (
                <div>
                    <div className='scheduler-container'>
                        <Scheduler show_loading  onDataUpdated={() => console.log()} masterId={data.master.masterId}  clientId={data.user.clientId}  events={date}/>
                    </div>
                </div>
            );
    } else {
        return (
            <div>
                    <h2>Loading...</h2>
                </div>
            );
        }
    } else {
        return (
            <div>
                <h2>You have to be client</h2>
            </div>
        );
    }


 }
 function myMapStateToPropsSession(state) {
    return {
      data: {
          sessions: (state.promise.getMasterSessions &&
            state.promise.getMasterSessions.payload &&
            state.promise.getMasterSessions.payload.data &&
            state.promise.getMasterSessions.payload.data.getMasterSessions) || undefined,
          master: (state.promise.Master &&
            state.promise.Master.payload &&
            state.promise.Master.payload.data &&
            state.promise.Master.payload.data.getMaster) || undefined,
          user: (state.auth.user &&
            state.auth.user.sub ) || undefined
        }
    }
  }
 const CCalendar = connect(myMapStateToPropsSession, { gestSession: actionGetMasterSession })(Calendar)
 export default CCalendar;
