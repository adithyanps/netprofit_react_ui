import React from 'react';
import axios from '../../../../axios';
import {Col, Raw,FormControl, FormGroup, Form, ControlLabel, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
import { Link } from 'react-router-dom';

class BranchEdit extends React.Component {
  constructor() {
    super();
    this.state = {
      items:[],
      child:[],
      parent:[],
      selectedName:null,
      invoice:null,
      holder:[],
      parentData:[],
      openModel:false,
      amountList:[],
      customer:[],
      name:'',
      newLine: [{
           item:'',
           price:'',
           quantity:null,
           sub_total:null,
         }],


    };
  }
  componentWillMount(){
    this.setState({holder:this.props.formData})
    this.loadItems()
    this.loadCustomer()
  }

  loadItems = () => {
    axios.get('invoice/items/').then(
      res => {
        this.setState({items:res.data});
        console.log(res.data)
      }
    )
  }
  loadCustomer = () => {
    axios.get('invoice/customer/').then(
      res => {
        this.setState({customer:res.data});
        console.log(res.data)
      }
    )
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
  }
  handleNameChange = (e) => {
    console.log("hello")

    this.setState({...this.state.holder,name:e.target.value});
    console.log(e.target.value)

    console.log(this.state.holder)
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
  }
  handleQtyChange =(idx)=>(evt)=>{
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
  let invoice =  this.props.formData.invoice_no
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
            field.invoice = invoice
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
  console.log(this.props.formData)
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
handleAddForm = (event,id) => {
  event.preventDefault()
  let child = this.state.holder.child.concat({ item:'',
                                   price:'',
                                   quantity:null,
                                   sub_total:null,})

this.setState({...this.state.holder.child,child:this.state.holder.child.concat({ item:'',
                                 price:'',
                                 quantity:null,
                                 sub_total:null,})})
  console.log(this.state.holder)
}
  handleRemoveForm =(e,idx)=> {
    console.log(idx)
    let holder = this.state.holder.child
    console.log(holder)
    let sample = holder.filter(
          (field,index) => index === idx)[0]
          // this.setState({...this.stare.holder,child:this.})
      console.log(holder)




  }


  handleSubmit=(e)=>{
    // e.preventDefault()
    axios.put('invoice/parantdata' + this.props.editId + '/' ,this.state.holder).then(response=>{
      console.log(response.data)
    })
    .catch(error=>{
      console.log(error)
    })
    this.props.close()

  }

    render() {
      console.log(this.state.holder.child)
      return (
        <Modal

        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            edit
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div style={{"textAlign":"center"}}>
          <h4>Update Modal</h4>
          <h3>Name:{this.props.formData.customer}</h3>
          <h3>InvoiceNumber:{this.props.formData.invoice_no}</h3>

          {(this.state.holder.child !== undefined ) ? (
            <div>
            {this.state.holder.child.map((shareholder, idx) => (
                  <div key={idx} >
                  <select onChange={this.handleItemChange(idx)}>
                  <option value="">{shareholder.item}</option>
                    {this.state.items.map((m ,index)=> <option key={m.id}
                    value={m.item}>{m.item}</option>)}
                  </select>
                    {this.handlePriceChange(idx)}
                      <input
                        readOnly
                        type='box'
                        value={shareholder.price}
                        onChange={this.handlePriceChange(idx)}
                        />
                      <input
                        type='number'
                        min='0'
                        id='quantity'
                        ref={this.quantityRef}
                        placeholder='quantity'
                        onChange={this.handleQtyChange(idx)}
                        value={shareholder.quantity} />
                      <input
                        type='box'
                        id='sub_total'
                        name='sub_total'
                        placeholder="sub-total"
                        value={shareholder.sub_total}
                        readOnly/>

                  </div>
                ))}
                  Total:{this.state.holder.total_amount}




            </div>

          ): null}
      </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="info" onClick={(e)=>this.handleSubmit(e)}>Update</Button>
        </Modal.Footer>
      </Modal>
      );
    }
  }

export default BranchEdit;
