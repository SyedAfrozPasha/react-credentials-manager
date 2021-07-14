import React, { useState, useRef, useEffect, useContext } from 'react';
import CryptoJS from 'crypto-js';
import validator from 'validator';
import { toast } from 'react-toastify';
import { AuthContext } from '../App';

export default function Login() {
  const authContext = useContext(AuthContext);

  const [mpassword, setMPassword] = useState();

  const loginInputRef = useRef(null);

  useEffect(() => {
    // loginInputRef.current.focus();
  }, []);

  const handleLogin = e => {
    e.preventDefault();
    console.log('mpassword:', mpassword);

    if (
      mpassword &&
      validator.isStrongPassword(mpassword, {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1
      })
    ) {
      console.log('SUCCESS');

      let ciphertext = CryptoJS.AES.encrypt(
        mpassword,
        '$ecRet_Key@1234'
      ).toString();
      localStorage.setItem('token', JSON.stringify(ciphertext));
      localStorage.setItem('isLoggedIn', true);

      console.log('ciphertext:', ciphertext);

      authContext.authDispatch({
        type: 'LOGIN_USER',
        payload: {
          token: ciphertext
        }
      });

      // setErrorMessage('Is Strong Password');
    } else {
      // setErrorMessage('Is Not Strong Password');
      toast.error('Password is Weak!', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true
      });
      localStorage.setItem('isLoggedIn', false);
    }
  };

  const getPassword = e => {
    setMPassword(e.target.value);
  };

  return (
    <div className="flex flex-col min-h-screen bg-teal-600">
      <div className="w-full max-w-xs m-auto bg-white shadow-2xl rounded p-5">
        <div>
          <div className="flex items-center justify-center flex-wrap">
            <div className="flex items-center flex-shrink-0 text-gray-800">
              <span className="font-semibold text-3xl tracking-tight mr-1">
                Kreman
              </span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="30"
                height="30"
              >
                <path fill="none" d="M0 0h24v24H0z" />
                <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
              </svg>
            </div>
          </div>
        </div>
        <div
          className="bg-teal-100 rounded-b text-teal-900 px-4 py-3 shadow-md mt-6"
          role="alert"
        >
          <div className="flex">
            <div className="py-1">
              <svg
                className="fill-current h-6 w-6 text-teal-500 mr-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M2.93 17.07A10 10 0 1 1 17.07 2.93 10 10 0 0 1 2.93 17.07zm12.73-1.41A8 8 0 1 0 4.34 4.34a8 8 0 0 0 11.32 11.32zM9 11V9h2v6H9v-4zm0-6h2v2H9V5z" />
              </svg>
            </div>
            <div>
              <p className="font-bold">Important</p>
              <p className="text-sm">
                If you forgot your master password, you will not be able
                retrieve your data or password back.
              </p>
            </div>
          </div>
        </div>
        <form>
          <div className="mt-6">
            <label
              className="block mb-2 font-bold text-teal-600"
              htmlFor="password"
            >
              Master Password
            </label>
            <input
              className="w-full p-2 mb-6 text-teal-700 border-b-2 border-teal-500 outline-none"
              type="password"
              name="password"
              id="password"
              ref={loginInputRef}
              onChange={getPassword}
            />
          </div>
          <div>
            <input
              className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mb-6 rounded"
              type="submit"
              value="Login"
              onClick={handleLogin}
            />
          </div>
        </form>
      </div>
    </div>
  );
}
