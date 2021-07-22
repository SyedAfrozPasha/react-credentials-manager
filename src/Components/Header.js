import React from 'react';
import { Link } from 'react-router-dom';
import { Tooltip } from 'react-tippy';
import Modal from './Modal';
// import { AuthContext, CardContext } from '../App';

function Header({ authDispatch, cardDispatch, enableLoginButton }) {
  // const authContext = useContext(AuthContext);
  // const cardContext = useContext(CardContext);

  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const handleLogout = () => {
    authDispatch({
      type: 'LOGOUT_USER'
    });

    cardDispatch({
      type: 'CLEAR_DATA'
    });

    localStorage.setItem('token', null);
    localStorage.setItem('isLoggedIn', false);
  };

  const modelOpen = () => {
    setModalIsOpen(true);
  };

  const modelClose = () => {
    setModalIsOpen(false);
  };

  return (
    <nav className="flex items-center justify-between flex-wrap bg-teal-500 p-4">
      <Link to="/">
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
      </Link>

      <div>
        {enableLoginButton ? (
          <Tooltip title="Login">
            <Link
              className="inline-block outline-none focus:outline-none"
              to="/login"
            >
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
                <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                <polyline points="10 17 15 12 10 7" />
                <line x1="15" y1="12" x2="3" y2="12" />
              </svg>
            </Link>
          </Tooltip>
        ) : (
          <Tooltip title="Logout">
            <button
              className="outline-none focus:outline-none"
              onClick={modelOpen}
            >
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
        )}
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        title="Logout"
        message="Are you sure you want to logout?"
        buttonTitle="Logout"
        onModalClose={modelClose}
        onModalButtonAction={handleLogout}
      />
    </nav>
  );
}

export default React.memo(Header);
