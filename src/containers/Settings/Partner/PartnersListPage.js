import React , { Component } from 'react';
import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import axios from '../../../axios';
import Pagex from '../../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import PartnerList from './PartnerList/PartnerList';
import {Button, Table, Modal} from 'react-bootstrap';

class PartnersListPage extends Component {
  render() {
    return(
      <div className="saleswrapper">
      <div>
         <SettingsNav />
     </div>
     <div className="CreateInvoiceBox">
            <div>
              partners
            </div>
            <br />
          <PartnerList />
     </div>
     <div>
       <QuickLink />
     </div>
      </div>
    )
  }
}
export default PartnersListPage
