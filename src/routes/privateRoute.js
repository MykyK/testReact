import React from 'react';
import { Redirect, Route } from "react-router-dom";

const PrivateRoute = ({ component: Component, authed, ...rest }) => (
    <Route
      {...rest}
      render={props => (
        localStorage.getItem('api_token') && authed
          ? <Component {...props} />
          : <Redirect to="/login" />
      )}
    />
  );
  export default PrivateRoute;
