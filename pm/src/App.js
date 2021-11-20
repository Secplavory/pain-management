import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {useState} from 'react'
import './App.scss'

import Cnavbar from './components/Cnavbar'
import PainManagePage from './components/painManagePage/PainManagePage'
import Login from './components/login/Login.js'

function App() {
  const [showLoginHandler, setShowLoginHandler] = useState(false);
  function toggleLogin(){
    const login_page = document.querySelector("#login");
    if(showLoginHandler){
      login_page.classList.remove("active");
    }else{
      login_page.classList.add("active");
    }
    setShowLoginHandler(!showLoginHandler);
  }
  return (
    <div className="App">
      <Router>
        <Cnavbar id="Navbar" toggleLogin={toggleLogin}/>
        <Switch>
          <Route exact path="/">
            <PainManagePage />
          </Route>
        </Switch>
        <Login toggleLogin={toggleLogin} />
      </Router>
    </div>
  );
}

export default App;
