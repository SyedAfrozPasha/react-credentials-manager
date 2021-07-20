import React from 'react';
import Modal from 'react-modal';

export default function Modal({
  title,
  message,
  buttonTitle,
  modalIsOpen,
  onModalClose,
  onModalButtonAction
}) {
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

  return (
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
          <span className="text-base text-gray-700 font-medium">{title}</span>
        </div>
        <div className="bg-grey-lighter px-4 py-2">
          <div>{message}</div>
        </div>
        <div className="flex justify-end bg-grey-lighter px-4 py-2">
          <button
            className="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-4 border border-teal-500 hover:border-transparent rounded"
            onClick={onModalClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 ml-2 rounded"
            onClick={onModalButtonAction}
          >
            {buttonTitle}
          </button>
        </div>
      </div>
    </Modal>
  );
}
