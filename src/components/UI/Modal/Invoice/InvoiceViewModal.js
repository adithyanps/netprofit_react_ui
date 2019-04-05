import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import './InvoiceViewModal.css';


class PopUp extends React.Component {
  state={
    serial_no:0
  }
    render() {
      console.log(this.props.formData)

      return (
        <Modal
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div >
          <h1>Sales Invoice</h1>
          <p>status:</p>
          <div className="invoiceviewWrapper">
              <div>
                <p>INVOICE NO :</p>
                {this.props.formData.invoice_no}
              </div>
              <div>
                <p>CUSTOMER:</p>
                {this.props.formData.customer}
              </div>
              <div>
                  <p>DATE:</p>
                  {this.props.formData.date}
              </div>
          </div>
          <div className="invoiceviewWrapper">
              <div>
                <p>DOC NO:</p>
                {this.props.formData.doc_no}
              </div>
              <div>
                <p>BRANCH:</p>
                {this.props.formData.branch}
              </div>
          </div>
          <br />
          <table className="tables">
            <thead>
              <tr >
                <th className="ths">NO</th>
                <th className="ths">ITEM</th>
                  <th className="ths">QTY</th>
                  <th className="ths">PRICE</th>
                <th className="ths">AMOUNT</th>
              </tr >
              </thead>
            <tbody>
          {this.props.formData.child.map((shareholder, idx) => (
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
                                    value={shareholder.item}/>
                            </td>
                            <td className="tds">
                                  <input
                                    readOnly
                                    placeholder='quantity'
                                    value={shareholder.quantity}
                                    size="5" />
                            </td>
                            <td className="tds">
                                  <input
                                    readOnly
                                    value={shareholder.price}
                                      size="5"/>
                            </td>
                            <td className="tds">
                                  <input
                                    readOnly
                                    value={shareholder.sub_total}
                                      size="5"/>
                            </td>
                            </tr>
                          ))}</tbody>
          </table>
          <div className="invoiceviewbtm">
              TOTAL:{this.props.formData.total_amount}<br/>
              DISCOUNT:{this.props.formData.discount}<br />
              GRAND TOTAL:{this.props.formData.grant_total}<br />
          </div>
          <p>NARRATION:</p>
          <p>{this.props.formData.narration}</p>

        </div>
        </Modal.Body>

  <Modal.Footer>
            <Link to="/home"><button className="OkBtn">OK</button></Link>

            <Link to="/home"><i className="fas fa-plus"></i></Link>
            <Button  type="submit" onClick={(e,editObject) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
            <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
            </Modal.Footer>





      </Modal>
      );
    }
  }


export default PopUp;
// <div className="invoiceviewfooter">
//   <div >
//     <Link to="/home"><button className="OkBtn">OK</button></Link>
//   </div>
//   <div >
//     <Link to="/home"><i className="fas fa-plus"></i></Link>
//     <Button  type="submit" onClick={(e,editObject) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
//     <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
//   </div>
// </div>
