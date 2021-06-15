import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './style.css';

import Header from './Components/Header';
import Footer from './Components/Footer';

const CredsManager = React.lazy(() => import('./Components/CredsManager'));

export default function App() {
  return (
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
  );
}
