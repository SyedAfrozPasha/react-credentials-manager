import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

const PublicRoute = ({ children, restricted, ...rest }) => {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  console.log('public:authState:', authState);

  return (
    <Route
      {...rest}
      render={() =>
        authState && !authState.isLoggedIn ? children : <Redirect to="/" />
      }
    />
  );
};

export default PublicRoute;