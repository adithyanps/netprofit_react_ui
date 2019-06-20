import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class SpotProductCategoryEdit extends React.Component {
  state={
    product_CatList:[],
    selectedCategory:null,
    name:null,

  }
  componentWillMount(){
    this.setState({
      formData:this.props.formData,
      // product_CatList:this.props.product_CatList,
      name:this.props.formData.name
  })
  if(this.props.formData.ParentCategory !== null) {
    this.setState({
      selectedCategory:this.props.product_CatList.filter(item=>item.id === this.props.formData.ParentCategory)[0].name,

    })
  }
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
    this.props.formData.name = this.state.name

    let data = {}
    if (this.state.selectedCategory === null) {
       data = {
         id:this.props.formData.id,
         name:this.state.name,
         ParentCategory:null
      }
      console.log(data)

    } else {
      this.props.formData.ParentCategory = this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id
      data = {
        id:this.props.formData.id,
        name:this.state.name,
        ParentCategory:this.state.product_CatList.filter(item=>item.name === this.state.selectedCategory)[0].id,
      }
    }
    console.log(data)
    this.props.editHandler(data)
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
          <h1 className="ptag">Edit - Product Category</h1>
          <div className="row-wrapper1">
          </div>
          <br />
          <div className="row-wrapper">
            <div>
              <label>PRODUCT NAME:</label><br />
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
                  onChange={(e) => this.setState({selectedCategory:e.target.value})}
                  >
                  <option value=""> {this.state.selectedCategory}</option>
                  {this.state.product_CatList.map((m,index)=>
                      <option key={m.id} value={m.name}>{m.name}</option>
                  )}
              </select>
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


export default SpotProductCategoryEdit;
// <button className="cancelBtn" onClick={(e)=>this.cancelDataHandler(e)}>CANCEL</button>
