import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import ExpenseCategoryViewModal from '../../../../components/UI/Modal/ExpenseCategory/ExpenseCategoryViewModal';
import ExpenseCategoryEditModal from '../../../../components/UI/Modal/ExpenseCategory/ExpenseCategoryEditModal';
import ExpenseCategoryDeleteModal from '../../../../components/UI/Modal/ExpenseCategory/ExpenseCategoryDeleteModal';
// import SpotAreaViewModal from '../../../../components/UI/Modal/Area/SpotAreaViewModal';
// import SpotAreaEditModal from '../../../../components/UI/Modal/Area/SpotAreaEditModal';
// import SpotAreaDeleteModal from '../../../../components/UI/Modal/Area/SpotAreaDeleteModal';

import * as actions from '../../../../store/actions/index';

class ExpenseCategoryList extends Component {
  state ={
    expenseCategoryList:[],

    isEdit:false,
    isDelete:false,
    deleteId:null,
    editId:null,
    isView: false,
    editObject:[],


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
      this.loadExpenseCategories()

  }
  loadExpenseCategories=()=>{
      axios.get('expenses/expense-category/').then(
        res => {
          this.setState({expenseCategoryList:res.data});
        }
      )
  }

  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.expenseCategoryList.length
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
        let length = this.state.expenseCategoryList.length
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
        let length = this.state.expenseCategoryList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.expenseCategoryList.filter(item => { return item.id === id})
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
      const filterData = this.state.expenseCategoryList.filter(item => { return item.id === id})
      console.log(filterData)
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
  viewModal = () => {
      return(
        <ExpenseCategoryViewModal
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
      <ExpenseCategoryEditModal
          show={this.state.isEdit}
          close={this.editWindowClose}
          formData={this.state.editObject}
          editId={this.state.editId}
          editHandler={this.objEditHandler}
       />
    )
  }
  deleteModal =()=> {
    return(
      <ExpenseCategoryDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}
      />
    )
  }
  objEditHandler = (event,objTemp) => {
      // event.preventDefault()
      // objTemp.product_Cat =   this.state.product_CatList.map(item=>item.name === objTemp.product_Cat)[0].id

      axios.patch('/expenses/expense-category/' + objTemp.id + '/', objTemp).then(
          response => {
              console.log(response.data)
              this.setState({
                  isEdit: false,
              })
              this.viewWindowOpen(objTemp.id)
          }
      )
  }
  deleteHandler = (event) => {
    // event.preventDefault()
    let id = this.state.deleteId
    const updatedOrders = this.state.expenseCategoryList;
    let deleteObject = this.state.expenseCategoryList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('expenses/expense-category/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               areaList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  spotViewModal =()=>{
      return(
        <ExpenseCategoryViewModal
          show={this.props.expenseCategoryListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.expenseCategoryData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          />
      )
  }
  spotEditModal=()=>{
      return(
        <ExpenseCategoryEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.expenseCategoryData}
          editId={this.state.editId}
          productList={this.state.productList}
          editHandler={this.spotObjEditHandler}
        />
      )
  }

  spotDeletModal=()=>{
      return(
        <ExpenseCategoryDeleteModal
          show={this.props.isDeletePage}
          close={this.props.spotDeleteWindowClose}
          formData={this.props.expenseCategoryData}
          deleteHandler={this.spotObjDeleteHandler}
        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let updatedExpenseCategories = this.state.expenseCategoryList
    let deleteObject = this.state.expenseCategoryList.filter(item =>  item.id === id)
    console.log(deleteObject)
    let delIndex = updatedExpenseCategories.indexOf(deleteObject[0])
    console.log(delIndex)
    axios.delete('/expenses/expense-category/'+id).then(
       response => {
         console.log(response.data)
           updatedExpenseCategories.splice(delIndex,1)
           this.setState({
               expenseCategoryList: updatedExpenseCategories,

           })
          this.props.deleteExpenseCategorySuccess()
       }
    ).catch(error=>{
      this.props.deleteExpenseCategoryFail(error)
    })
  }
spotObjEditHandler=(event,obj)=>{
  let list = []
  list.push(obj)
  axios.patch('/expenses/expense-category/'+obj.id + '/',obj).then(
    response=>{
      this.props.editExpenseCategorySuccess(response.data)
      let updatedProducts = this.state.expenseCategoryList.map(obj => list.find(o=> o.id === obj.id) || obj)

      this.setState({expenseCategoryList:updatedProducts})
    }
  ).catch(error=>{
    this.props.editExpenseFail(error)
  })
}
  render(){
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.expenseCategoryList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.name}</td>
                 <td>
                   <i onClick={()=>this.viewWindowOpen(branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })
    return(
      <div>
      {this.state.isView ? (this.viewModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : (null)}
      {this.state.isEdit ? (this.editModal()) : null}
      {this.props.expenseCategoryListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        EXPENSE CATEGORY LIST
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>CATEGORY</th>
                <th>VIEW</th>

              </tr>

            </thead>
            <tbody>
            {this.state.expenseCategoryList.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.expenseCategoryList.length}
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
    expenseCategoryData:state.expenseCategory.expenseCategoryData,
    expenseCategoryListPageOpen:state.expenseCategory.expenseCategoryListPageOpen,
    isDeletePage:state.expenseCategory.isDeletePage,
    isEditPage:state.expenseCategory.isEditPage,

  }
}
const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.expenseCategoryViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.expenseCategoryEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.expenseCategoryEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.expenseCategoryDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.expenseCategoryDeleteWindowClose()),
      // spotObjEditHandler: (e,obj)=>dispatch(actions.areaObjEditHandler(e,obj)),
      // spotObjDeleteHandler: (id)=>dispatch(actions.areaObjDeleteHandler(id)),
      deleteExpenseCategorySuccess: ()=>dispatch(actions.deleteExpenseCategorySuccess()),
      deleteExpenseCategoryFail: (error)=>dispatch(actions.deleteExpenseCategoryFail(error)),

      editExpenseCategorySuccess: (data)=>dispatch(actions.editExpenseCategorySuccess(data)),
      editExpenseCategoryFail: (error)=>dispatch(actions.editExpenseCategoryFail(error)),

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(ExpenseCategoryList);
