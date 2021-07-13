import CryptoJS from 'crypto-js';
import { LOGIN_USER, LOGOUT_USER } from './authType';

const generatedRandomString = (len = 36) => {
  return Math.random()
    .toString(len)
    .slice(2);
};

const removeCardLogic = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    delete cardState[action.payload];
    return cardState;
  }

  return state;
};

const updateCardLogic = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      const cardObj = fieldData.map(field => {
        return {
          ...field,
          cardName: action.payload.cardName
        };
      });

      return {
        ...cardState,
        [action.payload.cardID]: cardObj
      };
    }
    return cardState;
  }

  return state;
};

const removeInputField = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];

    if (fieldData && fieldData.length > 0) {
      fieldData.splice(
        fieldData.findIndex(v => v.fieldID === action.payload.fieldID),
        1
      );

      cardState[action.payload.cardID] = fieldData;

      return cardState;
    }

    return state;
  }

  return state;
};

const updateInputFields = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      let objIndex = fieldData.findIndex(
        obj => obj.fieldID === action.payload.fieldID
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

      return cardState;
    } else {
      return state;
    }
  } else {
    return state;
  }
};

export const authInitializer = (initialValue = {}) => {
  try {
    if (!localStorage.getItem('data')) {
      return initialValue;
    }

    let ciphertext = JSON.parse(localStorage.getItem('data'));
    let bytes = CryptoJS.AES.decrypt(ciphertext, 'secretKey@123');
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
    // return JSON.parse(localStorage.getItem('data')) || initialValue;
  } catch (err) {
    return initialValue;
  }
};

export const cardReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return removeCardLogic(state, action);

    case LOGOUT_USER:
      return updateCardLogic(state, action);

    default:
      return state;
  }
};

// export default cardReducer;
