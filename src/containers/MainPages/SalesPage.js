import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
// import CreateInvoice from '../../components/Sales/Invoice/CreateInvoice';
import './SalesPage.css';

class SalesPage extends Component {

  render(){
    return(

        <div className="saleswrapper">
          <div>
            <SalesNav />
          </div>
          <div>
            <div className="salesbox">
             <p>Sales</p>
            </div>
            <div className="salesbox">
            <p>Customer Reciepts</p>
            </div>
          </div>
          <div>
            <QuickLink />
          </div>
        </div>
    )
  }
}
export default SalesPage
