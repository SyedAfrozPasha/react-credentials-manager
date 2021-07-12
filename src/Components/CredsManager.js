import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import Card from './Cards';
import AddCardButton from './AddCardButton';
import { CardContext } from '../App';

export default function CredsManager() {
  const cardContext = useContext(CardContext);
  const cardState = cardContext.cardState;

  // const navigateToTool = propEvent => {
  //   let navigate =
  //     propEvent.dataset && propEvent.dataset.nav ? propEvent.dataset.nav : null;
  //   if (navigate) {
  //     let isExample =
  //       propEvent.dataset && propEvent.dataset.example ? true : false;
  //     if (isExample) {
  //       setConfig({
  //         ...config,
  //         ['content-start-separator']: '[',
  //         ['content-end-separator']: ']',
  //         ['element-start-separator']: '"',
  //         ['element-end-separator']: '"',
  //         ['middle-separator']: ',',
  //         ['seperateByNewLine']: true
  //       });

  //       setInputData('Apple\nBanana\nMango\nGrape');

  //       document.getElementById('content-start-separator').value = '[';
  //       document.getElementById('content-end-separator').value = ']';
  //       document.getElementById('element-start-separator').value = '"';
  //       document.getElementById('element-end-separator').value = '"';
  //       document.getElementById('middle-separator').value = ',';
  //       document.getElementById('input').value = 'Apple\nBanana\nMango\nGrape';

  //       setIsSampleExample(true);
  //     }

  //     setTimeout(() => {
  //       const id = propEvent.dataset.nav;
  //       const element = document.getElementById(id);
  //       if (element) element.scrollIntoView();
  //     }, 0);
  //   }
  // };

  return (
    <div className="min-h-screen min-v-screen bg-grey-lightest font-sans">
      <HeroSection
        title="Kreman - Simple Credential Manager"
        description1="A simple credential managing tool to manage the sensitive data such as passwords, card details, login details etc."
        description2=""
        // getNavigation={navigateToTool}
      />

      <div id="tool-start" className="p-8">
        <div className="flex flex-row-reverse mb-8">
          <div class="dropdown inline-block relative">
            <button class="bg-gray-300 text-gray-700 font-semibold py-2 px-4 rounded inline-flex items-center">
              <span class="mr-1">Dropdown</span>
              <svg
                class="fill-current h-4 w-4"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />{' '}
              </svg>
            </button>
            <ul class="dropdown-menu absolute hidden text-gray-700 pt-1">
              <li class="">
                <a
                  class="rounded-t bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  One
                </a>
              </li>
              <li class="">
                <a
                  class="bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  Two
                </a>
              </li>
              <li class="">
                <a
                  class="rounded-b bg-gray-200 hover:bg-gray-400 py-2 px-4 block whitespace-no-wrap"
                  href="#"
                >
                  Three is the magic number
                </a>
              </li>
            </ul>
          </div>

          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Export</span>
          </button>
          <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded inline-flex items-center mr-2">
            <svg
              className="fill-current w-4 h-4 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              transform="scale(1, -1) translate(0, 0)"
            >
              <path d="M13 8V2H7v6H2l8 8 8-8h-5zM0 18h20v2H0v-2z" />
            </svg>
            <span>Save</span>
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardState &&
            Object.keys(cardState).length > 0 &&
            Object.keys(cardState).map((item, i) => {
              return <Card key={item} cardID={item} />;
            })}
        </div>
      </div>

      <AddCardButton />
    </div>
  );
}
