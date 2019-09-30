import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import DebitNoteViewModal from '../../../../components/UI/Modal/DebitNote/DebitNoteViewModal';
import DebitNoteEditModal from '../../../../components/UI/Modal/DebitNote/DebitNoteEditModal';
import DebitNoteDeleteModal from '../../../../components/UI/Modal/DebitNote/DebitNoteDeleteModal';

class DebitNoteList extends Component {
  state ={
    debitNoteList:[],
    partnerList:[],
    settingsAcnt:[],

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
    console.log('willmount')
    this.loadPartner()
    this.loadDebitNotes()

  }
  componentDidMount(){
    this.setState({
        end_point: this.state.start_point + this.state.perpage,
      })

      this.loadPartner()

      console.log('didmount')
      this.loadSettingsAccnt()
  }
  loadSettingsAccnt=()=>{
    axios.get('masters/accountDefault/1/').then(
      res => {
        this.setState({settingsAcnt:res.data});
        console.log(res.data)
      }
    )
  }
  loadPartner=()=>{
    axios.get('masters/partner/').then(
      res => {
        this.setState({partnerList:res.data.filter(item => item.type !== 'SUPPLIER' )});

        console.log(res.data)
      }
    )
  }

  loadDebitNotes=()=>{
      axios.get('debit_note/debitnote/').then(
        res => {
          // this.setState({creditNoteList:res.data});
          this.debitNoteListHandler(res.data)

        }
      )
  }
debitNoteListHandler=(data)=>{
  data.map((sample,index)=>{
    console.log(this.state.partnerList)
    this.state.partnerList.map((partner,idx)=>{
      if(partner.id === sample.Partner){
        console.log(partner.name)

        sample.Partner = partner.name
      }

    })
  })
  console.log(data)
  this.state.debitNoteList = data
  this.setState({debitNoteList:data})
}
  pagexClickHandler = (pageNo) => {
        console.log(pageNo)
        let length = this.state.debitNoteList.length
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
        let length = this.state.debitNoteList.length
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
        let length = this.state.debitNoteList.length
        let page_count = Math.ceil(length/this.state.perpage)
        if(this.state.curr_page < page_count){
            this.pagexClickHandler(page_count)
        }
  }

  viewWindowOpen=(id)=>{
      // e.preventDefault()
        const filterData = this.state.debitNoteList.filter(item => { return item.id === id})
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
      const filterData = this.state.debitNoteList.filter(item => { return item.id === id})
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
        <DebitNoteViewModal
              show={this.state.isView}
              close={this.viewWindowClose}
              formData={this.state.viewObject}
              deletewindow={this.deleteWindowOpen}
              editwindow={this.editWindowOpen}
              partnerList={this.state.partnerList}

        />
      )
  }

  editModal =()=>{
    return(
      <DebitNoteEditModal
          show={this.state.isEdit}
          close={this.editWindowClose}
          formData={this.state.editObject}
          editId={this.state.editId}
          editHandler={this.objEditHandler}
          partnerList={this.state.partnerList}
          settingsAcnt={this.state.settingsAcnt}

       />
    )
  }
  deleteModal =()=> {
    return(
      <DebitNoteDeleteModal
          show={this.state.isDelete}
          close={this.deleteWindowClose}
          formData={this.state.viewObject}
          deleteHandler = {this.deleteHandler}
          partnerList={this.state.partnerList}

      />
    )
  }

  objEditHandler = (event,objTemp) => {
      // event.preventDefault()
      // objTemp.product_Cat =   this.state.product_CatList.map(item=>item.name === objTemp.product_Cat)[0].id

      axios.patch('/debit_note/debitnote/' + objTemp.id + '/', objTemp).then(
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
    const updatedOrders = this.state.debitNoteList;
    let deleteObject = this.state.debitNoteList.filter(item =>  item.id === id)
    let delIndex = updatedOrders.indexOf(deleteObject[0])
    axios.delete('debit_note/debitnote/'+id).then(
       response => {
           updatedOrders.splice(delIndex,1)
           this.setState({
               debitNoteList: updatedOrders,
               isDelete: false,
               isView:false
           })
       }
    )
  }
  spotViewModal =()=>{
    console.log(this.state.partnerList)
      return(
        <DebitNoteViewModal
          show={this.props.debitNoteListPageOpen}
          close={this.props.spotViewWindowClose}
          formData={this.props.debitNoteData}
          editwindow={this.props.spotEditWindowOpen}
          deletewindow={this.props.spotDeleteWindowOpen}
          partnerList={this.props.partnerList}
          settingsAcnt={this.state.settingsAcnt}

          />
      )
  }
  spotEditModal=()=>{
      return(
        <DebitNoteEditModal
          show={this.props.isEditPage}
          close={this.props.spotEditWindowClose}
          formData={this.props.debitNoteData}
          editId={this.state.editId}
          partnerList={this.props.partnerList}
          editHandler={this.spotObjEditHandler}
          settingsAcnt={this.props.settingsAcnt}
        />
      )
  }

  spotDeletModal=()=>{
      return(
        <DebitNoteDeleteModal
          show={this.props.isDeletePage}
          close={this.props.spotDeleteWindowClose}
          formData={this.props.debitNoteData}
          deleteHandler={this.spotObjDeleteHandler}
          partnerList={this.state.partnerList}

        />
      )
  }
  spotObjDeleteHandler=(id)=>{
    console.log(id)
    let updatedDebitNotes = this.state.debitNoteList
    let deleteObject = this.state.debitNoteList.filter(item =>  item.id === id)
    console.log(deleteObject)
    let delIndex = updatedDebitNotes.indexOf(deleteObject[0])
    console.log(delIndex)
    axios.delete('/debit_note/debitnote/'+id).then(
       response => {
         console.log(response.data)
           updatedDebitNotes.splice(delIndex,1)
           this.setState({
               creditNoteList: updatedDebitNotes,

           })
          this.props.deleteDebitNoteSuccess()
       }
    ).catch(error=>{
      this.props.deleteDebitNoteFail(error)
    })
  }
spotObjEditHandler=(event,obj)=>{
  let list = []
  list.push(obj)
  console.log(list)
  console.log(obj)

  axios.patch('/debit_note/debitnote/'+obj.id + '/',obj).then(
    response=>{
      this.props.editDebitNoteSuccess(response.data)
      // obj.map((sample,index)=>{
        this.state.partnerList.map(item=>{
          if(obj.Partner === item.id){
            obj.Partner=item.name
          }

        })
      // })
      console.log(obj)

      let updatedProducts = this.state.debitNoteList.map(obj => list.find(o=> o.id === obj.id) || obj)
      console.log(updatedProducts)
      console.log(obj)

      this.setState({debitNoteList:updatedProducts})
    }
  ).catch(error=>{
    this.props.editDebitNoteFail(error);
    console.log(error)
  })
}
  render(){
    console.log(this.state)
    console.log(this.props)
    const itemlist = this.state.debitNoteList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.Doc_no}</td>
                 <td>{branch.Date}</td>
                 <td>{branch.Partner}</td>
                 <td>{branch.Grand_total}</td>
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
      {this.props.debitNoteListPageOpen ? (this.spotViewModal()) : (null)}
      {this.props.isEditPage ? (this.spotEditModal()) : (null)}
      {this.props.isDeletePage ? (this.spotDeletModal()) : (null)}

        DebitNote list
        <table className="SalesInvoiceTable" >
            <thead>
              <tr>
                <th>SL NO</th>
                <th>DOC_NO</th>
                <th>DATE</th>
                <th>PARTNER</th>
                <th>TOTAL</th>
                <th>VIEW</th>

              </tr>

            </thead>
            <tbody>
            {this.state.debitNoteList.length >0 ? (itemlist): ( null )}
            </tbody>
        </table>
        <br />
        <div className="pagination">
            <Pagex
                    item_count={this.state.debitNoteList.length}
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
    debitNoteData:state.debitNote.debitNoteData,
    debitNoteListPageOpen:state.debitNote.debitNoteListPageOpen,
    isDeletePage:state.debitNote.isDeletePage,
    isEditPage:state.debitNote.isEditPage,
    partnerList:state.debitNote.partnerList,
    settingsAcnt:state.debitNote.settingsAcnt,

  }
}
const mapDispatchToProps = dispatch => {
    return {
      spotViewWindowClose: ()=>dispatch(actions.debitNoteViewWindowClose()),
      spotEditWindowOpen: ()=>dispatch(actions.debitNoteEditWindowOpen()),
      spotEditWindowClose: ()=>dispatch(actions.debitNoteEditWindowClose()),
      spotDeleteWindowOpen: ()=>dispatch(actions.debitNoteDeleteWindowOpen()),
      spotDeleteWindowClose: ()=>dispatch(actions.debitNoteDeleteWindowClose()),
      // spotObjEditHandler: (e,obj)=>dispatch(actions.areaObjEditHandler(e,obj)),
      // spotObjDeleteHandler: (id)=>dispatch(actions.areaObjDeleteHandler(id)),
      deleteDebitNoteSuccess: ()=>dispatch(actions.deleteDebitNoteSuccess()),
      deleteDebitNoteFail: (error)=>dispatch(actions.deleteDebitNoteFail(error)),

      editDebitNoteSuccess: (data)=>dispatch(actions.editDebitNoteSuccess(data)),
      editDebitNoteFail: (error)=>dispatch(actions.editDebitNoteFail(error)),

    };
};
export default connect(mapStateToProps,mapDispatchToProps)(DebitNoteList)
