// Components
import Header from './Components/Header';
import GameSection from './Components/GameSection';
import PastResponses from './Components/SavedResponses';
import Footer from './Components/Footer';

// Assets
import './App.scss';

const App = () => {
  return (
    <div className="App">
      <Header/>
      <main>
        <GameSection/>
        <PastResponses/>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
