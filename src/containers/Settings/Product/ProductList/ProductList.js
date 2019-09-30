import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import ProductViewModal from '../../../../components/UI/Modal/Product/ProductViewModal';
import ProductEditModal from '../../../../components/UI/Modal/Product/ProductEditModal';
import ProductDeleteModal from '../../../../components/UI/Modal/Product/ProductDeleteModal';
import SpotProductViewModal from '../../../../components/UI/Modal/Product/SpotProductViewModal';
import SpotProductEditModal from '../../../../components/UI/Modal/Product/SpotProductEditModal';
import SpotProductDeleteModal from '../../../../components/UI/Modal/Product/SpotProductDeleteModal';
import * as actions from '../../../../store/actions/index';

class ProductList extends Component {
  state ={
    productList : [],
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
componentWillMount(){


  this.loadProductCats()
  this.setState({
      end_point: this.state.start_point + this.state.perpage,
    })
  this.loadProducts()

}
 componentDidMount(){
    this.setState({
        end_point: this.state.start_point + this.state.perpage,
      })
      this.loadProducts()

  }
  loadProducts=()=>{
      axios.get('masters/product/').then(
        res => {
          let data = res.data;
          data.map((sample,index)=>{
            this.state.product_CatList.map((proCat)=>{
              if (proCat.id === sample.product_Cat) {
                sample.product_Cat = proCat.name;

              }
            })
          })

          this.setState({productList:data});

        }
      )
  }

  loadProductCats=()=>{
    axios.get('masters/product-category/').then(
      res => {
        this.setState({product_CatList:res.data});
      }
    )
  }
  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.productList.length
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
        let length = this.state.productList.length
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
        let length = this.state.productListproductList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.productList.filter(item => { return item.id === id})
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
      const filterData = this.state.productList.filter(item => { return item.id === id})
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
        <ProductViewModal
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
      <ProductEditModal
          show={this.state.isEdit}
          close={this.editWindowClose}
          formData={this.state.editObject}
          editId={this.state.editId}
          editHandler={this.objEditHandler}
          productList={this.state.productList}
          product_CatList={this.state.product_CatList}

       />
    )
  }
  deleteModal =()=> {
    return(
      <ProductDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          deleteHandler = {this.deleteHandler}
          formData={this.state.viewObject}
          product_CatList={this.state.product_CatList}

      />
    )
  }
  objEditHandler = (event,objTemp) => {
      // event.preventDefault()
      // objTemp.product_Cat =   this.state.product_CatList.map(item=>item.name === objTemp.product_Cat)[0].id

      axios.patch('/masters/product/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.productList;
    let deleteObject = this.state.productList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('masters/product/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               productList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }

  spotViewModal =()=>{
      return(
        <SpotProductViewModal
          show={this.props.productListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.productData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          product_CatList={this.props.productCategoryData}
          />
      )
  }

  spotEditModal=()=>{
      return(
        <SpotProductEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.productData}
          editId={this.state.editId}
          productList={this.state.productList}
          editHandler={this.spotObjEditHandler}
          product_CatList={this.state.product_CatList}


        />
      )
  }

  spotDeletModal=()=>{
      return(
        <SpotProductDeleteModal
        show={this.props.isDeletePage}
        close={this.props.spotDeleteWindowClose}
        formData={this.props.productData}
        deleteHandler={this.spotObjDeleteHandler}
        product_CatList={this.state.product_CatList}

        />
      )
  }
spotObjDeleteHandler=(id)=>{
  console.log(id)
  // const updatedOrders = this.state.productList;
  console.log(updatedOrders)
  let data = this.state.productList;
  data.map((sample,index)=>{
    this.state.product_CatList.map((proCat)=>{
      if (proCat.id === sample.product_Cat) {
        sample.product_Cat = proCat.name;

      }
    })
  })
  let updatedOrders = data
  let deleteObject = this.state.productList.filter(item =>  item.id === id)
  console.log(deleteObject)

  let delIndex = updatedOrders.indexOf(deleteObject[0])
  console.log(delIndex)

  axios.delete('/masters/product/'+id).then(
     response => {
       console.log(response.data)
         updatedOrders.splice(delIndex,1)
         this.setState({
             productList: updatedOrders,

         })
        this.props.deleteProductSuccess()
     }
  )
}

spotObjEditHandler = (event,obj)=>{
  console.log(obj)
  let list = []
  list.push(obj)
  axios.patch('/masters/product/' + obj.id + '/',obj).then(
    response => {
      console.log(response.data);
      this.props.editProductSuccess(response.data)

      let updatedProducts = this.state.productList.map(obj => list.find(o=> o.id === obj.id) || obj)
      console.log(updatedProducts)
      let data = updatedProducts;
      data.map((sample,index)=>{
        this.state.product_CatList.map((proCat)=>{
          if (proCat.id === sample.product_Cat) {
            sample.product_Cat = proCat.name;

          }
        })
      })
      console.log(data)
      this.setState({productList:data})
    }
  )
}
  render(){
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.productList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.item}</td>
                 <td>{branch.price}</td>
                 <td>
                 {branch.product_Cat}</td>
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
      {this.props.productListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

      <table className="SalesInvoiceTable" >
          <thead>
            <tr>
              <th>SL NO</th>
              <th>NAME</th>
              <th>PRICE</th>
              <th>CATEGORY</th>
              <th>VIEW</th>
            </tr>

          </thead>
          <tbody>
          {this.state.productList.length >0 ? (itemlist): ( null )}
          </tbody>
      </table>
      <br />
      <div className="pagination">
          <Pagex
                  item_count={this.state.productList.length}
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
    productData:state.product.productData,
    productListPageOpen:state.product.productListPageOpen,
    isDeletePage:state.product.isDeletePage,
    isEditPage:state.product.isEditPage,
    productCategoryData:state.product.productCategoryData,
  }
}
const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.productViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.productEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.productEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.productDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.productDeleteWindowClose()),
      // spotObjEditHandler: (obj)=>dispatch(actions.productObjEditHandler(obj)),
      // spotObjDeleteHandler: (id)=>dispatch(actions.productObjDeleteHandler(id)),
      deleteProductSuccess: ()=>dispatch(actions.deleteProductSuccess()),
      editProductSuccess: (data)=>dispatch(actions.editProductSuccess(data))
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(ProductList)
