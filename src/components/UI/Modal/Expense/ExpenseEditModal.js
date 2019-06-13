import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';

class ExpenseEditModal extends React.Component {
  state={
    categoryList:[],
    cashAccnts:[],
    expenseAccnts:[],
    date:new Date(),
    cashAmount:null,
    narration:'',
    selectedCategory:'',
    selectedExpnseAcccnt:'',
    selectedCashAccnt:'',
  }
  componentWillMount(){
    this.setState({
      categoryList:this.props.categoryList,
      cashAccnts:this.props.cashAccnts,
      expenseAccnts:this.props.expenseAccnts,
      formData:this.props.formData,
      date:this.props.formData.Date,
      narration:this.props.formData.journal_entry.description,
      selectedCategory:this.props.formData.ExpenseCategory,
      selectedExpnseAcccnt:this.props.formData.ExpenseAcct,
      selectedCashAccnt:this.props.formData.CreditAcct,
      Doc_no:this.props.formData.Doc_no,
      cashAmount:this.props.formData.Amount,
    })
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

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
    console.log(output)
    let Data = {
      id:this.props.formData.id,
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
    this.props.formData.Doc_no = this.state.Doc_no
    this.props.formData.Date = this.state.date
    this.props.formData.Amount = this.state.cashAmount
    this.props.formData.ExpenseCategory = this.state.selectedCategory
    this.props.formData.ExpenseAcct = this.state.selectedExpnseAcccnt
    this.props.formData.CreditAcct = this.state.selectedCashAccnt
    this.props.formData.journal_entry.date=this.state.date
    this.props.formData.journal_entry.transaction_type="EXPENSE"
    this.props.formData.journal_entry.description = this.state.narration
    this.props.formData.journal_entry.journal_item=output
    this.props.editHandler(e,Data)
    console.log(this.props.formData)

  }
  render(){
    return (
      <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
        >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div >
          <h1 className="ptag">Edit - Customer Receipt</h1>
          <div className="row-wrapper">
            <div>
              <label>DOC NO:</label><br />
              <input readOnly className="grand" value={this.state.Doc_no} />
            </div>
            <div>
              <label>CATEGORY</label><br />
              <select className="select" onChange={(e) => this.setState({selectedCategory:e.target.value})}>
                  <option value=""> {this.state.selectedCategory}</option>
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
              <label>EXPENSE ACCOUNT:</label><br />
              <select className="select" onChange={(e) => this.setState({selectedExpnseAcccnt:e.target.value})}>
                  <option value="">{this.state.selectedExpnseAcccnt}</option>
                  {this.state.expenseAccnts.map((m,index)=>
                      <option key={m.id} value={m.name}>{m.name}</option>
                  )}
              </select>            </div>
            <div>
              <label>Cash Account</label><br />
              <select className="select" onChange={(e) => this.setState({selectedCashAccnt:e.target.value})}>
                  <option value="">{this.state.selectedCashAccnt}</option>
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
          <br />
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

      </div>
      </Modal.Body>

      <Modal.Footer>
          <button className="OkBtn" onClick={this.submitDataHandler}>SAVE</button>

          <button className="OkBtn" onClick={this.props.close}>Cancel</button>

          <Link to="/create-expense"><i className="fas fa-plus"></i></Link>
          </Modal.Footer>

    </Modal>
    );
  }
}
export default ExpenseEditModal;
