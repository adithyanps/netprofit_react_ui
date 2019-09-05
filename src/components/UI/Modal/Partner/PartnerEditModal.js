import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class PartnerEdit extends React.Component {
  state={
    partnerList:[],
    areaList:[],
    customer_id:null,
    type:null,
    name:null,
    area:null,

  }
  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      partnerList:this.props.partnerList,
      customer_id:this.props.formData.customer_id,
      type:this.props.formData.type,
      name:this.props.formData.name,
      area:this.props.areaList.filter(item=>item.id === this.props.formData.area)[0].area,
      areaList:this.props.areaList
  })
  this.loadPartner()
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


  submitDataHandler=(e)=>{
    this.props.formData.customer_id = this.state.customer_id
    this.props.formData.name = this.state.name
    this.props.formData.type = this.state.type
    this.props.formData.edited_by = this.props.currentUserData.id
    this.props.formData.area = this.props.areaList.filter(item=>item.area === this.state.area)[0].id

    let Data = {
      customer_id:this.state.customer_id,
      name:this.state.name,
      type:this.state.type,
      area:this.props.areaList.filter(item=>item.area === this.state.area)[0].id,
      created_by:this.props.formData.created_by,
      edited_by:this.props.currentUserData.id,
    }
    console.log(Data)
    this.props.editHandler(e,this.props.formData)
    console.log(this.props.formData)

  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)
      const typeList = [{'type':'BOTH'},{'type':'CUSTOMER'},{'type':'SUPPLIER'}]

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
              <label>CUSOTMER_ID:</label><br />
              <input
                className="grand"
                name="customer_id"
                value={this.state.customer_id}
                onChange={this.handleInputChange}
                />
            </div>
            <div>
              <label>TYPE</label><br />
              <select
                  className="select"
                  onChange={(e) => this.setState({type:e.target.value})}
                  >
                  <option value=""> {this.state.type}</option>
                  {typeList.map((m,index)=>
                      <option key={m.id} value={m.type}>{m.type}</option>
                  )}
              </select>
            </div>
            </div>
            <br/>
            <br/>
            <div className="row-wrapper">
              <div>
                <label>NAME</label><br />
                <input
                  className="dates"
                  name='name'
                  value={this.state.name}
                  onChange={this.handleInputChange}
                  required='required'/>
              </div>
              <div>
              <label>AREA</label><br />
              <select
                  className="select"
                  onChange={(e) => this.setState({area:e.target.value})}
                  >
                  <option value=""> {this.state.area}</option>
                  {this.state.areaList.map((m,index)=>
                      <option key={m.id} value={m.area}>{m.area}</option>
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

            <Link to="/create-partner"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default PartnerEdit;
// <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
