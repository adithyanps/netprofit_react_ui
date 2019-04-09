import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createInvoiceSuccess =(invoiceData)=> {
  return{
    type : actionTypes.CREATE_INVOICE_SUCCESS,
    invoiceData: invoiceData
  }
}

export const createInvoiceFail =()=>{
  return{
    type: actionTypes.CREATE_INVOICE_FAIL
  }
}

export const salesViewWindowClose=()=>{
  return{
    type:actionTypes.SALES_PAGE_CLOSE,

  }
}
export const salesDeleteWindowOpen=()=>{
  return{
    type:actionTypes.DELETE_WINDOW_OPEN,
  }
}
export const salesDeleteWindowClose =()=> {
  return{
    type:actionTypes.DELETE_WINDOW_CLOSE
  }
}
export const deleteInvoiceSucces=()=>{
  return{
    type:actionTypes.DELETE_INVOICE_SUCCESS
  }
}
export const deleteInvoiceFail=()=>{
  return{
    type:actionTypes.DELETE_INVOICE_FAIL
  }
}
export const salesEditWindowOpen=()=>{
  return{
    type:actionTypes.EDIT_WINDOW_OPEN
  }
}

export const salesEditWindowClose=()=>{
  return{
    type:actionTypes.EDIT_WINDOW_CLOSE
  }
}

export const editInvoiceSuccess=()=>{
  return{
    type:actionTypes.EDIT_INVOICE_SUCCESS
  }
}

export const editInvoiceFail=()=>{
  return{
    type:actionTypes.EDIT_INVOICE_FAIL
  }
}

export const salseObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/invoice/parantdata/' + obj.id + '/', obj).then(
      response => {
        dispatch(editInvoiceSuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editInvoiceFail(error))
    })
  }
}
export const salesDeleteHandler=(id)=> {
  console.log(id)
  return dispatch => {
    axios.delete('/invoice/parantdata/'+id).then(
      response => {
        dispatch(deleteInvoiceSucces(response.data))
      }
    )
    .catch(error => {
      dispatch(deleteInvoiceFail(error))
    })

  }
}
export const createInvoice=(data)=>{
  return dispatch => {
    axios.post('/invoice/parantdata/',data).then(
      response=>{
        dispatch(createInvoiceSuccess(response.data));
      }
    )
    .catch(error => {
      dispatch(createInvoiceFail(error))
    })
  }
}
