import React , { Component } from 'react';
import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import axios from '../../../axios';
import Pagex from '../../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import ProductCategoryList from './ProductCategoryList/ProductCategoryList';
import {Button, Table, Modal} from 'react-bootstrap';

class ProductCategoryListPage extends Component {
  render() {
    return(
      <div className="saleswrapper">
      <div>
         <SettingsNav />
     </div>
     <div className="CreateInvoiceBox">
            <div>
              product categories
            </div>
            <br />
          <ProductCategoryList />
     </div>
     <div>
       <QuickLink />
     </div>
      </div>
    )
  }
}

export default ProductCategoryListPage
