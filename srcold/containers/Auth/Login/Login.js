import React , { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router-dom';

import { Button,Form } from 'react-bootstrap';
import './Login.css';
import axios from '../../../axios';
import * as actions from '../../../store/actions/index';

class Login extends Component {
  state = {
    email:'',
    password:''
  }
  // postLoginData = (loginData) => {
  //   axios.post('/user/create')
  // }
  submitLoginDataHandler =(e) => {
    e.preventDefault()
    let loginData = {
      email:this.state.email,
      password:this.state.password
    }
    // this.postLoginData(loginData)
    console.log(loginData)
    this.props.onLogin(
      this.state.email,
      this.state.password
    )
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})
  }
  authRedirect=()=> {
    let token = null;
    token = this.props.loginToken
    if (token) {
       return(
          <Redirect to="/home" />
       )
    }
  }
  render() {
    console.log(this.props.error)
    let token = null;
    token = this.props.loginToken
    let authRedirect = null;
    if (token) {
      authRedirect = <Redirect to="/home" />
    }
    return (<div>
      {this.authRedirect()}
      <div className="SignInBox">
        <div className="SignInBox2">
          <h1>SignIn</h1>
          <label>User name/Email address</label>
          <input onChange={this.handleInputChange} type="email" name="email"/>
          <br /><label>Password</label>
          <br />
          <input onChange={this.handleInputChange} type="password" name="password"/>
          <br />
          <br />
          <button onClick={this.submitLoginDataHandler} className="SignInButton">Sign In</button>
        </div>

        <h2>forget password?</h2>
      </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {

    loginToken:state.login.token,
    error:state.login.error

  }
}
const mapDispatchToProps = dispatch => {
    return {
        onLogin: (email, password) => dispatch(actions.login(email,password))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Login);
// <form onSubmit={this.submitLoginDataHandler} className="box">
// <h1>Sign In</h1>
//   <Form.Group controlId="formGroupEmail">
//   <Form.Label>Email address</Form.Label>
//   <Form.Control onChange={this.handleInputChange} type="email" placeholder="Enter email" name="email"/>
//   </Form.Group>
//   <Form.Group controlId="formGroupPassword">
//   <Form.Label>Password</Form.Label>
//   <Form.Control onChange={this.handleInputChange} type="password" placeholder="Password" name="password" />
//   </Form.Group>
//    <Button onClick={this.submitLoginDataHandler} variant="primary">Sign In</Button>
// </form>
