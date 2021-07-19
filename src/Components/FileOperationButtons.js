import React, { useRef, useMemo } from 'react';
// import CryptoJS from 'crypto-js';
import { toast } from 'react-toastify';

function FileOpertaionButtons({ cardDispatch, isFirstLoad, cardData }) {
  const inputFile = useRef(null);

  const uploadJSONFile = () => {
    inputFile.current.click();
  };

  const handleUpload = event => {
    if (
      event.target &&
      event.target.files &&
      event.target.files.length > 0 &&
      event.target.files[0] &&
      event.target.files[0].name
    ) {
      let fileExt = event.target.files[0].name.split('.').pop();
      fileExt = fileExt.toLowerCase();
      if (fileExt === 'json') {
        const fileReader = new FileReader();
        fileReader.readAsText(event.target.files[0], 'UTF-8');
        fileReader.onload = e => {
          if (e.target.result) {
            try {
              let data = JSON.parse(e.target.result);
              // let ciphertext = CryptoJS.AES.encrypt(
              //   JSON.stringify(data),
              //   'secretKey@123'
              // ).toString();
              // localStorage.setItem('data', JSON.stringify(ciphertext));

              cardDispatch({
                type: 'ADD_DATA',
                payload: {
                  data
                }
              });

              toast.success('Data Uploaded!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
            } catch (err) {
              toast.error('Unable to read data!', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true
              });
            }
          }
        };
      } else {
        toast.error('File format not supported!', {
          position: 'top-right',
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true
        });
      }
    }
  };

  const handleSaveToSystem = (e, filename = 'kreman-user-data') => {
    let isEncrypted = false;

    let fileData = JSON.stringify(cardData);

    if (
      e.target &&
      e.target.id &&
      e.target.id === 'encryptedJSON' &&
      localStorage.getItem('data')
    ) {
      try {
        isEncrypted = true;
        let jsonData = {
          data: JSON.parse(localStorage.getItem('data'))
        };
        fileData = JSON.stringify(jsonData);
      } catch (err) {}
    }

    const blob = new Blob([fileData], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = isEncrypted
      ? `${filename}-encrypted.json`
      : `${filename}.json`;
    link.href = url;
    link.click();
  };

  // console.log('FILE_OP_BTN');

  return useMemo(() => {
    console.log('FILE_USEMEMO');

    return (
      <div className="flex flex-row-reverse mb-8">
        <input
          type="file"
          id="file"
          ref={inputFile}
          accept="application/json"
          onChange={handleUpload}
          style={{ display: 'none' }}
        />
        <button
          className="bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold py-2 px-4 rounded inline-flex items-center ml-2"
          onClick={uploadJSONFile}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2"
          >
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="17 8 12 3 7 8" />
            <line x1="12" y1="3" x2="12" y2="15" />
          </svg>
          <span>Import</span>
        </button>
        <div
          className={`hover:block inline-block relative ml-2 ${
            isFirstLoad ? 'cursor-not-allowed' : 'dropdown'
          }`}
        >
          <button
            className={`bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center ${
              isFirstLoad ? 'cursor-not-allowed' : ''
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2"
            >
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            <span className="mr-1">Save As</span>
            <svg
              className="fill-current h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
            </svg>
          </button>
          <ul
            className={`absolute hidden text-gray-700 pt-1 z-10 ${
              isFirstLoad ? 'cursor-not-allowed' : 'dropdown-menu'
            }`}
          >
            <li className="">
              <a
                className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                role="button"
                id="encryptedJSON"
                onClick={handleSaveToSystem}
              >
                Encrypted Text
              </a>
            </li>
            <li className="">
              <a
                className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                role="button"
                id="plainJSON"
                onClick={handleSaveToSystem}
              >
                Plain Text
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }, [isFirstLoad]);

  // return (
  //   <div className="flex flex-row-reverse mb-8">
  //     <input
  //       type="file"
  //       id="file"
  //       ref={inputFile}
  //       accept="application/json"
  //       onChange={handleUpload}
  //       style={{ display: 'none' }}
  //     />
  //     <button
  //       className="bg-gray-300 text-gray-700 hover:bg-gray-400 font-semibold py-2 px-4 rounded inline-flex items-center ml-2"
  //       onClick={uploadJSONFile}
  //     >
  //       <svg
  //         xmlns="http://www.w3.org/2000/svg"
  //         width="20"
  //         height="20"
  //         viewBox="0 0 24 24"
  //         fill="none"
  //         stroke="currentColor"
  //         strokeWidth="2"
  //         strokeLinecap="round"
  //         strokeLinejoin="round"
  //         className="mr-2"
  //       >
  //         <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
  //         <polyline points="17 8 12 3 7 8" />
  //         <line x1="12" y1="3" x2="12" y2="15" />
  //       </svg>
  //       <span>Import</span>
  //     </button>
  //     <div
  //       className={`hover:block inline-block relative ml-2 ${
  //         isSaveDisabled ? 'cursor-not-allowed' : 'dropdown'
  //       }`}
  //     >
  //       <button
  //         className={`bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center ${
  //           isSaveDisabled ? 'cursor-not-allowed' : ''
  //         }`}
  //       >
  //         <svg
  //           xmlns="http://www.w3.org/2000/svg"
  //           width="20"
  //           height="20"
  //           viewBox="0 0 24 24"
  //           fill="none"
  //           stroke="currentColor"
  //           strokeWidth="2"
  //           strokeLinecap="round"
  //           strokeLinejoin="round"
  //           className="mr-2"
  //         >
  //           <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
  //           <polyline points="17 21 17 13 7 13 7 21" />
  //           <polyline points="7 3 7 8 15 8" />
  //         </svg>
  //         <span className="mr-1">Save As</span>
  //         <svg
  //           className="fill-current h-4 w-4"
  //           xmlns="http://www.w3.org/2000/svg"
  //           viewBox="0 0 20 20"
  //         >
  //           <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
  //         </svg>
  //       </button>
  //       <ul
  //         className={`absolute hidden text-gray-700 pt-1 z-10 ${
  //           isSaveDisabled ? 'cursor-not-allowed' : 'dropdown-menu'
  //         }`}
  //       >
  //         <li className="">
  //           <a
  //             className="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
  //             role="button"
  //             id="encryptedJSON"
  //             onClick={handleSaveToSystem}
  //           >
  //             Encrypted Text
  //           </a>
  //         </li>
  //         <li className="">
  //           <a
  //             className="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
  //             role="button"
  //             id="plainJSON"
  //             onClick={handleSaveToSystem}
  //           >
  //             Plain Text
  //           </a>
  //         </li>
  //       </ul>
  //     </div>
  //   </div>
  // );
}

export default FileOpertaionButtons;
