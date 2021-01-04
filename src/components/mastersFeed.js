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



const MasterProfileLink = ({id}) => {
  console.log()
  return (
    <Link to={`/masters/${id}`}>Profile</Link>
  )
}

const Master = ({ master: { username, role, id , masterId } }) => {

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
            {username}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {role}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
        <Button size="small" color="primary">
        <MasterProfileLink className="link" id={id} />
        </Button>
      </CardActions>
    </Card>
  );
}
const MasterCard = ({ getMasters, masters }) => {

  useEffect(() => {
    getMasters()

  }, [])

  if (masters) {
    return (
      <div className='feed-container'>
          {masters.map(master => <Master master={master} key={master.id}/>)}
      </div>
    )
  } else {
    return (
      <h1 className="text-center">Masters are not found</h1>
    )
  }
}
function myMapStateToProps(state) {
  return {
    masters: (state.promise.getMasters &&
      state.promise.getMasters.payload &&
      state.promise.getMasters.payload.data &&
      state.promise.getMasters.payload.data.getMasters) || undefined
  }
}
const CMaster = connect(myMapStateToProps, { getMasters: actionGetMasters })(MasterCard)

export default CMaster;
