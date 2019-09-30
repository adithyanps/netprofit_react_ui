import React , { Component } from 'react';
import axios from '../../../../axios';

import CustomerRecieptSnViewModal from '../../../../components/UI/Modal/SerialNumber/CustomerReciept/CustomerRecieptSnViewModal'

import EditCustomerRecieptSerialNumModel from '../../../../components/UI/Modal/SerialNumber/CustomerReciept/EditCustomerRecieptSerialNumModel'

class CustomerRecieptSN extends Component {
  state={
    prefix:null,
    suffix:null,
    start_number:null,
    padding:null,
    hasNmber:false,
    serialNumObj:{},
    submitDataError:false,

    viewObject:{},
    isView: false,
    isEdit:false,
    editObject:{},

  }
  componentDidMount(){
    this.loadSalesInvoiceNumber()
  }
  loadSalesInvoiceNumber=()=>{
    axios.get('masters/serial-number/').then(
      res=>{
        if(res.data.filter(item=>item.type=== "CR").length>0) {
          this.setState({
            serialNumObj:res.data.filter(item=>item.type === 'CR')[0],
            prefix:res.data.filter(item=>item.type === 'CR')[0].prefix,
            suffix:res.data.filter(item=>item.type === 'CR')[0].suffix,
            start_number:res.data.filter(item=>item.type === 'CR')[0].start_number,
            padding:res.data.filter(item=>item.type === 'CR')[0].padding,
            hasNmber:true
          })
        }
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
  submitHandler=()=>{
    let data={
      prefix: this.state.prefix,
      suffix: this.state.suffix,
      start_number: this.state.start_number,
      padding: this.state.padding,
      type:"CR"
    }
    for (var i in data){
      if(data[i] == null){
        this.setState({submitDataError:true})
      }
    }
    axios.post('masters/serial-number/',data).then(
      res=>{
        console.log(res.data);
        this.setState({
          isView:true,
          viewObject:res.data
        })
      }
    )
  }
  viewWindowClose = () => {
        this.setState({
            isView: false,
            viewObject: {},

        })
  }
  viewModal=()=>{
      return(
        <CustomerRecieptSnViewModal
          show={this.state.isView}
          close={this.viewWindowClose}
          formData={this.state.viewObject}
          editwindow={this.spotEditWindowOpen}/>
      )
  }
  spotEditWindowOpen=()=>{
    this.setState({
      editObject:this.state.viewObject,
      isEdit:true
    })
  }

  editWindowOpen=(obj)=>{
    this.setState({
      editObject:obj,
      isEdit:true
    })
  }
  editWindowClose = () => {
      this.setState({
          isEdit: false,
          editObject: {},
      })
  }
editModal=()=>{
  return(
    <EditCustomerRecieptSerialNumModel
        show={this.state.isEdit}
        close={this.editWindowClose}
        formData={this.state.editObject}
        editHandler={this.objEditHandler}
    />
  )
}
objEditHandler =(obj)=>{
  console.log(obj)
    axios.patch("masters/serial-number/" + obj.id + "/",obj).then(
      response => {
        console.log(response.data);
        this.setState({isEdit:false,
        serialNumObj:response.data,
        prefix: response.data.prefix,
        suffix: response.data.suffix,
        start_number: response.data.start_number,
        padding: response.data.padding,
      })
      }
    ).catch(error=>console.log(error))
}
  render(){
    console.log(this.state)
    return(
      <div >
      {this.state.isView ? (this.viewModal()) : (null)}
      {this.state.isEdit ? (this.editModal()) : (null)}

          {JSON.stringify(this.state.serialNumObj) === '{}' ? (
            <div>
            <div className="snumBox">
              <div className="serialInput">
              <label>PREFIX</label><br />

                  <input
                    size="4"
                    name="prefix"
                    value={this.state.prefix}
                    onChange={this.handleInputChange}
                    placeholder="Empty"
                   />
              </div>
              <div className="serialInput">
              <label>SUFFIX</label><br />

                  <input
                    size="4"
                    name="suffix"
                    value={this.state.suffix}
                    onChange={this.handleInputChange}
                    placeholder="Empty"/>
              </div>
            </div>
            <div className="snumBox">
              <div className="serialInput">
              <label>NUMBER</label><br />

                  <input
                    size="4"
                    name="start_number"
                    value={this.state.start_number}
                    onChange={this.handleInputChange}
                    placeholder="Empty"
                     />
              </div>
              <div className="serialInput">
              <label>PADDING</label><br />

                  <input
                      size="4"
                      name="padding"
                      value={this.state.padding}
                      onChange={this.handleInputChange}
                      placeholder="Empty"
                      />
              </div>
            </div>
            <div >
                <button className="cancelBtn" onClick={this.submitHandler}>create </button>
            </div>
            </div>
          ) :
            (
              <div>
              <div className="snumBox">
                <div className="serialInput">
                <label>PREFIX</label><br />

                    <input
                      size="4"
                      name="prefix"
                      value={this.state.prefix}
                      readOnly
                      placeholder="Empty"
                     />
                </div>
                <div className="serialInput">
                <label>SUFFIX</label><br />

                    <input
                      size="4"
                      name="suffix"
                      value={this.state.suffix}
                      readOnly
                      placeholder="Empty"/>
                </div>
              </div>
              <div className="snumBox">
                <div className="serialInput">
                <label>NUMBER</label><br />

                    <input
                      size="4"
                      name="start_number"
                      value={this.state.start_number}
                      readOnly
                      placeholder="Empty"
                       />
                </div>
                <div className="serialInput">
                <label>PADDING</label><br />

                    <input
                        size="4"
                        name="padding"
                        value={this.state.padding}
                        readOnly
                        placeholder="Empty"
                        />
                </div>
              </div>
              <div >
                  <button className="cancelBtn" onClick={()=>this.editWindowOpen(this.state.serialNumObj)}>edit </button>
              </div>
              </div>

            )}

      </div>
    )
  }
}

export default CustomerRecieptSN;
