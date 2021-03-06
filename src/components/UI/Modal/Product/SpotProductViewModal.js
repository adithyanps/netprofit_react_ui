import React from 'react';
import {Col, FormControl, FormGroup, Form, Button, Glyphicon, Table, Modal, OverlayTrigger} from 'react-bootstrap';
// import ControlLabel from 'react-bootstrap/lib/FormControl';
import { Link } from 'react-router-dom';
import axios from '../../../../axios';


class SpotProductView extends React.Component {

    render() {
      console.log(this.props.formData)
      console.log(this.props)



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
          <h1>Product</h1>
          <div className="invoiceviewWrapper">
              <div>
                <p>PRODUCT NAME  :</p>
                {this.props.formData.item}
              </div>
              <div>
                <p>PRODUCT CATEGORY:</p>

                {(this.props.product_CatList.length !== 0) ? (this.props.product_CatList.filter(item => item.id === this.props.formData.product_Cat)[0].name ) : (null)}
              </div>
              <div>
                  <p>PRICE:</p>
                  {this.props.formData.price}
              </div>
          </div>
          <br />


        </div>
        </Modal.Body>

  <Modal.Footer>
            <button className="OkBtn" onClick={this.props.close}>OK</button>

            <Link to="/create-products"><i className="fas fa-plus"></i></Link>
            <Button  type="submit" onClick={(e,id) => this.props.editwindow(e,this.props.formData.id)} ><i className="fas fa-pencil-alt"></i></Button>
            <Button  type="submit"  onClick={(e,id) => this.props.deletewindow(e,this.props.formData.id)}><i className="fas fa-trash"></i></Button>
            </Modal.Footer>

      </Modal>
      );
    }
  }


export default SpotProductView;
