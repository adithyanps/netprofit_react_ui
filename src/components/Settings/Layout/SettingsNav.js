import React, { Component } from 'react';
import { Container,Row,Col } from 'react-bootstrap';

class SettingsNav extends Component {
  render() {
    return(
      <div className="salesSideNav">
        <a href="/create-products">Create-Products</a>
        <a href="/products">Products</a>
        <a href="/create-partner">Create-Partner</a>
        <a href="/partners">Partners</a>
      </div>
    )
  }
}
export default SettingsNav
