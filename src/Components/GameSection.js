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
  const [rotate, setRotate] = useState(false);

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
        // console.log(response.cards);
      } catch (error) {
        // I consistently get a 304 Error when i run a try/catch. Spoke to Owen about it, its not breaking my site but I cannot find a solution just yet to this issue. Seems to relate to caching (on a hard refresh is doesn't show up, but then will on the following refresh). Leaving this error handling commented out at this point.
        // From Stack Overflow:
        // A status code of 304 means that the response is not modified.Essentially, it means that the resource hasn't changed since the last time you requested it.

        // So say for example you request an endpoint twice, if the second time you request it you get a 304 status code, that means that both the first and the second response are the same and therefore it doesn't need updating.

        // Usually browsers will attempt to cache information to speed up page delivery, and if the browser receives a 304 status code instead of requesting the resource again it will just serve the cached version of this information.
        // https://stackoverflow.com/questions/69916518/react-js-response-304-status-at-the-log

        // if (error.message === 'Not Found') {
        //   alert('We could not fetch the data, try again!')
        // } else {
        //   alert('Sorry, something unusual happened.')
        // } 
      }
    }
    storeDeck();
  }, []);
  // console.log(deck);

  const drawCard = () => {
    // // Randomizing function to choose a tarot card from 0 to 77.
    const randomCard = Math.floor(Math.random() * (deck.length));
    // console.log(randomCard);
    // const randomCardDraw = deck[randomCard];
    // console.log(randomCardDraw);

    // Setting imgSource to path with matching randomCard variable. My local image files are numbered to match. 
    const imgSource = `/assets/tarot-card-${randomCard}.jpg`;
    // console.log(imgSource);
    setImg(imgSource);
    // console.log(img);

    // Setting imgDesc to matching randomCard variable.
    const imgDesc = `${deck[randomCard].desc}`;
    // console.log(imgDesc);
    setDescription(imgDesc);

    // Setting imgAlt to randomCard variable's name.
    const imgAlt = `A tarot card depicting: ${deck[randomCard].name}`;
    // console.log(imgAlt);
    setAlt(imgAlt);

    // Setting cardName to randomCard variable's name.
    const cardName = deck[randomCard].name;
    // console.log(cardName);
    setName(cardName);

    // Setting cardMeaning to randomCard variable's 'meaning_up' description.
    const cardMeaning = deck[randomCard].meaning_up;
    // console.log(cardMeaning);
    setMeaning(cardMeaning);
    setHasClicked(true);
  }


  // This event wil trigger every time the input changes. 
  const handleTextChange = (event) => {
    // Tell react to update the state of 'initials' to be equal to whatever is currently the value of the input field. 
    setInitials(event.target.value);
  }
  // console.log(initials);

  // This event wil trigger every time the input changes. 
  const handleRadioChange = (event) => {
    // Tell react to update the state of 'emojiReact'' to be equal to whatever is currently the value of the input field 
    // console.log(event.target.value);
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
    // console.log(Date());
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
    // console.log(tarotObject);
    // Reference the database
    const database = getDatabase(firebase);
    const dbRef = ref(database);
    // Push value of tarotObject tate to the database
    push(dbRef, tarotObject);
    // reset the state to an empty string

    setInitials('');
    setEmojiReact('');
    toggleClass();
    toggleRotate();
  }

  // Function to toggle 'active' class on/off
  const toggleClass = () => {
    setActive(!isActive);
  };
  const toggleRotate = () => {
    setRotate(!rotate);
  };
  // Referenced from https://devdojo.com/krissanawat101/3-ways-for-toggle-a-class-in-react to help me toggle my confirmation pop-up on and off. 

  return (
    <section className='game-container' id='game-container'>
      <div className='wrapper'>
        <div className='game-content-box wrapper'>
          {/* LEFT CONTENT BOX */}
          <div className='game-left-box'>
            {/* CARD CONTAINER */}
            <div className='card-container'>
              <h2 className='draw-card-title'>Draw A Card</h2>
              {/* Ternary that displays a default image on the screen. As soon as the button is clicked, it is replaced with the drawn card. */}
              {/* Once 'Draw Card' is clicked, the img is pulled from the local file and displayed: */}
              {hasClicked ?
                <img className='tarot-card rotate-back' src={img} alt={alt} />
                :
                <img className='tarot-card' src='/assets/tarot-back.jpg' alt='Back of tarot card.' />
              }
              <button onClick={drawCard} className='button'>Draw A Card!</button>
            </div>{/* End of .card-container */}
          </div> {/* End of .game-left-box */}
          {/* Once 'Draw Card' is clicked, the data is pulled from the API and displayed below: */}
          {/* RIGHT CONTENT BOX */}
          <div className='game-right-outer-box'>
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
                  {/* FORM BEGINS */}
                  <form>
                    <h4 className='results-header'>Save your card</h4>

                    {/* INITIALS INPUT */}
                    <div className='initials-box'>
                      <label className='initials-label' htmlFor='initials'>Initials:</label>
                      <input className='initials-input' type='text' id='initials' name='user-initials' maxLength={3} value={initials} onChange={handleTextChange} placeholder='AZ' required />
                    </div> {/* End of .initials-box */}
                    {/* FIELDSET FOR EMOJI REACT BEGINS */}
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
                    {/* FIELDSET FOR EMOJI REACT ENDS */}
                    {/* SUBMIT BUTTON */}
                    <div className='submit-button-box'>
                      <input name='form-submit' className='button save-card-button' type='Submit' onClick={handleSubmit} defaultValue='Save your Card!' />
                    </div> {/* End of .submit-button-box */}
                    {/* END OF SUBMIT BUTTON */}

                  </form>
                  {/* FORM ENDS */}
                </div> {/* End of .game-right-box  */}
              </>
              : null
            }
          </div>
          <div className='arrow-container'>
            <div className='arrow-box saved-response-arrow-box'>
              <p>View Saved Responses</p>
              <a href='#saved-responses' aria-label='Go to the Saved Responses section.'>
                <FaArrowAltCircleDown className='arrow-icon saved-response-icon' aria-label='Go to the game section.' />
              </a>
            </div> {/* End of .arrow-box .saved-response-arrow-box*/}
          </div> {/* End of .arrow-container */}
        </div> {/* End of .game-content-box */}
      </div> {/* End of .wrapper */}
      <div className={`confirmation-popup ${isActive ? 'active' : ''}`}>
        <button className='exit-button' onClick={toggleClass}>Exit</button>
        <p className='saved-message'>Your card has been saved!</p>
        <div className='link-box'>
          <p>View Saved Responses</p>
          <a href='#saved-responses' onClick={toggleClass} aria-label='Go to the Saved Responses section.'>
            <FaArrowAltCircleDown className='popup-icon' aria-label='Go to the Saved Responses section.' />
          </a>
        </div> {/* End of .link-box */}
      </div> {/* End of .confirmation-popup .active */}
    </section> /* End of .game-container section */
  )
}

export default GameSection;