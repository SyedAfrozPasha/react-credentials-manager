import React, { useState, useEffect, useContext } from 'react';
import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import { CardContext } from '../App';

export default function AddCardButton() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const cardContext = useContext(CardContext);

  useEffect(() => {
    if (
      cardContext &&
      cardContext.cardState &&
      !isObjectEmpty(cardContext.cardState)
    ) {
      setIsFirstLoad(false);
    } else {
      setIsFirstLoad(true);
    }
  }, [cardContext.cardState]);

  const addCards = () => {
    toast.success('Card Added!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
    cardContext.cardDispatch({
      type: 'ADD_CARD',
      payload: generatedRandomString()
    });
  };

  const generatedRandomString = (len = 36) => {
    return Math.random()
      .toString(len)
      .slice(2);
  };

  const isObjectEmpty = obj => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  return (
    <div className="h-full">
      <div className="fixed bottom-0 right-0 w-16 h-16 mr-4 mb-12" id="box_btn">
        <span className="relative inline-flex rounded-md shadow-sm">
          <Tippy content="Add Card">
            <button
              className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
              // title="Add Card"
              onClick={addCards}
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
          </Tippy>

          {isFirstLoad && (
            <span className="flex absolute h-3 w-3 top-0 right-0 mt-0 mr-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-teal-700 opacity-75" />
              <span className="relative inline-flex rounded-full h-3 w-3 bg-teal-500" />
            </span>
          )}
        </span>
      </div>
    </div>
  );
}
