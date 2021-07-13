import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import Card from './Cards';
import AddCardButton from './AddCardButton';
import FileOperationButtons from './FileOperationButtons';
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
        description1="A simple credential managing tool to manage sensitive data such as passwords, card details, login details, etc."
        description2="We repect your privacy. We do not store any of the user data on the servers. All the data is stored in the browser securely."
        // getNavigation={navigateToTool}
      />

      <div id="tool-start" className="p-8">
        <FileOperationButtons />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {cardState &&
            Object.keys(cardState).length > 0 &&
            Object.keys(cardState).map((item, i) => {
              if (item) {
                return <Card key={item} cardID={item} />;
              }
            })}
        </div>
      </div>

      <AddCardButton />
    </div>
  );
}
