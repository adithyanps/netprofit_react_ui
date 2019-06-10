import React , { Component } from 'react';
import DefaultSettings from '../Settings/DefaultSettings';
import axios from '../../axios'
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';

class SettingsPage extends Component {
  state={
      accountIdObj:{},
      accountList:[],
      defaultAccountList:[],
      SalesObj:{},
      PurchaseObj:{},
      CustomerObj:{},
      SupplierObj:{},
      accountList:[]


  }
  componentDidMount(){
    this.props.currentUser()
    this.props.onDefaultAccountList();
    this.props.onAccount()

  }


  render() {
    console.log(this.state)
    console.log(this.props)
    console.log(this.props.currentUserData.user_choice)


    return(
      <div>
       settings
       {(this.props.currentUserData.user_choice === "FULL_ACCESS") ? (
         <DefaultSettings
            />
       ):(<div>YOU HAVE NO PERMISSION TO ACCESS THIS PAGE</div>)}

      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  console.log(state)
  return {
    accountList: state.account.account,
    defaultAccountList: state.account.defaultAccount,
    currentUserData:state.currentUser.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {

    currentUser: ()=>dispatch(actions.currentUser()),
    onDefaultAccountList: () => dispatch( actions.defaultAccountList() ),
    onAccount: () => dispatch( actions.accountList() )


  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SettingsPage);
