import React , { Component } from 'react';
import './PurchasePage.css';

class PurchasePage extends Component {
  render() {
    return(

      <div className="SignInBox">
        <div className="SignInBox2">
          <h1>SignIn</h1>
          <label>User name/Email address</label>
          <input />
          <label>Password</label>
          <input />

          <button className="SignInButton">signin</button>
        </div>

        <h2>forget password?</h2>
      </div>
    )
  }
}
export default PurchasePage;
