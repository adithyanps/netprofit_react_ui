import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../../axios'

class CreateDebitSerialNumModel extends React.Component {
  state={
    prefix:null,
    suffix:null,
    start_number:null,
    padding:null,
  }
  componentWillMount(){
    this.setState({
      prefix:this.props.formData.prefix,
      suffix:this.props.formData.suffix,
      start_number:this.props.formData.start_number,
      padding:this.props.formData.padding,
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
      this.props.formData.prefix = this.state.prefix
      this.props.formData.suffix = this.state.suffix
      this.props.formData.start_number = this.state.start_number
      this.props.formData.padding = this.state.padding
      let data = {
        id :this.props.formData.id,
        prefix:this.state.prefix,
        suffix:this.state.suffix,
        start_number:this.state.start_number,
        padding:this.state.padding,
        type:"DN"
      }
      this.props.editHandler(data)
  }

    render() {
      console.log(this.props.formData)

      return (
        <Modal
        {...this.props}
        size="s"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
      <Modal.Header closeButton>
        DEBIT NOTE SERIAL NUMBER - EDIT
      </Modal.Header>
      <Modal.Body>
      <div >
        <div className="smallModel">
        <div className="serialInput">
        <label>PREFIX</label><br />

        <input
          size="4"
          name="prefix"
          value={this.state.prefix}
          onChange={this.handleInputChange}

         />

        </div>
        <div className="serialInput">
        <label>SUFFIX</label><br />

        <input
          size="4"
          name="suffix"
          value={this.state.suffix}
          onChange={this.handleInputChange}
          />
        </div>
        </div>
        <br />
        <div className="smallModel">
        <div className="serialInput">
        <label>NUMBER</label><br />

        <input
          size="4"
          name="start_number"
          value={this.state.start_number}
          onChange={this.handleInputChange}
           />
        </div>
        <div className="serialInput">
        <label>PADDING</label><br />

        <input
            size="4"
            name="padding"
            value={this.state.padding}
            onChange={this.handleInputChange}
            />
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


export default CreateDebitSerialNumModel;
