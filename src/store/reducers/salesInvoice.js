import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
  salesPageOpen:false,
  isDeletePage:false,
  isEditPage:false,
  invoiceData:[]
}

const createInvoiceSuccess = (state,action) => {
  return updateObject( state, {
    invoiceData:action.invoiceData,
    salesPageOpen:true
  })
}

const createInvoiceFail = (state,action) => {
  return updateObject(state,{salesPageOpen:false})
}

const salesViewWindowClose = (state,action) => {
  return updateObject(state,{salesPageOpen:false})
}
const salesDeleteWindowOpen =(state,action) => {
  return updateObject(state,{isDeletePage:true})
}
const salesDeleteWindowClose=(state,action) => {
  return updateObject(state,{isDeletePage:false})
}

const deleteInvoiceSucces = (state,action) => {
  return updateObject( state, {
    // invoiceData: action.invoiceData,
    isDeletePage:false,
    salesPageOpen:false,


  })
}
const deleteInvoiceFail = (state,action) => {
  return updateObject( state, {
    isDeletePage:true,
    salesPageOpen:true,

  })
}

const salesEditWindowOpen = (state,action) => {
  return updateObject( state, {isEditPage:true})
}

const salesEditWindowClose = (state,action) => {
  return updateObject( state, {isEditPage:false})
}

const editInvoiceSuccess = (state,action) => {
  return updateObject( state, {isEditPage:false})
}
const editInvoiceFail = (state,action) => {
  return updateObject( state, {isEditPage:true})
}



const reducer =( state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_INVOICE_SUCCESS: return createInvoiceSuccess(state,action);
    case actionTypes.CREATE_INVOICE_FAIL: return createInvoiceFail(state,action);
    case actionTypes.SALES_PAGE_CLOSE: return salesViewWindowClose(state,action);
    case actionTypes.DELETE_WINDOW_OPEN: return salesDeleteWindowOpen(state,action);
    case actionTypes.DELETE_WINDOW_CLOSE: return salesDeleteWindowClose(state,action);
    case actionTypes.DELETE_INVOICE_SUCCESS: return deleteInvoiceSucces(state,action);
    case actionTypes.DELETE_INVOICE_FAIL: return deleteInvoiceFail(state,action);
    case actionTypes.EDIT_WINDOW_OPEN: return salesEditWindowOpen(state,action);
    case actionTypes.EDIT_WINDOW_CLOSE: return salesEditWindowClose(state,action);
    case actionTypes.EDIT_INVOICE_SUCCESS: return editInvoiceSuccess(state,action);
    case actionTypes.EDIT_INVOICE_FAIL: return editInvoiceFail(state,action);

    default: return state;
  }
};

export default reducer;
