import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class ExpenseCategoryView extends React.Component {

    render() {
      console.log(this.props.formData)
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
            <h1>EXPENSE CATEGORY</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>CATEGORY NAME  :</p>
                {this.props.formData.name}
              </div>

          </div>
          <br />
        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>OK</button>

            <Link to="/create-expense-category"><i className="fas fa-plus"></i></Link>
            <Button  type="submit" onClick={(e,id) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
            <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default ExpenseCategoryView;
