import CryptoJS from 'crypto-js';
import {
  ADD_CARD,
  REMOVE_CARD,
  UPDATE_CARD,
  ADD_INPUT_FIELD,
  REMOVE_INPUT_FIELD,
  UPDATE_INPUT_FIELD,
  UPDATE_FIELD_NAME,
  UPDATE_FIELD_VALUE,
  UPDATE_FIELD_VISIBLE
} from './cardType';

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

// const addInputField = (state, action) => {
//   if (action && action.payload) {
//     const cardState = { ...state };
//     const cardData = cardState[action.payload.cardID];
//     if (Array.isArray(cardData)) {
//     }
//     // const fieldData = cardState[action.payload.cardID];
//     return cardState;
//   }

//   return state;
// };

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

// const updateInputField = (state, action) => {
//   if (action && action.payload) {
//     const cardState = { ...state };
//     const fieldData = cardState[action.payload.cardID];
//     if (fieldData && fieldData.length > 0) {
//       const cardObj = fieldData.map(field => {
//         return {
//           ...field,
//           fieldName: action.payload.fieldName,
//           fieldValue: action.payload.fieldValue,
//           isMasked: action.payload.isMasked
//           // cardName: action.payload.cardName
//         };
//       });

//       return {
//         ...cardState,
//         [action.payload.cardID]: cardObj
//       };
//     }
//     return cardState;
//   }

//   return state;
// };

const updateInputFieldName = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      const cardObj = fieldData.map(field => {
        return {
          ...field,
          fieldName: action.payload.fieldName,
          fieldValue: action.payload.fieldValue,
          isMasked: action.payload.isMasked
          // cardName: action.payload.cardName
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

// TODO
const updateInputFieldValue = (state, action) => {
  if (action && action.payload) {
    let updateFlag = false;
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      const cardObj = fieldData.map(field => {
        if (field && field.fieldID === action.payload.fieldID) {
          updateFlag = true;
          return {
            ...field,
            fieldValue: action.payload.fieldValue
          };
        }
      });

      if (updateFlag) {
        return {
          ...cardState,
          [action.payload.cardID]: cardObj
        };
      }
    }
    return cardState;
  }

  return state;
};

const updateInputFieldVisible = (state, action) => {
  if (action && action.payload) {
    const cardState = { ...state };
    const fieldData = cardState[action.payload.cardID];
    if (fieldData && fieldData.length > 0) {
      const cardObj = fieldData.map(field => {
        return {
          ...field,
          fieldName: action.payload.fieldName,
          fieldValue: action.payload.fieldValue,
          isMasked: action.payload.isMasked
          // cardName: action.payload.cardName
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

export const initializer = (initialValue = {}) => {
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
    case ADD_CARD:
      return {
        ...state,
        [action.payload]: [
          {
            fieldID: generatedRandomString(),
            fieldName: '',
            cardName: '',
            fieldValue: '',
            isMasked: false
          }
        ]
      };

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
              isMasked: false
            }
          ]
        ]
      };
      console.log('#########################');
      console.log('returnObj:', returnObj);
      console.log('#########################');
      return returnObj;

    case REMOVE_INPUT_FIELD:
      return removeInputField(state, action);

    // case UPDATE_INPUT_FIELD:
    //   return updateInputField(state, action);

    case UPDATE_FIELD_NAME:
      return updateInputFieldName(state, action);

    case UPDATE_FIELD_VALUE:
      return updateInputFieldValue(state, action);

    case UPDATE_FIELD_VISIBLE:
      return updateInputFieldVisible(state, action);

    default:
      return state;
  }
};

// export default cardReducer;
