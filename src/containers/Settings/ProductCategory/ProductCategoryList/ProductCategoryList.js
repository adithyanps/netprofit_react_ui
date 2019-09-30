import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import ProductCategoryViewModal from '../../../../components/UI/Modal/ProductCategory/ProductCategoryViewModal';
import ProductCategoryEditModal from '../../../../components/UI/Modal/ProductCategory/ProductCategoryEditModal';
import ProductCategoryDeleteModal from '../../../../components/UI/Modal/ProductCategory/ProductCategoryDeleteModal';
import SpotProductCategoryViewModal from '../../../../components/UI/Modal/ProductCategory/SpotProductCategoryViewModal';
import SpotProductCategoryEditModal from '../../../../components/UI/Modal/ProductCategory/SpotProductCategoryEditModal';
import SpotProductCategoryDeleteModal from '../../../../components/UI/Modal/ProductCategory/SpotProductCategoryDeleteModal';

import * as actions from '../../../../store/actions/index';

class ProductCategoryList extends Component {
  state ={
    product_CatList:[],
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
      this.loadProductCats()
      this.props.getAllProductCategoty()

  }
  loadProductCats=()=>{
      axios.get('masters/product-category/').then(
        res => {
          let data = res.data;
          let dataTemp = res.data;
          data.map((sample,index)=>{
            dataTemp.map((proCat)=>{
              if (proCat.id === sample.ParentCategory) {
                sample.ParentCategory = proCat.name;
              }
            })
          })
          this.setState({product_CatList:data});
        }
      )
  }

  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.product_CatList.length
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
        let length = this.state.product_CatList.length
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
        let length = this.state.product_CatList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.product_CatList.filter(item => { return item.id === id})
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
      const filterData = this.state.product_CatList.filter(item => { return item.id === id})
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
        <ProductCategoryViewModal
              show={this.state.isView}
              close={this.viewWindowClose}
              formData={this.state.viewObject}
              deletewindow={this.deleteWindowOpen}
              editwindow={this.editWindowOpen}
              product_CatList={this.state.product_CatList}

        />
      )
  }

  editModal =()=>{
    return(
      <ProductCategoryEditModal
          show={this.state.isEdit}
          close={this.editWindowClose}
          formData={this.state.editObject}
          editId={this.state.editId}
          editHandler={this.objEditHandler}
          product_CatList={this.state.product_CatList}

       />
    )
  }
  deleteModal =()=> {
    return(
      <ProductCategoryDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}
          product_CatList={this.state.product_CatList}

      />
    )
  }
  objEditHandler = (event,objTemp) => {

      axios.patch('/masters/product-category/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.product_CatList;
    let deleteObject = this.state.product_CatList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('masters/product-category/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               product_CatList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  spotViewModal =()=>{
      return(
        <SpotProductCategoryViewModal
          show={this.props.productCategoryListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.productCategoryData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          product_CatList={this.state.product_CatList}
          />
      )
  }

  spotEditModal=()=>{
      return(
        <SpotProductCategoryEditModal
            show={this.props.isEditPage}
            close={this.props.spotEditWindowClose}
            formData={this.props.productCategoryData}
            editId={this.state.editId}
            editHandler={this.spotObjEditHandler}
            product_CatList={this.state.product_CatList}
        />
      )
  }

  spotDeletModal=()=>{
      return(
        <SpotProductCategoryDeleteModal
        show={this.props.isDeletePage}
        close={this.props.spotDeleteWindowClose}
        formData={this.props.productCategoryData}
        deleteHandler={this.spotObjDeleteHandler}
        product_CatList={this.state.product_CatList}

        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    // const updatedOrders = this.state.productList;
    console.log(updatedOrders)
    let data = this.state.product_CatList;
    data.map((sample,index)=>{
      this.state.product_CatList.map((proCat)=>{
        if (proCat.id === sample.ParentCategory) {
          sample.ParentCategory = proCat.name;
        }
      })
    })
    let updatedOrders = data
    let deleteObject = this.state.product_CatList.filter(item =>  item.id === id)
    console.log(deleteObject)

    let delIndex = updatedOrders.indexOf(deleteObject[0])
    console.log(delIndex)

    axios.delete('/masters/product-category/'+id).then(
       response => {
         console.log(response.data)
           updatedOrders.splice(delIndex,1)
           this.setState({
               product_CatList: updatedOrders,
           })
          this.props.deleteProductCategorySuccess()
       }
    ).catch(error=>{
      this.props.deleteProductCategoryFail(error)
    })
  }
  spotObjEditHandler = (event,obj)=>{
    console.log(obj)
    let list = []
    list.push(obj)
    axios.patch('/masters/product-category/' + obj.id + '/',obj).then(
      response => {
        console.log(response.data);
        this.props.editProductCategorySuccess(response.data)

        let updatedProductCategories = this.state.product_CatList.map(obj => list.find(o=> o.id === obj.id) || obj)
        console.log(updatedProductCategories)
        let data = updatedProductCategories;
        data.map((sample,index)=>{
          this.state.product_CatList.map((proCat)=>{
            if (proCat.id === sample.ParentCategory) {
              sample.ParentCategory = proCat.name;

            }
          })
        })
        console.log(data)
        this.setState({product_CatList:data})
      }
    )
  }
  render(){
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.product_CatList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.name}</td>
                 <td>{branch.ParentCategory}</td>
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
      {this.state.isEdit ? (this.editModal()) : (null)}
      {this.props.productCategoryListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

      <table className="SalesInvoiceTable" >
          <thead>
            <tr>
              <th>SL NO</th>
              <th>NAME</th>
              <th>CATEGORY</th>
              <th>VIEW</th>
            </tr>

          </thead>
          <tbody>
          {this.state.product_CatList.length >0 ? (itemlist): ( null )}
          </tbody>
      </table>
      <br />
      <div className="pagination">
          <Pagex
                  item_count={this.state.product_CatList.length}
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
  console.log(state)
  return {
    productCategoryData:state.productCategory.productCategoryData,
    productCategoryListPageOpen:state.productCategory.productCategoryListPageOpen,
    isDeletePage:state.productCategory.isDeletePage,
    isEditPage:state.productCategory.isEditPage,
    productCategoryDataList:state.productCategory.productCategoryDataList,

  }
}

const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.productCategoryViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.productCategoryEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.productCategoryEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.productCategoryDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.productCategoryDeleteWindowClose()),
      spotObjEditHandler: (obj)=>dispatch(actions.productCategoryObjEditHandler(obj)),
      spotObjDeleteHandler: (id)=>dispatch(actions.productCategoryObjDeleteHandler(id)),
      getAllProductCategoty: ()=>dispatch(actions.getAllProductCategory()),
      deleteProductCategorySuccess: ()=>dispatch(actions.deleteProductCategorySuccess()),
      deleteProductCategoryFail: (error)=>dispatch(actions.deleteProductCategoryFail(error)),
      editProductCategorySuccess: (obj)=>dispatch(actions.editProductCategorySuccess(obj)),
      editProductCategoryFail: (error)=>dispatch(actions.editProductCategoryFail(error)),

    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductCategoryList)
