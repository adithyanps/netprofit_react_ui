import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import CreateProduct from './CreateProduct/CreateProduct';

class CreateProductPage extends Component {

  render(){
    return(

        <div className="saleswrapper">
          <div>
            <SettingsNav />
          </div>
          <div className="SettingsAcntBox">
            <CreateProduct />
          </div>
          <div>
            <QuickLink />
          </div>
        </div>
    )
  }
}
export default CreateProductPage
