import { FaArrowAltCircleDown } from 'react-icons/fa'
const Header = () => {
  return (
    <header>
      <div className="title-box">
        <h1 className='daily-tarot'>The Daily Tarot</h1>
      </div>
      <div className="instructions-box">
        <h2>Instructions</h2>
        <p>Tarot cards provide a fun way to reflect on your day or set intentions first thing in the morning. Draw a card and see if you can relate to the meaning & symbolism. </p>
      </div>
      <a href="#game-container" aria-label='Go to the game section.' className="arrow-box">
        <FaArrowAltCircleDown className='arrow-icon game-section-arrow' aria-label='Go to the game section.' />
      </a>
    </header>
  )
}

export default Header;