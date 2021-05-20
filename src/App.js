import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { NavBar } from './components/';

function App() {
  return (
    <Router>
      <NavBar />
      <Switch></Switch>
    </Router>
  );
}

export default App;
