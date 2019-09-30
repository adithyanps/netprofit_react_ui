import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreateExpenseCategory extends Component {
  state = {
    selectedExpenseCategory:null,
    expenseCategoryListPage:false,

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
      name:this.state.selectedExpenseCategory,

    }
    console.log(Data)

    axios.post('expenses/expense-category/',Data).then(
      response=>{
        this.props.createExpenseCategorySuccess(response.data)
        this.setState({expenseCategoryListPage:true})

      },
    ).catch(error=>{
      this.props.createExpenseFail(error)
    })
    console.log(this.props)

  }

  openExpenseCategoryListPage=(event)=>{
    console.log(this)
    return(
      <Redirect  to="/expense-categories"/>
    )
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return (
      <div>
      {this.state.expenseCategoryListPage ? (this.openExpenseCategoryListPage()) : (null)}

      <br />
        <div className="SettingsAcntBoxwrapper">
        <label>ExpenseCategoryName:</label><br />
        <input
          className="grand"
          name="selectedExpenseCategory"
          value={this.state.selectedExpenseCategory}
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
    expenseCategory:state.expenseCategory.expenseCategoryData,
    expenseCategoryList:state.expenseCategory.expenseCategoryDataList,
    expenseCategoryListPageOpen:state.expenseCategory.expenseCategoryListPageOpen,
    isDeletePage:state.expenseCategory.isDeletePage,
    isEditPage:state.expenseCategory.isEditPage,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      getAllExpenseCategory: ()=>dispatch(actions.getAllExpenseCategory()),
      createExpenseCategorySuccess: (obj)=>dispatch(actions.createExpenseCategorySuccess(obj)),
      createExpensecategoryFail: (error)=>dispatch(actions.createExpenseCategoryFail(error)),


    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateExpenseCategory);
