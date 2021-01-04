import decode from 'jwt-decode'
import {actionLogin} from "../actions/authAction";
const user = localStorage.getItem('api_token') ? decode(localStorage.getItem('api_token')) : false
const initialState = user
  ? { isLoggedIn: true, user }
  : { isLoggedIn: false, user: null };
const loggedIn = user ? true : false
console.log(loggedIn)
const authReducer = (state = initialState, action) => {
  if(!state) {
      if(localStorage.getItem('api_token')){
          actionLogin(localStorage.getItem('api_token'))
          console.log(localStorage.getItem('api_token'),"token")
          return {
              token: localStorage.getItem('api_token'),
              user: decode(localStorage.getItem('api_token')),
              name: user && user.sub.login,
              isLoggedIn: loggedIn
          }
      }
  }
  if (action.type === 'AUTH_LOGIN') {
      localStorage.setItem('api_token', action.token)
      return {
          token: action.token,
          user: decode(action.token),
          name: user && user.sub.login,
          isLoggedIn: loggedIn
      }
  }
  if (action.type === 'AUTH_LOGOUT') {
      localStorage.removeItem('api_token')
      return {
          isLoggedIn: loggedIn
      }
  }
  return state;
}


export default authReducer;
