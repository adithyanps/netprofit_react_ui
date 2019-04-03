import React, { Component } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './SalesNav.css';

class SalesNav extends Component {
  render() {
    return(
      <div className="salesSideNav">
        <a href="/sales">SALES</a>
        <a href="/create-invoice">create invoice</a>
        <a href="/services">Customer Reciept</a>
        <a href="#clients">partner Ledger</a>
        <a href="#contact">customer Ageing Report</a>
        <a href="#contact">Create Expense</a>

      </div>

    )
  }
}
export default SalesNav
