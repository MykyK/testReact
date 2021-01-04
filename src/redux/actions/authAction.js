import { myLogin, myRegistration } from "../../services/authService";
import actionPromise from './promiseAction'
import { actionGetActiveSessions }from './sessionsAction'
import {history} from '../../helpers/history'

function actionLogin(login, password) {
  const actionToken =  (token) => ({type: 'AUTH_LOGIN',
  token,
  error: null})

  return async dispatch => {
      let token = await dispatch(actionPromise(myLogin(login, password), 'login'))
                  console.log('test!!!')
                  token.data.login ? await dispatch(actionToken(token.data.login)) : console.log(token)
                  await dispatch(actionGetActiveSessions())
                  history.push('/');
  }
}
function actionRegister(login, password, nick){
    return async dispatch => {
        await dispatch(actionPromise(myRegistration(login, password, nick), 'registration'))
        await  dispatch(actionLogin(login, password))
    }
}
function actionLogOut(){
  const actionLogout = () => ({type: 'AUTH_LOGOUT'})
  history.push('/login');
      return async dispatch => {
        await dispatch(actionLogout())
      }
}

export {
  actionLogin,
  actionRegister,
  actionLogOut
}
