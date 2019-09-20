import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class CreditNoteDeleteModal extends React.Component {

  render() {
    console.log(this.props)
    console.log(this.props.formData)

    return (
        <Modal show={this.props.show} onHide={this.props.close}>
          <Modal.Header closeButton>
            <Modal.Title></Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div>
              <h1>Delete CreditNote</h1>
              <p style={{color:'red'}}>Are you Sure you want to delete this Credit Note ?</p>
              <table>
              <thead>
                <tr>
                  <th>DOC NO :</th>
                  <th>DATE :</th>
                  <th>PARTNER :</th>
                  <th>TOTAL :</th>
                </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>{this.props.formData.Doc_no}</td>
                    <td>{this.props.formData.Date}</td>
                    <td>{this.props.formData.Partner}</td>
                    <td>{this.props.formData.Grand_total}</td>
                  </tr>
                </tbody>
              </table>
              </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={(id)=>this.props.deleteHandler(this.props.formData.id)}>DELETE</Button>
            <Button variant="outline-warning" onClick={this.props.close}>CANCEL</Button>

          </Modal.Footer>
        </Modal>

    );
  }
  }


export default CreditNoteDeleteModal;
