import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  recieptData:[],
  customerRecieptPageOpen:false,
  isDeletePage:false,
  isEditPage:false,
  debitJrnlItem:[],
  creditJrnlItem:[],

}

const createCustomerRecieptSuccess =(state,action) => {
  console.log(action.recieptData)
  let creditJrnlItem = action.recieptData.journal_entry.journal_item.filter((item)=>item.credit_amount>0)
  let debitJrnlItem = action.recieptData.journal_entry.journal_item.filter((item)=>item.debit_amount>0)
  // let creditJrnlItem1=[];
  // let debitJrnlItem1=[];
  // let recieptDataList = a
  console.log(creditJrnlItem)
  console.log(debitJrnlItem)
  return updateObject( state, {
    recieptData:action.recieptData,
    creditJrnlItem:creditJrnlItem,
    debitJrnlItem:debitJrnlItem,
    customerRecieptPageOpen:true,
  })
}

const createCustomerRecieptFail = (state,action)=> {
  return  updateObject(state)
}

const customerReceiptViewWindowClose=(state, action) => {
    return updateObject(state,{customerRecieptPageOpen:false})
}

const customerReceiptDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const customerReceiptDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const customerRecieptEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const customerRecieptEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editCustomerRecieptSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editCustomerRecieptFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteCustomerRecieptSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,customerRecieptPageOpen:false})
}

const deleteCustomerRecieptFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_CUSTOMER_RECIEPT_SUCCESS: return createCustomerRecieptSuccess(state,action);
    case actionTypes.CREATE_CUSTOMER_RECIEPT_FAIL: return createCustomerRecieptFail(state,action);
    case actionTypes.CUSTOMER_RECIEPT_PAGE_CLOSE: return customerReceiptViewWindowClose(state,action);
    case actionTypes.CUSTOMER_RECIEPT_DELETE_WINDOW_OPEN: return customerReceiptDeleteWindowOpen(state,action);
    case actionTypes.CUSTOMER_RECIEPT_DELETE_WINDOW_CLOSE: return customerReceiptDeleteWindowClose(state,action);
    case actionTypes.CUSTOMER_RECIEPT_EDIT_WINDOW_OPEN: return customerRecieptEditWindowOpen(state,action);
    case actionTypes.CUSTOMER_RECIEPT_EDIT_WINDOW_CLOSE: return customerRecieptEditWindowClose(state,action);
    case actionTypes.EDIT_CUSTOMER_RECIEPT_SUCCESS: return editCustomerRecieptSuccess(state,action);
    case actionTypes.EDIT_CUSTOMER_RECIEPT_FAIL: return editCustomerRecieptFail(state,action);
    case actionTypes.CUSTOMER_RECIEPT_DELETE_SUCCESS: return deleteCustomerRecieptSuccess(state,action);
    case actionTypes.CUSTOMER_RECIEPT_DELETE_FAIL: return deleteCustomerRecieptFail(state,action);
    default: return state;

  }
};

export default reducer;
