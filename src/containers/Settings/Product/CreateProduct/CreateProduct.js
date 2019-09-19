import React , { Component } from 'react';
import axios from '../../../../axios';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import * as actions from '../../../../store/actions/index';

class CreatePartner extends Component {
  state={
    product_CatList:[],
    selectedCategory:null,
    item:null,
    price:null,
    productPage:false,
  }
componentDidMount(){
  this.loadProductCats()

}
loadProductCats=()=>{
  axios.get('invoice/product-category/').then(
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
    let Data = {
      item:this.state.item,
      price:this.state.price,
      product_Cat:this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id,
    }
    console.log(Data['product_Cat'])
    axios.post('invoice/item/',Data).then(
      response=>{
        console.log(response.data)
        this.props.onCreateProductSuccess(response.data)
        this.setState({productPage:true})

      }
    )
    // this.props.onCreateProductSuccess(Data)
    // this.setState({productPage:true})

  }
  openProductPage=()=>{
    return(
      <Redirect  to="/products"/>
    )
  }
  render(){

    return(
      <div>
      {this.state.productPage ? (this.openProductPage()) : (null)}

      <br />
      <div className="SettingsAcntBoxwrapper">
        <div>
          <label>PRODUCT NAME</label><br />
          <input
            className="grand"
            name="item"
            value={this.state.item}
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
        <br />

        <div className="SettingsAcntBoxwrapper">
          <div>
            <label>PRICE</label><br />
            <input
              className="grand"
              type="number"
              name='price'
              value={this.state.price}
              onChange={this.handleInputChange}
              required='required'/>
          </div>
          <div>
          </div>
      </div>
      <br/>
      <div style={{marginLeft:"200px"}}>
        <button className="cancelBtn" onClick={(this.state.selectedCategory !== null) ?(this.submitDataHandler):(null)}>SAVE</button>
      </div>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => {
    return {
      onCreateProductSuccess: (data)=>dispatch(actions.createProduct(data)),
      // onCreateProductSuccess: (data)=>dispatch(actions.createProductSuccess(data)),

    };
};
export default  connect(null,mapDispatchToProps)(CreatePartner);
