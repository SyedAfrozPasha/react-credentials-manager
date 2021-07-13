import React, { useReducer, useEffect, Suspense } from 'react';
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';
import 'react-toastify/dist/ReactToastify.css';
import './style.css';

// import 'tippy.js/dist/tippy.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

import useDebounce from './Hooks/useDebounce';

import { cardReducer, initializer } from './Redux/Card/cardReducer';

const CredsManager = React.lazy(() => import('./Components/CredsManager'));

export const CardContext = React.createContext();

toast.configure();

export default function App() {
  const [cardState, cardDispatch] = useReducer(cardReducer, {}, initializer);

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
      <div className="flex flex-col min-h-screen">
        {/* <Router> */}
        <Header />
        <Suspense fallback={<div>Loading...</div>}>
          {/* <Switch>
              <Route exact path="/"> */}
          <CredsManager />
          {/* </Route>
            </Switch> */}
        </Suspense>
        {/* </Router> */}
        <Footer />
      </div>
    </CardContext.Provider>
  );
}
