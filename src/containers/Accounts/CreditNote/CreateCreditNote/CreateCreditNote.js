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
    settingsAcnt:[],
    creditnoteList:[],

    prefix:null,
    suffix:null,
    digits:null,
    start_date:null,

    creditNoteListPage:false,
  }

  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadPartner()
    this.loadCreditNotes()
    // this.credit_noChangeHandler()
    this.loadSettingsAccnt()

  }
  loadSettingsAccnt=()=>{
    axios.get('invoice/accountDefault/1/').then(
      res => {
        this.setState({settingsAcnt:res.data});
        console.log(res.data)
      }
    )
  }

  loadPartner=()=>{
    axios.get('invoice/partner/').then(
      res => {
        this.setState({partnerList:res.data.filter(item => item.type !== 'SUPPLIER' )});
        console.log(res.data)
      }
    )
  }

  loadCreditNotes=()=>{
    axios.get('invoice/creditnote/').then(
      res => {
        this.setState({creditnoteList:res.data});
        console.log(res.data)
        if(res.data.length === 0){
          this.loadCreditNoteNumber()
          console.log(res.data.length)
        } else{
          var mostBiggerCreditNoteNoDict = res.data.reduce(function (oldest, item) {
            return (oldest.Doc_no || 0) > item.Doc_no ? oldest : item;
          }, {});
          console.log(mostBiggerCreditNoteNoDict['Doc_no'])
          let mostBiggerCreditNoteNo = mostBiggerCreditNoteNoDict['Doc_no']
          let start_no = parseInt(mostBiggerCreditNoteNo,10)
          console.log(start_no,typeof start_no)
          console.log(typeof mostBiggerCreditNoteNo)
          var r = /\d+/;
          var m;
          m= r.exec(mostBiggerCreditNoteNo)
          console.log(m)
          console.log(typeof m[0])
          var splitNumber = m[0].split(Number(m[0]))
          console.log(splitNumber)
          console.log( splitNumber[0])

          var splitStr = mostBiggerCreditNoteNo.split(m[0])
          console.log(splitStr)
          let afterZeroNum = Number(m[0])+1
          console.log(typeof String(afterZeroNum))
          let number = splitNumber[0]+String(afterZeroNum)
          console.log(number)
          this.setState({start_no:number,prefix:splitStr[0],suffix:splitStr[1]})
        }
      }
    )
  }
  loadCreditNoteNumber=()=>{
    axios.get('invoice/creditnote-number/').then(
      res=>{
        this.setState(
          {
            prefix:res.data.filter(item=>item.id === 1)[0].prefix,
            suffix:res.data.filter(item=>item.id === 1)[0].suffix,
            // start_number:res.data.filter(item=>item.id === 1)[0].start_number,
            digits:res.data.filter(item=>item.id === 1)[0].digits
          })
          console.log(res.data.filter(item=>item.id === 1)[0].prefix)
          let start_number =res.data.filter(item=>item.id === 1)[0].start_number
          let digits=res.data.filter(item=>item.id === 1)[0].digits
          console.log(typeof start_number)
          this.credit_noChangeHandler(start_number,digits)
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

  credit_noChangeHandler=(start_number,digits)=>{
    console.log(start_number)
    let start_numberCount = start_number.toString().length;
    console.log(start_numberCount)
    if(digits>start_numberCount){
      let digit_diff = digits - start_numberCount
      console.log(digit_diff)
      let zero = 0;
      let zeros = "0".repeat(digit_diff)
      console.log(zeros,typeof zeros)
      let number = zeros+start_number
      console.log(number)
      this.setState({start_no:number})
    }
  }
submitDataHandler=()=>{
  let creditnoteNum = this.state.prefix+this.state.start_no+this.state.suffix
  console.log(creditnoteNum)
  console.log(creditnoteNum)

  let output = []
  let creditSection = {}
  let debitSection = {}
  let salesAcntObjct ={}
  let recievableAcntObjct = {}

  salesAcntObjct = this.state.settingsAcnt.SalesAccont
  recievableAcntObjct = this.state.settingsAcnt.CustomerAccount

  creditSection.partner = this.state.partnerList.filter(item=>item.name===this.state.selectedPartner)[0].id
  creditSection.account = recievableAcntObjct.id
  creditSection.credit_amount = this.state.grand_total
  creditSection.debit_amount = 0
  output.push(creditSection)

  debitSection.partner = null
  debitSection.account = salesAcntObjct.id
  debitSection.debit_amount = this.state.grand_total
  debitSection.credit_amount = 0
  output.push(debitSection)
  console.log(output)
  let data = {
    Doc_no:creditnoteNum,
    Grand_total:this.state.grand_total,
    Date:this.state.date,
    Partner:this.state.partnerList.filter(item=>item.name === this.state.selectedPartner)[0].id,
    Comment:this.state.comment,
    journal_entry:{
      date:this.state.date,
      transaction_type:"CREDITNOTE",
      description:this.state.comment,
      journal_item:output,
    }
  }
  console.log(data)
  axios.post('invoice/creditnote/',data).then(
    response=>{
      this.props.createCreditNoteSuccess(response.data,this.state.partnerList,this.state.settingsAcnt)
      this.setState({creditNoteListPage:true})

    },
  ).catch(error=>{
    this.props.createCreditNoteFail(error)
  })
}
openCreditNoteListPage=()=>{
  console.log(this)
  return(
    <Redirect  to="/creditnotes"/>
  )
}
  render(){
    console.log(this.state)
    return(
      <div>
      {this.state.creditNoteListPage ? (this.openCreditNoteListPage()) : (null)}

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
          <select className="select" onChange={(e) => this.setState({selectedPartner:e.target.value})}>
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

const mapStateToProps = state => {
  return {
    creditNoteData:state.creditNote.creditNoteData,
    creditNoteDataList:state.creditNote.creditNoteDataList,
    creditNoteListPageOpen:state.creditNote.creditNoteListPageOpen,
    isDeletePage:state.creditNote.isDeletePage,
    isEditPage:state.creditNote.isEditPage,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      // getAllCreditNotes: ()=>dispatch(actions.getAllCreditNotes()),
      createCreditNoteSuccess: (obj,partnerList,settingsAcnt)=>dispatch(actions.createCreditNoteSuccess(obj,partnerList,settingsAcnt)),
      createCreditNoteFail: (error)=>dispatch(actions.createCreditNoteFail(error)),


    };
};

export default connect(mapStateToProps,mapDispatchToProps)(CreateCreditNote)
