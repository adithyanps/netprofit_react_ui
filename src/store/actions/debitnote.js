import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createDebitNoteSuccess =(debitNoteData,partnerList,settingsAcnt)=>{
  return{
    type : actionTypes.CREATE_DEBIT_NOTE_SUCCESS,
    debitNoteData: debitNoteData,
    partnerList:partnerList,
    settingsAcnt:settingsAcnt
  }
}

export const createDebitNoteFail =()=> {
  return{
    type:actionTypes.CREATE_DEBIT_NOTE_FAIL
  }
}

export const debitNoteViewWindowClose=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_LIST_PAGE_CLOSE
  }
}

export const debitNoteViewWindowOpen=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_LIST_PAGE_OPEN
  }
}

export const debitNoteDeleteWindowOpen=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_DELETE_WINDOW_OPEN
  }
}

export const debitNoteDeleteWindowClose=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_DELETE_WINDOW_CLOSE
  }
}

export const debitNoteEditWindowOpen=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_EDIT_WINDOW_OPEN
  }
}

export const debitNoteEditWindowClose=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_EDIT_WINDOW_CLOSE
  }
}

export const editDebitNoteSuccess=()=>{
  return{
    type:actionTypes.DEBIT_NOTE_EDIT_SUCCESS
  }
}

export const editDebitNoteFail=(error)=>{
  return{
    type:actionTypes.DEBIT_NOTE_EDIT_FAIL,
    error:error
  }
}

export const deleteDebitNoteSuccess=()=>{
  return {
    type:actionTypes.DEBIT_NOTE_DELETE_SUCCESS
  }
}

export const deleteDebitNoteFail=()=>{
  return {
    type:actionTypes.DEBIT_NOTE_DELETE_FAIL
  }
}

export const getAllDebitNoteData =(debitNoteDataList)=>{
  return {
    type:actionTypes.GET_ALL_DEBIT_NOTE_DATA,
    debitNoteDataList:debitNoteDataList
  }
}

export const getAllDebitNote = (data)=>{
  return dispatch => {
    axios.get('debit_note/debitnote/').then(
      response => {
        console.log(response.data)

        dispatch(getAllDebitNoteData(response.data))

      }
    )
  }
}
