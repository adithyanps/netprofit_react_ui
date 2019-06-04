import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SearhLogo from '../../../assets/search.svg'
import UserLogo from '../../../assets/user.svg'
import SettingsLogo from '../../../assets/settings.svg'
import AlarmLogo from '../../../assets/alarm.svg'
import { Button,Navbar,Nav,NavDropdown } from 'react-bootstrap';
import './Navbar.css'
import axios from '../../../axios';

import {NavLink} from 'react-router-dom';

class Navbars extends Component {
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
  render() {
    let token = null;
    token = this.props.loginToken

    return (
      <div className="homeBackground">

        <div className="nav">
          <li ><a className="nav-link-th" href="/home">NETPROFIT</a></li>
          <li ><a className="nav-link-t" href="/sales">SALES</a></li>
          <li ><a className="nav-link-t" href="/purchase">PURCHASE</a></li>
          <li ><a className="nav-link-t" href="/accounts">ACCOUNTS</a></li>
          <li ><a className="nav-link-t" href="/reports">REPORTS</a></li>


          <a href="/settings">  <img src={SettingsLogo} /></a>
            <img src={SearhLogo} />

            <img src={AlarmLogo} />
            <div className="dropdown" style={{"float":"right"}}>
              <button className="dropbtn">
            <img src={UserLogo} style={{"fontsize":"30px","color":"green"}}/>
              </button>
              <div className="dropdown-content" >
                <Link to="/logout" className="nav-link">logout</Link>
              </div>
            </div>
        </div>

        <div className="idBox">
          <div>
            <p>id:{this.state.userData.email}</p>
          </div>
        </div>
        <div className="breadCrmbBox">

        </div>
        <div>{this.props.children}</div>
        <div className="footer">
        <ul>

          <li ><a className="footer-link-t" href="/news">NEWS</a></li>
          <li><a className="footer-link-t" href="/sport">SPORT</a></li>
          <li><a className="footer-link-t" href="/wheather">WHEATHER</a></li>
          <li><a  className="footer-link-t" href="/future">FUTURE</a></li>
          </ul>
          <button onClick={this.topFunction}>top</button>


        </div>


    </div>
    )
  }
}
function mapStateToProps(state) {
  return {
    loginToken:state.login.token,
    // signupToken:state.auth.token,
  }
}

export default connect(mapStateToProps)(Navbars);
