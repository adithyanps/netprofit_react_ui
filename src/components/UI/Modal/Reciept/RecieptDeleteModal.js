
import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class DeleteModal extends React.Component {

    render() {
      return (
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h1>Delete Sales Invoice</h1>
                <p style={{color:'red'}}>Are you Sure you want to delete this Sales Invoice ??</p>
                <table>
                <thead>
                  <tr>
                    <th>INVOICE NO</th>
                    <th>DATE</th>
                    <th>CUSTOMER</th>
                    <th>TOTAL</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.formData.reciept_no}</td>
                      <td>{this.props.formData.journal_entry.date}</td>
                      <td>{this.props.formData.journal_entry.creditJrnlItem[0].account}</td>
                      <td>{this.props.formData.journal_entry.debitJrnlItem.debit_amount}</td>
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

export default DeleteModal;
