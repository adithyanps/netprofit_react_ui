import React , { Component } from 'react';
import axios from '../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../components/UI/Pagination/Pagination';
import PartnerViewModal from '../../../components/UI/Modal/Partner/PartnerViewModal';
import PartnerEditModal from '../../../components/UI/Modal/Partner/PartnerEditModal';
import PartnerDeleteModal from '../../../components/UI/Modal/Partner/PartnerDeleteModal';
import * as actions from '../../../store/actions/index';

class CustomersList extends Component {
  state = {
    partnerList : [],
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
    this.props.currentUser()

    this.loadPartner()
  }
  loadPartner=()=>{
      axios.get('invoice/partner/').then(
        res => {
          this.setState({partnerList:res.data.filter(item => item.type !== 'SUPPLIER' )});
        }
      )
  }

  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.partnerList.length
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
        let length = this.state.partnerList.length
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
        let length = this.state.partnerList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }
  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.partnerList.filter(item => { return item.id === id})
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
      const filterData = this.state.partnerList.filter(item => { return item.id === id})
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
        <PartnerViewModal
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
      <PartnerEditModal
          show={this.state.isEdit}
          close={this.editWindowClose}
          formData={this.state.editObject}
          editId={this.state.editId}
          editHandler={this.objEditHandler}
          partnerList={this.state.partnerList}
          currentUserData={this.props.currentUserData}
       />
    )
  }
  deleteModal =()=> {
    return(
      <PartnerDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}
      />
    )
  }
  objEditHandler = (event,objTemp) => {
      event.preventDefault()
      axios.patch('/invoice/partner/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.partnerList;
    let deleteObject = this.state.partnerList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('invoice/partner/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               partnerList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }
  render() {
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.partnerList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.customer_id}</td>
                 <td>{branch.created_date}</td>
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
      <table className="SalesInvoiceTable" >
          <thead>
            <tr>
              <th>SL NO</th>
              <th>CUSOTMER ID</th>
              <th>CREATE DATE</th>
              <th>NAME</th>
              <th>VIEW</th>
            </tr>
          </thead>
          <tbody>
          {this.state.partnerList.length >0 ? (itemlist): ( null )}
          </tbody>
      </table>
      <br />
      <div className="pagination">
          <Pagex
                  item_count={this.state.partnerList.length}
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
    currentUserData:state.currentUser.userData,
  }
}
const mapDispatchToProps = dispatch => {
    return {
      currentUser: ()=>dispatch(actions.currentUser()),
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CustomersList)
