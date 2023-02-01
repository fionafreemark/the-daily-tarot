import { useEffect, useState } from 'react';
import './App.css';

const App = () => {
  const [deck, setDeck] = useState({});

  // API Call
  useEffect(() => {
    const storeDeck = async () => {
      const url = new URL('https://tarot-api.onrender.com/api/v1/cards/');
      // No search parameters needed for this API

      try {
        const data = await fetch(url);
        const response = await data.json();
        setDeck(response);
        // console.log(response.cards);
      } catch (error) {
        // Error Handling
      }
    }
    storeDeck();
  }, []);
  // console.log(deck.cards);
  
  const drawCard = () => {
    // // Randomizing function to choose a tarot card from 0 to 77.
    const randomCard = Math.floor(Math.random() * (deck.cards.length));
    console.log(randomCard);
  
    const randomCardDraw = deck.cards[randomCard];
    // console.log(randomCardDraw);
    
    // imgSource = `./assets/tarot-card-${randomCard}.jpg`;
    // console.log(imgSource);

    const imgAlt = `A tarot card depicting: ${deck.cards[randomCard].desc}`;
    console.log(imgAlt);
    
    const cardName = deck.cards[randomCard].name;
    console.log(cardName);
    
    const cardMeaning = deck.cards[randomCard].meaning_up;
    console.log(cardMeaning);

  }
  // let imgSource = `./assets/tarot-card-1.jpg`;
  // HTML Structure/Component Calls Etc
  return (
    <div className="App">
      <header><h1>Daily Tarot App</h1>
      </header>
        <div className="card-container">
          <img src={require(`./assets/tarot-card-1.jpg`)} alt="" />
          {/* <img src={require(imgSource)} alt={imgAlt} /> */}
          <button onClick={drawCard}>Draw a Card!</button>
        </div>
    </div>
  );
}

export default App;
