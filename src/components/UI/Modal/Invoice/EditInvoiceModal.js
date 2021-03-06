import React from 'react';
import axios from '../../../../axios';
import {Col, Raw,FormControl, FormGroup, Form, ControlLabel, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Toggle from '../../Buttons/Toggle/Toggle';

class BranchEdit extends React.Component {
  constructor() {
    super();
    this.
    state = {
      items:[],
      child:[],
      selectedName:null,
      selectedBranch:null,
      invoice:null,
      holder:[],
      parentData:[],
      amountList:[],
      customerList:[],
      branchList:[],
      settingsAcnt:[],
      serial_no:0,
      status:null,
    };
  }

  componentWillMount(){

    this.setState({
      holder:this.props.formData,
      status:this.props.formData.status,
      settingsAcnt:this.props.settingsAcnt,
      customerList:this.props.customerList,
      selectedName:this.props.formData.customer,
      selectedBranch:this.props.formData.branch,
      // doc_no:this.props.formData.doc_no,
      date:this.props.formData.date,
      total:this.props.formData.total_amount,
      // discount:this.props.formData.discount,
      grant_total:this.props.formData.grant_total,
      narration:this.props.formData.narration,
    })
    this.setState({childItems: this.props.formData.child})
    this.loadItems()
    this.loadCustomer()
    this.loadBranch()
    console.log('will')
    console.log(this.state)

  }

  loadItems = () => {
    axios.get('masters/product/').then(
      res => {
        this.setState({items:res.data});
        console.log(res.data)
      }
    )
  }

  loadCustomer = () => {
    axios.get('masters/partner/').then(
      res => {
        this.setState({customerList:res.data.filter(item => item.type !== 'SUPPLIER' )});
        console.log(res.data)
      }
    )
  }

  loadBranch=()=> {
    axios.get('masters/branch').then(
      res=>{
        this.setState({branchList:res.data});
      }
    )
  }


  handleNameChange = (e) => {
    this.setState({...this.state.holder,name:e.target.value});
  }


  DynamicInputChangeHandler = (event)=> {
    event.preventDefault();

    const id = event.target.name;
   const value = event.target.value;
   this.setState(prevState => (
      {
        holder: {...prevState.holder,[id]:value}
      }
    )
   )
   this.props.formData.grant_total=this.state.holder.grant_total
  }

  handleInputChange = (event) => {
       event.preventDefault();
       console.log(event.target.name,event.target.value)
       let key = event.target.name
       let  value = event.target.value
     this.setState({[key]:value})
     console.log(this.state)
  }

  handlePriceChange =(idx) => {
    const newHolder =this.state.holder.child.map(
      (field, sidx) => {
        if (idx === sidx) {
          const sample = this.state.items.filter(
            ({item,price}) => item === field.item)[0]
            console.log(sample)
            if (sample !== undefined) {
              this.state.selectedPrice = sample["price"]
              field.price = sample["price"]
            }
          }
        });
        console.log(idx)
        this.handleQtyChange(idx)
  }

  handleItemChange = (idx) => (evt) => {
    const newShareholders = this.state.holder.child.map((shareholder, sidx) => {
      if (idx !== sidx) {
        return shareholder
      } else {
        return { ...shareholder, item: evt.target.value };
      }
    });
    this.state.holder.child= newShareholders;
    this.setState({...this.state.holder,child: newShareholders});
    console.log(idx,'test')

    this.handleQtyChange(idx)
  }

  handleQtyChange = (idx) => (evt) =>{
    console.log(idx,'test')
    const newShareholders = this.state.holder.child.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, quantity: evt.target.value };
    });
    this.setState({ ...this.state.holder,child: newShareholders });
    this.state.holder.child = [...newShareholders]
    console.log(this.state.holder)
    console.log(newShareholders)
    this.SubTotalHandler(idx)
  }

  SubTotalHandler = (idx)=>{
  // event.preventDefault()
  // let invoice =  this.props.objct.invoice
  let holder = this.state.holder.child
  const newShareholders = holder.map((field, sidx) => {
      if (idx === sidx) {
        const sample = this.state.items.filter(
          ({item,price,id}) => item === field.item)[0]
        let price1 = sample["price"]
        let qty = field.quantity
        let sub_total = price1 * qty
        this.setState({sub_total})
        if (field !== null){
            this.state.holder.child[idx]["sub_total"]=sub_total
        }
        if (sample !== undefined) {
            this.state.sub_total = sub_total
            field.sub_total = sub_total
            // field.invoice = invoice
        }
    }
  })

this.totalHandler()
}
totalHandler=()=>{
  let list=[]
  let editedList=[]
  console.log(this.state.total)
  console.log(this.state.holder)
  console.log(this.props.parentData)
  this.state.holder.child.map((value)=>{
    list.push(value.sub_total)
  })
    if (list !== null){
    var li = list.map(Number);
      console.log(list)
      var total = li.reduce(add, 0);
      console.log(total)
      function add(a, b) {
        return a + b;
      }
      console.log(total)
    this.state.holder.total_amount=total
    }
}
handleGrandTotalChange=()=>{
  console.log(discount)
  let discount = this.state.holder.discount
  let total = this.state.holder.total_amount
  let grant_total = total - discount
  console.log(grant_total)
  this.state.holder.grant_total = grant_total
}
  handleSubmit=(e)=>{
    // e.preventDefault()
    let creditSection = {}
    let salesAcntObjct = {}
    let customerAcntObj ={}
    console.log(this.state.selectedName)
    let partnerObj = this.state.customerList.filter(item => item.name === this.state.selectedName)
    salesAcntObjct = this.state.settingsAcnt.SalesAccont
    customerAcntObj = this.state.settingsAcnt.CustomerAccount

    console.log(partnerObj)
    console.log(salesAcntObjct)

    creditSection.partner = null
    creditSection.account = salesAcntObjct.id
    creditSection.credit_amount = this.state.holder.grant_total
    creditSection.debit_amount = 0

    let debitSection = {}
    debitSection.partner = partnerObj[0].id
    debitSection.account = customerAcntObj.id
    debitSection.debit_amount = this.state.holder.grant_total
    debitSection.credit_amount = 0

    let output = []
    output.push(creditSection)
    output.push(debitSection)
    console.log(output)
    console.log(this.state.holder.child)
    const test =[]
    test.push(this.state.holder.child)
    let data = this.state.holder.child
    console.log(data)
    console.log(test)



    console.log(this.state.child)

    console.log(this.state.holder)

    console.log(this.state.items)


      this.props.formData.invoice_no=this.props.formData.invoice_no
      this.props.formData.doc_no=this.state.holder.doc_no
      this.props.formData.customer=this.state.selectedName
      this.props.formData.branch=this.state.selectedBranch
      this.props.formData.status=this.state.status
      this.props.formData.narration=this.state.narration
      this.props.formData.date=this.state.holder.date
      this.props.formData.total_amount=this.state.holder.total_amount
      this.props.formData.grant_total=this.state.holder.grant_total
      this.props.formData.discount=this.state.holder.discount
      this.props.formData.child=this.state.holder.child
      this.props.formData.journal_entry = {
        date:this.state.holder.date,
        transaction_type:"SALES",
        description:this.state.narration,
        journal_item:output,
      }
    // let branchId=this.state.customerList.filter(item=>item.name === this.state.selectedName)[0].id
    // console.log(branchId)
    // data.map((childItem,index)=>{
    //   this.state.items.map((item,idx)=>{
    //     console.log(item)
    //     console.log(childItem)
    //
    //     if(item.item === childItem.item){
    //       console.log(item.item)
    //       console.log(childItem.item)
    //
    //       childItem.item = item.id
    //       // item.item = childItem.item
    //
    //     }
    //   })
    // })

    // delete this.state.child.id
    // console.log(data)
    // console.log(this.state.childItems)

    let Data = {
      id : this.props.formData.id,
      journal_entry : {
        date:this.state.holder.date,
        transaction_type:"SALES",
        description:this.state.narration,
        journal_item:output,
      },
      child:this.state.holder.child,
      invoice_no: this.props.formData.invoice_no,
      doc_no: this.state.holder.doc_no,
      status:this.state.status ,
      narration: this.state.narration,
      date:this.state.holder.date ,
      total_amount: this.state.holder.total_amount,
      discount: this.state.holder.discount,
      grant_total:this.state.holder.grant_total ,
      customer:this.state.customerList.filter(item=>item.name === this.state.selectedName)[0].id ,
      branch : this.state.branchList.filter(item=>item.branch === this.state.selectedBranch)[0].id,
    }
    console.log(Data)

    this.props.editHandler(e,Data)
    console.log(this.props.formData)
    console.log(this.state.holder)


  }

  addItemHandler=(e)=> {

    var child = this.state.holder.child
    child.push({
             item:'',
             price:'',
             quantity:null,
             sub_total:null,
           })
           this.setState({...this.state.holder,child:child})
    e.preventDefault()
       }

  removeLineHandler=(e,id)=>{

    const updatedOrders = this.state.holder.child;
    let deleteObject = updatedOrders.filter((item,index)=> index === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    // delete updatedOrders[delIndex]
    updatedOrders.splice(delIndex,1)
    console.log(updatedOrders)
    this.setState({...this.state.holder,child:updatedOrders})
    this.totalHandler()
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
      console.log(this.props.formData)
      console.log(this.state.holder)
      console.log(this.state)
      console.log(this.state.child)
      console.log(this.props)

      return (
        <Modal
          size="xl"
          aria-labelledby="contained-modal-title-vcenter"
          centered
          show={this.props.show} onHide={this.props.close}
          >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Sales Invoice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{"textAlign":"center"}}>
        <div className="row-wrapper1">
          <div><h1 className="ptag">create sales invoice</h1></div>
          <div  >
          <label>status   :</label>
          <label>CLOSE</label>  <Toggle checked={this.state.status}  onChange={this.statusHandler}/><label>OPEN</label>
          </div>

        </div>
        <br />
        <br />
        
        <div className="row-wrapper">
          <div>
            <label>INVOICE</label><br />
            <input readOnly className="grand" value={this.state.holder.invoice_no} />
          </div>
          <div>
            <label>COSTUMER</label><br />
            <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value="">{this.props.formData.customer}</option>
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
              value={this.state.holder.date}
              onChange={this.DynamicInputChangeHandler}
              required='required'/>
          </div>
        </div>
        <br />
        <div className="row-wrapper">
          <div>
            <label>DOC NO</label><br />
            <input
                  className="grand"
                  value={this.state.holder.doc_no}
                  onChange={this.DynamicInputChangeHandler}
                  name='doc_no'
                  />
          </div>
          <div>
            <label>BRANCH</label><br />
            <select className="select" onChange={(e) => this.setState({selectedBranch:e.target.value})}>
                <option value="">{this.state.holder.branch}</option>
                {this.state.branchList.map((m ,index)=>
                    <option key={m.id}
                          value={m.branch}>{m.branch}</option>)
                }
            </select>
          </div>
        </div>
        <br />
        <button className="addBtn" onClick={this.addItemHandler}>ADD+</button>

          {(this.state.holder.child !== undefined ) ? (
            <div className="itemBox">
            {this.state.holder.child.map((shareholder, idx) => (
                  <div key={idx} className="row-wrapper-item">
                    <div>
                      <br />
                      <p>{idx +this.state.serial_no+1}</p>
                    </div>
                    <div>
                      <br />
                      <select className="select" onChange={this.handleItemChange(idx)}>
                        <option value="">{shareholder.item}</option>
                        {this.state.items.map((m ,index)=> <option key={m.id}
                          value={m.item}>{m.item}</option>)}
                      </select>
                    </div>
                    <div>
                      <br />
                      {this.handlePriceChange(idx)}
                      <input
                        className="grand"
                        readOnly
                        type='box'
                        value={shareholder.price}
                        onChange={this.handlePriceChange(idx)}
                        />
                    </div>
                    <div>
                      <br />
                      {this.handleQtyChange(idx)}
                      <input
                        className="grand"
                        type='number'
                        min='0'
                        id='quantity'
                        placeholder='quantity'
                        onChange={this.handleQtyChange(idx)}
                        value={shareholder.quantity} />
                    </div>
                    <div>
                      <br />
                      <input
                        className="grand"
                        type='box'
                        id='sub_total'
                        name='sub_total'
                        placeholder="sub-total"
                        value={shareholder.sub_total}
                        readOnly/>
                    </div>
                    <div>
                      <br />
                       <i onClick={(e,id)=>this.removeLineHandler(e,idx)} className="fas fa-times"></i>
                    </div>
                  </div>
                ))}

            </div>
          ): null}
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
                        value={this.state.holder.total_amount}
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
                          value={this.state.holder.grant_total}
                          onChange={this.handleGrandTotalChange()}
                          />
                    </div>
                </div>
                <div>
                    <label>DISCOUNT</label><br />
                    <input
                        className='grand'
                        type='number'
                        min='0'
                        name="discount"
                        onChange={this.DynamicInputChangeHandler}
                        value={this.state.holder.discount}
                        />
                </div>
          </div>

      </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={this.props.close}>CANCEL</Button>
          <Button variant="info" onClick={(e)=>this.handleSubmit(e)}>SAVE</Button>
        </Modal.Footer>
      </Modal>
      );
    }
  }
export default BranchEdit;
