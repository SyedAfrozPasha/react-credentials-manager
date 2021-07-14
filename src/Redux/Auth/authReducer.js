import CryptoJS from 'crypto-js';
import { LOGIN_USER, LOGOUT_USER } from './authType';

export const authInitializer = (initialValue = {}) => {
  try {
    if (!localStorage.getItem('data')) {
      return initialValue;
    }

    let ciphertext = JSON.parse(localStorage.getItem('token'));
    let bytes = CryptoJS.AES.decrypt(ciphertext, '$ecRet_Key@1234');
    let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    return decryptedData;
    // return JSON.parse(localStorage.getItem('data')) || initialValue;
  } catch (err) {
    return initialValue;
  }
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      return {
        ...state,
        token: action.payload.token,
        isLoggedIn: true
      };

    case LOGOUT_USER:
      return {
        ...state,
        token: null,
        isLoggedIn: false
      };

    default:
      return state;
  }
};
