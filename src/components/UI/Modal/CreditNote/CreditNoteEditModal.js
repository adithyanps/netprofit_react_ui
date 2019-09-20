import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';


class CreditNoteEditModal extends React.Component {

  state={
    formData:[],
    partnerList:[],
    selectedPartner:null,
    grand_total:null,
    date:null,
    doc_no:'',
    comment:null
  }

  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      doc_no:this.props.formData.Doc_no,
      selectedPartner:this.props.partnerList.filter(item=>this.props.formData.Partner)[0].name,
      grand_total:this.props.formData.Grand_total,
      date:this.props.formData.Date,
      comment:this.props.formData.Comment,
      partnerList:this.props.partnerList,
      journal_entry:this.props.formData.journal_entry,
      settingsAcnt:this.props.settingsAcnt,

  })
  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }


  submitDataHandler=(e)=>{
    // this.props.formData.Doc_no = this.state.doc_no
    console.log(this.props.formData.Doc_no)
    this.props.formData.Doc_no = this.props.formData.Doc_no

    this.props.formData.Grand_total = this.state.grand_total
    this.props.formData.Date = this.state.date
    this.props.formData.Comment = this.state.comment
    this.props.formData.Partner = this.state.selectedPartner
    let output = []
    let creditSection = {}
    let debitSection = {}

    let salesAcntObjct ={}
    let recievableAcntObjct = {}
    console.log(this.state.settingsAcnt)

    salesAcntObjct = this.state.settingsAcnt.SalesAccont
    recievableAcntObjct = this.state.settingsAcnt.CustomerAccount
    console.log(recievableAcntObjct)
    creditSection.partner = this.props.partnerList.filter(item=>item.name===this.state.selectedPartner)[0].id
    creditSection.account = recievableAcntObjct.id
    creditSection.credit_amount = this.state.grand_total
    creditSection.debit_amount = 0
    output.push(creditSection)

    debitSection.partner = null
    debitSection.account = salesAcntObjct.id
    debitSection.debit_amount = this.state.grand_total
    debitSection.credit_amount = 0
    output.push(debitSection)
    let Data = {
      id:this.props.formData.id,
      Doc_no:this.props.formData.Doc_no,
      Grand_total:this.state.grand_total,
      Date:this.state.date,
      Comment:this.state.comment,
      Partner:this.props.partnerList.filter(item=>item.name === this.state.selectedPartner)[0].id,
      journal_entry:{
        date:this.state.date,
        transaction_type:"CREDITNOTE",
        description:this.state.comment,
        journal_item:output,
      }
    }
    console.log(Data)
    this.props.editHandler(e,Data)
    console.log(this.props.formData)
    console.log(this.state)


  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)

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
        <div style={{"textAlign":"center"}}>
          <h1 className="ptag">Edit - Credit CreditNote</h1>
          <div className="row-wrapper">
          <div>
            <label>Doc NO:</label><br />
            <input
                readOnly
                className="grand"
                value={this.state.doc_no}
            />
          </div>
          <div>
            <label>PARTNER</label><br />
            <select className="select" onChange={(e) => this.setState({selectedPartner:e.target.value})}>
                <option value="">{(typeof this.props.formData.Partner=== 'string')?(this.props.formData.Partner):(
                  this.props.partnerList.filter(item=>item.id === this.props.formData.Partner)[0].name
                )} </option>
                {this.state.partnerList.map((m,index)=>
                    <option key={m.id} value={m.name}>{m.name}</option>
                )}
            </select>
          </div>
          <div>
          <label>DATE</label><br />
          <input
              className="dates"
              type='date'
              name='date'
              value={this.state.date}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
          </div>
          <br />
          <div className="row-wrapper">
          <div>
            <label>Grant Total:</label><br />
            <input
                className="grand"
                type='number'
                value={this.state.grand_total}
                onChange={this.handleInputChange}
                name='grand_total'
                id='grand_total'
                  />
          </div>
          <div>
          <label>COMMENT</label><br />
          <input
            className="narration"
            name="comment"
            onChange={this.handleInputChange}
            value={this.state.comment}/>
          </div>
          </div>
          <br />
        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>CANCEL</button>
            <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
            <Link to="/create-creditnote"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default CreditNoteEditModal;
