// Modules
import firebase from './firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push} from 'firebase/database';
// Components
// Assets
import './App.css';

const App = () => {
  // Defining State:
  const [deck, setDeck] = useState({});
  const [hasClicked, setHasClicked] = useState(false);
  const [img, setImg] = useState('');
  const [alt, setAlt] = useState('');
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');
  const [description, setDescription] = useState('');
  const [userData, setUserData] = useState([]);
  const [initials, setInitials] = useState('');
  const [emojiReact, setEmojiReact] = useState('');
  const [count, setCounter] = useState(6);

  // Firebase Connection
  useEffect(() => {
    // Variable to hold database details:
    const database = getDatabase(firebase);
    // Variable that references our database:
    const dbRef = ref(database);
    // Event listener that will fire from the database & call the data 'response'
    onValue(dbRef, (response) => {
      // Variable to store the new state we're creating in our app
      const newState = [];
      // Store our response,val();
      const dataResponse = response.val();
      // Data is an object so we iterate using a for-in loop to access each book name.

      for (let key in dataResponse) {
        // Push each book name to an array we already created in newState
        newState.push({key:key, tarotCard:dataResponse[key]});
      }
      // Call setUserData to update our components state using the local array newState:
      setUserData(newState);
    })
  }, [])

  // API Call
  useEffect(() => {
    const storeDeck = async () => {
      const url = new URL('https://tarot-api.onrender.com/api/v1/cards/');
      // No search parameters needed for this API

      try {
        const data = await fetch(url);
        const response = await data.json();
        setDeck(response.cards);
        // console.log(response.cards);
      } catch (error) {
        // Error Handling
      }
    }
    storeDeck();
  }, []);
  // console.log(deck);

  // If I used useEffect on this... [card, setCard], would I say setCard(randomCard) and then reference the random card with "card" in the remainder of the function?
  const drawCard = () => {
    // // Randomizing function to choose a tarot card from 0 to 77.
    const randomCard = Math.floor(Math.random() * (deck.length));
    // console.log(randomCard);
    // const randomCardDraw = deck[randomCard];
    // console.log(randomCardDraw);

    const imgSource = `/assets/tarot-card-${randomCard}.jpg`;
    // console.log(imgSource);
    setImg(imgSource);
    // console.log(img);

    const imgDesc = `${deck[randomCard].desc}`;
    // console.log(imgDesc);
    setDescription(imgDesc);

    const imgAlt = `A tarot card depicting: ${deck[randomCard].name}`;
    // console.log(imgAlt);
    setAlt(imgAlt);

    const cardName = deck[randomCard].name;
    // console.log(cardName);
    setName(cardName);

    const cardMeaning = deck[randomCard].meaning_up;
    // console.log(cardMeaning);
    setMeaning(cardMeaning);

    setHasClicked(true);
  }

  // This event wil trigger every time the input changes. 
  const handleTextChange = (event) => {
    // Tell react to update the state of our App component to be equal to whatever is currently the value of the input field 
    setInitials(event.target.value);
  }
  // console.log(initials);

  // This event wil trigger every time the input changes. 
  const handleRadioChange = (event) => {
    // Tell react to update the state of our App component to be equal to whatever is currently the value of the input field 
    // console.log(event.target.value);
    setEmojiReact(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const currentDate = Date();
    // console.log(Date());
    const tarotObject = {
      date: currentDate,
      img: img,
      alt: alt,
      name: name,
      meaning: meaning,
      description: description,
      initials: initials,
      reaction: emojiReact,
    };
    // console.log(tarotObject);
    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // Push value of tarotObject tate to the database
    push(dbRef, tarotObject);
    // reset the state to an empty string
    setInitials('');
    setEmojiReact('');
    
  }

  // Show & Hide Results Buttons
  // arrayLength counts the number of responses currently logged to Firebase so the "Show More" and "Show Less" buttons can show and hide when appropriate. 
  const arrayLength = userData.length;
  // console.log(arrayLength);

  const handleShowMore = (event) => {
    event.preventDefault();
    const addResults = (arrayLength + 6) >= 24? 24: 24;
    setCounter(addResults);
  }
  const handleShowLess = (event) => {
    event.preventDefault();
    const subtractResults = (arrayLength - 6) <= 6 ? 6 : 6;
    setCounter(subtractResults);
  }

  // console.log(img);
  // console.log(deck);

  return (
    <div className="App wrapper">
      <header><h1>Daily Tarot App</h1>
      </header>
      <main>
        <div className="outer-container">
          {/* Ternary that displays a default image on the screen. As soon as the button is clicked, it is replaced with the drawn card. */}
          <div className='card-container'>
            {
              hasClicked ? <img src={img} alt={alt} /> : <img src="/assets/tarot-card-0.jpg" alt="" />
            }
            <button onClick={drawCard}>Draw a Card!</button>
          </div>
          {hasClicked ? 
            <div>
            <h2>{name}</h2>
            <h3>Meaning</h3>
            <p>{meaning}</p>
            <h3>Description</h3>
            <p>{description}</p>
            <form>
              <h3>Save your card!</h3>
              <label htmlFor="initials">Initials:</label>
                <input type="text" id='initials' name='user-initials' maxLength={3} value={initials} onChange={handleTextChange} placeholder='AZ'/>
              <fieldset onChange={handleRadioChange} value={emojiReact}>
                {/* Frown Icon Button */}
                <input type='radio' name='emoji-react' value='dislike' id='dislike' selected  />
                <label htmlFor="dislike"><img className='frown-icon icon' src="/assets/face-frown-open-regular.svg" alt="Frowning face icon." /></label>
                {/* Meg Icon Button */}
                <input type='radio' name='emoji-react' value='meh' id='meh' />
                <label htmlFor="meh"><img className='meh-icon icon' src="/assets/face-meh-regular.svg" alt="Unimpressed face icon." /></label>
                {/* Smile Icon Button */}
                <input type='radio' name='emoji-react' value='like' id='like' />
                <label htmlFor="like"><img className='smiling-icon icon' src="/assets/face-smile-regular.svg" alt="Smiling face icon." /></label>
              </fieldset>
              <button name='form-submit' className="submit-button" type='Submit' onClick={handleSubmit}>Log your card!</button>
            </form>
          </div> : null
          }
          
          <div>
            {/* LOG OF PAST RESPONSES */}
            <ul className='log-ul'>
              {/* userData(my Firebase data) is destructured to a new array so that we can use the reverse() array function on it. Then I use the slice() function display a minimum of 6 result slots on the page & max of 24. This data is mapped over so I can display the individual properties to the page. */}
              {[...userData].reverse().slice(0, (count)).map((log) => {
                return (
                  // If you console.log(log) you'll see the objects with key inside. Use this to fill out the individual key number on each li to prevent the key props error.
                  <li key={log.key} className='log-li'>
                    <p className='log-initials'>{log.tarotCard.initials}</p>
                    <h6>{log.tarotCard.date}</h6>
                    <h4>{log.tarotCard.name}</h4>
                    {/* EMOJI REACTS */}
                    {/* Emoji reactions only display if they match the user's input. */}
                    <p>{log.tarotCard.reaction === 'like'? <img className='smiling-icon icon log-icon' src="/assets/face-smile-regular.svg" alt="Smiling face icon." /> : null}</p>
                    <p>{log.tarotCard.reaction === 'meh' ? <img className='meh-icon icon log-icon' src="/assets/face-meh-regular.svg" alt="Unimpressed face icon." /> : null}</p>
                    <p>{log.tarotCard.reaction === 'dislike' ? <img className='frown-icon icon log-icon' src="/assets/face-frown-open-regular.svg" alt="Frowning face icon." /> : null}</p>
                    <img src={log.tarotCard.img} alt={log.tarotCard.alt} className='tarot-log-img' />
                    
                  </li>
                )
              })}
            </ul>
            {/* Buttons that display or hide based on number of results shown. Minimum 6 slots displayed, maximum 24. */}
            {count > 6 ? <button name='show-more' className="submit-button show-more" type='Submit' onClick={handleShowMore}>Show more results!</button> : null}
            {count >= 12 ? <button name='show-less' className="submit-button show-less" type='Submit' onClick={handleShowLess}>Show fewer results!</button> : null}
            {count >= 24 ? null : <button name='show-more' className="submit-button show-more" type='Submit' onClick={handleShowMore}>Show more results!</button>}
          </div>
        </div>
      </main>
      <footer>
        <div className="footer-container">
          <p>Created by Fiona Freemark for Juno College of Technology</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
