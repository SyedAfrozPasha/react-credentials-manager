import React, { useState, useEffect, useContext } from 'react';
import { Tooltip } from 'react-tippy';
import { toast } from 'react-toastify';
import Modal from 'react-modal';
import InputField from './InputField';
import { CardContext } from '../App';
import useDebounce from '../Hooks/useDebounce';

export default function Cards({ cardID }) {
  const cardContext = useContext(CardContext);
  const cardData = cardContext.cardState;
  const [cardName, setCardName] = useState(
    cardData &&
      cardData[cardID] &&
      cardData[cardID].length > 0 &&
      cardData[cardID][0] &&
      cardData[cardID][0].cardName
      ? cardData[cardID][0].cardName
      : ''
  );
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  const debouncedTitle = useDebounce(cardName, 500);

  useEffect(() => {
    cardContext.cardDispatch({
      type: 'UPDATE_CARD',
      payload: { cardID, cardName: debouncedTitle }
    });
    setCardName(debouncedTitle);
  }, [debouncedTitle]);

  const removeCard = () => {
    toast.success('Card Removed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    cardContext.cardDispatch({
      type: 'REMOVE_CARD',
      payload: cardID
    });
    setModalIsOpen(false);
  };

  const modelOpen = () => {
    setModalIsOpen(true);
  };

  const modelClose = () => {
    setModalIsOpen(false);
  };

  const updateCardName = event => {
    setCardName(event.target.value);
  };

  const addInputField = () => {
    toast.success('Input Field Added!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    cardContext.cardDispatch({
      type: 'ADD_INPUT_FIELD',
      payload: { cardID, cardName }
    });
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

  return (
    <div className="box border rounded flex flex-col shadow-lg bg-white">
      <div className="bg-gray-lighter px-3 py-2 border-b flex flex-wrap justify-between">
        <input
          className="appearance-none block w-2/3 text-gray-700 rounded py-2 font-bold leading-tight focus:outline-none"
          id={`card-title-${cardID}`}
          type="text"
          placeholder="Card Title"
          value={cardName || ''}
          onChange={updateCardName}
        />
        <span className="relative inline-flex rounded-md">
          <Tooltip title="Add Input Field">
            <button
              // title="Add Input Field"
              className="p-0 w-8 h-8 bg-teal-600 rounded-full hover:bg-teal-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              onClick={addInputField}
            >
              <svg
                viewBox="0 0 20 20"
                enableBackground="new 0 0 20 20"
                className="w-6 h-6 inline-block"
              >
                <path
                  fill="#FFFFFF"
                  d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                />
              </svg>
            </button>
          </Tooltip>
          <Tooltip title="Delete Card">
            <button
              // title="Delete this card"
              className="p-0 ml-1 w-8 h-8 bg-red-700 rounded-full hover:bg-red-600 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none text-white"
              onClick={modelOpen}
              style={{ paddingLeft: '6px' }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="3 6 5 6 21 6" />
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                <line x1="10" y1="11" x2="10" y2="17" />
                <line x1="14" y1="11" x2="14" y2="17" />
              </svg>
            </button>
          </Tooltip>
        </span>
      </div>
      <div className="flex flex-wrap mt-4">
        {cardData && cardData[cardID] && cardData[cardID].length > 0 ? (
          cardData[cardID].map(val => {
            if (val && val.fieldID) {
              return (
                <InputField
                  key={val.fieldID}
                  cardID={cardID}
                  fieldData={val}
                  uniqueKey={val.fieldID}
                />
              );
            }
          })
        ) : (
          <div className="w-full text-center tracking-wide text-gray-500 font-bold mb-4 focus:outline-none">
            Add input field by clicking on `+` button
          </div>
        )}
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
            <span className="text-base text-gray-700 font-medium">
              Delete Card
            </span>
          </div>
          <div className="bg-grey-lighter px-4 py-2">
            <div>Are you sure you want to delete?</div>
          </div>
          <div className="flex justify-end bg-grey-lighter px-4 py-2">
            <button
              class="bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-1 px-4 border border-teal-500 hover:border-transparent rounded"
              onClick={modelClose}
            >
              Cancel
            </button>
            <button
              class="bg-red-600 hover:bg-red-700 text-white font-semibold py-1 px-4 ml-2 rounded"
              onClick={removeCard}
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
