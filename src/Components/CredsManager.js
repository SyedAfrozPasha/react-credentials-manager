import React, { useState, useEffect } from 'react';
import HeroSection from './HeroSection';
import InputField from './InputField';

export default function CredsManager() {
  const [inputData, setInputData] = useState();
  const [outputData, setOutputData] = useState();
  const [config, setConfig] = useState({});
  const [isSampleExample, setIsSampleExample] = useState(false);
  const [countInputField, setCountInputField] = useState(['ufa1c77q1o9']);
  const [countCards, setCountCards] = useState(['ufa1c77q1o0']);
  //'ufa1c77q1o9'

  const isObjectEmpty = obj => {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  };

  const navigateToTool = propEvent => {
    let navigate =
      propEvent.dataset && propEvent.dataset.nav ? propEvent.dataset.nav : null;
    if (navigate) {
      let isExample =
        propEvent.dataset && propEvent.dataset.example ? true : false;
      if (isExample) {
        setConfig({
          ...config,
          ['content-start-separator']: '[',
          ['content-end-separator']: ']',
          ['element-start-separator']: '"',
          ['element-end-separator']: '"',
          ['middle-separator']: ',',
          ['seperateByNewLine']: true
        });

        setInputData('Apple\nBanana\nMango\nGrape');

        document.getElementById('content-start-separator').value = '[';
        document.getElementById('content-end-separator').value = ']';
        document.getElementById('element-start-separator').value = '"';
        document.getElementById('element-end-separator').value = '"';
        document.getElementById('middle-separator').value = ',';
        document.getElementById('input').value = 'Apple\nBanana\nMango\nGrape';

        setIsSampleExample(true);
      }

      setTimeout(() => {
        const id = propEvent.dataset.nav;
        const element = document.getElementById(id);
        if (element) element.scrollIntoView();
      }, 0);
    }
  };

  const addCards = () => {
    console.log('ADD CARDS');
  };

  const addInputField = () => {
    console.log('ADD');
    setCountInputField([...countInputField, generatedRandomString()]);
  };

  const removeInputField = propValue => {
    if (propValue) {
      const inputKeys = countInputField || [];
      let index = inputKeys.indexOf(propValue);
      if (index !== -1) {
        inputKeys.splice(index, 1);
      }
      setCountInputField([...inputKeys]);
    }
  };

  const generatedRandomString = (len = 36) => {
    return Math.random()
      .toString(len)
      .slice(2);
  };

  return (
    <div className="min-h-screen min-v-screen bg-grey-lightest font-sans">
      <HeroSection
        title="Credential Manager"
        description1="A simple tool to manage the sensitive data such as passwords, userID etc."
        description2=""
        getNavigation={navigateToTool}
      />

      <div id="tool-start" className="p-8">
        <div className="row sm:flex">
          <div className="col sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="bg-grey-lighter px-3 py-2 border-b flex flex-wrap justify-between">
                <input
                  className="appearance-none block w-2/3 text-gray-700 rounded py-2 font-medium leading-tight focus:outline-none"
                  id="element-start-separator"
                  type="text"
                  placeholder="Card Title"
                />
                <span className="relative inline-flex rounded-md shadow-sm">
                  <button
                    title="Add"
                    className="p-0 w-8 h-8 bg-gray-600 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    onClick={addInputField}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      enableBackground="new 0 0 20 20"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                      />
                    </svg>
                  </button>
                  {isSampleExample && (
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-wrap mt-4">
                {countInputField && countInputField.length > 0 ? (
                  countInputField.map(val => {
                    return (
                      <InputField
                        key={val}
                        uniqueKey={val}
                        removeField={removeInputField}
                      />
                    );
                  })
                ) : (
                  <div className="w-full text-center tracking-wide text-gray-500 font-bold mb-4 focus:outline-none">
                    Add input field by clicking on `+` button
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="bg-grey-lighter px-3 py-2 border-b flex flex-wrap justify-between">
                <input
                  className="appearance-none block w-2/3 text-gray-700 rounded py-2 font-medium leading-tight focus:outline-none"
                  id="element-start-separator"
                  type="text"
                  placeholder="Card Title"
                />
                <span className="relative inline-flex rounded-md shadow-sm">
                  <button
                    title="Add"
                    className="p-0 w-8 h-8 bg-gray-600 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    onClick={addInputField}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      enableBackground="new 0 0 20 20"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                      />
                    </svg>
                  </button>
                  {isSampleExample && (
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-wrap mt-4">
                {countInputField && countInputField.length > 0 ? (
                  countInputField.map(val => {
                    return (
                      <InputField
                        key={val}
                        uniqueKey={val}
                        removeField={removeInputField}
                      />
                    );
                  })
                ) : (
                  <div className="w-full text-center tracking-wide text-gray-500 font-bold mb-4 focus:outline-none">
                    Add input field by clicking on `+` button
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="col mt-8 sm:ml-8 sm:mt-0 sm:w-1/2">
            <div className="box border rounded flex flex-col shadow bg-white">
              <div className="bg-grey-lighter px-3 py-2 border-b flex flex-wrap justify-between">
                <input
                  className="appearance-none block w-2/3 text-gray-700 rounded py-2 font-medium leading-tight focus:outline-none"
                  id="element-start-separator"
                  type="text"
                  placeholder="Card Title"
                />
                <span className="relative inline-flex rounded-md shadow-sm">
                  <button
                    title="Add"
                    className="p-0 w-8 h-8 bg-gray-600 rounded-full hover:bg-gray-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
                    onClick={addInputField}
                  >
                    <svg
                      viewBox="0 0 20 20"
                      enableBackground="new 0 0 20 20"
                      className="w-6 h-6 inline-block"
                    >
                      <path
                        fill="#FFFFFF"
                        d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
                      />
                    </svg>
                  </button>
                  {isSampleExample && (
                    <span className="flex absolute h-3 w-3 top-0 right-0 -mt-1 -mr-1">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-700 opacity-75" />
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500" />
                    </span>
                  )}
                </span>
              </div>
              <div className="flex flex-wrap mt-4">
                {countInputField && countInputField.length > 0 ? (
                  countInputField.map(val => {
                    return (
                      <InputField
                        key={val}
                        uniqueKey={val}
                        removeField={removeInputField}
                      />
                    );
                  })
                ) : (
                  <div className="w-full text-center tracking-wide text-gray-500 font-bold mb-4 focus:outline-none">
                    Add input field by clicking on `+` button
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-full">
        <div
          className="fixed bottom-0 right-0 w-16 h-16 mr-4 mb-12"
          id="box_btn"
        >
          <button
            className="p-0 w-12 h-12 bg-red-600 rounded-full hover:bg-red-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
            title="Add Card"
            onClick={addCards}
          >
            <svg
              viewBox="0 0 20 20"
              enableBackground="new 0 0 20 20"
              className="w-6 h-6 inline-block"
            >
              <path
                fill="#FFFFFF"
                d="M16,10c0,0.553-0.048,1-0.601,1H11v4.399C11,15.951,10.553,16,10,16c-0.553,0-1-0.049-1-0.601V11H4.601
                                    C4.049,11,4,10.553,4,10c0-0.553,0.049-1,0.601-1H9V4.601C9,4.048,9.447,4,10,4c0.553,0,1,0.048,1,0.601V9h4.399
                                    C15.952,9,16,9.447,16,10z"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
