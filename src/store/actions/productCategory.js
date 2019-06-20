import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createProductCategorySuccess =(productCategoryData)=>{
  return{
    type : actionTypes.CREATE_PRODUCT_CATEGORY_SUCCESS,
    productCategoryData: productCategoryData
  }
}

export const createProductCategoryFail =()=> {
  return{
    type:actionTypes.CREATE_PRODUCT_CATEGORY_FAIL
  }
}

export const productCategoryViewWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_LIST_PAGE_CLOSE
  }
}

export const productCategoryViewWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_LIST_PAGE_OPEN
  }
}

export const productCategoryDeleteWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_DELETE_WINDOW_OPEN
  }
}

export const productCategoryDeleteWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_DELETE_WINDOW_CLOSE
  }
}

export const productCategoryEditWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_EDIT_WINDOW_OPEN
  }
}

export const productCategoryEditWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_EDIT_WINDOW_CLOSE
  }
}

export const editProductCategorySuccess=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_EDIT_SUCCESS
  }
}

export const editProductCategoryFail=()=>{
  return{
    type:actionTypes.PRODUCT_CATEGORY_EDIT_FAIL
  }
}

export const deleteProductCategorySuccess=()=>{
  return {
    type:actionTypes.PRODUCT_CATEGORY_DELETE_SUCCESS
  }
}

export const deleteProductCategoryFail=()=>{
  return {
    type:actionTypes.PRODUCT_CATEGORY_DELETE_FAIL
  }
}

export const productCategoryObjDeleteHandler=(id)=>{
  return dispatch =>{
    axios.delete('/invoice/product-category/'+ id).then(
      response => {

        dispatch(deleteProductCategorySuccess())
      }
    )
    .catch(error=>{
      dispatch(deleteProductCategoryFail(error))
    })
  }
}

export const productCategoryObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/invoice/product-category/' + obj.id + '/',obj).then(
      response => {
        console.log(response.data);
        dispatch(editProductCategorySuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editProductCategoryFail(error))
    })
  }
}

export const createProductCategory=(data)=>{
  return dispatch => {
    axios.post('/invoice/product-category/',data,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
      response=> {
        dispatch(createProductCategorySuccess(response.data))
      }
    )
    .catch(error => {
      console.log(error)
      dispatch(createProductCategoryFail(error))
    })
  }
}