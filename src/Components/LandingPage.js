import React from 'react';

import Header from './Header';
import Footer from './Footer';
const CredsManager = React.lazy(() => import('./CredsManager'));

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen pb-24">
      <Header />
      <CredsManager />
      <Footer />
    </div>
  );
}
