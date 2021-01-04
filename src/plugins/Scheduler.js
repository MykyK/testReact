import React, { Component } from 'react';
import 'dhtmlx-scheduler';
import 'dhtmlx-scheduler/codebase/dhtmlxscheduler_material.css';
import{ actionCreateSession, actionDeleteSession , actionUpdateSession}from '../redux/actions/sessionsAction'
import store from '../redux/store'
import moment from 'moment';
const scheduler = window.scheduler;

export default class Scheduler extends Component {
    initSchedulerEvents() {
        if (scheduler._$initialized) {
            return;
        }
        const ownerId = store.getState().auth.user.sub.clientId.toString()
        const onDataUpdated = this.props.onDataUpdated;
        let clientId = this.props.clientId ? this.props.clientId.toString() : null
        let masterId = this.props.masterId ? this.props.masterId.toString() : null
       scheduler.attachEvent('onEventAdded', async (id, ev) => {
            if (onDataUpdated) {
               await actionCreateSession(
                    masterId,
                    clientId,
                    moment(ev.start_date).utc().format(),
                    moment(ev.end_date).utc().format(),
                     'open'
                )
                onDataUpdated('create', ev, id);
            }
        });
        scheduler.attachEvent('onEventChanged', async (id, ev) => {
            if (onDataUpdated) {
                await actionUpdateSession(
                    ev.id,
                    moment(ev.start_date).utc().format(),
                    moment(ev.end_date).utc().format(),
                    'open'
                )
                onDataUpdated('update', ev, id);
            }
        });

        scheduler.attachEvent('onEventDeleted', async (id, ev) => {
            if (onDataUpdated) {
            store.dispatch( await actionDeleteSession(ev.id))
            onDataUpdated('delete', ev, id);
            }
        });
        function block_readonly(id){
            var event = scheduler.getEvent(id)
            if (event) {
                if (id == undefined || event.clientId == ownerId) return scheduler.getEvent(id).readonly = true;
                return scheduler.getEvent(id) ? scheduler.getEvent(id).readonly = false : event.readonly = false ;
            }
          }

        scheduler.attachEvent("onBeforeDrag",block_readonly);
        scheduler.attachEvent("onDblClick",block_readonly);

        scheduler._$initialized = true;
  }
     componentDidMount() {
        const clientId = store.getState().auth.user.sub.clientId
        scheduler.skin = 'material';
        scheduler.config.header = [
            'day',
            'week',
            'month',
            'date',
            'prev',
            'today',
            'next'
        ];
        this.masterId = this.props.masterId ? this.props.masterId.toString() : null
        this.myDate = this.props.events
        scheduler.config.hour_date = '%g:%i %A';
        scheduler.xy.scale_width = 70;
        const { events } = this.props;

        events.forEach(e =>{
            if (clientId == e.clientId) {
                e.color = 'green'
                e.readonly = false
                console.log(e.clientId)
            } else {
                e.color = 'red'
                e.readonly = true
            }


        })
        this.initSchedulerEvents();

        scheduler.init(this.schedulerContainer, new Date());
        scheduler.clearAll();
        scheduler.parse(events);
    }

    render() {
        return (
            <div
                ref={ (input) => { this.schedulerContainer = input } }
                style={ { width: '100%', height: '100%', borderRadius: '10px', border: '1px solid red'} }
            ></div>
       );
    }
}
