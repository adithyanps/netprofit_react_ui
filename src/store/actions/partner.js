import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createPartnerSuccess =(partnerData)=>{
  return{
    type : actionTypes.CREATE_PARTNER_SUCCESS,
    partnerData: partnerData
  }
}

export const createPartnerFail =()=> {
  return{
    type:actionTypes.CREATE_PARTNER_FAIL
  }
}

export const partnerViewWindowClose=()=>{
  return{
    type:actionTypes.PARTNERS_LIST_PAGE_CLOSE
  }
}

export const partnerViewWindowOpen=()=>{
  return{
    type:actionTypes.PARTNERS_LIST_PAGE_OPEN
  }
}

export const partnerDeleteWindowOpen=()=>{
  return{
    type:actionTypes.PARTNER_DELETE_WINDOW_OPEN
  }
}

export const partnerDeleteWindowClose=()=>{
  return{
    type:actionTypes.PARTNER_DELETE_WINDOW_CLOSE
  }
}

export const partnerEditWindowOpen=()=>{
  return{
    type:actionTypes.PARTNER_EDIT_WINDOW_OPEN
  }
}

export const partnerEditWindowClose=()=>{
  return{
    type:actionTypes.PARTNER_EDIT_WINDOW_CLOSE
  }
}

export const editPartnerSuccess=()=>{
  return{
    type:actionTypes.PARTNER_EDIT_SUCCESS
  }
}

export const editPartnerFail=()=>{
  return{
    type:actionTypes.PARTNER_EDIT_FAIL
  }
}

export const deletePartnerSuccess=()=>{
  return {
    type:actionTypes.PARTNER_DELETE_SUCCESS
  }
}

export const deletePartnerFail=()=>{
  return {
    type:actionTypes.PARTNER_DELETE_FAIL
  }
}

export const partnerObjDeleteHandler=(id)=>{
  return dispatch =>{
    axios.delete('/masters/partner/'+ id).then(
      response => {
        dispatch(deletePartnerSuccess())
      }
    )
    .catch(error=>{
      dispatch(deletePartnerFail(error))
    })
  }
}

export const partnerObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/masters/partner/' + obj.id + '/',obj).then(
      response => {
        dispatch(editPartnerSuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editPartnerFail(error))
    })
  }
}

export const createPartner=(data)=>{
  return dispatch => {
    axios.post('/masters/partner/',data,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
      response=> {
        dispatch(createPartnerSuccess(response.data))
      }
    )
    .catch(error => {
      console.log(error)
      dispatch(createPartnerFail(error))
    })
  }
}
