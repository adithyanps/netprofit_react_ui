import React , { Component } from 'react';
import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import axios from '../../../axios';
import Pagex from '../../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {Button, Table, Modal} from 'react-bootstrap';
import AccountsNav from '../../../components/Accounts/Layout/AccountsNav';
import * as actions from '../../../store/actions/index';

import CreateCreditNote from './CreateCreditNote/CreateCreditNote';

class CreateCreditNotePage extends Component{
  render(){
    return(
      <div className="saleswrapper">
        <div>
          <AccountsNav />
        </div>
        <div className="CreateInvoiceBox">
        <CreateCreditNote />
        </div>
        <div>
          <QuickLink />
        </div>
      </div>
    )
  }
}

export default CreateCreditNotePage;
