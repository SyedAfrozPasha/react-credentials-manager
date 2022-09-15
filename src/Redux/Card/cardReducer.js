import CryptoJS from 'crypto-js';
import { generatedRandomString } from '../../Utils/utils';
import {
  ADD_CARD,
  REMOVE_CARD,
  UPDATE_CARD,
  ADD_DATA,
  CLEAR_DATA,
  ADD_INPUT_FIELD,
  REMOVE_INPUT_FIELD,
  UPDATE_INPUT_FIELD,
} from './cardType';

const removeCardLogic = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    delete cardState[action.payload];
    updateLocalStorage(cardState);
    return cardState;
  }
  updateLocalStorage(state);
  return state;
};

const updateCardLogic = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      const cardObj = fieldData.map((field) => {
        let data = {
          ...field,
          cardName: action.payload.cardName,
        };
        updateLocalStorage(data);
        return data;
      });

      let cardData = {
        ...cardState,
        [action.payload.cardID]: cardObj,
      };
      updateLocalStorage(cardData);
      return cardData;
    }
    updateLocalStorage(cardState);
    return cardState;
  }

  updateLocalStorage(state);
  return state;
};

const removeInputField = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];

    if (fieldData && fieldData.length > 0) {
      fieldData.splice(
        fieldData.findIndex((v) => v.fieldID === action.payload.fieldID),
        1
      );

      cardState[action.payload.cardID] = fieldData;

      updateLocalStorage(cardState);
      return cardState;
    }

    updateLocalStorage(state);
    return state;
  }

  updateLocalStorage(state);
  return state;
};

const updateInputFields = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      let objIndex = fieldData.findIndex(
        (obj) => obj.fieldID === action.payload.fieldID
      );

      if (
        fieldData[objIndex] &&
        action.payload.hasOwnProperty('fieldValue') &&
        action.payload.fieldValue
      ) {
        fieldData[objIndex].fieldValue = action.payload.fieldValue;
      } else if (
        fieldData[objIndex] &&
        action.payload.hasOwnProperty('fieldName') &&
        action.payload.fieldName
      ) {
        fieldData[objIndex].fieldName = action.payload.fieldName;
      } else if (
        fieldData[objIndex] &&
        action.payload.hasOwnProperty('isMarked')
      ) {
        fieldData[objIndex].isMasked = action.payload.isMasked;
      }

      updateLocalStorage(cardState);
      return cardState;
    } else {
      updateLocalStorage(state);
      return state;
    }
  } else {
    updateLocalStorage(state);
    return state;
  }
};

export const cardInitializer = (initialValue = {}) => {
  try {
    if (!localStorage.getItem('token') || !localStorage.getItem('data')) {
      return initialValue;
    }

    let ciphertext = JSON.parse(localStorage.getItem('data'));
    let encryptedToken = JSON.parse(localStorage.getItem('token'));

    let words = encryptedToken
      ? CryptoJS.enc.Base64.parse(encryptedToken)
      : null;
    let token = words ? CryptoJS.enc.Utf8.stringify(words) : null;

    let bytes = token ? CryptoJS.AES.decrypt(ciphertext, token) : null;

    let decryptedData = bytes
      ? JSON.parse(bytes.toString(CryptoJS.enc.Utf8))
      : {};

    return decryptedData;
    // return JSON.parse(localStorage.getItem('data')) || initialValue;
  } catch (err) {
    console.log('cardInitializer:', err);
    return initialValue;
  }
};

const authToken = localStorage.getItem('token')
  ? JSON.parse(localStorage.getItem('token'))
  : null;

const updateLocalStorage = (state) => {
  if (authToken) {
    let words = CryptoJS.enc.Base64.parse(authToken);
    let sToken = words ? CryptoJS.enc.Utf8.stringify(words) : null;

    let ciphertext = CryptoJS.AES.encrypt(
      JSON.stringify(state),
      sToken
    ).toString();
    localStorage.setItem('data', JSON.stringify(ciphertext));
  }
};

export const cardReducer = (state, action) => {
  switch (action.type) {
    case ADD_DATA:
      let add_data = {
        ...state,
        ...action.payload.data,
      };
      updateLocalStorage(add_data);
      return add_data;

    case CLEAR_DATA:
      let clear_data = {};
      // updateLocalStorage(clear_data);
      return clear_data;

    case ADD_CARD:
      let add_card_data = {
        ...state,
        [action.payload]: [
          {
            fieldID: generatedRandomString(),
            fieldName: '',
            cardName: '',
            fieldValue: '',
            isMasked: false,
          },
        ],
      };
      updateLocalStorage(add_card_data);
      return add_card_data;

    case REMOVE_CARD:
      return removeCardLogic(state, action);

    case UPDATE_CARD:
      return updateCardLogic(state, action);

    case ADD_INPUT_FIELD:
      let returnObj = {
        ...state,
        [action.payload.cardID]: [
          ...state[action.payload.cardID],
          ...[
            {
              fieldID: generatedRandomString(),
              fieldName: '',
              cardName: action.payload.cardName || '',
              fieldValue: '',
              isMasked: false,
            },
          ],
        ],
      };
      updateLocalStorage(returnObj);
      return returnObj;

    case REMOVE_INPUT_FIELD:
      return removeInputField(state, action);

    case UPDATE_INPUT_FIELD:
      return updateInputFields(state, action);

    default:
      // updateLocalStorage(state);
      return state;
  }
};

// export default cardReducer;
