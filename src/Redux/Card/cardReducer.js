import { ADD_CARD, REMOVE_CARD } from './cardType';

const generatedRandomString = (len = 36) => {
  return Math.random()
    .toString(len)
    .slice(2);
};

const removeCardLogin = (state, action) => {
  if (action && action.payload && action.payload.cardID) {
    delete state[action.payload.cardID];
    return state;
  }
}

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
      return {
        ...state,
        removeCardLogin(state, action)
      };

    default:
      return state;
  }
};

export default cardReducer;
