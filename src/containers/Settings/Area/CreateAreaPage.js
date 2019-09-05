import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import CreateArea from './CreateArea/CreateArea';
import * as actions from '../../../store/actions/index';

class CreateAreaPage extends Component {
  componentDidMount(){
    this.props.currentUser()
  }

  render() {
    return(
      <div className="saleswrapper">
        <div>
          <SettingsNav />
        </div>
        <div className="SettingsAcntBox">
        {(this.props.currentUserData.user_choice === "FULL_ACCESS") ? (
          <CreateArea />
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
export default connect(mapStateToProps,mapDispatchToProps)(CreateAreaPage);
