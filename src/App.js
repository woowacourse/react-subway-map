import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar } from './components';

function App() {
  return (
    <Router>
      <header>
        <NavBar />
      </header>
    </Router>
  );
}

export default App;
