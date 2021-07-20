import React, { useContext, useState } from 'react';
import { Tooltip } from 'react-tippy';
import Modal from 'react-modal';
// import { AuthContext, CardContext } from '../App';

function Header({ authDispatch, cardDispatch }) {
  // const authContext = useContext(AuthContext);
  // const cardContext = useContext(CardContext);

  const [modalIsOpen, setIsOpen] = React.useState(false);

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

  const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: 'auto',
      bottom: 'auto',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      padding: 0,
      border: 0,
      boxShadow: '0 25px 50px -12px rgba(0, 0, 0, .25)'
    }
  };

  console.log('HEADER');

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
          <button
            className="outline-none focus:outline-none"
            onClick={handleLogout}
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
      </div>
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="box border border-teal-500 rounded flex flex-col bg-white">
          <div className="flex justify-start bg-grey-lighter px-4 py-2 border-b">
            <svg
              className="fill-current h-4 w-4 text-red-500 mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              style={{ marginTop: '0.3rem' }}
            >
              <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
            </svg>
            <span className="text-base text-gray-700 font-medium">Delete</span>
          </div>
          <div className="bg-grey-lighter px-4 py-2">
            <div>Are you sure you want to delete?</div>
          </div>
          <div className="flex justify-end bg-grey-lighter px-4 py-2">
            <button class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-4 border border-teal-500 hover:border-transparent rounded">
              Cancel
            </button>
            <button class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 ml-2 rounded">
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </nav>
  );
}

export default React.memo(Header);
