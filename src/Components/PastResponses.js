// Modules
import firebase from '../firebase';
import { useEffect, useState } from 'react';
import { getDatabase, ref, onValue } from 'firebase/database';
import { FaHeart, FaRegSmile, FaRegFrown, FaRegMeh, FaArrowAltCircleUp } from 'react-icons/fa'

const PastResponses = () => {
  // Defining State
  const [userData, setUserData] = useState([]);
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
        // Push each tarot card name to an array we already created in newState
        newState.push({ key: key, tarotCard: dataResponse[key] });
      }
      // Call setUserData to update our components state using the local array newState:
      setUserData(newState);
    })
  }, [])

  // Show More Results Button
  const handleShowMore = (event) => {
    event.preventDefault();
    const addResults = count + 6 >= 18 ? 18 : count + 6;
    setCounter(addResults);
  }
  // Show Less Results Button
  const handleShowLess = (event) => {
    event.preventDefault();
    const subtractResults = count - 6;
    setCounter(subtractResults);
  }

  return (
    <section id='saved-responses' className="outer-container saved-responses">
      <div className='wrapper'>
        <h2 className='saved-response-heading'>Saved Responses</h2>
        {/* LOG OF SAVED RESPONSES */}
        <ul className='log-ul'>
          {/* userData(my Firebase data) is destructured to a new array so that we can use the reverse() array function on it. Then I use the slice() function display a minimum of 6 result slots on the page & max of 24. This data is mapped over so I can display the individual properties to the page. */}
          {[...userData].reverse().slice(0, (count)).map((log) => {
            return (
              // If you console.log(log) you'll see the objects with key inside. Use this to fill out the individual key number on each li to prevent the key props error.
              <li key={log.key} className='log-li'>
                
                <img src={log.tarotCard.img} alt={log.tarotCard.alt} className='tarot-log-img' />
                <h3 className="saved-card-name">{log.tarotCard.name}</h3>
                <h5>{log.tarotCard.date}</h5>
                <div className="emoji-log-box">
                  {/* INITIALS */}
                  <h5 className='log-initials'>Saved By: {log.tarotCard.initials}</h5>
                </div>
                {/* EMOJI REACTS */}
                {/* Emoji reactions only display if they match the user's input. */}
                <p>{log.tarotCard.reaction === 'love' ? <FaHeart className="icon reaction-icon" /> : null}</p>
                <p>{log.tarotCard.reaction === 'like' ? <FaRegSmile className="icon reaction-icon" /> : null}</p>
                <p>{log.tarotCard.reaction === 'meh' ? <FaRegMeh className="icon reaction-icon" /> : null}</p>
                <p>{log.tarotCard.reaction === 'dislike' ? <FaRegFrown className="icon reaction-icon" /> : null}</p>
              </li>
            )
          })}
        </ul>
          <div className="button-container">
        {/* Buttons that display or hide based on number of results shown. Minimum 6 slots displayed, maximum 24. */}
          {/* {count < 6 ? null : <button name='show-more' className="submit-button show-more button" type='Submit' onClick={handleShowMore}>Show more results!</button>} */}
        {count <= 5 || count >= 18 ? null : <button name='show-more' className="submit-button show-more button" type='Submit' onClick={handleShowMore}>Show more results!</button>}
        {count >= 12 ? <button name='show-less' className="submit-button show-less button" type='Submit' onClick={handleShowLess}>Show fewer results!</button> : null}
          </div>
        <div className="arrow-container">
          <div className="arrow-box saved-response-arrow-box">
            <p>Back to Top</p>
            <a href="#top" aria-label='Go back to top of page.'>
              <FaArrowAltCircleUp className='arrow-icon saved-response-icon' aria-label='Go to the game section.' />
            </a>
          </div> {/* End of .arrow-box .saved-response-arrow-box*/}
        </div> {/* End of .arrow-container */}
      </div> {/* End of .wrapper */}
    </section>
  )
}

export default PastResponses;