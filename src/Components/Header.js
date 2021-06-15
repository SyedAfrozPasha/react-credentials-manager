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
      <div className="block md:hidden">
        <button
          className="flex items-center px-3 py-2 border rounded text-gray-800 border-gray-800 hover:text-white focus:outline-none"
          onClick={handleMenuClick}
        >
          <svg
            className="fill-current h-3 w-3"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>Menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
          </svg>
        </button>
      </div>
      <div
        className={`w-full block flex-grow md:flex ${toggleClass} md:items-center md:w-auto`}
      >
        <div className="text-sm md:flex-grow">
          <Link
            className={`block mt-4 md:inline-block md:mt-0 hover:text-black mr-4 ${
              splitLocation[1] === 'string-utility-tool'
                ? 'border-b-2 border-gray-800 text-black font-medium'
                : 'text-gray-800 font-medium'
            }`}
            to="/string-utility-tool"
            onClick={handleLinkClick}
          >
            String Utility Tool
          </Link>
          <Link
            className={`block mt-4 md:inline-block md:mt-0  hover:text-black mr-4 ${
              splitLocation[1] === 'json-viewer'
                ? 'border-b-2 border-gray-800 text-black font-medium'
                : 'text-gray-800 font-medium'
            }`}
            to="/json-viewer"
            onClick={handleLinkClick}
          >
            JSON Viewer
          </Link>
          <Link
            className={`block mt-4 md:inline-block md:mt-0  hover:text-black mr-4 ${
              splitLocation[1] === 'chart-plotter'
                ? 'border-b-2 border-gray-800 text-black font-medium'
                : 'text-gray-800 font-medium'
            }`}
            to="/chart-plotter"
            onClick={handleLinkClick}
          >
            Chart Plotter
          </Link>
        </div>
      </div>
    </nav>
  );
}
