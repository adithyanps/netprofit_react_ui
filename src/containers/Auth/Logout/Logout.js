import React , { Component } from 'react';
import * as actions from '../../../store/actions/index';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

class Logout extends Component {
  componentDidMount (){
    this.props.logout()
  }
  render(){

    return(
      <Redirect to="/"/>
    )
  }
}
const mapDispatchToProps = dispatch => {
  return {
    logout: (token) => dispatch(actions.logout(token))
  }
}
export default connect(null,mapDispatchToProps)(Logout);
