import React , { Component } from 'react';
import axios from '../../axios'
import EditSettingsModel from '../../components/UI/Modal/Settings/SettingsEditModel';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import './Settings.css';

class DefaultSettings extends Component {
  state={
    isEditSettings:false,
    test:null,

    accountIdObj:{},
    accountList:[],
    defaultAccountList:[],
    SalesObj:{},
    PurchaseObj:{},
    CustomerObj:{},
    SupplierObj:{},
    accountList:[],

    salesAccntList:[],
    purchaseAccntList:[],
    customerAccntList:[],
    supplierAccntList:[],
  }
  componentDidMount(){
    // this.props.currentUser()
    // this.props.onDefaultAccountList();
    // this.props.onAccount()
    this.loadAccountDefault()
    this.loadAccount()
  }
  loadAccountDefault =()=>{
    axios.get('invoice/accountDefault/1/').then(
      res => {
        console.log(res.data)
        this.setState({
          accountIdObj:res.data,
          SalesObj:res.data.SalesAccont,
          CustomerObj:res.data.CustomerAccount,
          PurchaseObj:res.data.PurchaseAccont,
          SupplierObj:res.data.SupplierAccount,
        })
      }
    )
  }
  loadAccount =()=> {
    axios.get('invoice/account/').then(
      res=>{
        this.setState({
          accountList:res.data,
          salesAccntList:res.data.filter(item => item.type === "SALES"),
          purchaseAccntList:res.data.filter(item => item.type === "PURCHASE"),
          customerAccntList:res.data.filter(item => item.type === "RECIEVABLE"),
          supplierAccntList:res.data.filter(item => item.type === "PAYABLE"),

        })
      }
    )
  }

  EditSettings=()=>{
    this.setState({isEditSettings:true})
  }

  editWindowOpen=()=>{
    return(
      <EditSettingsModel
      show={this.state.isEditSettings}
      close={this.editWindowClose}
      SalesObj={this.state.SalesObj}
      PurchaseObj={this.state.PurchaseObj}
      CustomerObj={this.state.CustomerObj}
      SupplierObj={this.state.SupplierObj}
      editHandler={this.objEditHandler}
      salesAccntList={this.state.salesAccntList}
      purchaseAccntList={this.state.purchaseAccntList}
      customerAccntList={this.state.customerAccntList}
      supplierAccntList={this.state.supplierAccntList}

      />
    )
  }
  objEditHandler=(obj)=>{
    console.log(obj)
    // console.log(this.state.accountIdObj.isEmpty)
    if(JSON.stringify(this.state.accountIdObj) === '{}') {
      axios.post("invoice/accountDefault/",obj).then(response=>{
        console.log(response.data)
      })
    } else {
      axios.patch("invoice/accountDefault/1/",obj).then(
        response => {
          console.log(response.data)
        }
      )
    }

    let SalesObj1 = this.state.accountList.filter(item=> item.id === obj.SalesAccont)[0]
    let PurchaseObj1 = this.state.accountList.filter(item=> item.id === obj.PurchaseAccont)[0]
    let CustomerObj1 = this.state.accountList.filter(item=> item.id === obj.CustomerAccount)[0]
    let SupplierObj1 = this.state.accountList.filter(item=> item.id === obj.SupplierAccount)[0]


    if (SupplierObj1 !== undefined) {
      this.setState({
        SupplierObj:SupplierObj1,
      isEditSettings:false})
    }
    if (SalesObj1 !== undefined) {
      this.setState({
        SalesObj:SalesObj1,
      isEditSettings:false})
    }
    if (PurchaseObj1 !== undefined) {
      this.setState({
        PurchaseObj:PurchaseObj1,
        isEditSettings:false
      })
    }
    if (CustomerObj1 !== undefined) {
      this.setState({
        CustomerObj:CustomerObj1,
        isEditSettings:false
      })
    }


  }
  editWindowClose=()=>{
    this.setState({isEditSettings:false})
  }
  render() {
    console.log(this.state)
    console.log(Object.keys(this.state.accountIdObj).length)


    console.log(this.props)

    return (
      <div className="CreateInvoiceBox">
        {this.state.isEditSettings ? (this.editWindowOpen()) : null }
        <p>DefaultSettings</p>
        <div className="SettingsAcntBoxwrapper">
          <div>
            <label>Sales Account</label><br />
            <input value={this.state.SalesObj.name} readOnly />
          </div>
          <div>
            <label>Purchase Account</label><br />
            <input value={this.state.PurchaseObj.name} readOnly/>
          </div>
        </div>
        <br />
        <div className="SettingsAcntBoxwrapper">
          <div>
            <label>Customer Account</label><br />
            <input value={this.state.CustomerObj.name} readOnly/>
          </div>
          <div>
              <label>Supplier Account</label><br />
              <input value={this.state.SupplierObj.name} readOnly />
          </div>
        </div><br />

        <div style={{marginLeft:"200px"}}>
          <button className="cancelBtn" onClick={this.EditSettings}>{Object.keys(this.state.accountIdObj).length === 0 ? 'ADD' : 'EDIT'}</button>
        </div>
      </div>
    )
  }
}

const mapStateToProps =(state)=>{
  console.log(state)
  return {
    accountList: state.account.account,
    defaultAccountList: state.account.defaultAccount,

  }
}

const mapDispatchToProps = dispatch => {
  return {

    currentUser: ()=>dispatch(actions.currentUser()),
    onDefaultAccountList: () => dispatch( actions.defaultAccountList() ),
    onAccount: () => dispatch( actions.accountList() )


  }
}

export default connect(mapStateToProps,mapDispatchToProps)(DefaultSettings);
// <select className="select" onChange={(e)=>this.supplierHandler(e)}>
// <option value="">select</option>
//   {this.state.supplierAccntList.map((m,index) =>
//     <option key={m.id} value={m.name}>{m.name}</option>
//   )}
//   </select>
