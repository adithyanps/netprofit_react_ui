import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import AreaViewModal from '../../../../components/UI/Modal/Area/AreaViewModal';
import AreaEditModal from '../../../../components/UI/Modal/Area/AreaEditModal';
import AreaDeleteModal from '../../../../components/UI/Modal/Area/AreaDeleteModal';
// import SpotAreaViewModal from '../../../../components/UI/Modal/Area/SpotAreaViewModal';
// import SpotAreaEditModal from '../../../../components/UI/Modal/Area/SpotAreaEditModal';
// import SpotAreaDeleteModal from '../../../../components/UI/Modal/Area/SpotAreaDeleteModal';

import * as actions from '../../../../store/actions/index';

class AreaList extends Component {
  state ={
    areaList:[],

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
      this.loadAreas()

  }
  loadAreas=()=>{
      axios.get('masters/area/').then(
        res => {
          this.setState({areaList:res.data});
        }
      )
  }

  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.areaList.length
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
        let length = this.state.areaList.length
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
        let length = this.state.areaList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.areaList.filter(item => { return item.id === id})
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
      const filterData = this.state.areaList.filter(item => { return item.id === id})
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
        <AreaViewModal
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
      <AreaEditModal
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
      <AreaDeleteModal
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

      axios.patch('/masters/area/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.areaList;
    let deleteObject = this.state.areaList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('masters/area/'+id).then(
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
        <AreaViewModal
          show={this.props.areaListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.areaData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          />
      )
  }
  spotEditModal=()=>{
      return(
        <AreaEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.areaData}
          editId={this.state.editId}
          productList={this.state.productList}
          editHandler={this.spotObjEditHandler}
        />
      )
  }

  spotDeletModal=()=>{
      return(
        <AreaDeleteModal
          show={this.props.isDeletePage}
          close={this.props.spotDeleteWindowClose}
          formData={this.props.areaData}
          deleteHandler={this.spotObjDeleteHandler}
        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let updatedAreas = this.state.areaList
    let deleteObject = this.state.areaList.filter(item =>  item.id === id)
    console.log(deleteObject)
    let delIndex = updatedAreas.indexOf(deleteObject[0])
    console.log(delIndex)
    axios.delete('/masters/area/'+id).then(
       response => {
         console.log(response.data)
           updatedAreas.splice(delIndex,1)
           this.setState({
               areaList: updatedAreas,

           })
          this.props.deleteAreaSuccess()
       }
    ).catch(error=>{
      this.props.deleteAreaFail(error)
    })
  }
spotObjEditHandler=(event,obj)=>{
  let list = []
  list.push(obj)
  axios.patch('/masters/area/'+obj.id + '/',obj).then(
    response=>{
      this.props.editAreaSuccess(response.data)
      let updatedProducts = this.state.areaList.map(obj => list.find(o=> o.id === obj.id) || obj)

      this.setState({areaList:updatedProducts})
    }
  ).catch(error=>{
    this.props.editAreaFail(error)
  })
}
  render(){
    console.log(this.state)
    console.log(this.props)

    const itemlist = this.state.areaList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.area}</td>
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
      {this.props.areaListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        area list
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>AREA</th>
                <th>VIEW</th>

              </tr>

            </thead>
            <tbody>
            {this.state.areaList.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.areaList.length}
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
    areaData:state.area.areaData,
    areaListPageOpen:state.area.areaListPageOpen,
    isDeletePage:state.area.isDeletePage,
    isEditPage:state.area.isEditPage,

  }
}
const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.areaViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.areaEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.areaEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.areaDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.areaDeleteWindowClose()),
      // spotObjEditHandler: (e,obj)=>dispatch(actions.areaObjEditHandler(e,obj)),
      // spotObjDeleteHandler: (id)=>dispatch(actions.areaObjDeleteHandler(id)),
      deleteAreaSuccess: ()=>dispatch(actions.deleteAreaSuccess()),
      deleteAreaFail: (error)=>dispatch(actions.deleteAreaFail(error)),

      editAreaSuccess: (data)=>dispatch(actions.editAreaSuccess(data)),
      editAreaFail: (error)=>dispatch(actions.editAreaFail(error)),

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(AreaList);
