import React , { Component } from 'react';
import Pagex from '../../../components/UI/Pagination/Pagination';
import axios from '../../../axios';

import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';
import SpotExpenseViewModal from '../../../components/UI/Modal/Expense/SpotExpenseViewModal';
import SpotExpenseDeleteModal from '../../../components/UI/Modal/Expense/SpotExpenseDeleteModal';
import SpotExpenseEditModal from '../../../components/UI/Modal/Expense/SpotExpenseEditModal';

import ExpenseViewModal from '../../../components/UI/Modal/Expense/ExpenseViewModal';
import ExpenseEditModal from '../../../components/UI/Modal/Expense/ExpenseEditModal';
import ExpenseDeleteModal from '../../../components/UI/Modal/Expense/ExpenseDeleteModal';


import * as actions from '../../../store/actions/index';

class ExpenseList extends Component {
  state={
    expenseDataList:[],
    categoryList:[],
    accountList:[],
    cashAccnts:[],
    expenseAccnts:[],
    start_date:new Date(),
    end_date:new Date(),
    selectedName:null,

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
    this.loadExpenseData()

    this.loadExpenseCategory()
    this.loadAccount()
    this.loadExpenseAccnts()
    this.loadCashAccnts()

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
  loadExpenseAccnts=()=>{
    axios.get('/invoice/account/?search=EXPENSE').then(
      res => {
        this.setState({expenseAccnts:res.data})
      }
    )
  }

  loadCashAccnts=()=>{
    axios.get('/invoice/account/?search=CASH').then(
      res => {
        this.setState({cashAccnts:res.data})
      }
    )
  }

  loadExpenseData=()=>{
    axios.get('/invoice/expenses/').then(
      res =>{
        this.setState(
          {
            // expenseDataList:res.data,
            creditJrnlItem:res.data.map(items=>items.journal_entry.journal_item.filter((item)=>item.credit_amount>0)),
            debitJrnlItem:res.data.map(items=>items.journal_entry.journal_item.filter((item)=>item.debit_amount>0)),
          });
        this.ExpenseDataHandlers(res.data)
      }
    )
  }
  ExpenseDataHandlers=(data)=>{
    console.log(data)

    data.map((sample,index) => {


      let creditJrnlItem=[];
      let debitJrnlItem=[];
      let accntName= ''

      sample.ExpenseAcct = accntName
      sample.CreditAcct = accntName
      console.log(sample)
      sample.journal_entry.journal_item.map((child,index)=>{
        this.state.accountList.map((acc,accIndex)=>{
          if (acc.id === child.account) {
            child.account = acc.name;
            accntName = acc.name
            // alert(creditName)
          }
        });

        if(child.credit_amount > 0){
          // creditJrnlItem.push(child);
          creditJrnlItem = child
          sample.CreditAcct = accntName

        } else {
          debitJrnlItem = child;
          sample.ExpenseAcct = accntName
        }
      });
      sample.journal_entry.journal_item = null;
      sample.journal_entry.creditJrnlItem = creditJrnlItem;
      sample.journal_entry.debitJrnlItem = debitJrnlItem;
      this.state.categoryList.map((cat,idx)=>{
        console.log(sample)

        // alert(sample.ExpenseCategory)
        if(sample.ExpenseCategory === cat.id){
          sample.ExpenseCategory = cat.name
        }

      });

      // this.state.expenseAccnts.map((exAcnt,indx)=>{
      //   if( sample.ExpenseAcct === exAcnt.id) {
      //     sample.ExpenseAcct = exAcnt.name
      //   }
      // });
      //
      // this.state.cashAccnts.map((chAcnt,indx)=>{
      //   if( sample.CreditAcct === chAcnt.id) {
      //     sample.CreditAcct = chAcnt.name
      //   }
      // })
    });
    console.log(data)
    this.setState({expenseDataList:data})

  }

  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

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
      delete filterData[0].journal_entry.creditJrnlItem.id
      delete filterData[0].journal_entry.creditJrnlItem.journal_entry

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
          categoryList={this.state.categoryList}
          cashAccnts={this.state.cashAccnts}
          expenseAccnts={this.state.expenseAccnts}
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
        categoryList={this.state.categoryList}
        cashAccnts={this.state.cashAccnts}
        expenseAccnts={this.state.expenseAccnts}
        editwindow={this.props.spotEditWindowOpen}
        deletewindow={this.props.spotDeleteWindowOpen}
      />
    )
  }
  spotEditModal=()=>{
      return(
        <SpotExpenseEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.expenseData}
          editId={this.state.editId}
          categoryList={this.state.categoryList}
          cashAccnts={this.state.cashAccnts}
          expenseAccnts={this.state.expenseAccnts}
          editHandler={this.spotObjEditHandler}

        />
      )
  }
  spotDeletModal=()=>{
      return(
        <SpotExpenseDeleteModal
          show={this.props.isDeletePage}
          close={this.props.spotDeleteWindowClose}
          formData={this.props.expenseData}
          categoryList={this.state.categoryList}
          cashAccnts={this.state.cashAccnts}
          expenseAccnts={this.state.expenseAccnts}
          deleteHandler={this.spotObjDeleteHandler}
        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let data = this.state.expenseDataList;
    console.log(data)
    let updatedExpenses = data
    let deleteObject = this.state.expenseDataList.filter(item =>  item.id === id)
    console.log(deleteObject)

    let delIndex = updatedExpenses.indexOf(deleteObject[0])
    console.log(delIndex)

    axios.delete('/invoice/expenses/'+id).then(
       response => {
         console.log(response.data)
           updatedExpenses.splice(delIndex,1)
           this.setState({
               expenseDataList: updatedExpenses,

           })
          this.props.deleteExpenseSuccess()
       }
    ).catch(error=>{
      this.props.deleteExpenseFail(error)
    })
  }

  spotObjEditHandler=(event,obj)=>{
    let list = []
    list.push(obj)
    console.log(list)


    axios.patch('/invoice/expenses/'+obj.id + '/',obj).then(
      response=>{
        console.log(response.data);

        this.props.editExpenseSuccess(response.data)
        console.log(obj);
        console.log(this.state.expenseDataList);

        let data = []
        data.push(response.data)
          console.log(data)
          console.log(this.state.expenseDataList)

            data.map((sample,index) => {


              let creditJrnlItem=[];
              let debitJrnlItem=[];
              let accntName= ''

              sample.ExpenseAcct = accntName
              sample.CreditAcct = accntName
              console.log(sample)
              console.log(this.state.accountList)


              sample.journal_entry.journal_item.map((child,index)=>{
                this.state.accountList.map((acc,accIndex)=>{
                  if (acc.id === child.account) {
                    child.account = acc.name;
                    accntName = acc.name
                    // alert(creditName)
                  }
                });

                if(child.credit_amount > 0){
                  // creditJrnlItem.push(child);
                  creditJrnlItem = child
                  sample.CreditAcct = accntName

                } else {
                  debitJrnlItem = child;
                  sample.ExpenseAcct = accntName
                }
              });
              sample.journal_entry.journal_item = null;
              sample.journal_entry.creditJrnlItem = creditJrnlItem;
              sample.journal_entry.debitJrnlItem = debitJrnlItem;
              this.state.categoryList.map((cat,idx)=>{
                console.log(sample)

                // alert(sample.ExpenseCategory)
                if(sample.ExpenseCategory === cat.id){
                  sample.ExpenseCategory = cat.name
                }

              });


            });
            console.log(data)
            let updatedExpenses = this.state.expenseDataList.map(obj => data.find(o=> o.id === obj.id) || obj)
            console.log(data)

            this.setState({expenseDataList:updatedExpenses})

          }
    )
    .catch(error=>{
      console.log(error);
      this.props.editExpenseFail(error)
    })
  }

  filterHandler=(e)=>{
    if (this.state.selectedName === null) {
      axios.get('invoice/expenses/'+'?start_date='+this.state.start_date+'&end_date='+this.state.end_date).then(
        response=>{
          // this.setState({invoiceData:response.data});
          console.log(response.data)
          this.ExpenseDataHandlers(response.data)        }
      )
    } else {
      axios.get('invoice/expenses/'+'?start_date='+this.state.start_date+'&end_date='+this.state.end_date+'&ExpenseAcct='+this.state.expenseAccnts.filter(item=>item.name === this.state.selectedName)[0].id).then(
        response=>{
          // this.setState({invoiceData:response.data});
          console.log(response.data)
          this.ExpenseDataHandlers(response.data)
        }
      )
    }
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    console.log(this.state.expenseDataList)
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
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        Expense List
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
            <label>ACCOUNT</label><br />
            <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
              <option value=""></option>
              {this.state.expenseAccnts.map((m ,index)=>
                  <option key={m.id}
                        value={m.name}>{m.name}</option>)
              }
          </select>
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

    deleteExpenseSuccess: ()=>dispatch(actions.deleteExpenseSuccess()),
    deleteExpenseFail: (error)=>dispatch(actions.deleteExpenseFail(error)),
    editExpenseSuccess: (data)=>dispatch(actions.editExpenseSuccess(data)),
    editExpenseFail: (error)=>dispatch(actions.editExpenseFail(error)),

  }
}

export default connect(mapStateToProps,mapDispatchToProps)(ExpenseList)
