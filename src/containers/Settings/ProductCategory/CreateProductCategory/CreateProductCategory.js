import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class createProductCategory extends Component{
  state={
    product_CatList:[],
    name:null,
    selectedCategory:null,
    productCategoryPage:false,
  }
  componentDidMount(){
    this.loadProductCats()

  }
  loadProductCats=()=>{
    axios.get('masters/product-category/').then(
      res => {
        this.setState({product_CatList:res.data});
      }
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
    let data = {}
    if (this.state.selectedCategory === null) {
       data = {
        name:this.state.name,
        ParentCategory:null
      }
      console.log(data)

    } else {
     data = {
        name:this.state.name,
        ParentCategory:this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id,
      }
    }

    console.log(data)
    axios.post('masters/product-category/',data).then(
      response=>{
        console.log(response.data)
        this.props.onCreateProductCategorySuccess(response.data)
        // if (response.data !== null) {
          this.setState({productCategoryPage:true})

        // }
      }
    )
    // this.props.onCreateProductCategorySuccess(data)
    // this.setState({productPage:true})

  }
  openProductCategoryPage=()=>{
    return(
      <Redirect  to="/productCategorys"/>
    )
  }
  render(){
    console.log(this.state)
    console.log(this.props)

    return(
      <div>
      {this.state.productCategoryPage ? (this.openProductCategoryPage()) : (null)}

      <br />
      <div className="SettingsAcntBoxwrapper">
        <div>
          <label>PRODUCT NAME</label><br />
          <input
            className="grand"
            name="name"
            value={this.state.name}
            onChange={this.handleInputChange}
            />
        </div>
        <div>
          <label>PRODUCT CATEGORY</label><br />
          <select
              className="select"
              onChange={(e) => this.setState({selectedCategory:e.target.value})}>
              <option value=""> </option>
              {this.state.product_CatList.map((m,index)=>
                  <option key={m.id} value={m.name}>{m.name}</option>
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
const mapStateToProps = (state)=>{
  return{
    productCategoryListPageOpen:state.productCategory.productCategoryListPageOpen
  }
}
const mapDispatchToProps = dispatch => {
    return {
      onCreateProductCategorySuccess: (data)=>dispatch(actions.createProductCategory(data))
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(createProductCategory)
