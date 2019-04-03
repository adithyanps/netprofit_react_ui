import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import './InvoiceViewModal.css';


class PopUp extends React.Component {

    render() {
      console.log(this.props.formData)

      return (
        <Modal

        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div style={{"textAlign":"center"}}>
          <h3>Name:{this.props.formData.customer}</h3>
          <h3>InvoiceNumber:{this.props.formData.invoice_no}</h3>
          {this.props.formData.child.map((shareholder, idx) => (
                              <div key={idx} >
                              <input readOnly value={shareholder.item}/>
                                  <input
                                    readOnly
                                    type='box'
                                    value={shareholder.price}/>
                                  <input
                                    readOnly
                                    type='number'
                                    min='0'
                                    id='quantity'
                                    ref={this.quantityRef}
                                    placeholder='quantity'
                                    value={shareholder.quantity} />
                                  <input
                                    readOnly
                                    type='box'
                                    id='sub_total'
                                    name='sub_total'
                                    placeholder="sub-total"
                                    value={shareholder.sub_total}/>
                              </div>
                            ))}
                        Total:{this.props.formData.total_amount}
                        </div>

        </Modal.Body>
        <Modal.Footer>
          <Button  type="submit" variant="info"  onClick={(e,id) => this.props.editwindow(e,this.props.objct.id)} >Edit</Button>
          <Button  type="submit" variant="danger" onClick={(e,id) => this.props.deletewindow(e,this.props.objct.id)}>Delete</Button>
          <Link to="/home"><button className="OkBtn">OK</button></Link>
        </Modal.Footer>
      </Modal>
      );
    }
  }


export default PopUp;
// <div style={{"textAlign":"center"}}>
//   <h3>Name:{this.props.parantdata['customer']}</h3>
//   <h3>InvoiceNumber:{this.props.parantdata.invoice_no}</h3>
//   {this.props.parantdata.child.map((shareholder, idx) => (
//                       <div key={idx} >
//                       <input readOnly value={shareholder.item}/>
//                           <input
//                             readOnly
//                             type='box'
//                             value={shareholder.price}/>
//                           <input
//                             readOnly
//                             type='number'
//                             min='0'
//                             id='quantity'
//                             ref={this.quantityRef}
//                             placeholder='quantity'
//                             value={shareholder.quantity} />
//                           <input
//                             readOnly
//                             type='box'
//                             id='sub_total'
//                             name='sub_total'
//                             placeholder="sub-total"
//                             value={shareholder.sub_total}/>
//                       </div>
//                     ))}
//                 Total:{this.props.objct.total_amount}
//                 </div>
