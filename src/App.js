import React, { useReducer, useEffect, useState, Suspense } from 'react';
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
  const [secretToken, setSecretToken] = useState('');

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

  const debouncedCardState = useDebounce(cardState, 1000);

  useEffect(() => {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(debouncedCardState),
      secretToken
    ).toString();
    localStorage.setItem('data', JSON.stringify(ciphertext));
  }, [debouncedCardState]);

  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token'))
    ) {
      console.log('useEffect - APP');

      let encryptedToken = JSON.parse(localStorage.getItem('token'));
      console.log('encryptedToken:', encryptedToken);
      let words = encryptedToken
        ? CryptoJS.enc.Base64.parse(encryptedToken)
        : null;
      let token = words ? CryptoJS.enc.Utf8.stringify(words) : null;

      console.log('token:LL', token);

      // let encryptedToken = localStorage.getItem('token');
      // let bytes = CryptoJS.AES.decrypt(encryptedToken, '$ecRet_Key@1234');
      // let token = bytes.toString(CryptoJS.enc.Utf8);
      setSecretToken(token);
    }
  }, [authState.token]);

  console.log('authState:', authState);
  console.log('cardState:', cardState);

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
              {/* <PublicRoute
                restricted={false}
                component={LoginScreen}
                path="/login"
                exact
              /> */}
              <PublicRoute path="/login" exact restricted={false}>
                <LoginScreen />
              </PublicRoute>
              <PrivateRoute path="/" exact>
                <LandingPage />
              </PrivateRoute>
            </Switch>
          </Suspense>
        </Router>
      </CardContext.Provider>
    </AuthContext.Provider>
  );
}
