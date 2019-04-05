import React , { Component } from 'react';
import './Sales.css';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import axios from '../../axios';
import Pagex from '../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import {Button, Table, Modal} from 'react-bootstrap';
import ViewModal from '../../components/UI/Modal/Invoice/InvoiceViewModal';
import DeleteModal from '../../components/UI/Modal/Invoice/DeleteInvoiceModal';
import EditModal from '../../components/UI/Modal/Invoice/EditInvoiceModal';

class SalesInvoicesPage extends Component {
  state={
    invoiceData:[],
    isEdit:false,
    invoice_number:null,
    isDelete:false,
    deleteId:null,
    editId:null,
    isView: false,
    formData:[],
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
    this.loadInvoiceData()
    this.setState({
        end_point: this.state.start_point + this.state.perpage
    })
  }
  loadInvoiceData(){
    axios.get('invoice/parantdata').then(
      res => {
        this.setState({invoiceData:res.data});
        console.log(res.data)
      }
    )
  }
  pagexClickHandler = (pageNo) => {
      console.log(pageNo)
      let length = this.state.invoiceData.length
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
      let length = this.state.invoiceData.length
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
      let length = this.state.invoiceData.length
      let page_count = Math.ceil(length/this.state.perpage)
      if(this.state.curr_page < page_count){
          this.pagexClickHandler(page_count)
      }
  }

  viewWindowOpen=(e,id)=>{
    e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
      console.log(filterData)
      console.log(filterData[0])
      this.setState({
          isView: true,
          viewObject: filterData[0],
      })
  }

  viewModal = () => {
    return(
      <ViewModal
            show={this.state.isView}
            close={this.viewWindowClose}
            formData={this.state.viewObject}
            deletewindow={this.deleteWindowOpen}
            editwindow={this.editWindowOpen}
      />
    )
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

  deleteHandler = (event) => {
    event.preventDefault()
    let id = this.state.deleteId
    const updatedOrders = this.state.invoiceData;
    let deleteObject = this.state.invoiceData.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('invoice/parantdata/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               invoiceData: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  deleteModal = () => {
    return(
      <DeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}/>
        )
  }

  deleteWindowClose = () => {
      this.setState({
          isDelete: false

      })
  }

  editModal = () => {
      return(
          <EditModal
                show={this.state.isEdit}
                close={this.editWindowClose}
                formData={this.state.editObject}
                editId={this.state.editId}
                childObject={this.state.editObject.child}
            />
      );
  }
  editWindowOpen = (e,id) => {
    e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
      this.setState({
          isEdit: true,
          editObject: filterData[0],
          editId:id,
      })
  }
  editWindowClose = () => {
      this.setState({
          isEdit: false,
          editObject: {},
      })
  }

  render(){
    console.log(this.state)
    const itemlist = this.state.invoiceData.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.doc_no}</td>
                 <td>{branch.date}</td>
                 <td>car fuel</td>
                 <td>vehicle Expense</td>
                 <td>{branch.total_amount}</td>
                 <td>
                   <i onClick={(e)=>this.viewWindowOpen(e,branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })
    return(
      <div className="SalesInvoicesWrapper">
      {this.state.isView ? (this.viewModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : (null)}
      {this.state.isEdit ? (this.editModal()) : null}

        <div>
           <SalesNav />
       </div>
        <div className="SalesInvoiceBox">

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
                  {this.state.invoiceData.length >0 ? (itemlist): ( null )}
              </tbody>
          </table>
          <br />
          <div className="pagination">
              <Pagex item_count={this.state.invoiceData.length}
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

      </div>
    )
  }
  }
export default SalesInvoicesPage;


//   return(
//     <div>
//     <div className="SalesInvoicesWrapper">
//       <div>
//       <SalesNav />
//       </div>
//       <div className="CreateInvoiceBox">
//
//           <table>
//             <thead>
//               <tr>
//                 <th>SL NO</th>
//                 <th>Doc No</th>
//                 <th>DATE</th>
//                 <th>CATEGORY</th>
//                 <th>EXP. ACCOUNT</th>
//                 <th>AMOUNT</th>
//                 <th>VIEW</th>
//               </tr>
//             </thead>
//             <tbody>
//             {this.state.InvoiceDataList.length >0 ? (itemlist): (<div>there is no saved data</div>)}
//             </tbody>
//           </table>
//
//
//
//       </div>
//       </div>
//       <div style={{textAlign:'center'}}>
//       <Pagex item_count={this.state.InvoiceDataList.length}
//           perpage_count={this.state.perpage}
//           page={this.state.curr_page}
//           click={this.pagexClickHandler}
//           prevClick={this.previousClickHandler}
//           nxtClick={this.nextClickHandler}
//           firstClick = {this.firstClickHandler}
//           lastClick = {this.lastClickHandler}
//           nxtDisabled = {this.state.nxtDisabled}
//           prevDisabled = {this.state.prevDisabled}
//           firstDisabled = {this.state.firstDisabled}
//           lastDisabled = {this.state.lastDisabled}  />
//       </div>
//     </div>
//   )
// }
// }
