import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class RecieptView extends React.Component {

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
          <h1>Partner</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>CUSOTMER_ID  :</p>
                {this.props.formData.customer_id}
              </div>
              <div>
                <p>TYPE:</p>
                {this.props.formData.type}
              </div>
              <div>
                  <p>NAME:</p>
                  {this.props.formData.name}
              </div>
          </div>
          <br />


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


export default RecieptView;
