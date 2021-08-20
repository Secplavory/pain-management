import {Navbar, Nav, NavItem, NavbarBrand, NavLink} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'

function Cnavlink(props) {
  const history = useHistory();
  const location = useLocation();
  const [additionClassName, setAdditionClassName] = useState("")
  const onClickFunction = ()=>{
    history.push(props.path)
    props.setNavExpanded(false)
  }
  useEffect(()=>{
    props.path===location.pathname ? setAdditionClassName(" active") : setAdditionClassName("")
  }, [location, props.path])
  return (
    <NavLink onClick={()=>onClickFunction()} className={props.className + additionClassName}>{props.text}</NavLink>
  )
}

function Cnavbar(props) {
  const [navExpanded, setNavExpanded] = useState(false)
  return (
    <Navbar id={props.id} fixed="sticky" expand="sm" bg="dark" variant="dark" className="px-3" onToggle={setNavExpanded} expanded={navExpanded}>
      <NavbarBrand href="/" className="fs-2 me-5">疼痛管理</NavbarBrand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav>
          <NavItem>
            <Cnavlink path="/painManage" setNavExpanded={setNavExpanded} text="疼痛紀錄" className="fs-4 mx-2"/>
          </NavItem>
          <NavItem>
            <Cnavlink path="/dietManage" setNavExpanded={setNavExpanded} text="飲食紀錄" className="fs-4 mx-2"/>
          </NavItem>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Cnavbar;
