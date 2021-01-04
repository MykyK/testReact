import React from 'react';
import 'fontsource-roboto';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Router } from 'react-router-dom';
import {history} from './helpers/history'

import { Provider } from 'react-redux'

import { AccessAlarm, ThreeDRotation } from '@material-ui/icons';
import store from './redux/store'

// darkTheme = responsiveFontSizes(darkTheme);
store.subscribe(() => console.log(store.getState()))
console.log(store.getState().auth)
console.log(store.getState())

ReactDOM.render(
  <React.StrictMode>
    <Router history={history}>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
