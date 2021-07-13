import React, { useState, useEffect, useContext } from 'react';
// import Tippy from '@tippyjs/react';
import { toast } from 'react-toastify';
import { CardContext } from '../App';
import useDebounce from '../Hooks/useDebounce';

export default function Login() {
  return (
    <div className="w-full max-w-xs m-auto bg-white shadow-2xl rounded p-5">
      <header>
        <div className="flex items-center justify-between flex-wrap">
          <div className="flex items-center flex-shrink-0 text-gray-800">
            <span className="font-semibold text-xl tracking-tight ml-3 mr-1">
              Kreman
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z" />
              <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zm-2 0V7a4 4 0 1 0-8 0v1h8zm-5 6v2h2v-2h-2zm-4 0v2h2v-2H7zm8 0v2h2v-2h-2z" />
            </svg>
          </div>
        </div>
      </header>
      <form>
        <div>
          <label className="block mb-2 text-teal-600" for="password">
            Master Password
          </label>
          <input
            className="w-full p-2 mb-6 text-teal-700 border-b-2 border-teal-500 outline-none"
            type="password"
            name="password"
          />
        </div>
        <div>
          <input
            className="w-full bg-teal-500 hover:bg-teal-700 text-white font-bold py-2 px-4 mb-6 rounded"
            type="submit"
            value="Login"
          />
        </div>
      </form>
    </div>
  );
}
