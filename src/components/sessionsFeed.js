import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux'
import { actionGetMasters } from './../redux/actions/masterAction'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import {actionGetSessions} from './../redux/actions/sessionsAction'

const SessionProfileLink = ({id}) => {
  console.log()
  return (
    <Link to={`/session/${id}`}>Session</Link>
  )
}



const Session = ({ session: { status, id , masterId } }) => {

  return (
    <Card className="full-width box-width my-20">
      <CardActionArea>
        <CardMedia
          component="img"
          alt="Contemplative Reptile"
          height="140"
          image="/static/images/placeholder.png"
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {status}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {masterId}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
        <SessionProfileLink id={id} />
        </Button>
      </CardActions>
    </Card>
  );
}
const SessionCard = ({ getSessions, sessions }) => {

  useEffect(() => {
    getSessions()

  }, [])

  if (sessions) {
    return (
      <div className='feed-container'>
          {sessions.map(session => <Session session={session} key={session.id}/>)}
      </div>
    )
  } else {
    return (
      <h1 className="text-center">Sessions are not found</h1>
    )
  }
}
function myMapStateToProps(state) {
  return {
    sessions: (state.promise.getSessions &&
      state.promise.getSessions.payload &&
      state.promise.getSessions.payload.data &&
      state.promise.getSessions.payload.data.getSessions) || undefined
  }
}
 const CSessions = connect(myMapStateToProps, {getSessions: actionGetSessions})(SessionCard)
 export default CSessions
