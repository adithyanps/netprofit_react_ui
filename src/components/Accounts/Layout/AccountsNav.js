import React, { Component } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './AccountsNav.css';

class SalesNav extends Component {
  render() {
    return(
      <div className="salesSideNav">
        <a href="/accounts">ACCOUNTS</a>
        <a href="/expenses">Expenses</a>
        <a href="/journal-entries">Journal Entries</a>
        <a href="/journal-items">Journal Items</a>
        <a href="/accounts">Accounts</a>
      </div>
    )
  }
}
export default SalesNav
