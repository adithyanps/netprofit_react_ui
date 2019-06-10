
import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';




class DeleteModal extends React.Component {
  state={
    selectedAcnt:null
  }
  componentWillMount(){
    let accntName = this.props.accountList.filter(item=>item.id === this.props.creditJrnlItem[0].account)
    console.log(accntName)
    this.setState({selectedAcnt:accntName[0].name})

  }

    render() {
      return (

          <Modal show={this.props.show} onHide={this.props.close}>
            <Modal.Header closeButton>
              <Modal.Title></Modal.Title>
            </Modal.Header>
            <Modal.Body>
            <div>
                <h1>Delete Customer Reciept</h1>
                <p style={{color:'red'}}>Are you Sure you want to delete this  Customer Reciept  ??</p>
                <table>
                <thead>
                  <tr>
                    <th>RECEIPT NO</th>
                    <th>DATE</th>
                    <th>ACCOUNT</th>
                    <th>TOTAL</th>
                  </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{this.props.formData.reciept_no}</td>
                      <td>{this.props.formData.journal_entry.date}</td>
                      <td>{this.state.selectedAcnt}</td>
                      {this.props.formData.journal_entry.journal_item.map(item=>(
                        (item.debit_amount > Number(0)) ? (
                            <td>{item.debit_amount}</td>
                        ) :(null))
                      )}
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

export default DeleteModal;
