import { ADD_CARD, REMOVE_CARD } from './cardType';

export const addCard = payload => {
  return {
    type: ADD_CARD,
    payload: payload
  };
};

export const removeCard = payload => {
  return {
    type: REMOVE_CARD,
    payload: payload
  };
};
