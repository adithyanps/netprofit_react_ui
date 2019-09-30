import React , { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow } from 'mdbreact';
import { Line, Doughnut, Radar } from 'react-chartjs-2';

import { connect } from 'react-redux';
import axios from '../../../axios'
import * as actions from '../../../store/actions/index';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';

import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import CreditNoteSN from './CreditNoteSN/CreditNoteSN';
import DebitNoteSN from './DebitNoteSN/DebitNoteSN';
import SalesInvoiceSN from './SalesInvoiceSN/SalesInvoiceSN';
import CustomerRecieptSN from './CustomerRecieptSN/CustomerRecieptSN';
import ExpenseSN from './ExpenseSN/ExpenseSN';



class SerialNumberMain extends Component{
  componentDidMount(){
    this.props.currentUser()

  }
  render() {
    return(
      <div className="saleswrapper">
      <div>
        <SettingsNav />
      </div>
      <div className="snumberwrapper">
      <MDBRow className="mb-2">

          <MDBCol md="18" lg="6" className="mb-2">
              <MDBCard className="mb-4" style={{ "height": "20rem"}}>
              <MDBCardHeader>CREDIT NOTE SERIAL NUMBER</MDBCardHeader>
              <MDBCardBody>
                  <CreditNoteSN />
              </MDBCardBody>
              </MDBCard>
          </MDBCol>
          <MDBCol md="12" lg="6" className="mb-4">
              <MDBCard className="mb-4" style={{ "height": "20rem"}}>
              <MDBCardHeader>DEBIT NOTE SERIAL NUMBER</MDBCardHeader>
              <MDBCardBody >
                  <DebitNoteSN />
              </MDBCardBody>
              </MDBCard>
          </MDBCol>

          </MDBRow>
          <MDBRow className="mb-4">

              <MDBCol md="18" lg="6" className="mb-4">
                  <MDBCard className="mb-4" style={{ "height": "20rem"}}>
                  <MDBCardHeader>SALES INVOICE SERIAL NUMBER</MDBCardHeader>
                  <MDBCardBody>
                      <SalesInvoiceSN />
                  </MDBCardBody>
                  </MDBCard>
              </MDBCol>
              <MDBCol md="12" lg="6" className="mb-4">
                  <MDBCard className="mb-4" style={{ "height": "20rem"}}>
                  <MDBCardHeader>CUSTOMER RECIEPT SERIAL NUMBER</MDBCardHeader>
                  <MDBCardBody >
                      <CustomerRecieptSN />
                  </MDBCardBody>
                  </MDBCard>
              </MDBCol>

              </MDBRow>
          <MDBRow className="mb-4">

              <MDBCol md="18" lg="6" className="mb-4">
                      <MDBCard className="mb-4" style={{ "height": "20rem"}}>
                      <MDBCardHeader>EXPENSE SERIAL NUMBER</MDBCardHeader>
                      <MDBCardBody>
                          <ExpenseSN />
                      </MDBCardBody>
                      </MDBCard>
              </MDBCol>
            </MDBRow>
          </div>
          <div>
            <QuickLink />
          </div>
      </div>
    )
  }
}
const mapStateToProps =(state)=>{
  console.log(state)
  return {
    currentUserData:state.currentUser.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {

    currentUser: ()=>dispatch(actions.currentUser()),


  }
}
export default connect(mapStateToProps,mapDispatchToProps)(SerialNumberMain);
