import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class ExpenseView extends React.Component {

    render() {
      console.log(this.props.formData)

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
          <h1>Expense View</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>DOC NO :</p>
                {this.props.formData.Doc_no}
              </div>
              <div>
                <p>CATOGORY:</p>
                {this.props.formData.ExpenseCategory}
              </div>
              <div>
                  <p>DATE:</p>
                  {this.props.formData.Date}
              </div>
          </div>
          <br />
          <div className="invoiceviewWrapper">
              <div>
                <p>EXPENSE ACCOUNT :</p>
                {this.props.formData.ExpenseAcct}
              </div>
              <div>
                <p>CASH ACCOUNT:</p>
                {this.props.formData.CreditAcct}
              </div>
              <div>
                  <p>TOTAL:</p>
                  {this.props.formData.Amount}
              </div>
          </div>
          <p>NARRATION:</p>
          <p>{this.props.formData.journal_entry.description}</p>
        </div>
        </Modal.Body>
  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>OK</button>
            <Link to="/create-reciept"><i className="fas fa-plus"></i></Link>
            <Button  type="submit" onClick={(e,id) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
            <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default ExpenseView;
