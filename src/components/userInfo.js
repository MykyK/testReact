import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { connect } from 'react-redux'
import decode from 'jwt-decode'
import {actionLogOut} from './../redux/actions/authAction';
import { Link } from 'react-router-dom';


const EditUserLink = ({id, role}) => {
  console.log()
  return (
    <Link to={`/${role}/${id}`}>Edit</Link>
  )
}
const UserInfo = ({name,role, id}) => {
    const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {name}
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose}>{name}</MenuItem>
        <EditUserLink id={id} role={role}/>
        <ConnectedLogoutButton onClick={handleClose}/>
      </Menu>
    </div>
  );
  }
const ConnectedUserInfo = connect(state => ( state.auth.user  ? {name:state.auth.user.sub.username, role:state.auth.user.sub.role, id:state.auth.user.sub.id} : {name:false, role:false, id:false}))(UserInfo)
const LogoutButton = ({onLogout}) => <MenuItem onClick={onLogout}>Logout</MenuItem>
const ConnectedLogoutButton = connect(null, {onLogout: actionLogOut})(LogoutButton)
console.log()
const UserIn = () =>
  <div>
    <ConnectedUserInfo/>
  </div>

export default UserIn;


