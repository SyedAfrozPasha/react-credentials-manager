import React, { useContext } from 'react';
import Card from './Cards';
import { CardContext } from '../App';

export default function CardGrid() {
  const cardContext = useContext(CardContext);
  const cardState = cardContext.cardState;

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cardState &&
        Object.keys(cardState).length > 0 &&
        Object.keys(cardState).map((item, i) => {
          if (item) {
            return <Card key={item} cardID={item} />;
          }
        })}
    </div>
  );
}
