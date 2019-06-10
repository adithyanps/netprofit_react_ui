import React , { Component } from 'react';
import Pagex from '../../../components/UI/Pagination/Pagination';
import axios from '../../../axios';

import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpotExpenseViewModal from '../../../components/UI/Modal/Expense/SpotExpenseViewModal';
import ExpenseViewModal from '../../../components/UI/Modal/Expense/ExpenseViewModal';
import ExpenseEditModal from '../../../components/UI/Modal/Expense/ExpenseEditModal';
import ExpenseDeleteModal from '../../../components/UI/Modal/Expense/ExpenseDeleteModal';


import * as actions from '../../../store/actions/index';

class ExpenseList extends Component {
  state={
    expenseDataList:[],
    categoryList:[],
    accountList:[],
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
        end_point: this.state.start_point + this.state.perpage,
          })
    this.loadExpenseData()
    this.loadExpenseCategory()
    this.loadAccount()
  }
  loadExpenseData=()=>{
    axios.get('/invoice/expenses/').then(
      res =>{
        this.ExpenseDataHandler(res.data)
      }
    )
  }
  loadExpenseCategory=()=>{
    axios.get('/invoice/expense-category/').then(
      response=>{this.setState({categoryList:response.data});
    }
    )
  }
  loadAccount=()=>{
    axios.get('/invoice/account/').then(
      response=>{this.setState({accountList:response.data});
    }
    )
  }

  ExpenseDataHandler=(data)=>{
    console.log(data)
    data.map((sample,index) => {
      this.state.categoryList.map((cat,idx)=>{
        if(cat.id === sample.ExpenseCategory){
          sample.ExpenseCategory = cat.name
        }
      });

      this.state.accountList.map((acnt,idx)=>{
        if(acnt.id === sample.CreditAcct) {
          sample.CreditAcct = acnt.name
        }
        if (acnt.id === sample.ExpenseAcct) {
            sample.ExpenseAcct = acnt.name
          }
      });

      let creditJrnlItem=[];
      let debitJrnlItem=[];
      sample.journal_entry.journal_item.map((child,index)=>{
        this.state.accountList.map((acc,accIndex)=>{
          if (acc.id === child.account) {
            child.account = acc.name;
          }
        });

        if(child.credit_amount > 0){
          // creditJrnlItem.push(child);
          creditJrnlItem = child
        } else {
          debitJrnlItem = child;
        }
      });
      sample.journal_entry.journal_item = null;
      sample.journal_entry.creditJrnlItem = creditJrnlItem;
      sample.journal_entry.debitJrnlItem = debitJrnlItem;
    });
    console.log(data)
    this.setState({expenseDataList:data})

  }
  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.expenseDataList.length
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
        let length = this.state.expenseDataList.length
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
        let length = this.state.expenseDataList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }
  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.expenseDataList.filter(item => { return item.id === id})
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
      const filterData = this.state.expenseDataList.filter(item => { return item.id === id})
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
    const updatedOrders = this.state.expenseDataList;
    let deleteObject = this.state.expenseDataList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('invoice/expenses/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               expenseDataList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  objEditHandler = (event,objTemp) => {

    // let objTemp = obj
    // delete objTemp.journal_entry.debitJrnlItem
    // delete objTemp.journal_entry.creditJrnlItem
  console.log(objTemp)
      event.preventDefault()
      axios.patch('/invoice/expenses/' + objTemp.id + '/', objTemp).then(
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
        <ExpenseViewModal
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
      <ExpenseEditModal
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
      <ExpenseDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}
      />
    )
  }

  spotViewModal=()=>{
    return(
      <SpotExpenseViewModal
        show={this.props.expenseListPageOpen}
        close={this.props.spotViewWindowOpen}
        formData={this.props.expenseData}
      />
    )
  }
  render() {
    const itemlist = this.state.expenseDataList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.Doc_no}</td>
                 <td>{branch.Date}</td>
                 <td>{branch.ExpenseCategory}</td>
                 <td>{branch.ExpenseAcct}</td>
                 <td>{branch.Amount}</td>
                 <td>
                   <i onClick={()=>this.viewWindowOpen(branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })

    return(
      <div>
      {this.state.isView ? (this.viewModal()) : null}
      {this.state.isEdit ? (this.editModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : (null)}

      {this.props.expenseListPageOpen ? (this.spotViewModal()) : (null)}

        Expense List
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>Doc No</th>
                <th>DATE</th>
                <th>CATEGORY</th>
                <th>EXP. ACCOUNT</th>
                <th>AMOUNT</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
            {this.state.expenseDataList.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.expenseDataList.length}
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
    expenseData:state.expense.expenseData,
    expenseListPageOpen:state.expense.expenseListPageOpen,
    isDeletePage:state.expense.isDeletePage,
    isEditPage:state.expense.isEditPage,
  }
}

const mapDispatchToProps =(dispatch)=>{
  return{
    spotViewWindowOpen:()=>dispatch(actions.expenseViewWindowClose()),
    spotEditWindowOpen:()=>dispatch(actions.expenseEditWindowOpen()),
    spotEditWindowClose:()=>dispatch(actions.expenseEditWindowClose()),
    spotDeleteWindowOpen:()=>dispatch(actions.expenseDeleteWindowOpen()),
    spotDeleteWindowClose:()=>dispatch(actions.expenseDeleteWindowClose()),
    spotObjEditHandler:(obj)=>dispatch(actions.expenseObjEditHandler(obj)),
    spotObjDeleteHandler:(id)=>dispatch(actions.expenseObjDeleteHandler(id)),
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseList)