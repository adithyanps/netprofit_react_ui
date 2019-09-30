import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';

import BranchViewModal from '../../../../components/UI/Modal/Branch/BranchViewModal';
import BranchEditModal from '../../../../components/UI/Modal/Branch/BranchEditModal';
import BranchDeleteModal from '../../../../components/UI/Modal/Branch/BranchDeleteModal';
// import SpotBranchViewModal from '../../../../components/UI/Modal/Branch/SpotBranchViewModal';
// import SpotBranchEditModal from '../../../../components/UI/Modal/Branch/SpotBranchEditModal';
// import SpotBranchDeleteModal from '../../../../components/UI/Modal/Branch/SpotBranchDeleteModal';

import * as actions from '../../../../store/actions/index';

class BranchList extends Component {
  state ={
    branchList:[],

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
      this.loadBranches()

  }
  loadBranches=()=>{
      axios.get('masters/branch/').then(
        res => {
          this.setState({branchList:res.data});
        }
      )
  }

  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.branchList.length
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
        let length = this.state.branchList.length
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
        let length = this.state.branchList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.branchList.filter(item => { return item.id === id})
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
      const filterData = this.state.branchList.filter(item => { return item.id === id})
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
        <BranchViewModal
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
      <BranchEditModal
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
      <BranchDeleteModal
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

      axios.patch('/masters/branch/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.branchList;
    let deleteObject = this.state.branchList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('masters/branch/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               branchList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  spotViewModal =()=>{
      return(
        <BranchViewModal
          show={this.props.branchListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.branchData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          />
      )
  }

  spotEditModal=()=>{
      return(
        <BranchEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.branchData}
          editId={this.state.editId}
          editHandler={this.spotObjEditHandler}
        />
      )
  }

  spotDeletModal=()=>{
      return(
        <BranchDeleteModal
        show={this.props.isDeletePage}
        close={this.props.spotDeleteWindowClose}
        formData={this.props.branchData}
        deleteHandler={this.spotObjDeleteHandler}
        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let updatedBranches = this.state.branchList
    let deleteObject = this.state.branchList.filter(item =>  item.id === id)
    console.log(deleteObject)
    let delIndex = updatedBranches.indexOf(deleteObject[0])
    console.log(delIndex)
    axios.delete('/masters/branch/'+id).then(
       response => {
         console.log(response.data)
           updatedBranches.splice(delIndex,1)
           this.setState({
               branchList: updatedBranches,

           })
          this.props.deleteBranchSuccess()
       }
    ).catch(error=>{
      this.props.deleteBranchFail(error)
    })
  }

spotObjEditHandler=(event,obj)=>{
  let list = []
  list.push(obj)
  axios.patch('/masters/branch/'+obj.id + '/',obj).then(
    response=>{
      this.props.editBranchSuccess(response.data)
      let updatedProducts = this.state.branchList.map(obj => list.find(o=> o.id === obj.id) || obj)

      this.setState({branchList:updatedProducts})
    }
  ).catch(error=>{
    this.props.editBranchFail(error)
  })
}
  render(){
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.branchList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.branch}</td>
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
      {this.props.branchListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        branch list
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>NAME</th>
                <th>VIEW</th>

              </tr>

            </thead>
            <tbody>
            {this.state.branchList.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.branchList.length}
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
    branchData:state.branch.branchData,
    branchListPageOpen:state.branch.branchListPageOpen,
    isDeletePage:state.branch.isDeletePage,
    isEditPage:state.branch.isEditPage,

  }
}
const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.branchViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.branchEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.branchEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.branchDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.branchDeleteWindowClose()),
      // spotObjEditHandler: (e,obj)=>dispatch(actions.branchObjEditHandler(e,obj)),
      // spotObjDeleteHandler: (id)=>dispatch(actions.branchObjDeleteHandler(id)),
      deleteBranchSuccess: ()=>dispatch(actions.deleteBranchSuccess()),
      deleteBranchFail: ()=>dispatch(actions.deleteBranchFail()),
      editBranchSuccess: (data)=>dispatch(actions.editBranchSuccess(data)),
      editBranchFail: (error)=>dispatch(actions.editBranchFail(error)),

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(BranchList);
