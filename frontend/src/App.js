import './index.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import HomeScreen from './screens/HomeScreen';
import SessionScreen from './screens/SessionScreen';
import SessionsScreen from './screens/SessionsScreen';
import RegisterScreen from './screens/RegisterScreen';
import LoginScreen from './screens/LoginSrcreen';
import SessionListScreen from './screens/SessionsListScreen';
import SchedueledListScreen from './screens/SchedueledListScreen';
import UserListScreen from './screens/UserListScreen';
import UserEditScreen from './screens/UserEditScreen';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Route path='/' component={HomeScreen} exact />
        <Route path='/profile' component={HomeScreen} exact />
        <Route path='/login' component={LoginScreen} exact />
        <Route path='/register' component={RegisterScreen} />
        <Route path='/sessions' component={SessionListScreen} exact />
        <Route path='/sessions/:id' component={SessionScreen} exact />
        <Route path='/scheduele' component={SchedueledListScreen} exact />
        <Route path='/sessions/:id' component={SessionScreen} exact />
        <Route path='/users' component={UserListScreen} exact />
        <Route path='/users/:id' component={UserEditScreen} exact />
        <Route path='/stats' component={HomeScreen} exact />
      </main>
    </Router>
  );
};

export default App;
