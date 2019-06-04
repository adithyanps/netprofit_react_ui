import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class RecieptView extends React.Component {
  state={
    serial_no:0
  }
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
          <h1>Customer Receipt</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>RECEIPT NO :</p>
                {this.props.formData.reciept_no}
              </div>
              <div>
                <p>ACCOUNT:</p>
                {this.props.formData.journal_entry.creditJrnlItem[0].account}
              </div>
              <div>
                  <p>DATE:</p>
                  {this.props.formData.journal_entry.date}
              </div>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr >
                <th className="ths">NO</th>
                <th className="ths">partner</th>
                <th className="ths">AMOUNT</th>
              </tr >
              </thead>
            <tbody>
          {this.props.formData.journal_entry.creditJrnlItem.map((shareholder, idx) => (
                          <tr key={idx}>
                            <td className="tds">
                              <input
                                  size="5"
                                  value={idx +this.state.serial_no+1}
                                  readOnly/>
                            </td>
                            <td className="tds">
                                  <input
                                    readOnly
                                    value={shareholder.partner}/>
                            </td>
                            <td className="tds">
                                  <input
                                    readOnly
                                    value={shareholder.credit_amount}/>
                            </td>
                          </tr>
                          ))}</tbody>
          </table>
          <div className="invoiceviewbtm">
              TOTAL:{this.props.formData.journal_entry.debitJrnlItem.debit_amount}<br/>
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


export default RecieptView;
