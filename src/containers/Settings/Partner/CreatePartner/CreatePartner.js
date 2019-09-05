import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreatePartner extends Component {
  state={
    areaList:[],
    customer_id:null,
    type:null,
    name:null,
    partnerPage:false,
    area:null,
  }
  componentDidMount(){
    this.props.currentUser()
    this.loadArea()
  }
  loadArea=()=>{
    axios.get('invoice/area/').then(
      response=>{this.setState({areaList:response.data})}
    )
  }
  handleInputChange = (event) => {
    event.preventDefault();
    console.log(event.target.name,event.target.value)
    let key = event.target.name
    let  value = event.target.value
  this.setState({[key]:value})

  }
  submitDataHandler=()=>{
    let Data = {
      customer_id:this.state.customer_id,
      type:this.state.type,
      name:this.state.name,
      area:this.state.areaList.filter(item=> item.area ===this.state.area)[0].id,
      created_by:this.props.currentUserData.id
    }
    console.log(Data)

    axios.post('invoice/partner/',Data).then(
      response=>{
        console.log(response.data)
        this.props.onCreatePartnerSuccess(response.data)
        this.setState({partnerPage:true})
      }
    )
  }
  openPartnerPage=()=>{
    return(
      <Redirect  to="/partners"/>
    )
  }
  render(){
    const typeList = [{'type':'BOTH'},{'type':'CUSTOMER'},{'type':'SUPPLIER'}]

    return(
      <div>
      {this.state.partnerPage ? (this.openPartnerPage()) : (null)}

      <br />
      <div className="SettingsAcntBoxwrapper">
        <div>
          <label>CUSOTMER_ID:</label><br />
          <input
            className="grand"
            name="customer_id"
            value={this.state.customer_id}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>TYPE</label><br />
          <select
              className="select"
              onChange={(e) => this.setState({type:e.target.value})}
              >
              <option value=""> {this.state.type}</option>
              {typeList.map((m,index)=>
                  <option key={m.id} value={m.type}>{m.type}</option>
              )}
          </select>
        </div>
        </div>
        <br />

        <div className="SettingsAcntBoxwrapper">
          <div>
            <label>NAME</label><br />
            <input
              className="dates"
              name='name'
              value={this.state.name}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
          <div>
            <label>AREA</label><br />
            <select
                className="select"
                onChange={(e) => this.setState({area:e.target.value})}
                >
                <option value=""> {this.state.area}</option>
                {this.state.areaList.map((m,index)=>
                    <option key={m.id} value={m.area}>{m.area}</option>
                )}
            </select>
          </div>
      </div>
      <br/>
      <div style={{marginLeft:"200px"}}>
        <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>
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
      onCreatePartnerSuccess: (data)=>dispatch(actions.createPartnerSuccess(data))
    };
};
export default  connect(mapStateToProps,mapDispatchToProps)(CreatePartner);
