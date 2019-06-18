import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class SpotRecieptEdit extends React.Component {
  state={
    serial_no:0,
    accountList:[],
    selectedAcnt:null,
    partnerList:[],
    total:null,
    creditJrnlItem:[],
    debitJrnlItem:[],
    narration:null,
    accntName:'',
    creditJrnlItem:[],
    creditSection:[]

  }
  componentWillMount(){
    this.setState({
      partnerList:this.props.partnerList,
      accountList:this.props.accountList,
      formData:this.props.formData,
      journal_itemList:this.props.formData.journal_entry.journal_item,
      debitJrnlItem:this.props.formData.journal_entry.journal_item.filter((item)=>item.debit_amount > 0),
      // creditJrnlItem:this.props.formData.journal_entry.journal_item.filter((item)=>item.credit_amount>0),
      narration:this.props.formData.journal_entry.description,
      date:this.props.formData.journal_entry.date,
      reciept_no:this.props.formData.reciept_no,
    })
    let creditJrnlItem = this.props.formData.journal_entry.journal_item.filter((item)=>item.credit_amount>0)
    let debitJrnlItem = this.props.formData.journal_entry.journal_item.filter((item)=>item.debit_amount > 0)
    this.setState({total:debitJrnlItem[0].debit_amount})
    console.log(creditJrnlItem[0].id)
    let accntName=this.props.accountList.filter(item=>item.id===creditJrnlItem[0].account)

    console.log(accntName)
    this.setState({selectedAcnt:accntName[0].name})
    // this.loadPartner()
    // this.loadAccount()
    let output =[]
    creditJrnlItem.forEach(item=>{
      let creditOutput = {}
      this.props.partnerList.forEach(x=>{
        if(x.id === item.partner){
          creditOutput.customer = x.name
          creditOutput.credit_amount = item.credit_amount
          creditOutput.debit_amount = item.debit_amount
          output.push(creditOutput)
        }
      })
    })
    this.setState({creditJrnlItem:output})
  }
  loadAccount=()=>{
    axios.get('/invoice/account/').then(
      response=>{
        this.setState({accountList:response.data})
      }
    )
  }
  loadPartner=()=>{
    axios.get('invoice/partner/').then(
      res => {
        this.setState({partnerList:res.data});
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

  handlePartnerChange= (idx) => (evt) => {
    const newholder = this.state.creditJrnlItem.map((element,sidx) => {
      if (idx !== sidx) {
        return element
      } else {
        return { ...element, customer:evt.target.value};
      }
    });
    this.state.creditJrnlItem = [...newholder]
    this.setState({creditJrnlItem: newholder})
  }
  addItemHandler=(e)=> {

      this.setState((prevState) => {
        return{
          creditJrnlItem: prevState.creditJrnlItem.concat({

               customer:'',
               credit_amount:null,
               debit_amount:0,
             })
        }
      })
      e.preventDefault()
  }
  removeLineHandler=(e,id)=>{
    if (this.state.creditJrnlItem.length !== 1) {
      const updatedOrders = this.state.creditJrnlItem;
      let deleteObject = updatedOrders.filter((item,index)=> index === id)
      let delIndex = updatedOrders.indexOf(deleteObject[0])
      console.log(delIndex)
      updatedOrders.splice(delIndex,1)
      console.log(updatedOrders)
      this.setState({creditJrnlItem:updatedOrders})
      // this.totalHandler()
      console.log(this.state.creditJrnlItem)
      // if (this.state.holder.length === 0) {
      //   this.setState({total:null})
      // } else {
        this.totalHandler()
      // }
    }

    e.preventDefault()
  }
  handleSubtotalChange= idx => evt => {
    const newholder = this.state.creditJrnlItem.map((element,sidx) => {
      if (idx !== sidx) return element;
      return {...element,credit_amount:evt.target.value};
    })
    this.setState({creditJrnlItem: newholder});
    this.state.creditJrnlItem = [...newholder]
    this.totalHandler()
  }
  totalHandler =()=>{
    console.log(this.state.creditJrnlItem)
    let list=[]
    this.state.creditJrnlItem.map((value)=>{
      list.push(Number(value.credit_amount))
      console.log(list)
      if (list.length !== 0){
        var total = list.reduce(add, 0);
        function add(a, b) {
          return a + b;
        }
        console.log(total)
        this.state.total=total
      } else {
        alert("jjj")
      }
      })
  }
  submitDataHandler=(e)=>{
    console.log(this.state.creditJrnlItem)
    let cashAccntObj = this.state.accountList.filter(item=>item.type === 'CASH')
    let transactionObj = this.state.accountList.filter(item => item.name === this.state.selectedAcnt)

    console.log(this.state.accountList)
    console.log(cashAccntObj)
    let debitSection={}
    // debitSection.account = cashAccntObj[0].id
    debitSection.account = transactionObj[0].id

    debitSection.partner = null
    debitSection.debit_amount = this.state.total
    debitSection.credit_amount = 0
    console.log(debitSection)
    let output =[]
    console.log(this.state.selectedAcnt)
    console.log(transactionObj)

    this.state.creditJrnlItem.forEach(a=>{
      let creditSection = {}
      this.state.partnerList.forEach(partner=>{
        if(partner.name === a.customer){
          creditSection.account = transactionObj[0].id
          creditSection.partner = partner.id
          creditSection.credit_amount = a.credit_amount
          creditSection.debit_amount = a.debit_amount
          console.log(creditSection)
          output.push(creditSection)

        }
      })
    })
    output.push(debitSection)
    console.log(output)
    let Data = {
      reciept_no:this.state.reciept_no,
      journal_entry:{
        date:this.state.date,
        transaction_type:"COSTOMER_RECIEPT",
        description:this.state.narration,
        journal_item:output
      }
    }

    console.log(Data)
    this.props.formData.reciept_no=this.state.reciept_no
    this.props.formData.journal_entry.date=this.state.date
    this.props.formData.journal_entry.description=this.state.narration
    this.props.formData.journal_entry.transaction_type="COSTOMER_RECIEPT"
    this.props.formData.journal_entry.journal_item=output
    this.props.editHandler(this.props.formData)
    console.log(this.props.formData)

  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)


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
          <div className="row-wrapper1">
          </div>
          <br />
          <div className="row-wrapper">
            <div>
              <label>RECEIPT NO:</label><br />
              <input readOnly className="grand" value={this.state.reciept_no} />
            </div>
            <div>
              <label>ACCOUNT</label><br />
              <select className="select" onChange={(e) => this.setState({selectedAcnt:e.target.value})}>
                  <option value=""> {this.state.selectedAcnt}</option>
                  {this.state.accountList.map((m,index)=>
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
          <button className="addBtn" onClick={this.addItemHandler}>ADD+</button>
          <div className="itemBox">
            {this.state.creditJrnlItem.map((shareholder, idx) => (
              <div className="row-wrapper">
                      <div>
                        <br/>
                        <p>{idx+this.state.serial_no+1}</p>
                      </div>
                      <div>
                        <br />
                        <select className="select" onClick={this.handlePartnerChange(idx)}>
                        <option>{shareholder.customer}</option>
                          {this.state.partnerList.map((m,index) =>
                                <option
                                  key={index}
                                  value={m.name}>{m.name}</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <br />
                        <input
                          className='grand'
                          type='number'
                          value={shareholder.credit_amount}
                          onChange={this.handleSubtotalChange(idx)}
                          name='amount'
                          id='amount'
                          />
                      </div>
                      <div>
                        <br />
                        {this.state.creditJrnlItem.length !== Number(1) ? (
                          <div>
                          <i onClick={(e,id)=>this.removeLineHandler(e,idx)} className="fas fa-times"></i>
                          </div>
                        ) :(null)}
                      </div>
              </div>
            ))}
          </div>
          <br />
          <div className="row-wrapper-btm-reciept">
            <div>
                <label>NARRATION</label><br />
                <input
                  className="narration"
                  name="narration"
                  onChange={this.handleInputChange}
                  value={this.state.narration}/>
              </div>
              <div>
              <label>TOTAL</label><br />
              <input
                  className='grand'
                  value={this.state.total}
                  type='number'
                  readOnly
                  />
              </div>

          </div><br />
          <div className="btn-gap-reciept">

          <div>
          </div>
          <div>
          </div>
          </div>

        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>CANCEL</button>
            <button className="cancelBtn" onClick={this.state.selectedAcnt ? (this.submitDataHandler) :(null)}>SAVE</button>

            <Link to="/create-reciept"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default SpotRecieptEdit;
// <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
