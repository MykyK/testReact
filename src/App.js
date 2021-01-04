import React, {useEffect} from 'react';
import './App.css';
import store from "./redux/store";
import {Route , Switch} from "react-router-dom";
import Home from "./pages/HomePage/home";
import LoginForm from "./components/loginForm";
import RegistrationForm from "./components/registrationForm";
import PrivateRoute from './routes/privateRoute';
import NotFound from './components/notFound';
import {
  createMuiTheme,
  makeStyles,
  createStyles,
  responsiveFontSizes,
  Theme as AugmentedTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },
});

store.subscribe(() => console.log(store.getState()))
let auth = store.subscribe(() => store.getState().auth.isLoggedIn)
const App = () => {
  useEffect(() => {
    auth = store.subscribe(() => store.getState().auth.isLoggedIn)
  });
  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <Switch>
          <Route path="/login" component={LoginForm} exact />
          <Route path="/registration" component={RegistrationForm} exact />
          <PrivateRoute path="/" component={Home} authed={auth} />
        </Switch>
      </ThemeProvider>
    </div>
  );
}

export default App;
