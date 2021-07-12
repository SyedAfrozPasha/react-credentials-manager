import React, { useReducer, useEffect, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CryptoJS from 'crypto-js';
import './style.css';

// import 'tippy.js/dist/tippy.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

import { cardReducer, initializer } from './Redux/Card/cardReducer';

const CredsManager = React.lazy(() => import('./Components/CredsManager'));

export const CardContext = React.createContext();

export default function App() {
  const [cardState, cardDispatch] = useReducer(cardReducer, {}, initializer);

  useEffect(() => {
    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(cardState),
      'secretKey@123'
    ).toString();
    localStorage.setItem('data', JSON.stringify(ciphertext));
  }, [cardState]);

  return (
    <CardContext.Provider
      value={{
        cardState,
        cardDispatch
      }}
    >
      <div className="flex flex-col min-h-screen">
        <Router>
          <Header />
          <Suspense fallback={<div>Loading...</div>}>
            <Switch>
              <Route exact path="/">
                <CredsManager />
              </Route>
            </Switch>
          </Suspense>
        </Router>
        <Footer />
      </div>
    </CardContext.Provider>
  );
}
