import React , { Component } from 'react';
import './Sales.css';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import axios from '../../axios';
import Pagex from '../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import CustomersList from './CustomersList/CustomersList';
import {Button, Table, Modal} from 'react-bootstrap';

class Customers extends Component {
  render() {
    return(
      <div className="saleswrapper">
      <div>
         <SalesNav />
     </div>
     <div className="CreateInvoiceBox">
            <div>
              Customers
            </div>
            <br />
            
            <br />
          <CustomersList />
     </div>
     <div>
       <QuickLink />
     </div>
      </div>
    )
  }
}
export default Customers
