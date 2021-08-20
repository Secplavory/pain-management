import './HomePage.scss'
import ReactEcharts from 'echarts-for-react'
import {Navbar, Nav, NavItem, NavLink} from 'react-bootstrap'
import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'

function HomePage() {
  const location = useLocation();
  const [formState, setFormState] = useState("")
  const options = {
    grid: { top: 50, right: 18, bottom: 24, left: 48 },
    xAxis: {
      type: 'category',
      data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        data: [820, 932, 901, 934, 1290, 1330, 1320],
        type: 'line',
        smooth: true,
      },
    ],
    tooltip: {
      trigger: 'axis',
    },
  };
  useEffect(()=>{
    if(location.hash===""){
      setFormState("");
    }else{
      setFormState("hidden")
    }
  }, [location.hash]);
  return (
    <div>
      <ReactEcharts className={formState}
        option={options}
      />
      <Navbar id="SousBavbar" fixed="bottom" bg="dark" variant="dark">
        <Navbar.Toggle />
        <Navbar.Collapse>
        <Nav>
          <NavItem>
            <NavLink href="#pain" className="fs-4 mx-5">疼痛統計表</NavLink>
          </NavItem>
          <NavItem>
            <NavLink href="#diet" className="fs-4 mx-5">飲食統計表</NavLink>
          </NavItem>
        </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default HomePage;
