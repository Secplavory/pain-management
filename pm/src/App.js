import Cnavbar from './components/Cnavbar'
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.scss'

function App() {
  return (
    <div className="App">
      <Router>
        <Cnavbar id="navbar" />
        <Switch>
          <Route exact path="/">
            <h1>首頁</h1>
          </Route>
          <Route exact path="/painrecord">
            <h1>疼痛</h1>
          </Route>
          <Route exact path="/dietrecord">
            <h1>飲食</h1>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
