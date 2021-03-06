import React , { Component } from 'react';
import moment from 'moment';
import axios from '../../../axios'
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import * as actions from '../../../store/actions/index';


class CreateRecieptPage extends Component {
  state={
      date:new Date(),
      customerList:[],
      partnerList:[],
      recieptData:[],
      serial_no:0,
      // reciept_no:0,
      holder:[{
        customer:'',
        credit_amount:null,
        debit_amount:0
      }],
      narration:'',
      total:null,
      accountList:[],
      customerRecieptPage:false,

      prefix:null,
      suffix:null,
      padding:null,
      start_date:null,

  }


  componentDidMount(){
    this.setState({
      date:moment(new Date()).format('YYYY-MM-DD'),
    })
    this.loadAccount()
    this.loadPartner()
    this.loadCustomer()
    this.loadRecieptData()
  }
  loadRecieptData=()=>{
    axios.get('customer_reciepts/customerReceipt/').then(
      res => {
        this.setState({recieptData:res.data});
        console.log(res.data)
        if(res.data.length === 0){
          this.loadRecieptNumber()
          console.log(res.data.length)
        } else{
          var mostBiggerRecieptNoDict = res.data.reduce(function (oldest, item) {
            return (oldest.reciept_no || 0) > item.reciept_no ? oldest : item;
          }, {});
          console.log(mostBiggerRecieptNoDict['reciept_no'])
          let mostBiggerRecieptNo = mostBiggerRecieptNoDict['reciept_no']
          let start_no = parseInt(mostBiggerRecieptNo,10)
          console.log(start_no,typeof start_no)
          console.log(typeof mostBiggerRecieptNo)
          var r = /\d+/;
          var m;
          m= r.exec(mostBiggerRecieptNo)
          console.log(m)
          console.log(typeof m[0])
          var splitNumber = m[0].split(Number(m[0]))
          console.log(splitNumber)
          console.log( splitNumber[0])

          var splitStr = mostBiggerRecieptNo.split(m[0])
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

  loadRecieptNumber=()=>{
    axios.get('masters/serial-number/').then(
      res=>{if(res.data.filter(item=>item.type === "CR").length>0){
        this.setState(
          {
            prefix:res.data.filter(item=>item.type === "CR")[0].prefix,
            suffix:res.data.filter(item=>item.type === "CR")[0].suffix,
            // start_number:res.data.filter(item=>item.id === 1)[0].start_number,
            padding:res.data.filter(item=>item.type === "CR")[0].padding
          })
          console.log(res.data.filter(item=>item.type === "CR")[0].prefix)
          let start_number =res.data.filter(item=>item.type === "CR")[0].start_number
          let padding=res.data.filter(item=>item.type === "CR")[0].padding
          console.log(typeof start_number)
          this.reciept_noChangeHandler(start_number,padding)
      }

      }
    )
  }

  reciept_noChangeHandler=(start_number,padding)=>{
    console.log(start_number)
    let start_numberCount = start_number.toString().length;
    console.log(start_numberCount)
    if(padding>start_numberCount){
      let digit_diff = padding - start_numberCount
      console.log(digit_diff)
      let zero = 0;
      let zeros = "0".repeat(digit_diff)
      console.log(zeros,typeof zeros)
      let number = zeros+start_number
      console.log(number)
      this.setState({start_no:number})
    }
  }

  loadPartner=()=>{
    axios.get('masters/partner/').then(
      res => {
        this.setState({partnerList:res.data.filter(item => item.type !== 'SUPPLIER')});
      }
    )
  }


  loadCustomer=()=>{
    axios.get('masters/partner/').then(
      res => {
        this.setState({customerList:res.data.filter(item => item.type !== 'SUPPLIER')});
        console.log(res.data)
      }
    )
  }


  loadAccount=()=>{
    axios.get('/masters/account/').then(
      response=>{
        this.setState({accountList:response.data})
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

  addItemHandler=(e)=> {

      this.setState((prevState) => {
        return{
          holder: prevState.holder.concat({

               customer:'',
               credit_amount:null,
               debit_amount:0,
             })
        }
      })
      e.preventDefault()
  }

  removeLineHandler=(e,id)=>{
    if (this.state.holder.length !== 1) {
      const updatedOrders = this.state.holder;
      let deleteObject = updatedOrders.filter((item,index)=> index === id)
      let delIndex = updatedOrders.indexOf(deleteObject[0])
      console.log(delIndex)
      updatedOrders.splice(delIndex,1)
      console.log(updatedOrders)
      this.setState({holder:updatedOrders})
      // this.totalHandler()
      console.log(this.state.holder)
      // if (this.state.holder.length === 0) {
      //   this.setState({total:null})
      // } else {
        this.totalHandler()
      // }
    }

    e.preventDefault()
  }

 cancelDataHandler=(e)=>{
   e.preventDefault()
   this.setState({holder:[{
      customer:'',
      credit_amount:null,
      debit_amount:0
    }],narration:'',total:null})
  }

  handlePartnerChange= (idx) => (evt) => {
    const newholder = this.state.holder.map((element,sidx) => {
      if (idx !== sidx) {
        return element
      } else {
        return { ...element, customer:evt.target.value};
      }
    });
    this.state.holder = [...newholder]
    this.setState({holder: newholder})
  }
  handleSubtotalChange= idx => evt => {
    const newholder = this.state.holder.map((element,sidx) => {
      if (idx !== sidx) return element;
      return {...element,credit_amount:evt.target.value};
    })
    this.setState({holder: newholder});
    this.state.holder = [...newholder]
    this.totalHandler()
  }
  totalHandler =()=>{
    console.log(this.state.holder)
    let list=[]
    this.state.holder.map((value)=>{
      list.push(Number(value.credit_amount))
      console.log(list)
      if (list.length !== 0){
        var total = list.reduce(add, 0);
        function add(a, b) {
          return a + b;
        }
        console.log(total)
        this.state.total=total
      } else {
        alert("jjj")
      }
      })
  }

  submitDataHandler=(e)=>{
    // alert('work on progress')
    let recieptNum = this.state.prefix+this.state.start_no+this.state.suffix

    console.log(this.state.holder)
    let cashAccntObj = this.state.accountList.filter(item=>item.type === 'CASH')
    console.log(this.state.accountList)
    console.log(cashAccntObj)
    let transactionObj = this.state.accountList.filter(item => item.name === this.state.selectedAcnt)

    let debitSection={}
    // debitSection.account = cashAccntObj[0].id
    debitSection.account = transactionObj[0].id
    debitSection.partner = null
    debitSection.debit_amount = this.state.total
    debitSection.credit_amount = 0
    console.log(debitSection)
    let output =[]
    this.state.holder.forEach(a=>{
      let creditSection = {}
      this.state.customerList.forEach(partner=>{
        if(partner.name === a.customer){
          creditSection.account = transactionObj[0].id
          creditSection.partner = partner.id
          creditSection.credit_amount = a.credit_amount
          creditSection.debit_amount = a.debit_amount
          console.log(creditSection)
          output.push(creditSection)
        }
      })
    })
    output.push(debitSection)
    console.log(output)

    let Data={
      reciept_no:recieptNum,
      journal_entry:{
        date:this.state.date,
        transaction_type:"COSTOMER_RECIEPT",
        description:this.state.narration,
        journal_item:output,
      }
    }
    console.log(Data)
    axios.post('customer_reciepts/customerReceipt/',Data).then(
      res=>{
        console.log(res.data)
      this.props.onCreateCustomerReciept(res.data)
      this.setState({customerRecieptPage:true})

    }
    ).catch(error=>{
      this.props.onCreateCustomerRecieptFail(error)
    })

  }
  // reciept_noChangeHandler=()=> {
  //   console.log(this.state.reciept_no)
  //   var mostBiggerInvoiceNoDict = this.state.recieptData.reduce(function (oldest, item) {
  //     return (oldest.reciept_no || 0) > item.reciept_no ? oldest : item;
  //   }, {});
  //   console.log(mostBiggerInvoiceNoDict['reciept_no'])
  //   let mostBiggerInvoiceNo = mostBiggerInvoiceNoDict['reciept_no']
  //   console.log(this.state.recieptData)
  //   if (this.state.recieptData.length===0 ) {
  //     this.state.reciept_no = 1
  //   }
  //    else {
  //     this.state.reciept_no = mostBiggerInvoiceNo + 1
  //   }
  // }
  openCustomerRecieptPage=()=>{
    return (
      <Redirect to="/customer-reciepts" />
    )
  }
  render(){
    console.log(this.state.holder)
    console.log(this.state.selectedAcnt)
    return(
      <div>
      {this.state.customerRecieptPage ? (this.openCustomerRecieptPage()): (null)}
          <br />

          <div className="row-wrapper1">
            <div><h1 className="ptag">Create Customer Reciept</h1></div>
          </div>
          <br />
          <div className="row-wrapper">
            <div>
              <label>RECEIPT NO:</label><br />
              <input
                readOnly
                className="grand"  />
            </div>
            <div>
              <label>ACCOUNT</label><br />
              <select
                  className="select"
                  onChange={(e) => this.setState({selectedAcnt:e.target.value})}
              >
                  <option value=""> </option>
                  {this.state.accountList.map((m,index)=>
                      <option
                          key={m.id}
                          value={m.name}
                      >
                        {m.name}
                      </option>
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
          <button
              className="addBtn"
              onClick={this.addItemHandler}>ADD+</button>
          <div className="itemBox">
            {this.state.holder.map((shareholder, idx) => (
              <div className="row-wrapper">
                      <div>
                        <br/>
                        <p>{idx+this.state.serial_no+1}</p>
                      </div>
                      <div>
                        <br />
                        <select className="select" onClick={this.handlePartnerChange(idx)}>
                        <option></option>
                          {this.state.partnerList.map((m,index) =>
                                <option
                                  key={index}
                                  value={m.name}>{m.name}</option>
                          )}
                        </select>
                      </div>
                      <div>
                        <br />
                        <input
                          className='grand'
                          type='number'
                          value={shareholder.credit_amount}
                          onChange={this.handleSubtotalChange(idx)}
                          name='amount'
                          id='amount'
                          />
                      </div>
                      <div>
                        <br />
                        {this.state.holder.length !== Number(1) ? (
                          <div>
                          <i onClick={(e,id)=>this.removeLineHandler(e,idx)} className="fas fa-times"></i>
                          </div>
                        ) :(null)}
                      </div>
              </div>
            ))}
          </div>
          <br />
          <div className="row-wrapper-btm-reciept">
            <div>
                <label>NARRATION</label><br />
                <input
                  className="narration"
                  name="narration"
                  onChange={this.handleInputChange}
                  value={this.state.narration}/>
              </div>
              <div>
              <label>TOTAL</label><br />
              <input
                  className='grand'
                  value={this.state.total}
                  type='number'
                  readOnly
                  />
              </div>

          </div><br />
          <div className="btn-gap-reciept">

          <div>
          <button className="cancelBtn" onClick={this.state.selectedAcnt ? (this.submitDataHandler) :(null)}>SAVE</button>
          </div>
          <div>
          <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
          </div>
          </div>
      </div>
    )
  }
}
const mapDispatchToProps = dispatch => {
    return {
        // onCreateCustomerReciept: (data) => dispatch(actions.createCustomerReciept(data)),
        onCreateCustomerReciept: (obj)=>dispatch(actions.createCustomerRecieptSuccess(obj)),
        onCreateCustomerRecieptFail: (error)=>dispatch(actions.createCustomerRecieptFail(error)),

    };
};
export default connect(null,mapDispatchToProps)(CreateRecieptPage);
