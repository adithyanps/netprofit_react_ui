import React , { Component } from 'react';
import Pagex from '../../../components/UI/Pagination/Pagination';
import '../Sales.css';
import axios from '../../../axios';

import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpotRecieptViewModal from '../../../components/UI/Modal/Reciept/SpotRecieptViewModal';
import SpotRecieptEditModal from '../../../components/UI/Modal/Reciept/SpotRecieptEditModal';
import SpotRecieptDeleteModal from '../../../components/UI/Modal/Reciept/SpotRecieptDeleteModal';

import RecieptViewModal from '../../../components/UI/Modal/Reciept/RecieptViewModal';
import RecieptEditModal from '../../../components/UI/Modal/Reciept/RecieptEditModal';
import RecieptDeleteModal from '../../../components/UI/Modal/Reciept/RecieptDeleteModal';


import * as actions from '../../../store/actions/index';

class CustomerReciepts extends Component {

  state = {
    recieptData:[],
    accountList:[],
    expenseAccnts:[],
    partnerList:[],
    isEdit:false,
    invoice_number:null,
    isDelete:false,
    deleteId:null,
    editId:null,
    isView: false,
    formData:[],
    editObject:[],
    selectedName:null,

    start_date:new Date(),
    end_date:new Date(),

    perpage: 10,
    curr_page: 1,
    start_point: 0,
    end_point: null,
    prevDisabled: true,
    nxtDisabled: false,
    firstDisabled: true,
    lastDisabled: false
  }

componentDidMount(){
    this.setState({
        start_date:moment(new Date()).format('YYYY-MM-DD'),
        end_date:moment(new Date()).format('YYYY-MM-DD'),
        end_point: this.state.start_point + this.state.perpage,
          })
    this.loadRecieptData()
    this.loadAccount()
    this.loadPartner()
}

loadPartner=()=>{
    axios.get('masters/partner/').then(
      res => {
        this.setState({partnerList:res.data.filter(item => item.type !== 'SUPPLIER' )});
      }
    )
}

loadRecieptData=()=>{
    axios.get('customer_reciepts/customerReceipt/').then(
      res => {
        this.setState(
          {
            // recieptData:res.data,
            creditJrnlItem:res.data.map(items=>items.journal_entry.journal_item.filter((item)=>item.credit_amount>0)),
            debitJrnlItem:res.data.map(items=>items.journal_entry.journal_item.filter((item)=>item.debit_amount>0)),

          });
          this.RecieptDataHandler(res.data)
        console.log(res.data)
      }
    )
}

RecieptDataHandler=(data)=>{
    console.log(data)
    data.map((sample,index)=>{
      let creditJrnlItem=[];
      let debitJrnlItem=[];
      sample.journal_entry.journal_item.map((child,index)=>{
        this.state.accountList.map((acc,accIndex)=>{
          if (acc.id === child.account) {
            child.account = acc.name;
          }
        });
        this.state.partnerList.map((partner,pIndex)=>{
          if (partner.id === child.partner) {
            child.partner = partner.name;
          }
        });
        if(child.credit_amount > 0){
          creditJrnlItem.push(child);
        } else {
          debitJrnlItem = child;
        }
      });
      sample.journal_entry.journal_item = null;
      sample.journal_entry.creditJrnlItem = creditJrnlItem;
      sample.journal_entry.debitJrnlItem = debitJrnlItem;
    });
    console.log(data)
    this.setState({recieptData:data})

}

loadAccount=()=>{
      axios.get('/masters/account/').then(
        response=>{
          this.setState(
            {accountList:response.data,
            expenseAccnts:response.data.filter(item=>item.type=== "EXPENSE")})
        }
      )

}

pagexClickHandler = (pageNo) => {
      console.log(pageNo)
      let length = this.state.recieptData.length
      let pr_pg = this.state.perpage
      let page_count = Math.ceil(length/pr_pg)
      let st_pt = (pageNo-1)*pr_pg
      let ed_pt = (pageNo<page_count || length%pr_pg===0)? st_pt+pr_pg: st_pt + length%pr_pg

      if(pageNo === 1){
          this.setState({
              prevDisabled: true,
              firstDisabled: true,
              nxtDisabled: false,
              lastDisabled: false,

          })
      }
      else if(pageNo === page_count){
          this.setState({
              nxtDisabled: true,
              lastDisabled: true,
              prevDisabled: false,
              firstDisabled: false,
          })
      }
      else{
          this.setState({
              nxtDisabled: false,
              prevDisabled: false,
              firstDisabled: false,
              lastDisabled: false,
          })
      }

      this.setState({
          curr_page: pageNo,
          start_point: st_pt,
          end_point: ed_pt

      })
}

previousClickHandler = () => {
      if(this.state.curr_page > 1){
          this.pagexClickHandler(this.state.curr_page-1)
      }
}

nextClickHandler = () => {
      let length = this.state.recieptData.length
      let page_count = Math.ceil(length/this.state.perpage)
      if(this.state.curr_page < page_count){
          this.pagexClickHandler(this.state.curr_page+1)
      }
}

firstClickHandler = () => {
      if(this.state.curr_page > 1){
          this.pagexClickHandler(1)
      }
}

lastClickHandler = () => {
      let length = this.state.recieptData.length
      let page_count = Math.ceil(length/this.state.perpage)
      if(this.state.curr_page < page_count){
          this.pagexClickHandler(page_count)
      }
}

viewWindowOpen=(id)=>{
    // e.preventDefault()
      const filterData = this.state.recieptData.filter(item => { return item.id === id})
      console.log(filterData)
      console.log(filterData[0])
      this.setState({
          isView: true,
          viewObject: filterData[0],
      })
}

viewWindowClose = () => {
      this.setState({
          isView: false,
          viewObject: {},

      })
}

deleteWindowOpen= (e,id) =>{
    e.preventDefault()
    this.setState({isDelete:true,deleteId:id})
}

deleteWindowClose = () => {
    this.setState({
        isDelete: false
    })
}
editWindowOpen = (e,id) => {
  e.preventDefault()
    const filterData = this.state.recieptData.filter(item => { return item.id === id})
    console.log(filterData)
    filterData[0].journal_entry.creditJrnlItem.map(item => {
      delete item.id
      delete item.journal_entry
    }
    )
    delete filterData[0].journal_entry.debitJrnlItem.id
    delete filterData[0].journal_entry.debitJrnlItem.journal_entry


    console.log(filterData[0])

    this.setState({
        isEdit: true,
        editObject: filterData[0],
        editId:id,
    })
    console.log(filterData[0])
}

editWindowClose = () => {
    this.setState({
        isEdit: false,
        editObject: {},
    })
}

deleteHandler = (event) => {
  // event.preventDefault()
  let id = this.state.deleteId
  const updatedOrders = this.state.recieptData;
  let deleteObject = this.state.recieptData.filter(item =>  item.id === id)
  let delIndex = updatedOrders.indexOf(deleteObject[0])
  axios.delete('customer_reciepts/customerReceipt/'+id).then(
     response => {
         updatedOrders.splice(delIndex,1)
         this.setState({
             recieptData: updatedOrders,
             isDelete: false,
             isView:false
         })
     }
  )
}
objEditHandler = (event,objTemp) => {

console.log(objTemp)
    event.preventDefault()
    axios.patch('/customer_reciepts/customerReceipt/' + objTemp.id + '/', objTemp).then(
        response => {
            console.log(response.data)
            this.setState({
                isEdit: false,
            })
            this.viewWindowOpen(objTemp.id)
        }
    )
}
viewModal = () => {
    return(
      <RecieptViewModal
            show={this.state.isView}
            close={this.viewWindowClose}
            formData={this.state.viewObject}
            deletewindow={this.deleteWindowOpen}
            editwindow={this.editWindowOpen}
      />
    )
}

editModal =()=>{
  return(
    <RecieptEditModal
        show={this.state.isEdit}
        close={this.editWindowClose}
        formData={this.state.editObject}
        editId={this.state.editId}
        editHandler={this.objEditHandler}
        accountList={this.state.accountList}
        partnerList={this.state.partnerList}
     />
  )
}
deleteModal =()=> {
  return(
    <RecieptDeleteModal
        show={this.state.isDelete}
        close={this.deleteWindowClose}
        deleteHandler = {this.deleteHandler}
        formData={this.state.viewObject}
    />
  )
}



spotViewModal =()=>{
    return(
      <SpotRecieptViewModal
        show={this.props.customerRecieptPageOpen}
        close={this.props.spotViewWindowOpen}
        formData={this.props.recieptData}
        accountList={this.state.accountList}
        partnerList={this.state.partnerList}

        editwindow={this.props.spotEditWindowOpen}
        deletewindow={this.props.spotDeleteWindowOpen}
        debitJrnlItem={this.props.debitJrnlItem}
        creditJrnlItem={this.props.creditJrnlItem}
        />
    )
}

spotEditModal=()=>{
    console.log("aaaa")
    return(
      <SpotRecieptEditModal
        show={this.props.isEditPage}
        close={this.props.spotEditWindowClose}
        formData={this.props.recieptData}
        editId={this.state.editId}
        accountList={this.state.accountList}
        partnerList={this.state.partnerList}
        editHandler={this.spotObjEditHandler}
        debitJrnlItem={this.props.debitJrnlItem}
        creditJrnlItem={this.props.creditJrnlItem}

      />
    )
}

spotDeletModal=()=>{
    return(
      <SpotRecieptDeleteModal
      show={this.props.isDeletePage}
      close={this.props.spotDeleteWindowClose}
      formData={this.props.recieptData}
      accountList={this.state.accountList}
      partnerList={this.state.partnerList}
      deleteHandler={this.spotObjDeleteHandler}
      debitJrnlItem={this.props.debitJrnlItem}
      creditJrnlItem={this.props.creditJrnlItem}
      />
    )
}

spotObjDeleteHandler=(id)=>{
  console.log(id)
  let data = this.state.recieptData;
  console.log(data)
  let updatedReciepts = data
  let deleteObject = this.state.recieptData.filter(item =>  item.id === id)
  console.log(deleteObject)

  let delIndex = updatedReciepts.indexOf(deleteObject[0])
  console.log(delIndex)

  axios.delete('/customer_reciepts/customerReceipt/'+id).then(
     response => {
       console.log(response.data)
         updatedReciepts.splice(delIndex,1)
         this.setState({
             recieptData: updatedReciepts,
         })
        this.props.deleteCustomerRecieptSuccess()
     }
  ).catch(error=>{
    this.props.deleteCustomerRecieptFail(error)
  })
}
spotObjEditHandler=(event,obj)=>{
  let list = []
  list.push(obj)
  console.log(list)


  axios.patch('/customer_reciepts/customerReceipt/'+obj.id + '/',obj).then(
    response=>{
      console.log(response.data);

      this.props.editCustomerRecieptSuccess(response.data)
      console.log(obj);

      let data = []
      data.push(response.data)
        console.log(data)
        console.log(this.state.recieptData)
        data.map((sample,index)=>{
          let creditJrnlItem=[];
          let debitJrnlItem=[];
          sample.journal_entry.journal_item.map((child,index)=>{
            this.state.accountList.map((acc,accIndex)=>{
              if (acc.id === child.account) {
                child.account = acc.name;
              }
            });
            this.state.partnerList.map((partner,pIndex)=>{
              if (partner.id === child.partner) {
                child.partner = partner.name;
              }
            });
            if(child.credit_amount > 0){
              creditJrnlItem.push(child);
            } else {
              debitJrnlItem = child;
            }
          });
          sample.journal_entry.journal_item = null;
          sample.journal_entry.creditJrnlItem = creditJrnlItem;
          sample.journal_entry.debitJrnlItem = debitJrnlItem;
        });
          console.log(data)
          let updatedExpenses = this.state.recieptData.map(obj => data.find(o=> o.id === obj.id) || obj)
          console.log(data)

          this.setState({recieptData:updatedExpenses})

        }
  )
  .catch(error=>{
    console.log(error);
    this.props.editCustomerRecieptFail(error)
  })
}

handleInputChange = (event) => {
  event.preventDefault();
  console.log(event.target.name,event.target.value)
  let key = event.target.name
  let  value = event.target.value
this.setState({[key]:value})

}

filterHandler=(e)=>{
  if (this.state.selectedName === null) {
    axios.get('customer_reciepts/customerReceipt/'+'?start_date='+this.state.start_date+'&end_date='+this.state.end_date).then(
      response=>{
        // this.setState({invoiceData:response.data});
        console.log(response.data)
        this.RecieptDataHandler(response.data)
      }
    )
  } else {
    axios.get('customer_reciepts/customerReceipt/'+'?start_date='+this.state.start_date+'&end_date='+this.state.end_date+'&ExpenseAcct='+this.state.expenseAccnts.filter(item=>item.name === this.state.selectedName)[0].id).then(
      response=>{
        // this.setState({invoiceData:response.data});
        console.log(response.data)

        this.RecieptDataHandler(response.data)
      }
    )
  }
}
  render() {
    console.log(this.props.isEditPage)
    console.log(this.props)
    console.log(this.state)
    const itemlist = this.state.recieptData.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.reciept_no}</td>
                 <td>{branch.journal_entry.date}</td>
                 <td>{branch.journal_entry.debitJrnlItem.account}</td>
                 <td>{branch.journal_entry.debitJrnlItem.debit_amount}</td>
                 <td>
                   <i onClick={()=>this.viewWindowOpen(branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })

    return (
      <div>
      {this.state.isView ? (this.viewModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : (null)}
      {this.state.isEdit ? (this.editModal()) : null}
      {this.props.customerRecieptPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        Customer Reciept List
        <br />
        <div className="sales-invoice-filter">

          <div>
            <label>START DATE</label><br />
            <input
              className="dates"
              type='date'
              name='start_date'
              value={this.state.start_date}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
          <div>
            <label>END DATE</label><br />
            <input
              className="dates"
              type='date'
              name='end_date'
              value={this.state.end_date}
              onChange={this.handleInputChange}
              required='required'/>
          </div>

          <div>
          <label></label><br />
            <button className="cancelBtn" onClick={(e)=>this.filterHandler()}>FILTER</button>
          </div>
        </div>
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>RECIEPT No</th>
                <th>DATE</th>
                <th>CUSTOMER</th>
                <th>AMOUNT</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
            {this.state.recieptData.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.recieptData.length}
                    perpage_count={this.state.perpage}
                    page={this.state.curr_page}
                    click={this.pagexClickHandler}
                    prevClick={this.previousClickHandler}
                    nxtClick={this.nextClickHandler}
                    firstClick = {this.firstClickHandler}
                    lastClick = {this.lastClickHandler}
                    nxtDisabled = {this.state.nxtDisabled}
                    prevDisabled = {this.state.prevDisabled}
                    firstDisabled = {this.state.firstDisabled}
                    lastDisabled = {this.state.lastDisabled}
            />
        </div>
        </div>
    )
  }
}

const mapStateToProps = state => {
  return {

    recieptData:state.reciept.recieptData,
    customerRecieptPageOpen:state.reciept.customerRecieptPageOpen,
    isDeletePage:state.reciept.isDeletePage,
    isEditPage:state.reciept.isEditPage,
    debitJrnlItem:state.reciept.debitJrnlItem,
    creditJrnlItem:state.reciept.creditJrnlItem,
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    spotViewWindowOpen:()=>dispatch(actions.customerReceiptViewWindowClose()),
    spotEditWindowOpen:()=>dispatch(actions.customerReceiptEditWindowOpen()),
    spotEditWindowClose:()=>dispatch(actions.customerReceiptEditWindowClose()),
    spotDeleteWindowOpen:()=>dispatch(actions.customerReceiptDeleteWindowOpen()),
    spotDeleteWindowClose:()=>dispatch(actions.customerReceiptDeleteWindowClose()),
    spotObjEditHandler:(obj)=>dispatch(actions.customerReceiptObjEditHandler(obj)),
    spotObjDeleteHandler:(id)=>dispatch(actions.customerReceiptObjDeleteHandler(id)),

    deleteCustomerRecieptSuccess: ()=>dispatch(actions.deleteCustomerRecieptSuccess()),
    deleteCustomerRecieptFail: (error)=>dispatch(actions.deleteCustomerRecieptFail(error)),
    editCustomerRecieptSuccess: (data)=>dispatch(actions.editCustomerRecieptSuccess(data)),
    editCustomerRecieptFail: (error)=>dispatch(actions.editCustomerRecieptFail(error)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(CustomerReciepts);
