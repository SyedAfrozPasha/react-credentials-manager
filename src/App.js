import React, { useReducer, useEffect, Suspense } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

// import 'tippy.js/dist/tippy.css';

// import Header from './Components/Header';
// import Footer from './Components/Footer';

import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

import LandingPage from './Components/LandingPage';

import useDebounce from './Hooks/useDebounce';

import { cardReducer, cardInitializer } from './Redux/Card/cardReducer';
import { authReducer, authInitializer } from './Redux/Auth/authReducer';

// const CredsManager = React.lazy(() => import('./Components/CredsManager'));
const LoginScreen = React.lazy(() => import('./Components/Login'));

export const CardContext = React.createContext();
export const AuthContext = React.createContext();

toast.configure();

export default function App() {
  const [cardState, cardDispatch] = useReducer(
    cardReducer,
    {},
    cardInitializer
  );

  const [authState, authDispatch] = useReducer(
    authReducer,
    {},
    authInitializer
  );

  const debouncedCardState = useDebounce(cardState, 1000);

  useEffect(() => {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(debouncedCardState),
      'secretKey@123'
    ).toString();
    localStorage.setItem('data', JSON.stringify(ciphertext));
  }, [debouncedCardState]);

  return (
    <AuthContext.Provider
      value={{
        authState,
        authDispatch
      }}
    >
      <CardContext.Provider
        value={{
          cardState,
          cardDispatch
        }}
      >
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              {/* <Route exact path="/">
                <LandingPage />
              </Route>
              <Route exact path="/login">
                <LoginScreen />
              </Route>
              <Redirect exact from="/" to="login" /> */}
              <PublicRoute
                restricted={false}
                component={LoginScreen}
                path="/login"
                exact
              />
              <PrivateRoute component={LandingPage} path="/" exact />
            </Switch>
          </Suspense>
        </Router>
      </CardContext.Provider>
    </AuthContext.Provider>
  );
}
