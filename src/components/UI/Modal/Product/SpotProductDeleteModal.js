
import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class SpotDeleteModal extends React.Component {

    render() {
      console.log(this.props)
      return (
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h1>Delete Product</h1>
                <p style={{color:'red'}}>Are you Sure you want to delete this product ?</p>
                <table>
                <thead>
                  <tr>
                    <th>PRODUCT NAME :</th>
                    <th>PRODUCT CATEGORY:</th>
                    <th>PRICE:</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                      {this.props.formData.item}</td>
                      <td>
                      {this.props.product_CatList.filter(item => item.id === this.props.formData.product_Cat)[0].name}
                      </td>
                      <td>{this.props.formData.price}</td>
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

export default SpotDeleteModal;
