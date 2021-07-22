import React, { useContext } from 'react';

import Header from './Header';
import Footer from './Footer';
import HeroSection from './HeroSection';

import { AuthContext, CardContext } from '../App';

const HomePage = () => {
  const authContext = useContext(AuthContext);
  const cardContext = useContext(CardContext);

  return (
    <div className="flex flex-col min-h-screen pb-24">
      <Header
        authDispatch={authContext.authDispatch}
        cardDispatch={cardContext.cardDispatch}
      />
      <HeroSection
        title="Kreman - Simple Credential Manager"
        description1="A simple credential managing tool to manage sensitive data such as passwords, card details, login details, etc."
        description2="We repect your privacy. We do not store any of the user data on the servers. All the data is stored in the browser securely."
      />
      <Footer />
    </div>
  );
};

export default HomePage;
