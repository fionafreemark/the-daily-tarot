import firebase from '../firebase';
import { getDatabase, ref, push } from 'firebase/database'
import { useEffect, useState } from 'react';
import { FaHeart, FaRegSmile, FaRegFrown, FaRegMeh, FaArrowAltCircleDown } from 'react-icons/fa'

const GameSection = () => {
  const [deck, setDeck] = useState({});
  const [hasClicked, setHasClicked] = useState(false);
  const [img, setImg] = useState('');
  const [alt, setAlt] = useState('');
  const [name, setName] = useState('');
  const [meaning, setMeaning] = useState('');
  const [description, setDescription] = useState('');
  const [initials, setInitials] = useState('');
  const [emojiReact, setEmojiReact] = useState('');
  const [isActive, setActive] = useState(false);

  // API Call
  useEffect(() => {
    const storeDeck = async () => {
      const url = new URL('https://tarot-api.onrender.com/api/v1/cards/');
      try {
        const data = await fetch(url);
        const response = await data.json();
        setDeck(response.cards);
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('This call was unsuccessful!');
        }
      } catch (error) {
        // I consistently get a 304 Error when I run a try/catch. Spoke to Owen about it, and researched a lot but the consensus seemed to be that a 304 isn't an error, but rather tells you the information "hasn't changed since the last time you requested it." The error notification continues, however, so its been commented out until I find a better solution. 
        // Source:
        // https://stackoverflow.com/questions/69916518/react-js-response-304-status-at-the-log
        // if (error.message === 'Not Found') {
        //   console.log('We could not fetch the data, try again!')
        // } else {
        //   console.log('Sorry, something unusual happened.')
        // } 
      }
    }
    storeDeck();
  }, []);

  const drawCard = () => {
    // // Randomizing function to choose a tarot card from 0 to 77.
    const randomCard = Math.floor(Math.random() * (deck.length));
    // Setting imgSource to path with matching randomCard variable. My local image files are numbered to match. 
    const imgSource = `/assets/tarot-card-${randomCard}.jpg`;
    setImg(imgSource);
    // Setting imgDesc to matching randomCard variable.
    const imgDesc = `${deck[randomCard].desc}`;
    setDescription(imgDesc);
    // Setting imgAlt to randomCard variable's name.
    const imgAlt = `A tarot card depicting: ${deck[randomCard].name}`;
    setAlt(imgAlt);
    // Setting cardName to randomCard variable's name.
    const cardName = deck[randomCard].name;
    setName(cardName);
    // Setting cardMeaning to randomCard variable's 'meaning_up' description.
    const cardMeaning = deck[randomCard].meaning_up;
    setMeaning(cardMeaning);
    setHasClicked(true);
  }

  const handleTextChange = (event) => {
    // Tell react to update the state of 'initials' to be equal to whatever is currently the value of the input field. 
    setInitials(event.target.value);
  }

  const handleRadioChange = (event) => {
    // Tell react to update the state of 'emojiReact'' to be equal to whatever is currently the value of the input field 
    setEmojiReact(event.target.value);
  }

  // Submit Button
  const handleSubmit = (event) => {
    // Prevent page refresh
    event.preventDefault();
    // Get current date/time of submit to post in our 'Saved Responses' section
    const currentDate = new Date();
    const date = currentDate.toDateString();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    // Create an object to send to firebase on submit:
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
    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // Push value of tarotObject tate to the database
    push(dbRef, tarotObject);
    // Reset the state to an empty string
    setInitials('');
    setEmojiReact('');
    toggleClass();
  }

  // Function to toggle 'active' class on/off so my confirmation pop-up closes after either of 2 buttons are clicked.
  const toggleClass = () => {
    setActive(!isActive);
  };

  return (
    <section className='game-container' id='game-container'>
      <div className='wrapper'>
        {/* Overall Game Content Box --------------------------------- */}
        <div className='game-content-box'>
          {/* Left Content Box --------------------------------*/}
          <div className='game-left-box'>
            {/* Card Container --------------------------------*/}
            <div className='card-container'>
              <h2 className='your-card-title'>Your Card</h2>
              {/* "Draw Card" button triggers hasClicked state which displays the drawn card to the screen. */}
              {hasClicked ?
                <img className='tarot-card rotate-back' src={img} alt={alt} />
                :
                <img className='tarot-card' src='/assets/tarot-back.jpg' alt='Back of tarot card.' />
              }
              {/* Draw Card Button */}
              <button onClick={drawCard} className='button'>Draw A Card!</button>
            </div>{/* End of .card-container */}
          </div> {/* End of .game-left-box */}
          {/* Right Content Box --------------------------------*/}
          <div className='game-right-outer-box'>
            {/* "Draw Card" button triggers hasClicked state which displays the following text/form on the screen */}
            {hasClicked ?
              <>
                <div className='game-right-box'>
                  <div className='card-info-box'>
                    <h3 className='drawn-card-name'>{name}</h3>
                    <h4 className='results-header'>Meaning</h4>
                    <p className='results-text'>{meaning}</p>
                    <h4 className='results-header' >Description</h4>
                    <p className='results-text description-text'>{description}</p>
                  </div>
                  {/* Form Begins --------------------------------*/}
                  <form>
                    <h4 className='results-header'>Save your card</h4>
                    {/* Initials Input -----------------------------*/}
                    <div className='initials-box'>
                      <label className='initials-label' htmlFor='initials'>Initials:</label>
                      <input className='initials-input' type='text' id='initials' name='user-initials' maxLength={3} value={initials} onChange={handleTextChange} placeholder='AZ' required />
                    </div> {/* End of .initials-box */}
                    {/* Fieldset for Emoji React Begins ------------*/}
                    <fieldset onChange={handleRadioChange} value={emojiReact}>
                      {/* Frown Icon Button */}
                      <legend>Rate Your Card:</legend>
                      <input type='radio' name='emoji-react' value='dislike' id='dislike' required />
                      <label htmlFor='dislike'>
                        <FaRegFrown className='icon' />
                      </label>
                      {/* Meh Icon Button */}
                      <input type='radio' name='emoji-react' value='meh' id='meh' />
                      <label htmlFor='meh'>
                        <FaRegMeh className='icon' />
                      </label>
                      {/* Smile Icon Button */}
                      <input type='radio' name='emoji-react' value='like' id='like' />
                      <label htmlFor='like'>
                        <FaRegSmile className='icon' />
                      </label>
                      {/* Heart Icon Button */}
                      <input type='radio' name='emoji-react' value='love' id='love' />
                      <label htmlFor='love'>
                        <FaHeart className='icon' /></label>
                    </fieldset>
                    {/* Fieldset for Emoji React Ends -----------*/}
                    {/* Submit Button */}
                    <div className='submit-button-box'>
                      <input name='form-submit' className='button save-card-button' type='Submit' onClick={handleSubmit} defaultValue='Save your Card!' />
                    </div> {/* End of .submit-button-box */}
                  </form>
                  {/* Form Ends --------------------------------*/}
                </div> {/* End of .game-right-box  */}
              </>
              : null
            } {/* End of hasClicked ternary. */}
          </div> {/* End of .game-right-outer-box */}
        </div> {/* End of .game-content-box */}
      </div> {/* End of .wrapper */}
      {/* Confirmation Pop-Up -------------------------------- */}
      <div className={`confirmation-popup ${isActive ? 'active' : ''}`}>
        <button className='exit-button' onClick={toggleClass}>Exit</button>
        <p className='saved-message'>Your card has been saved!</p>
        <div className='link-box'>
          <p>View Saved Cards</p>
          <a href='#saved-responses' onClick={toggleClass} aria-label='Go to the Saved Responses section.'>
            <FaArrowAltCircleDown className='popup-icon' aria-label='Go to the Saved Responses section.' />
          </a>
        </div> {/* End of .link-box */}
      </div> {/* End of .confirmation-popup .active */}
      {/* End of Confirmation Pop-Up --------------------------*/}
    </section> /* End of .game-container section */
  )
}

export default GameSection;