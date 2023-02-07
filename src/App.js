// Components
import Header from './Components/Header';
import GameSection from './Components/GameSection';
import PastResponses from './Components/SavedResponses';
import Footer from './Components/Footer';
// Assets
import './sass/partials/_typography.scss';
import './sass/partials/_global.scss';
import './sass/partials/_header.scss';
import './sass/partials/_gameSection.scss';
import './sass/partials/_savedResponses.scss';
import './sass/partials/_footer.scss';
import './sass/partials/_mediaQueries.scss';

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
