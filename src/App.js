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

import Header from './Components/Header';
import Footer from './Components/Footer';

import useDebounce from './Hooks/useDebounce';

import { cardReducer, cardInitializer } from './Redux/Card/cardReducer';
import { authReducer, authInitializer } from './Redux/Auth/authReducer';

const CredsManager = React.lazy(() => import('./Components/CredsManager'));
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
    <CardContext.Provider
      value={{
        cardState,
        cardDispatch
      }}
    >
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route exact path="/">
              <div className="flex flex-col min-h-screen pb-24">
                <Header />
                <CredsManager />
                <Footer />
              </div>
            </Route>
            <Route exact path="/login">
              <div className="flex flex-col min-h-screen bg-teal-600">
                <LoginScreen />
              </div>
            </Route>
            <Redirect exact from="/" to="login" />
          </Switch>
        </Suspense>
      </Router>
    </CardContext.Provider>
  );
}
