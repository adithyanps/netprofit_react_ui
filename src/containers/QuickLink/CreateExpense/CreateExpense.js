import React , { Component } from 'react';
import moment from 'moment';
import axios from '../../../axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';

class CreateExpense extends Component {
  state = {
    categoryList:[],
    expenseAccnts:[],
    cashAccnts:[],
    expenseDataList:[],
    Doc_no:null,
    date:new Date(),
    cashAmount:null,
    narration:'',
    selectedCategory:'',
    selectedExpnseAcccnt:'',
    selectedCashAccnt:'',
    expenseListPage:false,
  }

  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadExpenseCategory()
    this.loadExpenseAccnts()
    this.loadCashAccnts()
    this.loadExpenseData()
  }

  loadExpenseData=()=>{
    axios.get('/invoice/expenses/').then(
      res =>{
        this.setState({expenseDataList:res.data})
      }
    )
  }

  loadExpenseCategory=()=>{
    axios.get('/invoice/expense-category/').then(
      response=>{this.setState({categoryList:response.data});
    }
    )
  }

  loadExpenseAccnts=()=>{
    axios.get('/invoice/account/?search=EXPENSE').then(
      res => {
        this.setState({expenseAccnts:res.data})
      }
    )
  }

  loadCashAccnts=()=>{
    axios.get('/invoice/account/?search=CASH').then(
      res => {
        this.setState({cashAccnts:res.data})
      }
    )
  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})
  }

  doc_noChangeHandler=()=> {
    console.log(this.state.Doc_no)
    var mostBiggerInvoiceNoDict = this.state.expenseDataList.reduce(function (oldest, item) {
      return (oldest.Doc_no || 0) > item.Doc_no ? oldest : item;
    }, {});
    console.log(mostBiggerInvoiceNoDict['Doc_no'])
    let mostBiggerInvoiceNo = mostBiggerInvoiceNoDict['Doc_no']
    console.log(this.state.expenseDataList)
    if (this.state.expenseDataList.length===0 ) {
      this.state.Doc_no = 1
    }
     else {
      this.state.Doc_no = mostBiggerInvoiceNo + 1
    }
  }
  submitDataHandler=(e)=>{
    let expenseCategoryObj = this.state.categoryList.filter(item => item.name === this.state.selectedCategory)
    let expenseAccntObj = this.state.expenseAccnts.filter(item => item.name === this.state.selectedExpnseAcccnt)
    let cashAccntObj = this.state.cashAccnts.filter(item => item.name === this.state.selectedCashAccnt)

    let debitSection={}
    debitSection.account = expenseAccntObj[0].id
    debitSection.partner = null
    debitSection.debit_amount = this.state.cashAmount
    debitSection.credit_amount = 0
    let creditSection ={}
    creditSection.account = cashAccntObj[0].id
    creditSection.partner = null
    creditSection.debit_amount = 0
    creditSection.credit_amount = this.state.cashAmount
    let output = []
    output.push(creditSection)
    output.push(debitSection)

    let Data = {
      Doc_no:this.state.Doc_no,
      Date:this.state.date,
      Amount:this.state.cashAmount,
      ExpenseCategory:expenseCategoryObj[0].id,
      ExpenseAcct:expenseAccntObj[0].id,
      CreditAcct:cashAccntObj[0].id,
      journal_entry:{
        date:this.state.date,
        transaction_type:"EXPENSE",
        description:this.state.narration,
        journal_item:output
      }
    }
    console.log(Data)
    this.props.onCreateExpense(Data)
    this.setState({expenseListPage:true})

    // axios.post('invoice/expenses/',Data).then(
    //   res=>{console.log(res.data)}
    // ).catch(error=>console.log(error))
  }
  openExpenseListPage=()=>{
    return (
      <Redirect to="/expense-list" />
    )
  }
  render() {
    console.log(this.state)
    return(
      <div>
      {this.state.expenseListPage ? (this.openExpenseListPage()): (null)}

        <br />
        <div className="row-wrapper1">
          <div><h1 className="ptag"> Create Expense</h1></div>

        </div>
        <br />
        <div className="row-wrapper">
          <div>
          {this.doc_noChangeHandler()}
            <label>Doc No</label><br />
            <input readOnly className="grand"  />
          </div>
          <div>
            <label>CATEGORY</label><br />
            <select className="select" onChange={(e) => this.setState({selectedCategory:e.target.value})}>
                <option value=""></option>
                {this.state.categoryList.map((m,index)=>
                    <option key={m.id} value={m.name}>{m.name}</option>
                )}
            </select>
          </div>
          <div>
          <label>DATE</label><br />
          <input
              className="dates"
              type='date'
              name='date'
              value={this.state.date}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
        </div>
        <br />
        <div className="row-wrapper">
          <div>
            <label>EXPENSE ACCOUNT</label><br />
            <select className="select" onChange={(e) => this.setState({selectedExpnseAcccnt:e.target.value})}>
                <option value=""></option>
                {this.state.expenseAccnts.map((m,index)=>
                    <option key={m.id} value={m.name}>{m.name}</option>
                )}
            </select>
          </div>
          <div>
          <label>CASH ACCOUNT</label><br />
          <select className="select" onChange={(e) => this.setState({selectedCashAccnt:e.target.value})}>
              <option value=""></option>
              {this.state.cashAccnts.map((m,index)=>
                  <option key={m.id} value={m.name}>{m.name}</option>
              )}
          </select>
          </div>
          <div>
            <label>TOTAL</label><br />
            <input
              value={this.state.cashAmount}
              onChange={this.handleInputChange}
              className="grand"
              type='number'
              name='cashAmount'
              />
          </div>
        </div>
        <br  />
        <div>
              <label>NARRATION</label><br />
              <input
                className="narration"
                name="narration"
                onChange={this.handleInputChange}
                value={this.state.narration}/>
        </div>
        <br />
        <div className="btn-gap-reciept">

        <div>
        <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
        </div>
        <div>
        <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
        </div>
        </div>

      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
        onCreateExpense: (data) => dispatch(actions.createExpense(data))
    };
};

export default connect(null,mapDispatchToProps)(CreateExpense)
