import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  productData:[],
  productListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}

const createProductSuccess =(state,action) => {
  return updateObject( state, {
    productData:action.productData,
    productListPageOpen:true,
  })
}

const createProductFail = (state,action)=> {
  return  updateObject(state)
}

const productViewWindowClose=(state, action) => {
    return updateObject(state,{productListPageOpen:false})
}

const productDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const productDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const productEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const productEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editProductSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editProductFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteProductSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,productListPageOpen:false})
}

const deleteProductFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT_SUCCESS: return createProductSuccess(state,action);
    case actionTypes.CREATE_PRODUCT_FAIL: return createProductFail(state,action);
    case actionTypes.PRODUCT_LIST_PAGE_CLOSE: return productViewWindowClose(state,action);
    case actionTypes.PRODUCT_DELETE_WINDOW_OPEN: return productDeleteWindowOpen(state,action);
    case actionTypes.PRODUCT_DELETE_WINDOW_CLOSE: return productDeleteWindowClose(state,action);
    case actionTypes.PRODUCT_EDIT_WINDOW_OPEN: return productEditWindowOpen(state,action);
    case actionTypes.PRODUCT_EDIT_WINDOW_CLOSE: return productEditWindowClose(state,action);
    case actionTypes.PRODUCT_EDIT_SUCCESS: return editProductSuccess(state,action);
    case actionTypes.PRODUCT_EDIT_FAIL: return editProductFail(state,action);
    case actionTypes.PRODUCT_DELETE_SUCCESS: return deleteProductSuccess(state,action);
    case actionTypes.PRODUCT_DELETE_FAIL: return deleteProductFail(state,action);
    default: return state;

  }
};

export default reducer;
