import Cnavbar from './components/Cnavbar'
import {BrowserRouter as Router, Switch} from 'react-router-dom'

function App() {
  return (
    <div className="App">
      <Router>
        <Cnavbar />
        <Switch>

        </Switch>
      </Router>
    </div>
  );
}

export default App;
