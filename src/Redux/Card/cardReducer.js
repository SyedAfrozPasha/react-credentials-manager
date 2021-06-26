import { ADD_CARD, REMOVE_CARD } from './cardType';

const generatedRandomString = (len = 36) => {
  return Math.random()
    .toString(len)
    .slice(2);
};

const removeCardLogic = (state, action) => {
  if (action && action.payload && action.payload) {
    const cardState = { ...state };
    delete cardState[action.payload];
    return cardState;
  }

  return state;
};

const cardReducer = (state, action) => {
  console.log('cardReducer - state:', state);
  console.log('cardReducer - action:', action);
  switch (action.type) {
    case ADD_CARD:
      return {
        ...state,
        [action.payload]: [
          {
            fieldID: generatedRandomString(),
            fieldName: '',
            cardName: '',
            fieldValue: ''
          }
        ]
      };

    case REMOVE_CARD:
      return removeCardLogic(state, action);

    default:
      return state;
  }
};

export default cardReducer;
