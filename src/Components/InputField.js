import React, { useState } from 'react';
import { Tooltip } from 'react-tippy';
import { toast } from 'react-toastify';
import Modal from './Modal';
// import { CardContext } from '../App';
// import useDebounce from '../Hooks/useDebounce';

export default function InputField({
  cardID,
  uniqueKey,
  fieldData,
  cardDispatch,
}) {
  const [maskInput, setMaskInput] = useState(fieldData.isMasked || false);
  const [enableCopy, setEnableCopy] = useState(true);
  const [fieldValue, setFieldValue] = useState(fieldData.fieldValue || '');
  const [fieldName, setFieldName] = useState(fieldData.fieldName || '');
  const [modalIsOpen, setModalIsOpen] = React.useState(false);

  // const cardContext = useContext(CardContext);

  // const debouncedFieldValue = useDebounce(fieldValue, 500);

  // useEffect(() => {
  //   if (debouncedFieldValue && fieldData && fieldData.fieldID) {
  //     cardDispatch({
  //       type: 'UPDATE_INPUT_FIELD',
  //       payload: {
  //         cardID,
  //         fieldID: fieldData.fieldID,
  //         fieldValue: debouncedFieldValue
  //       }
  //     });
  //   }
  // }, [debouncedFieldValue]);

  // const debouncedFieldName = useDebounce(fieldName, 500);

  // useEffect(() => {
  //   if (debouncedFieldName && fieldData && fieldData.fieldID) {
  //     cardDispatch({
  //       type: 'UPDATE_INPUT_FIELD',
  //       payload: {
  //         cardID,
  //         fieldID: fieldData.fieldID,
  //         fieldName: debouncedFieldName
  //       }
  //     });
  //   }
  // }, [debouncedFieldName]);

  // useEffect(() => {
  //   if (fieldData && fieldData.fieldID) {
  //     cardDispatch({
  //       type: 'UPDATE_INPUT_FIELD',
  //       payload: {
  //         cardID,
  //         fieldID: fieldData.fieldID,
  //         isMasked: maskInput
  //       }
  //     });
  //   }
  // }, [maskInput]);

  const togglePassword = (e, id) => {
    e.preventDefault();
    if (maskInput) {
      setMaskInput(false);
      cardDispatch({
        type: 'UPDATE_INPUT_FIELD',
        payload: {
          cardID,
          fieldID: fieldData.fieldID,
          isMasked: false,
        },
      });
    } else {
      setMaskInput(true);
      cardDispatch({
        type: 'UPDATE_INPUT_FIELD',
        payload: {
          cardID,
          fieldID: fieldData.fieldID,
          isMasked: true,
        },
      });
    }
  };

  const toggleCopy = (e, id) => {
    e.preventDefault();
    const data = document.getElementById(`input-${id}`).value;
    if (data) {
      setEnableCopy(false);
      navigator.clipboard.writeText(data);
      setTimeout(() => {
        setEnableCopy(true);
      }, 3000);
    }
  };

  const deleteInputField = () => {
    toast.success('Input Field Removed!', {
      position: 'top-right',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
    cardDispatch({
      type: 'REMOVE_INPUT_FIELD',
      payload: {
        cardID,
        fieldID: fieldData.fieldID,
      },
    });
  };

  const modelOpen = (e) => {
    e.preventDefault();
    setModalIsOpen(true);
  };

  const modelClose = () => {
    setModalIsOpen(false);
  };

  const updateFieldValue = (event) => {
    setFieldValue(event.target.value);
  };

  const saveFieldValue = (event) => {
    console.log('saveFieldValue:', event.target.value);
    setFieldValue(event.target.value);
    cardDispatch({
      type: 'UPDATE_INPUT_FIELD',
      payload: {
        cardID,
        fieldID: fieldData.fieldID,
        fieldValue: event.target.value,
      },
    });
  };

  const updateFieldName = (event) => {
    setFieldName(event.target.value);
  };

  const saveFieldName = (event) => {
    console.log('saveFieldName:', event.target.value);
    setFieldName(event.target.value);
    cardDispatch({
      type: 'UPDATE_INPUT_FIELD',
      payload: {
        cardID,
        fieldID: fieldData.fieldID,
        fieldName: event.target.value,
      },
    });
  };

  return (
    <div className="w-full px-3 mb-4">
      <div className="flex flex-wrap justify-between">
        <input
          className="uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 focus:outline-none"
          placeholder="Field Name"
          value={fieldName}
          onChange={updateFieldName}
          onBlur={saveFieldName}
        />
        <Tooltip title="Delete Input Field">
          <span
            // title="Delete this Field"
            className="text-gray-600 cursor-pointer hover:text-red-700"
            id={`delete-${uniqueKey}`}
            onClick={modelOpen}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="15" y1="9" x2="9" y2="15" />
              <line x1="9" y1="9" x2="15" y2="15" />
            </svg>
          </span>
        </Tooltip>
      </div>

      <div className="relative w-full">
        <div
          className="absolute inset-y-0 right-0 flex items-center px-2"
          onClick={(e) => toggleCopy(e, uniqueKey)}
        >
          <input
            className="hidden"
            id={`copy-toggle-${uniqueKey}`}
            name={`copy-input-${uniqueKey}`}
            type="checkbox"
          />
          <label
            className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
            htmlFor={`copy-toggle-${uniqueKey}`}
            // title={enableCopy ? 'Copy' : 'Copied'}
          >
            <Tooltip title={enableCopy ? 'Copy' : 'Copied'}>
              {enableCopy && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
              )}

              {!enableCopy && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              )}
            </Tooltip>
          </label>
        </div>
        <div
          className="absolute inset-y-0 right-0 flex items-center px-2 mr-10"
          onClick={(e) => togglePassword(e, uniqueKey)}
        >
          <input
            className="hidden password-toggle"
            id="password-toggle"
            type="checkbox"
            value={maskInput}
          />
          <label
            className="bg-gray-300 hover:bg-gray-400 rounded px-2 py-1 text-sm text-gray-600 font-mono cursor-pointer js-password-label"
            htmlFor="password-toggle"
            name="password-input"
            // title={maskInput ? 'Show' : 'Hide'}
          >
            <Tooltip title={maskInput ? 'Show' : 'Hide'}>
              {maskInput && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              )}

              {!maskInput && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                  <line x1="1" y1="1" x2="23" y2="23" />
                </svg>
              )}
            </Tooltip>
          </label>
        </div>

        <input
          className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
          id={`input-${uniqueKey}`}
          type={maskInput ? 'password' : 'text'}
          placeholder="Password, etc."
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck={false}
          value={fieldValue}
          onChange={updateFieldValue}
          onBlur={saveFieldValue}
        />
      </div>

      <Modal
        modalIsOpen={modalIsOpen}
        title="Delete Input Field"
        message="Are you sure you want to delete?"
        buttonTitle="Delete"
        onModalClose={modelClose}
        onModalButtonAction={deleteInputField}
      />
    </div>
  );
}
