import React , { Component } from 'react';
import SalesNav from '../../../components/Sales/Layout/SalesNav';
import './CreateInvoice.css';
import moment from 'moment';
import axios from '../../../axios'
import InvoiceViewModal from '../../../components/UI/Modal/Invoice/InvoiceViewModal';
import DeleteModal from '../../../components/UI/Modal/Invoice/DeleteInvoiceModal';
import QuickLink from '../../../components/UI/QuickLink/QuickLink';

class CreateInvoice extends Component {
  state={
    date:new Date(),
    customerList:[],
    branchList:[],
    serial_no:0,
    invoice_no:null,
    doc_no:null,
    selectedName:'',
    selectedBranch:'',
    narration:'',
    total: null,
    grant_total: null,
    discount:null,
    holder: [{
         item:'',
         price:'',
         quantity:null,
         sub_total:null,
       }],
    itemList:[],
    parantdataList:[],
    openModel:false,
    formData:[],
    isDelete:false,
    deleteId:null,
    isEdit:false,
    editId:null,

  }
  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadCustomer()
    this.loadBranch()
    this.loadItem()
    this.loadParantData()

  }
  loadCustomer=()=>{
    axios.get('invoice/customer/').then(
      res => {
        this.setState({customerList:res.data});
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
        this.setState({openModel:true,formData:response.data})

      }
    ).catch(error=>{
      console.log(error)
    alert("something wrong.please try again !!!")})
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
      let list=[]
      this.state.holder.map((value)=>{
        list.push(value.sub_total)
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
  submitDataHandler = (evt) => {
    let formData={
      invoice_no:this.state.invoice_no,
      doc_no:this.state.doc_no,
      customer:this.state.selectedName,
      branch:this.state.selectedBranch,
      narration:this.state.narration,
      date:this.state.date,
      total_amount:this.state.total,
      discount:this.state.discount,
      grant_total:this.state.grant_total,
      child:this.state.holder
    }
    console.log(formData)
    this.postData(formData)
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
  ModalHandler=(e)=>{
    return(
      <InvoiceViewModal
        show={this.state.openModel}
        close={this.modalWindowClose}
        formData={this.state.formData}
        deletewindow={this.deleteWindowOpen}
        editwindow={this.editWindowOpen}
        />
    )
  }
  modalWindowClose = (e) => {
      this.setState({
          openModel: false,
      })
  }
  deleteWindowOpen= (e,id) =>{
    e.preventDefault()
    this.setState({isDelete:true,deleteId:id})
    console.log(id)
    console.log(this.state.isDelete)
  }
  deleteHandler = (event) => {
    event.preventDefault()
    let id = this.state.deleteId
    // const updatedOrders = this.state.invoiceData;
    // let deleteObject = this.state.invoiceData.filter(item =>  item.id === id)
    // let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('/invoice/parantdata/'+id).then(
       response => {
           // updatedOrders.splice(delIndex,1)
           this.setState({
               isDelete: false,
           })
           // this.viewWindowClose()
       }
    )

  }
  deleteModal = () => {
    console.log("modal error")
    return(
      <DeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.formData}/>
        )
  }
  deleteWindowClose = () => {
      this.setState({
          isDelete: false,
      })
  }

  render() {
    console.log(this.state)
    return(

      <div >
        {this.state.openModel ? (this.ModalHandler()) : (null)}
        {this.state.isDelete ? (this.deleteModal()) : (null)}

      <h1 className="ptag">create sales invoice</h1>
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
                          value={m.customer}>{m.customer}</option>)
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
                  type="number"/>
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
          </div>
          ))}
          <ul className="List">
          </ul>
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
                      />
                  </div>
                  <br />
                  <div>
                  {this.handleGrandTotalChange()}
                  <label>GRAND TOTAL</label><br />
                  <input
                        className='grand'
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
      <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
      <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
      </div>
    )
  }
}
export default CreateInvoice;
