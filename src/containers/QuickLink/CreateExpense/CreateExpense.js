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

    prefix:null,
    suffix:null,
    padding:null,
    start_date:null,
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
    axios.get('/expenses/expenses/').then(
      res =>{
        this.setState({expenseDataList:res.data})
        console.log(res.data)
        if(res.data.length === 0){
          this.loadExpenseNumber()
          console.log(res.data.length)
        } else{
          var mostBiggerExpenseNoDict = res.data.reduce(function (oldest, item) {
            return (oldest.Doc_no || 0) > item.Doc_no ? oldest : item;
          }, {});
          console.log(mostBiggerExpenseNoDict['Doc_no'])
          let mostBiggerExpenseNo = mostBiggerExpenseNoDict['Doc_no']
          let start_no = parseInt(mostBiggerExpenseNo,10)
          console.log(start_no,typeof start_no)
          console.log(typeof mostBiggerExpenseNo)
          var r = /\d+/;
          var m;
          m= r.exec(mostBiggerExpenseNo)
          console.log(m)
          console.log(typeof m[0])
          var splitNumber = m[0].split(Number(m[0]))
          console.log(splitNumber)
          console.log( splitNumber[0])

          var splitStr = mostBiggerExpenseNo.split(m[0])
          console.log(splitStr)
          let afterZeroNum = Number(m[0])+1
          console.log(typeof String(afterZeroNum))
          let number = splitNumber[0]+String(afterZeroNum)
          console.log(number)
          this.setState({start_no:number,prefix:splitStr[0],suffix:splitStr[1]})
        }
      }
    )
  }

  loadExpenseNumber=()=>{
    axios.get('masters/serial-number/').then(
      res=>{if(res.data.filter(item=>item.type === "EP").length>0){
        this.setState(
          {
            prefix:res.data.filter(item=>item.type === "EP")[0].prefix,
            suffix:res.data.filter(item=>item.type === "EP")[0].suffix,
            // start_number:res.data.filter(item=>item.id === 1)[0].start_number,
            padding:res.data.filter(item=>item.type === "EP")[0].padding
          })
          console.log(res.data.filter(item=>item.type === "EP")[0].prefix)
          let start_number =res.data.filter(item=>item.type === "EP")[0].start_number
          let padding=res.data.filter(item=>item.type === "EP")[0].padding
          console.log(typeof start_number)
          this.expense_noChangeHandler(start_number,padding)
      }

      }
    )
  }

  expense_noChangeHandler=(start_number,padding)=>{
    console.log(start_number)
    let start_numberCount = start_number.toString().length;
    console.log(start_numberCount)
    if(padding>start_numberCount){
      let digit_diff = padding - start_numberCount
      console.log(digit_diff)
      let zero = 0;
      let zeros = "0".repeat(digit_diff)
      console.log(zeros,typeof zeros)
      let number = zeros+start_number
      console.log(number)
      this.setState({start_no:number})
    }
  }

  loadExpenseCategory=()=>{
    axios.get('/expenses/expense-category/').then(
      response=>{this.setState({categoryList:response.data});
    }
    )
  }

  loadExpenseAccnts=()=>{
    axios.get('/masters/account/?search=EXPENSE').then(
      res => {
        this.setState({expenseAccnts:res.data})
      }
    )
  }

  loadCashAccnts=()=>{
    axios.get('/masters/account/?search=CASH').then(
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

  // doc_noChangeHandler=()=> {
  //   console.log(this.state.Doc_no)
  //   var mostBiggerInvoiceNoDict = this.state.expenseDataList.reduce(function (oldest, item) {
  //     return (oldest.Doc_no || 0) > item.Doc_no ? oldest : item;
  //   }, {});
  //   console.log(mostBiggerInvoiceNoDict['Doc_no'])
  //   let mostBiggerInvoiceNo = mostBiggerInvoiceNoDict['Doc_no']
  //   console.log(this.state.expenseDataList)
  //   if (this.state.expenseDataList.length===0 ) {
  //     this.state.Doc_no = 1
  //   }
  //    else {
  //     this.state.Doc_no = mostBiggerInvoiceNo + 1
  //   }
  // }
  
  submitDataHandler=(e)=>{
    let recieptNum = this.state.prefix+this.state.start_no+this.state.suffix

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
      Doc_no:recieptNum,
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
    // this.props.onCreateExpense(Data)
    // this.setState({expenseListPage:true})

    axios.post('/expenses/expenses/',Data).then(
      res=>{
        console.log(res.data)
        this.props.createExpenseSuccess(res.data)
        this.setState({expenseListPage:true})
      }
    ).catch(error=>{
      this.props.onCreateExpenseFail(error)
    })
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
            <label>Doc No</label><br />
            <input
              readOnly
              className="grand"
              />
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
        // onCreateExpense: (data) => dispatch(actions.createExpense(data)),
        createExpenseSuccess: (data) => dispatch(actions.createExpenseSuccess(data)),
        onCreateExpenseFail: (error) => dispatch(actions.createExpenseFail(error))

    };
};

export default connect(null,mapDispatchToProps)(CreateExpense)
