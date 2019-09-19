import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import CreateBranch from './CreateBranch/CreateBranch';
import * as actions from '../../../store/actions/index';

class CreateBranchPage extends Component {
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
          <CreateBranch />
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
export default connect(mapStateToProps,mapDispatchToProps)(CreateBranchPage);
