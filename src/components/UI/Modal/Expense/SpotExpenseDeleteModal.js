
import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';

class ExpenseDeleteModal extends React.Component {

    render() {
      return (
          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h1>Delete Expense</h1>
                <p style={{color:'red'}}>Are you Sure you want to delete this Expense ??</p>
                <table>
                <thead>
                  <tr>
                    <th>Doc NO</th>
                    <th>DATE</th>
                    <th>CATEGORY</th>
                    <th>TOTAL</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.formData.Doc_no}</td>
                      <td>{this.props.formData.Date}</td>
                      <td>{this.props.categoryList.filter(item=>item.id === this.props.formData.ExpenseCategory)[0].name}</td>
                      <td>{this.props.formData.Amount}</td>
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

export default ExpenseDeleteModal;
