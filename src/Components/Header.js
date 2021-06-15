import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const [toggleClass, setToggleClass] = useState('hidden');
  const { pathname } = useLocation();
  const splitLocation = pathname.split('/');

  const handleMenuClick = () => {
    if (toggleClass === 'hidden') {
      setToggleClass('md:flex');
    } else {
      setToggleClass('hidden');
    }
  };

  const handleLinkClick = () => {
    if (toggleClass === 'hidden') {
      setToggleClass('md:flex');
    } else {
      setToggleClass('hidden');
    }
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
      <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
        <span className="font-semibold text-xl tracking-tight">
          Credential Manager 🔐
        </span>
      </div>
    </nav>
  );
}
