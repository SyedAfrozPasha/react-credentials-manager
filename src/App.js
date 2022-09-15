import React, { useReducer, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

import 'react-tippy/dist/tippy.css';

import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

import { cardReducer, cardInitializer } from './Redux/Card/cardReducer';
import { authReducer, authInitializer } from './Redux/Auth/authReducer';

const LoginScreen = React.lazy(() => import('./Components/Login'));
const LandingPage = React.lazy(() => import('./Components/LandingPage'));
const HomePage = React.lazy(() => import('./Components/HomePage'));

export const CardContext = React.createContext();
export const AuthContext = React.createContext();

toast.configure();
Modal.setAppElement('#root');

export default function App() {
  const [authState, authDispatch] = useReducer(
    authReducer,
    { token: null, isLoggedIn: false },
    authInitializer
  );

  const [cardState, cardDispatch] = useReducer(
    cardReducer,
    {},
    cardInitializer
  );

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch,
      }}
    >
      <CardContext.Provider
        value={{
          cardState,
          cardDispatch,
        }}
      >
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <PublicRoute path="/" exact restricted={false}>
                <HomePage />
              </PublicRoute>
              <PublicRoute path="/login" exact restricted={false}>
                <LoginScreen />
              </PublicRoute>
              <PrivateRoute path="/app" exact>
                <LandingPage />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </Router>
      </CardContext.Provider>
    </AuthContext.Provider>
  );
}
