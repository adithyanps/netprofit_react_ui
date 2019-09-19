import React , { Component } from 'react';
import moment from 'moment';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import axios from '../../../axios'
import Toggle from '../../../components/UI/Buttons/Toggle/Toggle';
import SalesNav from '../../../components/Sales/Layout/SalesNav';
import InvoiceViewModal from '../../../components/UI/Modal/Invoice/InvoiceViewModal';
import DeleteModal from '../../../components/UI/Modal/Invoice/DeleteInvoiceModal';
import EditModal from '../../../components/UI/Modal/Invoice/EditInvoiceModal';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';
import * as actions from '../../../store/actions/index';
import './CreateInvoice.css';


class CreateInvoice extends Component {
  state={
    date:new Date(),
    customerList:[],
    branchList:[],
    itemList:[],
    parantdataList:[],
    formData:[],
    settingsAcnt:[],
    serial_no:0,
    invoice_no:null,
    doc_no:null,
    selectedName:'',
    selectedBranch:null,
    narration:'',
    total: null,
    grant_total: null,
    discount:null,
    status:false,
    holder: [{
         item:'',
         price:'',
         quantity:null,
         sub_total:null,
       }],
    salesPage:false,

  }
  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadCustomer()
    this.loadBranch()
    this.loadItem()
    this.loadParantData()
    this.loadSettingsAccnt()

  }
  loadSettingsAccnt=()=>{
    axios.get('invoice/accountDefault/1/').then(
      res => {
        this.setState({settingsAcnt:res.data});
        console.log(res.data)
      }
    )
  }
  loadCustomer=()=>{
    axios.get('invoice/partner/').then(
      res => {
        this.setState({customerList:res.data.filter(item => item.type !== 'SUPPLIER' )});
        console.log(res.data)
      }
    )
  }
  loadBranch=()=> {
    axios.get('invoice/branch').then(
      res=>{
        this.setState({branchList:res.data});
      }
    )
  }
  loadItem = () => {
    axios.get('invoice/item/').then(
      res => {
        this.setState({itemList:res.data});
        console.log(res.data)
      }
    )
  }
  loadParantData=()=>{
    axios.get('invoice/parantdata/').then(
      res=>{
        this.setState({parantdataList:res.data})
      }
    )
  }
  postData=(formData)=>{
    axios.post('/invoice/parantdata/',formData).then(
      response=>{
        console.log(response.data)
        // this.setState({openModel:true,viewObject:response.data})
        // this.openSalesInvoice()

      }
    ).catch(error=>{
      console.log(error)
    alert("something wrong.please try again !!!")})
  }
  openSalesInvoice=()=>{
    console.log('success')
    return(
      <Redirect  to="/sales-invoices"/>
    )
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }
  handlePriceChange =(idx) => {
    const newHolder = this.state.holder.map(
      (field, sidx) => {
        if (idx === sidx) {
          const sample = this.state.itemList.filter(
            ({item,price}) => item === field.item)[0]
            console.log(sample)
            if (sample !== undefined) {
              this.state.selectedPrice = sample["price"]
              field.price = sample["price"]
            }
          }
        });
  }
  handleGrandTotalChange=()=>{
    console.log(discount)
    let discount = this.state.discount
    let total = this.state.total
    let grant_total = total - discount
    console.log(grant_total)
    this.state.grant_total = grant_total
  }
  invoice_noChangeHandler=()=> {
    console.log(this.state.invoice_no)
    var mostBiggerInvoiceNoDict = this.state.parantdataList.reduce(function (oldest, item) {
      return (oldest.invoice_no || 0) > item.invoice_no ? oldest : item;
    }, {});
    console.log(mostBiggerInvoiceNoDict['invoice_no'])
    let mostBiggerInvoiceNo = mostBiggerInvoiceNoDict['invoice_no']
    console.log(this.state.parantdataList)
    if (this.state.parantdataList.length===0 ) {
      this.state.invoice_no = 1
    }
     else {
      this.state.invoice_no = mostBiggerInvoiceNo + 1
    }
  }
  totalHandler=()=>{
    console.log(this.state.holder)
      let list=[]
      this.state.holder.map((value)=>{
        list.push(value.sub_total)
        console.log(list)
        if (list !== null){
          var total = list.reduce(add, 0);
          function add(a, b) {
            return a + b;
          }
          this.state.total=total
          }
        })
    }
    SubTotalHandler = (idx) => {
    let invoice =  this.props.invoice
    let holder = this.state.holder
    let sub_total = holder.sub_total
    let quantity = holder.quantity
    let price =holder.price
    const newShareholders = holder.map((field, sidx) => {
        if (idx === sidx) {
          const sample = this.state.itemList.filter(
            ({item,price}) => item === field.item)[0]
          sub_total = sample["price "] * sample["quantity"]
          let price1 = sample["price"]
          let qty = field.quantity
          let sub_total = price1 * qty
          this.setState({sub_total})
          if (field !== null){
              this.state.holder[idx]["sub_total"]=sub_total
          }
          if (field == null){
              return null
          }
          if (sample !== undefined) {
              this.state.sub_total = sub_total
              field.sub_total = sub_total
              // field.invoice_number = invoice
          }
      }
    })
  this.totalHandler()
  }
  handleItemChange = (idx) => (evt) => {
    const newShareholders = this.state.holder.map((shareholder, sidx) => {
      if (idx !== sidx) {
        return shareholder
      } else {
        return { ...shareholder, item: evt.target.value };
      }
    });
    this.state.holder= newShareholders;
    this.setState({holder: newShareholders});
  }

  handleNameChange = (idx) => (evt) => {
    const newShareholders = this.state.holder.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    this.setState({ holder: newShareholders });
  }
  toggleHandleChange=(e)=>{
    let isChecked = e.target.checked;
  }
  submitDataHandler = (evt) => {
    let creditSection = {}
    let salesAcntObjct = {}
    let customerAcntObj ={}

    let partnerObj = this.state.customerList.filter(item => item.name === this.state.selectedName)
    salesAcntObjct = this.state.settingsAcnt.SalesAccont
    customerAcntObj = this.state.settingsAcnt.CustomerAccount

    console.log(partnerObj)
    console.log(salesAcntObjct)

    creditSection.partner = null
    creditSection.account = salesAcntObjct.id
    creditSection.credit_amount = this.state.grant_total
    creditSection.debit_amount = 0

    let debitSection = {}
    debitSection.partner = partnerObj[0].id
    debitSection.account = customerAcntObj.id
    debitSection.debit_amount = this.state.grant_total
    debitSection.credit_amount = 0

    let output = []
    output.push(creditSection)
    output.push(debitSection)


    let data={
      invoice_no:this.state.invoice_no,
      doc_no:this.state.doc_no,
      customer:this.state.selectedName,
      branch:this.state.selectedBranch,
      status:this.state.status,
      narration:this.state.narration,
      date:this.state.date,
      total_amount:this.state.total,
      discount:this.state.discount,
      grant_total:this.state.grant_total,
      child:this.state.holder,
      journal_entry:{
        date:this.state.date,
        transaction_type:"SALES",
        description:this.state.narration,
        journal_item:output,
      }
    }
    console.log(data)
    // this.postData(formData)
    if (this.state.selectedBranch !== null) {
      axios.post('invoice/parantdata/',data).then(
        res => {
          this.props.onCreateInvoice(res.data)
          this.setState({salesPage:true})

        }
      ).catch(error=>{
        this.props.onCreateInvoiceFail(error)
      })
    }
  }
  addItemHandler=(e)=> {

      this.setState((prevState) => {
        return{
          holder: prevState.holder.concat({

               item:'',
               price:'',
               quantity:null,
               sub_total:null,
             })
        }
      })
      e.preventDefault()
       }

  handleQtyChange = idx => evt =>{
    const newholder = this.state.holder.map((element, sidx) => {
      if (idx !== sidx) return element;
      return { ...element, quantity: evt.target.value };
    })
    this.setState({ holder: newholder });
    this.state.holder = [...newholder]
    this.SubTotalHandler(idx)
  }
  cancelDataHandler=()=>{
    this.setState({holder:[{
         item:'',
         price:'',
         quantity:null,
         sub_total:null,
       }],doc_no:'',selectedName:'',discount:null,total:0,narration:''})
  }
  removeLineHandler=(e,id)=>{
    if (this.state.holder.length !== 1) {
      const updatedOrders = this.state.holder;
      let deleteObject = updatedOrders.filter((item,index)=> index === id)
      let delIndex = updatedOrders.indexOf(deleteObject[0])
      // delete updatedOrders[delIndex]
      console.log(delIndex)
      updatedOrders.splice(delIndex,1)
      console.log(updatedOrders)
      this.setState({holder:updatedOrders})
      // this.setState({holder.slice(delIndex,1)})
      this.totalHandler()
      console.log(this.state.holder)
    }
    e.preventDefault()
  }
  statusHandler=()=>{
    if (this.state.status === false) {
      this.setState({status:true})

    } else {
      this.setState({status:false})

    }
  }

  render() {
    console.log(this.state)
    return(
      <div >
      {this.state.salesPage ? (this.openSalesInvoice()) : (null)}

        <br />
        <div className="row-wrapper1">
          <div><h1 className="ptag">create sales invoice</h1></div>
          <div  >
          <label>status   :</label>
         <label>CLOSE</label>  <Toggle checked={this.state.status}  onChange={this.statusHandler}/><label>OPEN</label>
          </div>
        </div>
        <br />
        <div className="row-wrapper">
          <div>
          {this.invoice_noChangeHandler()}
            <label>INVOICE</label><br />
            <input readOnly className="grand" value={this.state.invoice_no} onChange={this.invoice_noChangeHandler()}/>
          </div>
          <div>
            <label>COSTUMER</label><br />
            <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value="">select name</option>
                {this.state.customerList.map((m ,index)=>
                    <option key={m.id}
                          value={m.name}>{m.name}</option>)
                }
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
            <label>DOC NO</label><br />
            <input
                  className="grand"
                  value={this.state.doc_no}
                  onChange={this.handleInputChange}
                  name='doc_no'
                  />
          </div>
          <div>
            <label>BRANCH</label><br />
            <select className="select" onChange={(e) => this.setState({selectedBranch:e.target.value})}>
                <option value="">select branch</option>
                {this.state.branchList.map((m ,index)=>
                    <option key={m.id}
                          value={m.branch}>{m.branch}</option>)
                }
            </select>
          </div>

        </div>
        <br />
        <button className="addBtn" onClick={this.addItemHandler}>ADD+</button>
        <form onSubmit={this.handleSubmit}>
        <div className="itemBox">
          {this.state.holder.map((shareholder, idx) => (
            <div key={idx} className="row-wrapper-item">
              <div>
              <br/>
                <p>{idx +this.state.serial_no+1}</p>
              </div>
              <div>
                <br />
                <select className="select" onChange={this.handleItemChange(idx)}>
                <option>selectitem</option>
                  {this.state.itemList.map((m ,index)=> <option key={m.id}
                  value={m.item}>{m.item}</option>)}
                </select>
              </div>
              <div>
                <br />
                {this.handlePriceChange(idx)}
                <input
                  className='grand'
                  type='box'
                  value={shareholder.price}
                  onChange={this.handlePriceChange(idx)}
                  readOnly/>
              </div>
              <div>
                <br />
                <input
                  className='grand'
                  type='number'
                  min='0'
                  id='quantity'
                  ref={this.quantityRef}
                  placeholder='quantity'
                  onChange={this.handleQtyChange(idx)}
                  value={shareholder.quantity}
                  disabled={!shareholder.price}
                   />
                </div>
                <div>
                <br />
                <input
                  className='grand'
                  type='box'
                  id='sub_total'
                  name='sub_total'
                  placeholder="sub-total"
                  value={shareholder.sub_total}
                  disabled={!shareholder.sub_total}
                   />
                   </div>
                <div>
                  <br />
                  {this.state.holder.length !== Number(1) ? (
                    <div>
                    <i onClick={(e,id)=>this.removeLineHandler(e,idx)} className="fas fa-times"></i>
                    </div>
                  ) :(null)}                </div>
          </div>
          ))}

        </div>
        <br />
        <div className="row-wrapper-btm">
              <div>
                    <label>NARRATION</label><br />
                    <input
                      className="narration"
                      name="narration"
                      onChange={this.handleInputChange}
                      value={this.state.narration}/>
              </div>
              <div>
                  <div>
                  <label>TOTAL</label><br />
                  <input
                      className='grand'
                      value={this.state.total}
                      readOnly
                      />
                  </div>
                  <br />
                  <div>
                  {this.handleGrandTotalChange()}
                  <label>GRAND TOTAL</label><br />
                  <input
                        className='grand'
                        readOnly
                        value={this.state.grant_total}
                        onChange={this.handleGrandTotalChange()}/>
                  </div>
              </div>
              <div>
                  <label>DISCOUNT</label><br />
                  <input
                      className='grand'
                      type='number'
                      min='0'
                      name="discount"
                      onChange={this.handleInputChange}
                      value={this.state.discount}
                      disabled={!this.state.total}
                      />
              </div>
        </div>
        </form>
        <br />
      <button className="cancelBtn" onClick={(this.state.selectedName ) ? (this.submitDataHandler) :(null)}>SAVE</button>
      <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
    return {
        // onCreateInvoice: (data) => dispatch(actions.createInvoice(data)),
        onCreateInvoice: (obj)=>dispatch(actions.createInvoiceSuccess(obj)),
        onCreateInvoiceFail: (error)=>dispatch(actions.createInvoiceFail(error)),

    };
};

export default connect(null,mapDispatchToProps)(CreateInvoice);
