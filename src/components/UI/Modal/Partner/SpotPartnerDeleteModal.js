
import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class SpotPartnerDeleteModal extends React.Component {

    render() {
      return (
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h1>Delete Partner</h1>
                <p style={{color:'red'}}>Are you Sure you want to delete this Partner ?</p>
                <table>
                <thead>
                  <tr>
                    <th>CUSOTMER_ID</th>
                    <th>TYPE</th>
                    <th>NAME</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.formData.customer_id}</td>
                      <td>{this.props.formData.type}</td>
                      <td>{this.props.formData.name}</td>
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

export default SpotPartnerDeleteModal;
