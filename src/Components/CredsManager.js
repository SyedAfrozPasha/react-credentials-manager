import React, { useState, useContext } from 'react';
import HeroSection from './HeroSection';
import Card from './Cards';
import AddCardButton from './AddCardButton';
import { CardContext } from '../App';

export default function CredsManager() {
  const [inputData, setInputData] = useState();
  const [outputData, setOutputData] = useState();
  const [config, setConfig] = useState({});
  const [isSampleExample, setIsSampleExample] = useState(false);
  const [countInputField, setCountInputField] = useState(['ufa1c77q1o9']);
  const [countCards, setCountCards] = useState([
    // ['nr91u9up0uo', '54h4neik8a', 'aap6grcf6uo'],
    // ['nr91u9up0u1', '54h4neik82', 'aap6grcf6u3']
    'nr91u9up0u1',
    '54h4neik82',
    'aap6grcf6u3',
    'nr91u9up0uo'
    // '54h4neik8a',
    // 'aap6grcf6uo'
  ]);
  //'ufa1c77q1o9'

  const cardContext = useContext(CardContext);
  const cardState = cardContext.cardState;

  console.log('#cardContext:', cardContext);

  const [data, setData] = useState({
    nr91u9up0u1: [
      {
        fieldID: 'ufa1c77q1o9',
        fieldName: 'USER NAME',
        cardName: 'Amazon',
        fieldValue: 'Test@123'
      }
    ],
    '54h4neik82': [
      {
        fieldID: 'ufa1c77q1o8',
        fieldName: 'PASSWORD',
        cardName: 'GitHub',
        fieldValue: 'Test@123'
      }
    ],
    aap6grcf6u3: [
      {
        fieldID: 'ufa1c77q1o7',
        fieldName: 'USER NAME',
        cardName: 'Flipkart',
        fieldValue: 'Test@123'
      }
    ],
    nr91u9up0uo: [
      {
        fieldID: 'ufa1c77q1o6',
        fieldName: 'USER NAME',
        cardName: 'StackBliz',
        fieldValue: 'Test@123'
      }
    ]
  });

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

      {/* <div id="tool-start" className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {countCards &&
            countCards.length > 0 &&
            countCards.map((item, i) => {
              return <Card key={item} uniqueKey={item} />;
            })}
        </div>
      </div> */}

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

{
  /* <div id="tool-start" className="p-8">
        {countCards &&
          countCards.length > 0 &&
          countCards.map((subItem, i) => {
            return (
              <div
                key={generatedRandomString()}
                className={`row sm:flex ${i !== 0 ? 'mt-8' : ''}`}
              >
                {subItem &&
                  subItem.length > 0 &&
                  subItem.map((item, j) => {
                    return (
                      <div
                        key={generatedRandomString()}
                        className={`col sm:w-1/2 ${
                          j % 3 !== 0 ? 'mt-8 sm:ml-8 sm:mt-0' : ''
                        }`}
                      >
                        <Card
                          key={generatedRandomString()}
                          uniqueKey={generatedRandomString()}
                        />
                      </div>
                    );
                  })}
              </div>
            );
          })}
      </div> */
}
