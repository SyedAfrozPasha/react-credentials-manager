import React, { useContext } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  console.log('Private:authState:', authState);

  return (
    <Route
      {...rest}
      render={props =>
        authState && authState.isLoggedIn && restricted ? (
          <Redirect to="/login" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
