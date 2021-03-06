import React , { Component } from 'react';
import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import axios from '../../../axios';
import Pagex from '../../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import BranchList from './BranchList/BranchList';
import {Button, Table, Modal} from 'react-bootstrap';

import * as actions from '../../../store/actions/index';

class BranchListPage extends Component {
  componentDidMount(){
    this.props.currentUser()
  }
  render() {
    return(
      <div className="saleswrapper">
      <div>
         <SettingsNav />
     </div>
     <div className="CreateInvoiceBox">
     {(this.props.currentUserData.user_choice === "FULL_ACCESS") ? (
       <BranchList />
     ):(<div>YOU HAVE NO PERMISSION TO ACCESS THIS PAGE</div>)}
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
export default connect(mapStateToProps,mapDispatchToProps)(BranchListPage);
