import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class SpotRecieptViewModal extends React.Component {
  state={
    serial_no:0,
    formData:[],
    journal_itemList:[],
    debitJrnlItem:[],
    creditJrnlItem:[],
    accntName:''

  }
  // componentWillMount(){
  //   this.setState({
  //     formData:this.props.formData,
  //     journal_itemList:this.props.formData.journal_entry.journal_item,
  //     debitJrnlItem:this.props.formData.journal_entry.journal_item.filter((item)=>item.debit_amount > 0),
  //     creditJrnlItem:this.props.formData.journal_entry.journal_item.filter((item)=>item.credit_amount>0),
  //     // accntName:this.props.accountList.filter(item=>item.id===creditJrnlItem[0].id)[0].name
  //   })
  //   // let debitJrnlItem= this.props.formData.journal_entry.journal_item.filter((item)=>item.debit_amount > 0)
  //   let creditJrnlItem = this.props.formData.journal_entry.journal_item.filter((item)=>item.credit_amount>0)
  //   console.log(creditJrnlItem[0].id)
  //   let accntName=this.props.accountList.filter(item=>item.id===creditJrnlItem[0].account)
  //   console.log(accntName)
  //   this.setState({accntName:accntName[0].name})
  //   // this.props.formData.reciept_no =
  //   // this.props.formData.journal_entry.date=this.props.formData.journal_entry.date
  //   // this.props.formData.journal_entry.transaction_type="COSTOMER_RECIEPT"
  //   // this.props.formData.journal_entry.journal_item = creditJrnlItem
  //
  // }

    render() {
      console.log(this.props.formData)
      console.log(this.state.journal_itemList)
      console.log(this.state)
      console.log(this.props)



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
              {(this.props.accountList.length !== 0)?(this.props.accountList.filter(item=>item.id === this.props.formData.journal_entry.journal_item[0].account)[0].name) : (null)}
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
        {this.props.formData.journal_entry.journal_item.map((shareholder, idx) =>(
          (shareholder.credit_amount > Number(0)) ? (
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
                      value={(this.props.partnerList.length !== 0 ) ?(this.props.partnerList.filter(item=>item.id === shareholder.partner)[0].name) : (null)}/>
              </td>
              <td className="tds">
                    <input
                      readOnly
                      value={shareholder.credit_amount}/>
              </td>
            </tr>

          ) : (
          null
          )
        ))}

          </tbody>
        </table>

        <div className="invoiceviewbtm">
        {this.props.formData.journal_entry.journal_item.map(item=>(
          (item.debit_amount > Number(0)) ? (
            <div>
            TOTAL:{item.debit_amount}<br/>
            </div>

          ) :(null))
        )}
        <p>NARRATION:</p>
        <p>{this.props.formData.journal_entry.description}</p>

        </div>


      </div>
      </Modal.Body>

<Modal.Footer>
          <button className="OkBtn" onClick={this.props.close}>OK</button>

          <Link to="/create-reciept"><i className="fas fa-plus"></i></Link>
          <Button  type="submit" onClick={(e,id) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
          <Button  type="submit"  onClick={this.props.deletewindow}><i className="fas fa-trash"></i></Button>
          </Modal.Footer>


      </Modal>
      );
    }
  }


export default SpotRecieptViewModal;
