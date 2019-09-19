import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class AccountEdit extends React.Component {
  state={
    formData:[],
    selectedAccount:null,
    selectedType:null,


  }
  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      selectedAccount:this.props.formData.name,
      selectedType:this.props.formData.type,

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
    this.props.formData.name = this.state.selectedAccount
    this.props.formData.type = this.state.selectedType


    let Data = {
      id:this.props.formData.id,
      name:this.state.selectedAccount,
      type:this.state.selectedType,

    }
    console.log(Data)
    this.props.editHandler(e,Data)
    console.log(this.props.formData)

  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)
      const accountTypeList = ['RECIEVABLE','PAYABLE','SALES','PURCHASE','EXPENSE','INCOME','CASH','BANK']

      return (
        <Modal
        {...this.props}
        size="xs"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div >
          <h1 className="ptag">Edit - ACCOUNT</h1>
          <div className="row-wrapper1">
          </div>
          <br />
          <div className="row-wrapper">
            <div>
            <label>ACCOUNT NAME</label><br />
            <input
                className="dates"
                name='selectedAccount'
                value={this.state.selectedAccount}
                onChange={this.handleInputChange}
                required='required'/>
            </div>
            <div>
            <label>ACCOUNT TYPE</label><br />
            <select
                className="select"
                onChange={(e) => this.setState({selectedType:e.target.value})}>
                <option value="">{this.state.selectedType} </option>
                {accountTypeList.map((m)=>
                    <option key={m.id} value={m}>{m}</option>
                )}
            </select>
            </div>
          </div>
          <br />
        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>CANCEL</button>
            <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>

            <Link to="/create-accounts"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default AccountEdit;
