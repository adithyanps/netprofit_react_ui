import React , { Component } from 'react';
import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import axios from '../../../axios';
import Pagex from '../../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductList from './ProductList/ProductList';
import {Button, Table, Modal} from 'react-bootstrap';

class ProductsListPage extends Component {
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
          <ProductList />
     </div>
     <div>
       <QuickLink />
     </div>
      </div>
    )
  }
}

export default ProductsListPage
