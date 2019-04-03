import React , {Component } from 'react';
import './QuickLink.css';
import { Link } from 'react-router-dom';

class QuickLink extends Component {
  render() {
    return(
      <div className="qcklnk">
               <h1>Quicklinks</h1>

              <ul>
                <li><a href="/create-invoice">Create Invoice</a></li>
               <li><a  href="/invoice">Customer Receipt</a></li>
               <li><a  href="/invoice">Partner Ledger</a></li>
               <li><a  href="/invoice">Customer Balances</a></li>
               <li><a  href="/invoice">Customer Ageing Report</a></li>
               <li><a  href="/invoice">Create Expense</a></li>
            </ul>

      </div>
    )
  }
}
export default QuickLink;
