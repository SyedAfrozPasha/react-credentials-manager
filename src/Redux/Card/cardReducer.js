import {
  ADD_CARD,
  REMOVE_CARD,
  UPDATE_CARD,
  ADD_INPUT_FIELD,
  REMOVE_INPUT_FIELD,
  UPDATE_INPUT_FIELD
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

const cardReducer = (state, action) => {
  // console.log('cardReducer - state:', state);
  // console.log('cardReducer - action:', action);
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.payload]: [
          // {
          //   fieldID: generatedRandomString(),
          //   fieldName: '',
          //   cardName: '',
          //   fieldValue: ''
          // }
        ]
      };

    case REMOVE_CARD:
      return removeCardLogic(state, action);

    case UPDATE_CARD:
      return updateCardLogic(state, action);

    case ADD_INPUT_FIELD:
      return {
        ...state,
        [action.payload.cardID]: [
          ...state[action.payload.cardID],
          ...[
            {
              fieldID: generatedRandomString(),
              fieldName: '',
              cardName: action.payload.cardName || '',
              fieldValue: ''
            }
          ]
        ]
      };

    case REMOVE_INPUT_FIELD:
      return removeInputField(state, action);

    case UPDATE_INPUT_FIELD:
      return updateCardLogic(state, action);

    default:
      return state;
  }
};

export default cardReducer;
