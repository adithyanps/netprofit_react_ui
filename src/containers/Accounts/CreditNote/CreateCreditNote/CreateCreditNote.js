import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import moment from 'moment';

class CreateCreditNote extends Component {
  state={
    doc_no:null,
    selectedPartner:'',
    grand_total: null,
    date: new Date(),
    comment: '',
    partnerList:[],
    creditnoteList:[],
    prefix:null,
    suffix:null,
    start_date:null
  }

  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadPartner()
    this.loadCreditNoteNumber()
    this.loadCreditNotes()
    // this.credit_noChangeHandler()
  }

  loadPartner=()=>{
    axios.get('invoice/partner/').then(
      res => {
        this.setState({partnerList:res.data});
        console.log(res.data)
      }
    )
  }

  loadCreditNotes=()=>{
    axios.get('invoice/creditnote/').then(
      res => {
        this.setState({creditnoteList:res.data});
        console.log(res.data)
      }
    )
  }
  loadCreditNoteNumber=()=>{
    axios.get('invoice/creditnote-number/1/').then(
      res=>{
        this.setState(
          {
            prefix:res.data.prefix,
            suffix:res.data.suffix,
            start_number:res.data.start_number
          })
      }
    )
  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }

  credit_noChangeHandler=()=>{
    var mostBiggerCreditNoteNoDict = this.state.creditnoteList.reduce(function (oldest, item) {
      return (oldest.Doc_no || 0) > item.Doc_no ? oldest : item;
    }, {});
    console.log(mostBiggerCreditNoteNoDict['Doc_no'])
    let mostBiggerCreditNoteNo = mostBiggerCreditNoteNoDict['Doc_no']
    console.log(this.state.creditnoteList)
    if (this.state.CreditNoteList.length > 0){
        this.setState({start_number:mostBiggerCreditNoteNo + 1})
    }
  }

  render(){
    console.log(this.state)
    return(
      <div>
      <br />
      <div className="row-wrapper1">
        <div><h1 className="ptag">Create Credit Note</h1></div>
      </div>
      <br />
      <br />
      <div className="row-wrapper">
        <div>
          <label>Doc NO:</label><br />
          <input readOnly className="grand"  />
        </div>
        <div>
          <label>PARTNER</label><br />
          <select className="select" onChange={(e) => this.setState({selectedAcnt:e.target.value})}>
              <option value=""> </option>
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
      <br />
      <button className="cancelBtn" onClick={(this.state.selectedPartner ) ? (this.submitDataHandler) :(null)}>SAVE</button>

      </div>
    )
  }
}

export default CreateCreditNote
