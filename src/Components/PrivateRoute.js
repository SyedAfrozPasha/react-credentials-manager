import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  console.log('Private:authState:', authState);
  console.log('authState.isLoggedIn:', authState.isLoggedIn);

  return (
    <Route
      {...rest}
      render={() =>
        authState && authState.isLoggedIn ? children : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
