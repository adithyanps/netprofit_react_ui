import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createProductSuccess =(productData)=>{
  return{
    type : actionTypes.CREATE_PRODUCT_SUCCESS,
    productData: productData
  }
}

export const createProductFail =()=> {
  return{
    type:actionTypes.CREATE_PRODUCT_FAIL
  }
}

export const productViewWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_LIST_PAGE_CLOSE
  }
}

export const productViewWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_LIST_PAGE_OPEN
  }
}

export const productDeleteWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_DELETE_WINDOW_OPEN
  }
}

export const productDeleteWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_DELETE_WINDOW_CLOSE
  }
}

export const productEditWindowOpen=()=>{
  return{
    type:actionTypes.PRODUCT_EDIT_WINDOW_OPEN
  }
}

export const productEditWindowClose=()=>{
  return{
    type:actionTypes.PRODUCT_EDIT_WINDOW_CLOSE
  }
}

export const editProductSuccess=()=>{
  return{
    type:actionTypes.PRODUCT_EDIT_SUCCESS
  }
}

export const editProductFail=()=>{
  return{
    type:actionTypes.PRODUCT_EDIT_FAIL
  }
}

export const deleteProductSuccess=()=>{
  return {
    type:actionTypes.PRODUCT_DELETE_SUCCESS
  }
}

export const deleteProductFail=()=>{
  return {
    type:actionTypes.PRODUCT_DELETE_FAIL
  }
}

export const productObjDeleteHandler=(id)=>{
  return dispatch =>{
    axios.delete('/invoice/item/'+ id).then(
      response => {

        dispatch(deleteProductSuccess())
      }
    )
    .catch(error=>{
      dispatch(deleteProductFail(error))
    })
  }
}

export const productObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/invoice/item/' + obj.id + '/',obj).then(
      response => {
        console.log(response.data);
        dispatch(editProductSuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editProductFail(error))
    })
  }
}

export const createProduct=(data)=>{
  return dispatch => {
    axios.post('/invoice/item/',data,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
      response=> {
        dispatch(createProductSuccess(response.data))
      }
    )
    .catch(error => {
      console.log(error)
      dispatch(createProductFail(error))
    })
  }
}
