import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createCustomerRecieptSuccess =(recieptData)=>{
  return{
    type : actionTypes.CREATE_CUSTOMER_RECIEPT_SUCCESS,
    recieptData: recieptData
  }
}

export const createCustomerRecieptFail =()=> {
  return{
    type:actionTypes.CREATE_CUSTOMER_RECIEPT_FAIL
  }
}

export const customerReceiptViewWindowClose=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_PAGE_CLOSE
  }
}

export const customerReceiptViewWindowOpen=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_PAGE_OPEN
  }
}

export const customerReceiptDeleteWindowOpen=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_DELETE_WINDOW_OPEN
  }
}

export const customerReceiptDeleteWindowClose=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_DELETE_WINDOW_CLOSE
  }
}

export const customerReceiptEditWindowOpen=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_EDIT_WINDOW_OPEN
  }
}

export const customerReceiptEditWindowClose=()=>{
  return{
    type:actionTypes.CUSTOMER_RECIEPT_EDIT_WINDOW_CLOSE
  }
}

export const editCustomerRecieptSuccess=()=>{
  return{
    type:actionTypes.EDIT_CUSTOMER_RECIEPT_SUCCESS
  }
}

export const editCustomerRecieptFail=()=>{
  return{
    type:actionTypes.EDIT_CUSTOMER_RECIEPT_FAIL
  }
}

export const deleteCustomerRecieptSuccess=()=>{
  return {
    type:actionTypes.CUSTOMER_RECIEPT_DELETE_SUCCESS
  }
}

export const deleteCustomerRecieptFail=()=>{
  return {
    type:actionTypes.CUSTOMER_RECIEPT_DELETE_FAIL
  }
}

export const customerReceiptObjDeleteHandler=(id)=>{
  return dispatch =>{
    axios.delete('/customer_reciepts/customerReceipt/'+ id).then(
      response => {
        dispatch(deleteCustomerRecieptSuccess())
      }
    )
    .catch(error=>{
      dispatch(deleteCustomerRecieptFail(error))
    })
  }
}

export const customerReceiptObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/customer_reciepts/customerReceipt/' + obj.id + '/',obj).then(
      response => {
        dispatch(editCustomerRecieptSuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editCustomerRecieptFail(error))
    })
  }
}

export const createCustomerReciept=(data)=>{
  return dispatch => {
    axios.post('/customer_reciepts/customerReceipt/',data,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
      response=> {
        dispatch(createCustomerRecieptSuccess(response.data))
      }
    )
    .catch(error => {
      console.log(error)
      dispatch(createCustomerRecieptFail(error))
    })
  }
}
