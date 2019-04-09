import React, { Component } from 'react';
import axios from '../../axios'
import './Home.css';
import { Container,Row,Col } from 'react-bootstrap';
import QuickLink from '../../components/UI/QuickLink/QuickLink';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class Home extends Component {
componentDidMount(){
  axios.get('/user/create/').then(
    res=>{console.log(res.data)}
  )
  this.props.currentUser()
}
  render() {
    console.log(this.props)
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
const mapStateToProps = state => {
  return {
    loginToken:state.login.token,
    user_choice:state.login.user_choice,
    currentUserData:state.currentUser.userData

  }
}
const mapDispatchToProps = dispatch => {
    return {
      currentUser: ()=>dispatch(actions.currentUser()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(Home);
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
