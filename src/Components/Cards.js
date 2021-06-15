import React, { useState } from 'react';
import InputField from './InputField';

export default function Cards({ uniqueKey }) {
  const [maskInput, setMaskInput] = useState(true);
  const [enableCopy, setEnableCopy] = useState(true);
  const [countInputField, setCountInputField] = useState(['ufa1c77q1o9']);

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
    <div className="box border rounded flex flex-col shadow bg-white">
      <div className="bg-grey-lighter px-3 py-2 border-b flex flex-wrap justify-between">
        <input
          className="appearance-none block w-2/3 text-gray-700 rounded py-2 font-medium leading-tight focus:outline-none"
          id={`card-title-${uniqueKey}`}
          type="text"
          placeholder="Card Title"
        />
        <span className="relative inline-flex rounded-md shadow-sm">
          <button
            title="Add Input Field"
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
  );
}
