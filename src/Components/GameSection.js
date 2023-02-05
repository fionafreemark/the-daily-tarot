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
  // const style = { color: "black"/* , fontSize: "3rem" */}

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

  // Submit Button
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


  return (
    <section className="game-container" id='game-container'>
      <div className='wrapper'>
        <div className="game-content-box wrapper">
          {/* LEFT CONTENT BOX */}
          <div className="game-left-box">
            {/* CARD CONTAINER */}
            <div className='card-container'>
              {/* Ternary that displays a default image on the screen. As soon as the button is clicked, it is replaced with the drawn card. */}
              {/* Once "Draw Card" is clicked, the img is pulled from the local file and displayed: */}
              {hasClicked ? <img className='tarot-card tarot-card-flip' src={img} alt={alt} /> : <img className='tarot-card tarot-card-flip-to' src="/assets/tarot-back.jpg" alt="" />}
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
                  <h3 className='results-header'>Meaning</h3>
                  <p className='results-text'>{meaning}</p>
                  <h3 className='results-header' >Description</h3>
                  <p className='results-text'>{description}</p>
                </div>
                {/* FORM BEGINS */}
                <form>
                  <h2 className='results-header'>Save your card!</h2>
                  {/* INITIALS INPUT BEGINS */}
                  <div className="initials-box">
                    <label className='initials-label' htmlFor="initials">Initials:</label>
                    <input className='initials-input' type="text" id='initials' name='user-initials' maxLength={3} value={initials} onChange={handleTextChange} placeholder='AZ' required />
                  </div> {/* End of .initials-box */}
                  {/* INITIALS INPUT ENDS */}
                  {/* FIELDSET FOR EMOJI REACT BEGINS */}
                  <fieldset onChange={handleRadioChange} value={emojiReact}>
                    {/* Frown Icon Button */}
                    <legend>Rate Your Card:</legend>
                    <input type='radio' name='emoji-react' value='dislike' id='dislike' selected required />
                    <label htmlFor="dislike">
                      <FaRegFrown className="icon" />
                    </label>
                    {/* Meh Icon Button */}
                    <input type='radio' name='emoji-react' value='meh' id='meh' />
                    <label htmlFor="meh">
                      <FaRegMeh className="icon" />
                    </label>
                    {/* Smile Icon Button */}
                    <input type='radio' name='emoji-react' value='like' id='like' />
                    <label htmlFor="like">
                      <FaRegSmile className="icon" />
                    </label>
                    {/* Heart Icon Button */}
                    <input type='radio' name='emoji-react' value='love' id='love' />
                    <label htmlFor="love">
                      <FaHeart className="icon" /></label>
                  </fieldset>
                  {/* FIELDSET FOR EMOJI REACT ENDS */}
                  {/* SUBMIT BUTTON */}
                  <div className="submit-button-box">
                    <input name='form-submit' className=" button" type='Submit' onClick={handleSubmit} defaultValue='Save your Card!' />
                  </div>
                  {/* END OF SUBMIT BUTTON */}
                </form>
              </div>/* End of .game-right-box */ : null
            }
          </div> {/* End of .game-right-outer-box */}
        <div className="arrow-box past-response-arrow-box">
          <p>View Past Responses</p>
          <a href="#past-responses" aria-label='Go to the Past Responses section.'>
            <FaArrowAltCircleDown className='arrow-icon past-response-icon' aria-label='Go to the game section.' />
          </a>
        </div> {/* .arrow-box */}
        </div> {/* End of .game-content-box */}
      </div>
    </section>
  )
}

export default GameSection;