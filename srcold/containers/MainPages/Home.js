import React, { Component } from 'react';
import axios from '../../axios'
import './Home.css';
import { Container,Row,Col } from 'react-bootstrap';
import QuickLink from '../../components/UI/QuickLink/QuickLink';

class Home extends Component {
componentDidMount(){
  axios.get('/user/create/').then(
    res=>{console.log(res.data)}
  )
}
  render() {
    return (
    <div className="wrapper">
      <div>
        
      </div>
      <div>

        <div className="row">
            <div className="HomeRectangles" >
              <h2>sales</h2>
            </div>

            <div className="HomeRectangles" >
              <h2>Purchase</h2>
            </div>
        </div>
        <div className="row">
            <div className="HomeRectangles" >
              <h2>Customer Reciept</h2>
            </div>

            <div className="HomeRectangles" >
              <h2>Bank/Cash Accounts</h2>
            </div>
        </div>
      </div>
      <div>
        <QuickLink />
      </div>

    </div>
    )
  }
}
export default Home;
// <div>
//     <div className="row">
//       <div className="HomeRectangles" >
//         <h2>sales</h2>
//       </div>
//
//       <div className="HomeRectangles" >
//         <h2>Purchase</h2>
//       </div>
//     </div>
//     <div className="row">
//       <div className="HomeRectangles" >
//         <h2>Customer Reciept</h2>
//       </div>
//
//       <div className="HomeRectangles" >
//         <h2>Bank/Cash Accounts</h2>
//       </div>
//     </div>
//
// </div>

// <Container>
// <Row>
// <Col xs={5}>
// <div className="HomeRectangles" >
//       <h2>sales</h2>
//   </div></Col>
// <Col xs={5}>
// <div className="HomeRectangles" >
//      <h2>Purchase</h2>
// </div>
//
// </Col>
//
// <Col xs={1}><QuickLink /></Col>
// </Row>
// </Container>
