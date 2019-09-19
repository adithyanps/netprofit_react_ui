import React , {Component} from 'react';
import { Container,Row,Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import SettingsNav from '../../../components/Settings/Layout/SettingsNav';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import CreateAccount from './CreateAccount/CreateAccount';
import * as actions from '../../../store/actions/index';
import axios from '../../../axios';

class CreateAccountPage extends Component {
  state={
    currentUser:null
  }


  componentDidMount(){
    console.log('update')
    this.props.currentUser()
    console.log(this.props.currentUserData,'will')
    this.currentUser()
  }

  currentUser=()=>{
        axios.get('/user/me',{
          headers: {
            'Authorization':'Token '+localStorage.getItem('token'),
            'X-Requested-With': 'XMLHttpRequest'
          },
        })
        .then(res=>{
          console.log(res.data)
          this.setState({currentUser:res.data})
        })
        .catch(error =>console.log(error))

    }
    // rendrUser=()=>{
    //   return(
    //     <div>
    //     {(this.state.currentUser.user_choice === "FULL_ACCESS") ? (
    //       <CreateAccount />
    //     ):(<div>YOU HAVE NO PERMISSION TO ACCESS THIS PAGE</div>)}
    //     </div>
    //   )
    // }
  render() {
    console.log(this.state.currentUser)
    console.log(this.props.currentUserData)
    const rendrUser = (
      <div>
      {(this.props.currentUserData.user_choice === "FULL_ACCESS") ? (
        <CreateAccount />
      ):(<div>YOU HAVE NO PERMISSION TO ACCESS THIS PAGE</div>)}
      </div>
    )
    return(
      <div className="saleswrapper">
        <div>
          <SettingsNav />
        </div>
        <div className="CreateInvoiceBox">
        {rendrUser}
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
export default connect(mapStateToProps,mapDispatchToProps)(CreateAccountPage);
