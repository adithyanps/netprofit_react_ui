import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class BranchEdit extends React.Component {
  state={
    formData:[],
    selectedBranch:null,

  }
  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      selectedBranch:this.props.formData.branch,
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
    this.props.formData.branch = this.state.selectedBranch

    let Data = {
      id:this.props.formData.id,
      branch:this.state.selectedBranch,
    }
    console.log(Data)
    this.props.editHandler(e,Data)
    console.log(this.props.formData)

  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)

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
          <h1 className="ptag">Edit - Branch</h1>
          <div className="row-wrapper1">
          </div>
          <br />
          <div className="row-wrapper">
            <div>
            <label>Branch Name</label><br />
            <input
                className="dates"
                name='selectedBranch'
                value={this.state.selectedBranch}
                onChange={this.handleInputChange}
                required='required'/>
            </div>
          </div>
          <br />
        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>CANCEL</button>
            <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>

            <Link to="/create-branch"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default BranchEdit;
