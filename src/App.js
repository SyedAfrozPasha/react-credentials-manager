import React, { useReducer, Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

import cardReducer from './Redux/Card/cardReducer';

console.log('cardReducer:::', cardReducer);

const CredsManager = React.lazy(() => import('./Components/CredsManager'));

export const CardContext = React.createContext();

export default function App() {
  const [cardState, cardDispatch] = useReducer(cardReducer, {});

  console.log('cardState - APP:', cardState);

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
