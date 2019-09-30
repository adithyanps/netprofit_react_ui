import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createCreditNoteSuccess =(creditNoteData,partnerList,settingsAcnt)=>{
  return{
    type : actionTypes.CREATE_CREDIT_NOTE_SUCCESS,
    creditNoteData: creditNoteData,
    partnerList:partnerList,
    settingsAcnt:settingsAcnt
  }
}

export const createCreditNoteFail =()=> {
  return{
    type:actionTypes.CREATE_CREDIT_NOTE_FAIL
  }
}

export const creditNoteViewWindowClose=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_LIST_PAGE_CLOSE
  }
}

export const creditNoteViewWindowOpen=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_LIST_PAGE_OPEN
  }
}

export const creditNoteDeleteWindowOpen=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_DELETE_WINDOW_OPEN
  }
}

export const creditNoteDeleteWindowClose=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_DELETE_WINDOW_CLOSE
  }
}

export const creditNoteEditWindowOpen=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_EDIT_WINDOW_OPEN
  }
}

export const creditNoteEditWindowClose=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_EDIT_WINDOW_CLOSE
  }
}

export const editCreditNoteSuccess=()=>{
  return{
    type:actionTypes.CREDIT_NOTE_EDIT_SUCCESS
  }
}

export const editCreditNoteFail=(error)=>{
  return{
    type:actionTypes.CREDIT_NOTE_EDIT_FAIL,
    error:error
  }
}

export const deleteCreditNoteSuccess=()=>{
  return {
    type:actionTypes.CREDIT_NOTE_DELETE_SUCCESS
  }
}

export const deleteCreditNoteFail=()=>{
  return {
    type:actionTypes.CREDIT_NOTE_DELETE_FAIL
  }
}

export const getAllCreditNoteData =(creditNoteDataList)=>{
  return {
    type:actionTypes.GET_ALL_CREDIT_NOTE_DATA,
    creditNoteDataList:creditNoteDataList
  }
}

export const getAllCreditNote = (data)=>{
  return dispatch => {
    axios.get('credit_note/creditnote/').then(
      response => {
        console.log(response.data)

        dispatch(getAllCreditNoteData(response.data))

      }
    )
  }
}
