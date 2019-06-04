import React , { Component } from 'react';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import axios from '../../axios';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import CreateExpense from './CreateExpense/CreateExpense';

class CreateExpensePage extends Component {
  render() {
    return (
      <div className="saleswrapper">
          <div>
          <SalesNav />
         </div>
         <div className="CreateInvoiceBox">
            <CreateExpense />
         </div>
         <div>
          <QuickLink />
         </div>
      </div>
    )
  }
}
export default CreateExpensePage;
