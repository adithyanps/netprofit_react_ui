import React, { Component } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import './SalesNav.css';

class SalesNav extends Component {
  render() {
    return(
      <div className="salesSideNav">
        <a href="/sales">SALES</a>
        <a href="/create-invoice">create invoice</a>
        <a href="/create-reciept">Create Reciept</a>
        <a href="/sales-invoices">Sales Invoices</a>
        <a href="/customer-reciepts">Customer Reciepts</a>
        <a href="/customers">Customers</a>
        <a href="/expense-list">Expenses-list</a>

      </div>

    )
  }
}
export default SalesNav
