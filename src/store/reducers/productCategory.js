import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  productCategoryData:[],
  productCategoryListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}

const createProductCategorySuccess =(state,action) => {
  return updateObject( state, {
    productCategoryData:action.productCategoryData,
    productCategoryListPageOpen:true,
  })
}

const createProductCategoryFail = (state,action)=> {
  return  updateObject(state)
}

const productCategoryViewWindowClose=(state, action) => {
    return updateObject(state,{productCategoryListPageOpen:false})
}

const productCategoryDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const productCategoryDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const productCategoryEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const productCategoryEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editProductCategorySuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editProductCategoryFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteProductCategorySuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,productCategoryListPageOpen:false})
}

const deleteProductCategoryFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_PRODUCT_CATEGORY_SUCCESS: return createProductCategorySuccess(state,action);
    case actionTypes.CREATE_PRODUCT_CATEGORY_FAIL: return createProductCategoryFail(state,action);
    case actionTypes.PRODUCT_CATEGORY_LIST_PAGE_CLOSE: return productCategoryViewWindowClose(state,action);
    case actionTypes.PRODUCT_CATEGORY_DELETE_WINDOW_OPEN: return productCategoryDeleteWindowOpen(state,action);
    case actionTypes.PRODUCT_CATEGORY_DELETE_WINDOW_CLOSE: return productCategoryDeleteWindowClose(state,action);
    case actionTypes.PRODUCT_CATEGORY_EDIT_WINDOW_OPEN: return productCategoryEditWindowOpen(state,action);
    case actionTypes.PRODUCT_CATEGORY_EDIT_WINDOW_CLOSE: return productCategoryEditWindowClose(state,action);
    case actionTypes.PRODUCT_CATEGORY_EDIT_SUCCESS: return editProductCategorySuccess(state,action);
    case actionTypes.PRODUCT_CATEGORY_EDIT_FAIL: return editProductCategoryFail(state,action);
    case actionTypes.PRODUCT_CATEGORY_DELETE_SUCCESS: return deleteProductCategorySuccess(state,action);
    case actionTypes.PRODUCT_CATEGORY_DELETE_FAIL: return deleteProductCategoryFail(state,action);
    default: return state;

  }
};

export default reducer;
