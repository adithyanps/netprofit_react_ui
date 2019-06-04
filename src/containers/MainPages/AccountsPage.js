import React , { Component } from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import AccountsNav from '../../components/Accounts/Layout/AccountsNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import './SalesPage.css';

class AccountsPage extends Component {
  render() {
    return(
      <div className="saleswrapper">
        <div>
          <AccountsNav />
        </div>
        <div>
            <div className="account-squarebox-row">
                <div className="account-squarebox">
                <p>Cashbook Balances</p>
                </div>
                <div className="account-squarebox">
                </div>
            </div>
            <div className="salesbox">
            <p>Expense Report</p>
            </div>
        </div>
        <div>
          <QuickLink />
        </div>
      </div>
    )
  }
}
export default AccountsPage;
