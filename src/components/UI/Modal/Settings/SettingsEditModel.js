import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios'

class SettingsEditModel extends React.Component {
  state={
    salesAccntList:[],
    purchaseAccntList:[],
    customerAccntList:[],
    supplierAccntList:[],
    isEditSettings:false,
    salesId:{}

  }
  componentWillMount(){
    this.loadAccount()
  }
  loadAccount=()=>{
    axios.get('invoice/account/').then(
      res => {
        this.setState({
          salesAccntList:res.data.filter(item => item.type === "SALES"),
          purchaseAccntList:res.data.filter(item => item.type === "PURCHASE"),
          customerAccntList:res.data.filter(item => item.type === "RECIEVABLE"),
          supplierAccntList:res.data.filter(item => item.type === "PAYABLE"),

        });
        console.log(res.data)
      }
    )
  }
  submitDataHandler=(e)=>{
    e.preventDefault()
    console.log(this.state.salesId)
    if (this.state.purchseId === undefined) {
      this.setState({purchseId:this.props.PurchaseObj.id})
    }
    if (this.state.salesId === undefined) {
      this.setState({salesId:this.props.SalesObj.id})
    }
    if (this.state.customerId === undefined) {
      this.setState({customerId:this.props.CustomerObj.id})
    }
    if (this.state.supplierId === undefined) {
      this.setState({supplierId:this.props.SupplierObj.id})
    }
    let Data = {
      SalesAccont:this.state.salesId,
      PurchaseAccont:this.state.purchseId,
      CustomerAccount:this.state.customerId,
      SupplierAccount:this.state.supplierId,
    }
    console.log(Data)
    this.props.editHandler(Data)
    // this.submitHandler(Data)
  }

  salesHandler=(e)=>{
    console.log(e.target.value)
    let SalesObj = this.props.salesAccntList.filter(item => item.name === e.target.value)
    console.log(SalesObj)
    this.setState({salesId:SalesObj[0].id})
  }
  purchseHandler=(e)=>{
    let PurchaseObj = this.props.purchaseAccntList.filter(item => item.name === e.target.value)
    this.setState({purchseId:PurchaseObj[0].id})
  }
  customerHandler=(e)=>{
    let CustomerObj = this.props.customerAccntList.filter(item => item.name === e.target.value)
    this.setState({customerId:CustomerObj[0].id})
  }
  supplierHandler=(e)=>{
    let SupplierObj = this.props.supplierAccntList.filter(item => item.name === e.target.value)
    this.setState({supplierId:SupplierObj[0].id})
  }
    render() {
      console.log(this.props.formData)

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
      <div>
        <div className="SettingsAcntBoxwrapper">
        <div>

          <label>Sales Account: </label><br />
          <select className="select" onChange={(e)=>this.salesHandler(e)}>
            <option value="">{this.props.SalesObj.name}</option>
              {this.state.salesAccntList.map((m,index) =>
            <option key={m.id} value={m.name} >{m.name}</option>
            )}
          </select>
        </div>
        <div>
          <label>Purchase Account:</label><br />
          <select className="select" onChange={(e)=>this.purchseHandler(e)}>
            <option value="">{this.props.PurchaseObj.name}</option>
              {this.state.purchaseAccntList.map((m,index) =>
            <option key={m.id} value={m.name} >{m.name}</option>
            )}
          </select>
        </div>
        </div>
        <br />
        <div className="SettingsAcntBoxwrapper">
        <div>
            <label>Customer Account:</label><br />
            <select className="select" onChange={(e)=>this.customerHandler(e)}>
              <option value="">{this.props.CustomerObj.name}</option>
                {this.state.customerAccntList.map((m,index) =>
                  <option key={m.id} value={m.name}>{m.name}</option>
                )}
            </select>
        </div>
        <div>
            <label>Supplier Account:</label><br />
            <select className="select" onChange={(e)=>this.supplierHandler(e)}>
              <option value="">{this.props.SupplierObj.name}</option>
                {this.state.supplierAccntList.map((m,index) =>
              <option key={m.id} value={m.name}>{m.name}</option>
              )}
            </select>
        </div>
        </div>
        <br />
      </div>
      </Modal.Body>

<Modal.Footer>
<button className="cancelBtn" onClick={this.submitDataHandler}>SAVE </button>
<button className="cancelBtn" onClick={this.props.close}>CANCEL </button>


          </Modal.Footer>


      </Modal>
      );
    }
  }


export default SettingsEditModel;
