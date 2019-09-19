import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearhLogo from '../../../assets/search.svg'
import UserLogo from '../../../assets/user.svg'
import SettingsLogo from '../../../assets/settings.svg'
import AlarmLogo from '../../../assets/alarm.svg'
import { Button,Navbar,Nav,NavDropdown ,Form,FormControl} from 'react-bootstrap';
import './Navbar.css'
import axios from '../../../axios';

import {NavLink} from 'react-router-dom';

class Navbar1 extends Component {
  state={
    userData:[],

  }
  componentDidMount(){
    axios.get('/user/me',{
      headers: {
        'Authorization':'Token '+localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest'
      },
    })
    .then(response=>{
      this.setState({userData:response.data});
      console.log(response.data)
    })
    .catch(error =>{
      console.log(error)
    })
  }
   topFunction=() =>{
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
  render(){
    let token = null;
    token = this.props.loginToken
    return(
      <div>
        <Navbar bg="primary" variant="dark">
          <Navbar.Brand href="/home">NETPROFIT</Navbar.Brand>
          <Nav className="mr-auto">
            <Nav.Link href="/sales">SALES</Nav.Link>
            <Nav.Link href="/purchase">PURCHASE</Nav.Link>
            <Nav.Link href="/accounts">ACCOUNTS</Nav.Link>
            <Nav.Link href="/reports">REPORTS</Nav.Link>

          </Nav>

          <Nav >
            <Nav.Link href="/settings">
                SETTINGS
            </Nav.Link>

          <Nav.Link href='/logout'>
          LOGOUT
          </Nav.Link>
          </Nav>
        </Navbar>
        <div className="idBox">
            <div>
              <p>id:{this.state.userData.email}</p>
            </div>
        </div>
{this.props.children}
</div>
    )
  }
}
export default Navbar1
