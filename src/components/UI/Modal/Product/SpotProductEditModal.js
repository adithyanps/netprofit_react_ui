import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class SpotProductEdit extends React.Component {
  state={
    product_CatList:[],
    selectedCategory:null,
    item:null,
    price:null,

  }
  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      // product_CatList:this.props.product_CatList,
      selectedCategory:this.props.product_CatList.filter(item=>item.id === this.props.formData.product_Cat)[0].name,
      item:this.props.formData.item,
      price:this.props.formData.price
  })
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


  submitDataHandler=(e)=>{
    this.props.formData.item = this.state.item
    this.props.formData.price = this.state.price
    this.props.formData.product_Cat = this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id

    let Data = {
      id:this.props.formData.id,
      item:this.state.item,
      price:this.state.price,
      product_Cat: this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id,
    }
    console.log(Data)
    this.props.editHandler(Data)
    console.log(this.props.formData)

  }
    render() {
      console.log(this.props.formData)
      console.log(this.props)
      console.log(this.state)

      return (
        <Modal
        {...this.props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={this.props.show} onHide={this.props.close}
      >
        <Modal.Header closeButton>

        </Modal.Header>
        <Modal.Body>
        <div >
          <h1 className="ptag">Edit - Product</h1>
          <div className="row-wrapper1">
          </div>
          <br />
          <div className="row-wrapper">
            <div>
              <label>PRODUCT NAME:</label><br />
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
                  onChange={(e) => this.setState({selectedCategory:e.target.value})}
                  >
                  <option value=""> {this.state.selectedCategory}</option>
                  {this.state.product_CatList.map((m,index)=>
                      <option key={m.id} value={m.name}>{m.name}</option>
                  )}
              </select>
            </div>
            <div>
            <label>PRICE</label><br />
            <input
                className="dates"
                type="number"
                name='price'
                value={this.state.price}
                onChange={this.handleInputChange}
                required='required'/>
            </div>
          </div>
          <br />
        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>CANCEL</button>
            <button className="cancelBtn" onClick={this.submitDataHandler}>SAVE</button>

            <Link to="/create-partner"><i className="fas fa-plus"></i></Link>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default SpotProductEdit;
// <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
