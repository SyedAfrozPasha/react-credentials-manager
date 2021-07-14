import CryptoJS from 'crypto-js';
import { LOGIN_USER, LOGOUT_USER } from './authType';

export const authInitializer = (
  initialValue = { token: null, isLoggedIn: false }
) => {
  try {
    // if (!localStorage.getItem('token')) {
    //   return initialValue;
    // }

    // let ciphertext = JSON.parse(localStorage.getItem('token'));
    // let bytes = CryptoJS.AES.decrypt(ciphertext, '$ecRet_Key@1234');
    // let token = bytes.toString(CryptoJS.enc.Utf8);
    let token = JSON.parse(localStorage.getItem('token'));
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    return {
      token,
      isLoggedIn
    };
    // return JSON.parse(localStorage.getItem('data')) || initialValue;
  } catch (err) {
    console.log(err);
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
