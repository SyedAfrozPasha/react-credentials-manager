import React, { useContext } from 'react';
import { Tooltip } from 'react-tippy';
import { AuthContext, CardContext } from '../App';

function Header() {
  const authContext = useContext(AuthContext);
  const cardContext = useContext(CardContext);

  const handleLogout = () => {
    authContext.authDispatch({
      type: 'LOGOUT_USER'
    });

    cardContext.cardDispatch({
      type: 'CLEAR_DATA'
    });

    localStorage.setItem('token', null);
    localStorage.setItem('isLoggedIn', false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
        <span className="font-semibold text-xl tracking-tight ml-3 mr-1">
          Kreman
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
        >
          <path fill="none" d="M0 0h24v24H0z" />
          <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
        </svg>
      </div>
      <div>
        <Tooltip title="Logout">
          <button className="outline-none" onClick={handleLogout}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <polyline points="16 17 21 12 16 7" />
              <line x1="21" y1="12" x2="9" y2="12" />
            </svg>
          </button>
        </Tooltip>
      </div>
    </nav>
  );
}

export default React.memo(Header);
