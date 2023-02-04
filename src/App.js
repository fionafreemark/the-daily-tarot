// Modules
import firebase from './firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue, push } from 'firebase/database';
// Components
import Header from './Header';
// Assets

import './sass/partials/_typography.scss';
import './sass/partials/_global.scss';
import './sass/partials/_header.scss';
import './sass/partials/_cardDisplay.scss';
import './sass/partials/_pastResults.scss';
import './sass/partials/_footer.scss';
import './App.scss';


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
        newState.push({ key: key, tarotCard: dataResponse[key] });
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
    const currentDate = new Date();
    const date = currentDate.toDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    // console.log(Date());
    const tarotObject = {
      date: `${date} ${hours}:${minutes}`,
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
    const addResults = (arrayLength + 6) >= 24 ? 24 : 24;
    setCounter(addResults);
  }
  const handleShowLess = (event) => {
    event.preventDefault();
    const subtractResults = (arrayLength - 6) <= 6 ? 6 : 6;
    setCounter(subtractResults);
  }

  return (
    <div className="App">
      {/* < Header drawCard handleSubmit handleRadioChange={emojiReact} handleTextChange={initials} /> */}
      <header>
        <div className="title-box">
          <h1 className='daily-tarot'>The Daily Tarot</h1>
        </div>
        <div className="instructions-box">
          <h2>Instructions</h2>
          <p>Tarot cards provide a fun way to reflect on your day or set intentions first thing in the morning. Draw a card and see if you can relate to the meaning & symbolism. </p>
        </div>
        <div className="arrow-box">
          <a href="#game-container" aria-label='Go to the game section.'>
            <img className='arrow-icon game-container-icon' src="/assets/circle-chevron-down-solid.svg" alt="Arrow pointing down to the next section." />
          </a>
        </div>
      </header>

      <main>
        <div className="game-container" id='game-container'>
          <div className="game-content-box wrapper">
            {/* LEFT CONTENT BOX */}
            <div className="game-left-box">
              {/* CARD CONTAINER */}
              <div className='card-container'>
                {/* Ternary that displays a default image on the screen. As soon as the button is clicked, it is replaced with the drawn card. */}
                {/* Once "Draw Card" is clicked, the img is pulled from the local file and displayed: */}
                {hasClicked ? <img className='tarot-card' src={img} alt={alt} /> : <img className='tarot-card' src="/assets/tarot-card-0.jpg" alt="" />}
                <button onClick={drawCard} className='button'>Draw a Card!</button>
              </div>{/* End of .card-container */}
            </div> {/* End of .game-left-box */}
            {/* Once "Draw Card" is clicked, the data is pulled from the API and displayed below: */}
            {/* RIGHT CONTENT BOX */}
            <div className="game-right-outer-box">
              {hasClicked ?
                <div className="game-right-box">
                  <div className="card-info-box">
                  <h2 className='drawn-card-name'>{name}</h2>
                  <h3>Meaning</h3>
                  <p>{meaning}</p>
                  <h3>Description</h3>
                  <p>{description}</p>
                  </div>
                  {/* FORM BEGINS */}
                  <form>
                    <h3>Save your card!</h3>
                    {/* INITIALS INPUT BEGINS */}
                    <label htmlFor="initials">Initials:</label>
                    <input type="text" id='initials' name='user-initials' maxLength={3} value={initials} onChange={handleTextChange} placeholder='AZ' required />
                    {/* INITIALS INPUT ENDS */}
                    {/* FIELDSET FOR EMOJI REACT BEGINS */}
                    <fieldset onChange={handleRadioChange} value={emojiReact}>
                      {/* Frown Icon Button */}
                      <input type='radio' name='emoji-react' value='dislike' id='dislike' selected required />
                      <label htmlFor="dislike"><img className='frown-icon icon' src="/assets/face-frown-regular-green-border.png" alt="Frowning face icon." /></label>
                      {/* Meh Icon Button */}
                      <input type='radio' name='emoji-react' value='meh' id='meh' />
                      <label htmlFor="meh"><img className='meh-icon icon' src="/assets/face-meh-regular-yellow-border.png" alt="Unimpressed face icon." /></label>
                      {/* Smile Icon Button */}
                      <input type='radio' name='emoji-react' value='like' id='like' />
                      <label htmlFor="like"><img className='smiling-icon icon' src="/assets/face-smile-regular-outline.png" alt="Smiling face icon." /></label>
                      {/* Heart Icon Button */}
                      <input type='radio' name='emoji-react' value='love' id='love' />
                      <label htmlFor="love"><img className='heart-icon icon' src="/assets/heart-solid.png" alt="Heart-shaped icon." /></label>
                    </fieldset>
                    {/* FIELDSET FOR EMOJI REACT ENDS */}
                    <input name='form-submit' className="submit-button button" type='Submit' onClick={handleSubmit} defaultValue='Save your Card!' />
                  </form>
                </div>/* End of .game-right-box */ : null
              }
            </div> {/* End of .game-right-outer-box */}
          </div> {/* End of .game-content-box */}
          <div className="arrow-box past-response-box">
            <p>View Past Responses</p>
            <a href="#past-responses" aria-label='Go to the game section.'>
              <img className='arrow-icon past-response-icon' src="/assets/circle-chevron-down-solid.svg" alt="Arrow pointing down to the next section." />
            </a>
          </div>
        </div> {/* End of .game-container */}
        <div className="outer-container">
          <div id='past-responses' className='past-responses wrapper'>
            {/* LOG OF PAST RESPONSES */}
            <ul className='log-ul'>
              {/* userData(my Firebase data) is destructured to a new array so that we can use the reverse() array function on it. Then I use the slice() function display a minimum of 6 result slots on the page & max of 24. This data is mapped over so I can display the individual properties to the page. */}
              {[...userData].reverse().slice(0, (count)).map((log) => {
                return (
                  // If you console.log(log) you'll see the objects with key inside. Use this to fill out the individual key number on each li to prevent the key props error.
                  <li key={log.key} className='log-li'>
                    <img src={log.tarotCard.img} alt={log.tarotCard.alt} className='tarot-log-img' />

                    <h4>{log.tarotCard.name}</h4>

                    {/* EMOJI REACTS */}
                    {/* Emoji reactions only display if they match the user's input. */}
                    <p>{log.tarotCard.reaction === 'like' ? <img className='smiling-icon icon log-icon' src="/assets/face-smile-regular.svg" alt="Smiling face icon." /> : null}</p>
                    <p>{log.tarotCard.reaction === 'meh' ? <img className='meh-icon icon log-icon' src="/assets/face-meh-regular.svg" alt="Unimpressed face icon." /> : null}</p>
                    <p>{log.tarotCard.reaction === 'dislike' ? <img className='frown-icon icon log-icon' src="/assets/face-frown-open-regular.svg" alt="Frowning face icon." /> : null}</p>
                    <p className='log-initials'>{log.tarotCard.initials}</p>
                    <h6>{log.tarotCard.date}</h6>

                  </li>
                )
              })}
            </ul>
            {/* Buttons that display or hide based on number of results shown. Minimum 6 slots displayed, maximum 24. */}
            {count > 6 ? <button name='show-more' className="submit-button show-more button" type='Submit' onClick={handleShowMore}>Show more results!</button> : null}
            {count >= 12 ? <button name='show-less' className="submit-button show-less button" type='Submit' onClick={handleShowLess}>Show fewer results!</button> : null}
            {count >= 24 ? null : <button name='show-more' className="submit-button show-more button" type='Submit' onClick={handleShowMore}>Show more results!</button>}
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
