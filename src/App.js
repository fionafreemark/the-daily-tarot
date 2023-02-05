
// Components
import Header from './Components/Header';
import GameSection from './Components/GameSection';
import PastResponses from './Components/PastResponses';
import Footer from './Components/Footer';
// Assets
import './sass/partials/_typography.scss';
import './sass/partials/_global.scss';
import './sass/partials/_header.scss';
import './sass/partials/_gameSection.scss';
import './sass/partials/_pastResults.scss';
import './sass/partials/_footer.scss';
// import './App.scss';

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
