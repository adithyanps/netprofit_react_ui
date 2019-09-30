import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreateArea extends Component {
  state = {
    selectedArea:null,
    areaListPage:false,

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
      area:this.state.selectedArea,

    }
    console.log(Data)

    axios.post('masters/area/',Data).then(
      response=>{
        this.props.createAreaSuccess(response.data)
        this.setState({areaListPage:true})

      },
    ).catch(error=>{
      this.props.createAreaFail(error)
    })
    console.log(this.props)

  }

  openAreaListPage=(event)=>{
    console.log(this)
    return(
      <Redirect  to="/areas"/>
    )
  }

  render() {
    console.log(this.state)
    console.log(this.props)

    return (
      <div>
      {this.state.areaListPage ? (this.openAreaListPage()) : (null)}

      <br />
        <div className="SettingsAcntBoxwrapper">
        <label>AREA:</label><br />
        <input
          className="grand"
          name="selectedArea"
          value={this.state.selectedArea}
          onChange={this.handleInputChange}
          />
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
    areaData:state.area.areaData,
    areaDataList:state.area.areaDataList,
    areaListPageOpen:state.area.areaListPageOpen,
    isDeletePage:state.area.isDeletePage,
    isEditPage:state.area.isEditPage,
  }
}

const mapDispatchToProps = dispatch => {
    return {
      getAllArea: ()=>dispatch(actions.getAllArea()),
      createAreaSuccess: (obj)=>dispatch(actions.createAreaSuccess(obj)),
      createAreaFail: (error)=>dispatch(actions.createAreaFail(error)),


    };
};
export default connect(mapStateToProps,mapDispatchToProps)(CreateArea);
