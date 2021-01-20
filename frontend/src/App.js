import './index.css';
import { BrowserRouter as Router } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Router path='/' component={HomeScreen} exact />
      </main>
      <Footer />
    </Router>
  );
};

export default App;
