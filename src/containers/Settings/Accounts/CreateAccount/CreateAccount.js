import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreateAccount extends Component {
  state = {
    selectedAccount:null,
    accountListPage:false,
    selectedType:null

  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }
  submitDataHandler=()=>{
    let Data = {
      name:this.state.selectedAccount,
      type:this.state.selectedType

    }
    console.log(Data)

    axios.post('invoice/account/',Data).then(
      response=>{
        console.log(response.data)
        this.props.createAccountSuccess(response.data)
        this.setState({accountListPage:true})

      },
    ).catch(error=>{
      this.props.createAccountFail(error)
    })
    console.log(this.props)

  }

  openAccountListPage=(event)=>{
    console.log(this)
    return(
      <Redirect  to="/account-lists"/>
    )
  }

  render() {
    console.log(this.state)
    console.log(this.props)
    const accountTypeList = ['RECIEVABLE','PAYABLE','SALES','PURCHASE','EXPENSE','INCOME','CASH','BANK']

    return (
      <div>
      {this.state.accountListPage ? (this.openAccountListPage()) : (null)}

      <br />
        <div className="SettingsAcntBoxwrapper">
        <div>
          <label>ACCOUNT NAME:</label><br />
          <input
            className="grand"
            name="selectedAccount"
            value={this.state.selectedAccount}
            onChange={this.handleInputChange}
          />
          </div>
          <div>
          <label>ACCOUNT TYPE:</label><br />
          <select
              className="select"
              onChange={(e) => this.setState({selectedType:e.target.value})}>
              <option value=""> </option>
              {accountTypeList.map((m)=>
                  <option key={m.id} value={m}>{m}</option>
              )}
          </select>
          </div>
        </div>
        <br/>
        <div style={{marginLeft:"200px"}}>
          <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
        </div>
      </div>
    )
  }
}
const mapStateToProps = state => {
  return {
    accountData:state.accountTypes.accountData,
    accountDataList:state.accountTypes.accountDataList,
    accountListPageOpen:state.accountTypes.accountListPageOpen,
    isDeletePage:state.accountTypes.isDeletePage,
    isEditPage:state.accountTypes.isEditPage,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      getAllAccount: ()=>dispatch(actions.getAllAccount()),
      createAccountSuccess: (obj)=>dispatch(actions.createAccountSuccess(obj)),
      createAccountFail: (error)=>dispatch(actions.createAccountFail(error)),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateAccount);
