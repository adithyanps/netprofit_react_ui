import React , { Component } from 'react';
import { MDBCol, MDBCard, MDBCardBody, MDBCardHeader, MDBRow } from 'mdbreact';
import { Line, Doughnut, Radar } from 'react-chartjs-2';
import SalesPartnerChart from '../../components/Chart/Sales/SalesPartnerChart';
import SalesYearwiseIncomeChart from '../../components/Chart/Sales/SalesYearwiseIncomeChart';
import SalesPartnerWithYearChart from '../../components/Chart/Sales/SalesPartnerWithYearChart';
import ExpenseYearwiseAmountChart from '../../components/Chart/Expense/ExpenseYearwiseAmountChart';
import ExpenseCatWiseAmountChart from '../../components/Chart/Expense/ExpenseCatWiseAmountChart';


class ReportsPage extends Component {
  render() {
    return(
      <div>
        <MDBRow className="mb-4">

            <MDBCol md="12" lg="4" className="mb-4">
                <MDBCard className="mb-4" style={{ "height": "17rem"}}>
                <MDBCardHeader>Bar chart -Customers</MDBCardHeader>
                <MDBCardBody>
                <SalesPartnerChart />

                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="4" className="mb-4">
                <MDBCard className="mb-4" style={{ "height": "17rem"}}>
                <MDBCardHeader>Doughnut chart-year vice</MDBCardHeader>
                <MDBCardBody >
                <SalesYearwiseIncomeChart />

                </MDBCardBody>
                </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="4" className="mb-4">
                <MDBCard className="mb-4" style={{ "height": "17rem"}}>
                <MDBCardHeader>BarChart-CustomerYear-Based</MDBCardHeader>
                <MDBCardBody>
                  <SalesPartnerWithYearChart />
                </MDBCardBody>
                </MDBCard>
            </MDBCol>
        </MDBRow>
        <MDBRow className="mb-4">
            <MDBCol md="12" lg="4" className="mb-4">
              <MDBCard className="mb-4" style={{ "height": "17rem"}}>
              <MDBCardHeader>Doughnut-ExpenseAmount-Year chart</MDBCardHeader>
              <MDBCardBody>
                <ExpenseYearwiseAmountChart />
              </MDBCardBody>
              </MDBCard>
            </MDBCol>
            <MDBCol md="12" lg="4" className="mb-4">
                <MDBCard className="mb-4" style={{ "height": "17rem"}}>
                <MDBCardHeader>BarChart-ExpenseCat-Year</MDBCardHeader>
                <MDBCardBody>
                <ExpenseCatWiseAmountChart />
                </MDBCardBody>
                </MDBCard>
            </MDBCol>

        </MDBRow>
      </div>
    )
  }
}
export default ReportsPage;
