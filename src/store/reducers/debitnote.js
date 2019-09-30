import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  debitNoteData:[],
  debitNoteDataList:[],
  debitNoteListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,
  partnerList:[],
  settingsAcnt:[],
  error:null

}
const getAllDebitNoteData =(state, action)=>{
  return updateObject( state, {
    debitNoteDataList:action.debitNoteDataList,
  })
}
const createDebitNoteSuccess =(state,action) => {
  return updateObject( state, {
    debitNoteData:action.debitNoteData,
    debitNoteListPageOpen:true,
    partnerList:action.partnerList,
    settingsAcnt:action.settingsAcnt
  })
}

const createDebitNoteFail = (state,action)=> {
  return  updateObject(state)
}

const debitNoteViewWindowClose=(state, action) => {
    return updateObject(state,{debitNoteListPageOpen:false})
}

const debitNoteDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const debitNoteDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const debitNoteEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const debitNoteEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editDebitNoteSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editDebitNoteFail=(state,action)=>{
  return updateObject(state,{isEditPage:true,error:action.error})
}

const deleteDebitNoteSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,debitNoteListPageOpen:false})
}

const deleteDebitNoteFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_DEBIT_NOTE_SUCCESS: return createDebitNoteSuccess(state,action);
    case actionTypes.CREATE_DEBIT_NOTE_FAIL: return createDebitNoteFail(state,action);
    case actionTypes.DEBIT_NOTE_LIST_PAGE_CLOSE: return debitNoteViewWindowClose(state,action);
    case actionTypes.DEBIT_NOTE_DELETE_WINDOW_OPEN: return debitNoteDeleteWindowOpen(state,action);
    case actionTypes.DEBIT_NOTE_DELETE_WINDOW_CLOSE: return debitNoteDeleteWindowClose(state,action);
    case actionTypes.DEBIT_NOTE_EDIT_WINDOW_OPEN: return debitNoteEditWindowOpen(state,action);
    case actionTypes.DEBIT_NOTE_EDIT_WINDOW_CLOSE: return debitNoteEditWindowClose(state,action);
    case actionTypes.DEBIT_NOTE_EDIT_SUCCESS: return editDebitNoteSuccess(state,action);
    case actionTypes.DEBIT_NOTE_EDIT_FAIL: return editDebitNoteFail(state,action);
    case actionTypes.DEBIT_NOTE_DELETE_SUCCESS: return deleteDebitNoteSuccess(state,action);
    case actionTypes.DEBIT_NOTE_DELETE_FAIL: return deleteDebitNoteFail(state,action);
    case actionTypes.GET_ALL_DEBIT_NOTE_DATA: return getAllDebitNoteData(state,action);

    default: return state;
  }
};

export default reducer;
