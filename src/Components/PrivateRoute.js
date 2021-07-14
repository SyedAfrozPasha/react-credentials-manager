import React, { useContext } from 'react';
import { BrowserRouter as Route, Redirect } from 'react-router-dom';
import { AuthContext } from '../App';

const PrivateRoute = ({ component: Component, ...rest }) => {
  const authContext = useContext(AuthContext);
  const authState = authContext.authState;

  console.log('Private:authState:', authState);

  return (
    <Route
      {...rest}
      render={({ location }) =>
        authState && authState.isLoggedIn ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: location }
            }}
          />
        )
      }
    />
  );
};

export default PrivateRoute;
