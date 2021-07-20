// import CryptoJS from 'crypto-js';
import { LOGIN_USER, LOGOUT_USER } from './authType';

export const authInitializer = (
  initialValue = { token: null, isLoggedIn: false }
) => {
  try {
    let token = JSON.parse(localStorage.getItem('token'));
    let isLoggedIn = JSON.parse(localStorage.getItem('isLoggedIn'));

    return {
      token,
      isLoggedIn
    };
    // return JSON.parse(localStorage.getItem('data')) || initialValue;
  } catch (err) {
    console.log('authInitializer:', err);
    return initialValue;
  }
};

const updateLocalStorage = state => {
  let { token, isLoggedIn } = state;
  localStorage.setItem('token', JSON.stringify(token));
  localStorage.setItem('isLoggedIn', isLoggedIn);
};

export const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN_USER:
      let login_user_data = {
        ...state,
        token: action.payload.token,
        isLoggedIn: true
      };
      updateLocalStorage(login_user_data);
      return login_user_data;

    case LOGOUT_USER:
      let logout_user_data = {
        ...state,
        token: null,
        isLoggedIn: false
      };
      updateLocalStorage(logout_user_data);
      return logout_user_data;

    default:
      updateLocalStorage(state);
      return state;
  }
};
