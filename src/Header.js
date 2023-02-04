const Header = (props) => {
const {drawCard, handleSubmit, handleRadioChange, handleTextChange} = props;
  <header>
    <div className="header-container wrapper">
      <div className="title-box">
        <h1 className='daily-tarot'>The Daily Tarot Co.</h1>
      </div>
      <div className="header-content-box">
        {/* LEFT CONTENT BOX */}
        <div className="header-left-box">
          {/* CARD CONTAINER */}
          <div className='card-container'>
            {/* Ternary that displays a default image on the screen. As soon as the button is clicked, it is replaced with the drawn card. */}
            {/* Once "Draw Card" is clicked, the img is pulled from the local file and displayed: */}
            {drawCard.hasClicked ? <img className="tarot-card" src={drawCard.img} alt={drawCard.alt} /> : <img className="tarot-card"  src="/assets/tarot-card-0.jpg" alt="" />}
            <div className="img-border"></div>
            <button onClick={drawCard} className='button'>Draw a Card!</button>
          </div>{/* End of .card-container */}
        </div> {/* End of .header-left-box */}
        {/* Once "Draw Card" is clicked, the data is pulled from the API and displayed below: */}
        {/* RIGHT CONTENT BOX */}
        <div className="header-right-outer-box">
          {drawCard.hasClicked ?
            <div className="header-right-box">
              <div className="card-name-box">
                <h2>{drawCard.name}</h2>
              </div>
              <h3>Meaning</h3>
              <p>{drawCard.meaning}</p>
              <h3>Description</h3>
              <p>{drawCard.description}</p>
              {/* FORM BEGINS */}
              <form>
                <h3>Save your card!</h3>
                {/* INITIALS INPUT BEGINS */}
                <label htmlFor="initials">Initials:</label>
                <input type="text" id='initials' name='user-initials' maxLength={3} value={handleTextChange.initials} onChange={handleTextChange} placeholder='AZ' required />
                {/* INITIALS INPUT ENDS */}
                {/* FIELDSET FOR EMOJI REACT BEGINS */}
                <fieldset onChange={handleRadioChange} value={handleRadioChange.emojiReact}>
                  {/* Frown Icon Button */}
                  <input type='radio' name='emoji-react' value='dislike' id='dislike' selected required />
                  <label htmlFor="dislike"><img className='frown-icon icon' src="/assets/face-frown-open-regular.svg" alt="Frowning face icon." /></label>
                  {/* Meh Icon Button */}
                  <input type='radio' name='emoji-react' value='meh' id='meh' />
                  <label htmlFor="meh"><img className='meh-icon icon' src="/assets/face-meh-regular.svg" alt="Unimpressed face icon." /></label>
                  {/* Smile Icon Button */}
                  <input type='radio' name='emoji-react' value='like' id='like' />
                  <label htmlFor="like"><img className='smiling-icon icon' src="/assets/face-smile-regular.svg" alt="Smiling face icon." /></label>
                </fieldset>
                {/* FIELDSET FOR EMOJI REACT ENDS */}
                <input name='form-submit' className="submit-button button" type='Submit' onClick={handleSubmit} defaultValue='Save your Card!' />
              </form>
            </div>/* End of .header-right-box */ : null
          }
        </div> {/* End of .header-right-outer-box */}
      </div> {/* End of .header-content-box */}
      <div className="signal-downward">
        <p>View Past Responses</p>
        <a href='#pastResponses' className='button'>ARROW</a>
      </div>
    </div> {/* End of .header-container */}
  </header>


}

export default Header;