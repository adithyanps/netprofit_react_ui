import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import Pagex from '../../../../components/UI/Pagination/Pagination';
import * as actions from '../../../../store/actions/index';

class ParnerList extends Component {
  state ={
    partnerList : [],

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
    // this.props.currentUser()

    this.loadPartner()
  }
  loadPartner=()=>{
      axios.get('invoice/partner/').then(
        res => {
          this.setState({partnerList:res.data});
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
  render(){
    const itemlist = this.state.partnerList.slice(this.state.start_point,this.state.end_point).map((branch, index)=> {
        return(
          <tr key={branch.id}>
                 <td>{index+this.state.start_point+1}</td>
                 <td>{branch.customer_id}</td>
                 <td>{branch.created_date}</td>
                 <td>{branch.name}</td>
                 <td>{branch.type}</td>
                 <td>
                   <i onClick={()=>this.viewWindowOpen(branch.id)} className="w3-margin-left fa fa-eye"></i>
                 </td>
        </tr>
        );
    })
    return(
      <div>
      <table className="SalesInvoiceTable" >
          <thead>
            <tr>
              <th>SL NO</th>
              <th>CUSOTMER ID</th>
              <th>CREATE DATE</th>
              <th>NAME</th>
              <th>TYPE</th>
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
export default ParnerList
