import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SalesNav from '../../components/Sales/Layout/SalesNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import CreateInvoice from './CreateInvoice/CreateInvoice';

class SalesPage extends Component {

  render(){
    return(

        <div className="saleswrapper">
          <div>
            <SalesNav />
          </div>
          <div className="CreateInvoiceBox">
            <CreateInvoice />
          </div>
          <div>
            <QuickLink />
          </div>
        </div>
    )
  }
}
export default SalesPage
