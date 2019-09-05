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
        <a href="/create-productCategory">Create ProductCategory</a>
        <a href="/productCategorys">ProductCategory List</a>
        <a href="/create-branch">Create Branch</a>
        <a href="/branches">Branch List</a>
        <a href="/create-area">Create Area</a>
        <a href="/areas">Area List</a>

      </div>
    )
  }
}
export default SettingsNav
