import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import SessionScreen from './screens/SessionScreen';
import SessionsScreen from './screens/SessionsScreen';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/profile' component={HomeScreen} exact />
        <Route path='/sessions' component={SessionsScreen} exact />
        <Route path='/sessions/:id' component={SessionScreen} exact />
        <Route path='/stats' component={HomeScreen} exact />
      </main>
    </Router>
  );
};

export default App;
