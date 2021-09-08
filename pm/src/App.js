import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import './App.scss'

import Cnavbar from './components/Cnavbar'
import HomePage from './components/homePage/HomePage'
import DietManagePage from './components/dietManagePage/DietManagePage'
import PainManagePage from './components/painManagePage/PainManagePage'
import Login from './components/Login.js'

function App() {
  const [showLoginHandler, setShowLoginHandler] = useState(false);
  function toggleLogin(){
    const login_page = document.querySelector("#login");
    setShowLoginHandler(function(prev){
      if(prev){
        login_page.classList.remove("active");
      }else{
        login_page.classList.add("active");
      }
      return !prev;
    })
  }
  return (
    <div className="App">
      <Router>
        <Cnavbar id="Navbar" toggleLogin={toggleLogin} />
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
        <Login toggleLogin={toggleLogin} />
      </Router>
    </div>
  );
}

export default App;
