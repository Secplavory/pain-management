import './Cnavbar.scss'
import React from "react";
import {Navbar, NavbarBrand} from 'react-bootstrap'
import {useState} from 'react'
import { AiFillHome } from 'react-icons/ai';
import { MdAccountCircle } from "react-icons/md";

// function Cnavlink(props) {
//   const history = useHistory();
//   const location = useLocation();
//   const [additionClassName, setAdditionClassName] = useState("")
//   const onClickFunction = ()=>{
//     history.push(props.path)
//     props.setNavExpanded(false)
//   }
//   useEffect(()=>{
//     props.path===location.pathname ? setAdditionClassName(" active") : setAdditionClassName("")
//   }, [location, props.path])
//   return (
//     <NavLink onClick={()=>onClickFunction()} className={props.className + additionClassName}>{props.text}</NavLink>
//   )
// }
function Cnavbar(props) {
  const [navExpanded, setNavExpanded] = useState(false);

  function showLogin(){
    props.toggleLogin();
  }
  return (
    <Navbar id={props.id} fixed="sticky" expand="sm" bg="dark" variant="dark" onToggle={setNavExpanded} expanded={navExpanded}>
      <NavbarBrand href="#" className="fs-2 account"><MdAccountCircle onClick={showLogin} /></NavbarBrand>
      <div className="right">
        <a className="home" href="/">
          <AiFillHome />
        </a>
      </div>
    </Navbar>
  );
}

export default Cnavbar;
