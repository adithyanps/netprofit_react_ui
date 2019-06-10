import React , { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import ExpenseList from './ExpenseList/ExpenseList';

class ExpenseListPage extends Component {
  render() {
    return(
      <div className="SalesInvoicesWrapper">

        <div>
          <SalesNav />
        </div>
        <div className="SalesInvoiceBox">
          <ExpenseList />
        </div>
      </div>
    )
  }
}
export default ExpenseListPage;
