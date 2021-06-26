import React from 'react';

export default function Header() {
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
