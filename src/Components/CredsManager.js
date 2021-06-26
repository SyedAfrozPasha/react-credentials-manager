import React, { useContext } from 'react';
import HeroSection from './HeroSection';
import Card from './Cards';
import AddCardButton from './AddCardButton';
import { CardContext } from '../App';

export default function CredsManager() {
  const cardContext = useContext(CardContext);
  const cardState = cardContext.cardState;

  console.log('#cardContext:', cardContext);

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

  // NEED TO MODIFY
  const addCards = () => {
    console.log('ADD CARDS');
    const cardKey = generatedRandomString();
    const cardList = countCards;
    if (cardList && cardList.length > 0) {
      cardList.map(item => {
        if (item && item.length > 0 && item.length < 3) {
        } else {
        }
      });
    } else {
      setCountCards([...cardList, [cardKey]]);
    }
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
