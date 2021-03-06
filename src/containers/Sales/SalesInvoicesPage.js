import React , { Component } from 'react';
import './Sales.css';
import SalesNav from '../../components/Sales/Layout/SalesNav';
import axios from '../../axios';
import Pagex from '../../components/UI/Pagination/Pagination';
import { withRouter } from "react-router";
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import moment from 'moment';

import {Button, Table, Modal} from 'react-bootstrap';
import ViewModal from '../../components/UI/Modal/Invoice/InvoiceViewModal';
import DeleteModal from '../../components/UI/Modal/Invoice/DeleteInvoiceModal';
import EditModal from '../../components/UI/Modal/Invoice/EditInvoiceModal';
import ViewFromSalesInvoice from '../../components/UI/Modal/Invoice/ViewFromSalesInvoice';
import DeleteFromSalesInvoice from '../../components/UI/Modal/Invoice/DeleteFromSalesInvoice';
import EditFromSalesInvoice from '../../components/UI/Modal/Invoice/EditFromSalesInvoice';

import * as actions from '../../store/actions/index';

class SalesInvoicesPage extends Component {
  state={
    invoiceData:[],
    branchList:[],
    customerList:[],
    settingsAcnt:[],
    productList:[],
    formData:[],
    editObject:[],
    isEdit:false,
    invoice_number:null,
    isDelete:false,
    deleteId:null,
    editId:null,
    isView: false,
    selectedName:null,

    start_date:null,
    end_date:null,
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
      end_point: this.state.start_point + this.state.perpage

    })
    this.loadInvoiceData()
    this.loadCustomer()
    this.loadSettingsAccnt()
    this.loadBranches()
    this.loadProducts()


  }
  componentWillMount(){
    this.setState({salesPageOpen:this.props.salesPageOpen})
  }
  loadBranches=()=>{
      axios.get('masters/branch/').then(
        res => {
          this.setState({branchList:res.data});
        }
      )
  }
  loadProducts=()=>{
      axios.get('masters/product/').then(
        res => {
          this.setState({productList:res.data});
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

  loadInvoiceData(){
    axios.get('sales/salesInvoice/').then(
      res => {
        console.log(res.data)
        this.InvoiceDataHandler(res.data)
      }
    )
  }
  InvoiceDataHandler=(data)=>{
    console.log(typeof data)
    console.log( data)

    data.map((sample,index)=>{
      let childItemSample = []
      let itemName=''
      this.state.branchList.map((branch,idx)=>{
        if(sample.branch === branch.id){
          sample.branch = branch.branch
        }
      })

      this.state.customerList.map((customer,idx)=>{
        if(sample.customer===customer.id){
          sample.customer = customer.name
        }
      })

      // sample.child.map((childItem,index)=>{
      //   console.log(this.state.productList)
      //   childItemSample.push(childItem)
      //
      //   this.state.productList.map((product,idx)=>{
      //     console.log(product)
      //     console.log(childItem)
      //
      //     if( childItem.item === product.id) {
      //       console.log(childItem)
      //
      //       childItem.item = product.item;
      //       itemName = product.item
      //     }
      //   })
      // })
      // sample.childItem = childItemSample

    });
    console.log(data)
    this.setState({invoiceData:data})

  }
  loadSettingsAccnt=()=>{
    axios.get('masters/accountDefault/1/').then(
      res => {
        this.setState({settingsAcnt:res.data});
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

  salesViewModal =()=>{
    return(
      <ViewFromSalesInvoice
            show={this.props.salesPageOpen}
            close={this.props.salesViewWindowClose}
            formData={this.props.invoiceData}
            deletewindow={this.props.salesDeleteWindowOpen}
            editwindow={this.props.salesEditWindowOpen}
            customerList={this.state.customerList}
            branchList={this.state.branchList}
      />
    )
  }

  salesDeleteModal = () => {
    return(
      <DeleteFromSalesInvoice
          show={this.props.isDeletePage}
          close={this.props.salesDeleteWindowClose}
          deleteHandler = {this.spotObjDeleteHandler}
          formData={this.props.invoiceData}
          customerList={this.state.customerList}
          branchList={this.state.branchList}/>
        )
  }

  salesEditModal=()=>{
    return(
      <EditFromSalesInvoice
          show={this.props.isEditPage}
          close={this.props.salesEditWindowClose}
          formData={this.props.invoiceData}
          editId={this.state.editId}
          editHandler={this.spotObjEditHandler}
          settingsAcnt={this.state.settingsAcnt}
          customerList={this.state.customerList}
          branchList={this.state.branchList}
          />
    )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let data = this.state.invoiceData;
    console.log(data)
    let updatedInvoices = data
    let deleteObject = this.state.invoiceData.filter(item =>  item.id === id)
    console.log(deleteObject)

    let delIndex = updatedInvoices.indexOf(deleteObject[0])
    console.log(delIndex)

    axios.delete('/sales/salesInvoice/'+id).then(
       response => {
         console.log(response.data)
           updatedInvoices.splice(delIndex,1)
           this.setState({
               invoiceData: updatedInvoices,

           })
          this.props.deleteInvoiceSucces()
       }
    ).catch(error=>{
      this.props.deleteInvoiceFail(error)
    })
  }
  spotObjEditHandler=(event,obj)=>{
    let list = []
    list.push(obj)
    console.log(obj)
    axios.patch('/sales/salesInvoice/'+obj.id + '/',obj).then(
      response=>{

        this.props.editInvoiceSuccess(response.data);
        console.log(response.data)
        // let data = obj
        console.log(obj)
        let updatedInvoices = this.state.invoiceData.map(obj => list.find(o=> o.id === obj.id) || obj)
        let data = updatedInvoices
        data.map((sample,index)=>{
          this.state.customerList.map((item,id)=>{
            if(sample.customer === item.id){
              sample.customer = item.name
            }
          })
          this.state.branchList.map((item,id)=>{
            if(sample.branch === item.id){
              sample.branch = item.branch
            }
          })
        })
        console.log(data,'modified')

        // this.InvoiceDataHandler(updatedInvoices)

        this.setState({invoiceData:data})
      }
    ).catch(error=>{
      this.props.editInvoiceFail(error);
      console.log(error)
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
            productList = {this.state.productList}
            branchList = {this.state.branchList}
            customerList = {this.state.customerList}

      />
    )
  }

  viewWindowOpen=(id)=>{
    // e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
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

  deleteHandler = (event) => {
    event.preventDefault()
    let id = this.state.deleteId
    const updatedOrders = this.state.invoiceData;
    let deleteObject = this.state.invoiceData.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('sales/salesInvoice/'+id).then(
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
                editHandler={this.objEditHandler}
                settingsAcnt={this.state.settingsAcnt}
                customerList={this.state.customerList}

            />
      );
  }
  objEditHandler = (event,obj) => {
      event.preventDefault()
      console.log(typeof obj,'test')

      let data = []
      console.log(obj,'sccs')

      console.log(data,'sccs')

      axios.patch('/sales/salesInvoice/' + obj.id + '/', obj).then(
          response => {
              console.log(response.data)
              this.setState({
                  isEdit: false,
              })
              this.viewWindowOpen(obj.id)
          }
      )
  }
  editWindowOpen = (e,id) => {
    e.preventDefault()
      const filterData = this.state.invoiceData.filter(item => { return item.id === id})
      filterData[0].child.map(item => delete item.id)
      filterData[0].child.map(item=> delete item.key)

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
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }
  filterHandler=(e)=>{
    if (this.state.selectedName === null) {
      axios.get('sales/salesInvoice'+'?start_date='+this.state.start_date+'&end_date='+this.state.end_date).then(
        response=>{
          this.setState({invoiceData:response.data});
        }
      )
    } else {
      axios.get('sales/salesInvoice/'+ '?start_date='+this.state.start_date+'&end_date='+this.state.end_date+'&customer='+this.state.selectedName).then(
        response=>{
          this.setState({invoiceData:response.data});

        }
      )

    }


  }

  render(){
    console.log(this.props.invoiceData)
    console.log(this.props.salesPageOpen)

    console.log('edit' , this.state)
    console.log('props' , this.props)

    const itemlist = this.state.invoiceData.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.invoice_no}</td>
                 <td>{branch.date}</td>
                 <td>{branch.customer}</td>
                 <td>{branch.grant_total}</td>
                 <td>{String(branch.status)}</td>
                 <td>
                   <i onClick={()=>this.viewWindowOpen(branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })
    return(
      <div className="SalesInvoicesWrapper">
      {this.state.isView ? (this.viewModal()) : null}
      {this.state.isDelete ? (this.deleteModal()) : (null)}
      {this.state.isEdit ? (this.editModal()) : null}
      {this.props.salesPageOpen ? (this.salesViewModal()) : (null)}
      {this.props.isDeletePage ? (this.salesDeleteModal()) : (null)}
      {this.props.isEditPage ? (this.salesEditModal()) : (null)}

        <div>
           <SalesNav />
       </div>
        <div className="SalesInvoiceBox">
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
              <label>COSTUMER</label><br />
              <select className="select" onChange={(e) => this.setState({selectedName:e.target.value})}>
                <option value=""></option>
                {this.state.customerList.map((m ,index)=>
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
                  <th>INVOICE No</th>
                  <th>DATE</th>
                  <th>CUSTOMER</th>
                  <th>GRAND TOTAL</th>
                  <th>STATUS</th>
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

  const mapStateToProps = state => {
    return {

      invoiceData:state.salesInvoice.invoiceData,
      salesPageOpen:state.salesInvoice.salesPageOpen,
      isDeletePage:state.salesInvoice.isDeletePage,
      isEditPage:state.salesInvoice.isEditPage,

    }
  }
  const mapDispatchToProps = (dispatch) => {
    return{
      salesViewWindowClose:()=>dispatch(actions.salesViewWindowClose()),
      salesDeleteWindowOpen:()=>dispatch(actions.salesDeleteWindowOpen()),
      salesDeleteWindowClose:()=>dispatch(actions.salesDeleteWindowClose()),
      salesDeleteHandler:(id)=>dispatch(actions.salesDeleteHandler(id)),
      salesEditWindowOpen:()=>dispatch(actions.salesEditWindowOpen()),
      salesEditWindowClose:()=>dispatch(actions.salesEditWindowClose()),
      salseObjEditHandler:(obj)=>dispatch(actions.salseObjEditHandler(obj)),

      deleteInvoiceSucces: ()=>dispatch(actions.deleteInvoiceSucces()),
      deleteInvoiceFail: (error)=>dispatch(actions.deleteInvoiceFail(error)),
      editInvoiceSuccess: (data)=>dispatch(actions.editInvoiceSuccess(data)),
      editInvoiceFail: (error)=>dispatch(actions.editInvoiceFail(error)),

    }
  }
export default connect(mapStateToProps,mapDispatchToProps)(SalesInvoicesPage);
