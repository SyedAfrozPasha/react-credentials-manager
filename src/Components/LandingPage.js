import React, { useContext } from 'react';

import Header from './Header';
import Footer from './Footer';
const CredsManager = React.lazy(() => import('./CredsManager'));

import { AuthContext, CardContext } from '../App';

export default function LandingPage() {
  const authContext = useContext(AuthContext);
  const cardContext = useContext(CardContext);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <Header
        authDispatch={authContext.authDispatch}
        cardDispatch={cardContext.cardDispatch}
        enableLoginButton={false}
      />
      <CredsManager />
      <Footer />
    </div>
  );
}
