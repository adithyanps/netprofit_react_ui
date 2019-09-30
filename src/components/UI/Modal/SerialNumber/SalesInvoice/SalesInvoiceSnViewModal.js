import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../../axios'

class SalesInvoiceSnViewModal extends React.Component {


    render() {
      console.log(this.props)

      return (
        <Modal
        {...this.props}
        size="s"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
      <Modal.Header closeButton>
        SALES INVOICE SERIAL NUMBER - VIEW
      </Modal.Header>
      <Modal.Body>
      <div >
        <div className="smallModel">
        <div className="serialInput">
        <label>PREFIX</label><br />

            <input
              size="4"
              readOnly
              value={this.props.formData.prefix} />

        </div>
        <div className="serialInput">
        <label>SUFFIX</label><br />

            <input
              size="4"
              readOnly
              value={this.props.formData.suffix}
                />
        </div>
        </div>
        <br />
        <div className="smallModel">
        <div className="serialInput">
        <label>NUMBER</label><br />

        <input
            size="4"
            readOnly
            value={this.props.formData.start_number}
             />
        </div>
        <div className="serialInput">
        <label>PADDING</label><br />

            <input
                size="4"
                readOnly
                value={this.props.formData.padding}
                 />
        </div>
        </div>
        <br />
      </div>
      </Modal.Body>

<Modal.Footer>
  <button className="cancelBtn" onClick={() => this.props.editwindow()}>EDIT </button>
<button className="cancelBtn" onClick={this.props.close}>OK </button>


          </Modal.Footer>


      </Modal>
      );
    }
  }


export default SalesInvoiceSnViewModal;
