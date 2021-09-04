import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import './App.scss'

import Cnavbar from './components/Cnavbar'
import HomePage from './components/homePage/HomePage'
import DietManagePage from './components/dietManagePage/DietManagePage'
import PainManagePage from './components/painManagePage/PainManagePage'
import Login from './components/Login.js'

function App() {
  return (
    <div className="App">
      <Router>
        <Cnavbar id="Navbar" />
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route exact path="/painManage">
            <PainManagePage />
          </Route>
          <Route exact path="/dietManage">
            <DietManagePage />
          </Route>
        </Switch>
        <Login />
      </Router>
    </div>
  );
}

export default App;
