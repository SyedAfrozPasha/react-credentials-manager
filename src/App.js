import React, { useReducer, useEffect, useState, Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import Modal from 'react-modal';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

import 'react-tippy/dist/tippy.css';

import PrivateRoute from './Components/PrivateRoute';
import PublicRoute from './Components/PublicRoute';

import useDebounce from './Hooks/useDebounce';

import { cardReducer, cardInitializer } from './Redux/Card/cardReducer';
import { authReducer, authInitializer } from './Redux/Auth/authReducer';

const LoginScreen = React.lazy(() => import('./Components/Login'));
const LandingPage = React.lazy(() => import('./Components/LandingPage'));

export const CardContext = React.createContext();
export const AuthContext = React.createContext();

toast.configure();
Modal.setAppElement('#root');

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
    if (authState.token) {
      let ciphertext = CryptoJS.AES.encrypt(
        JSON.stringify(debouncedCardState),
        secretToken
      ).toString();
      localStorage.setItem('data', JSON.stringify(ciphertext));
    }
  }, [debouncedCardState]);

  useEffect(() => {
    if (
      localStorage.getItem('token') &&
      JSON.parse(localStorage.getItem('token'))
    ) {
      let encryptedToken = JSON.parse(localStorage.getItem('token'));
      let words = encryptedToken
        ? CryptoJS.enc.Base64.parse(encryptedToken)
        : null;
      let token = words ? CryptoJS.enc.Utf8.stringify(words) : null;

      setSecretToken(token);
    }
  }, [authState.token]);

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
