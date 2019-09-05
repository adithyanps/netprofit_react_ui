import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreateBranch extends Component {
  state = {
    selectedBranch:null,
    branchListPage:false,

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
      branch:this.state.selectedBranch,
    }
    axios.post('invoice/branch/',Data).then(
      response=>{
        console.log(response.data);
        this.props.createBranchSuccess(response.data)
        this.setState({branchListPage:true})
      }
    ).catch(error=>{
      this.props.createBranchFail(error)
    })
  }

  openBranchListPage=()=>{
    return(
      <Redirect  to="/branches"/>
    )
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return (
      <div>
      {this.state.branchListPage ? (this.openBranchListPage()) : (null)}

      <br />
        <div className="SettingsAcntBoxwrapper">
        <label>BRANCH:</label><br />
        <input
          className="grand"
          name="selectedBranch"
          value={this.state.selectedBranch}
          onChange={this.handleInputChange}
          />
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
    branchData:state.branch.branchData,
    branchDataList:state.branch.branchDataList,
    branchListPageOpen:state.branch.branchListPageOpen,
    isDeletePage:state.branch.isDeletePage,
    isEditPage:state.branch.isEditPage,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      getAllBranch: ()=>dispatch(actions.getAllBranch()),
      createBranchSuccess: (obj)=>dispatch(actions.createBranchSuccess(obj)),
      createBranchFail: (error)=>dispatch(actions.createBranchFail(error)),


    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateBranch);
