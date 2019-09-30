import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class CreditNoteView extends React.Component {

    render() {
      console.log(this.props.formData)
      console.log(typeof this.props.formData.Partner)
      console.log(this.props,'kp')

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
          <h1>Credit Note</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>DOC NO :</p>
                {this.props.formData.Doc_no}
              </div>
              <div>
                <p>PARTNER:</p>
                {(typeof this.props.formData.Partner=== 'string')?(this.props.formData.Partner):(
                  this.props.partnerList.filter(item=>item.id === this.props.formData.Partner)[0].name
                )}
              </div>
              <div>
                  <p>DATE:</p>
                  {this.props.formData.Date}
              </div>
          </div>
          <br />
          <br />
          <div className="invoiceviewWrapper">
              <div>
                <p>Grant Total :</p>
                {this.props.formData.Grand_total}
              </div>
              <div>
                <p>COMMENT:</p>
                {this.props.formData.Comment}
              </div>

          </div>

        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>OK</button>

            <Link to="/create-creditnote"><i className="fas fa-plus"></i></Link>
            <Button  type="submit" onClick={(e,id) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
            <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default CreditNoteView;
