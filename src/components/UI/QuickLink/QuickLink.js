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
               <li><a  href="/customer-reciepts">Customer Receipt</a></li>
               <li><a  href="/partner-ledger">Partner Ledger</a></li>
               <li><a  href="/csutomer-balances">Customer Balances</a></li>
               <li><a  href="/cusotmer-aging-reports">Customer Ageing Report</a></li>
               <li><a  href="/create-expense">Create Expense</a></li>
            </ul>

      </div>
    )
  }
}
export default QuickLink;
