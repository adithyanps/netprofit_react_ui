import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  creditNoteData:[],
  creditNoteDataList:[],
  creditNoteListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,
  partnerList:[],
  settingsAcnt:[],
  error:null

}
const getAllCreditNoteData =(state, action)=>{
  return updateObject( state, {
    creditNoteDataList:action.creditNoteDataList,
  })
}
const createCreditNoteSuccess =(state,action) => {
  return updateObject( state, {
    creditNoteData:action.creditNoteData,
    creditNoteListPageOpen:true,
    partnerList:action.partnerList,
    settingsAcnt:action.settingsAcnt
  })
}

const createCreditNoteFail = (state,action)=> {
  return  updateObject(state)
}

const creditNoteViewWindowClose=(state, action) => {
    return updateObject(state,{creditNoteListPageOpen:false})
}

const creditNoteDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const creditNoteDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const creditNoteEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const creditNoteEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editCreditNoteSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editCreditNoteFail=(state,action)=>{
  return updateObject(state,{isEditPage:true,error:action.error})
}

const deleteCreditNoteSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,creditNoteListPageOpen:false})
}

const deleteCreditNoteFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_CREDIT_NOTE_SUCCESS: return createCreditNoteSuccess(state,action);
    case actionTypes.CREATE_CREDIT_NOTE_FAIL: return createCreditNoteFail(state,action);
    case actionTypes.CREDIT_NOTE_LIST_PAGE_CLOSE: return creditNoteViewWindowClose(state,action);
    case actionTypes.CREDIT_NOTE_DELETE_WINDOW_OPEN: return creditNoteDeleteWindowOpen(state,action);
    case actionTypes.CREDIT_NOTE_DELETE_WINDOW_CLOSE: return creditNoteDeleteWindowClose(state,action);
    case actionTypes.CREDIT_NOTE_EDIT_WINDOW_OPEN: return creditNoteEditWindowOpen(state,action);
    case actionTypes.CREDIT_NOTE_EDIT_WINDOW_CLOSE: return creditNoteEditWindowClose(state,action);
    case actionTypes.CREDIT_NOTE_EDIT_SUCCESS: return editCreditNoteSuccess(state,action);
    case actionTypes.CREDIT_NOTE_EDIT_FAIL: return editCreditNoteFail(state,action);
    case actionTypes.CREDIT_NOTE_DELETE_SUCCESS: return deleteCreditNoteSuccess(state,action);
    case actionTypes.CREDIT_NOTE_DELETE_FAIL: return deleteCreditNoteFail(state,action);
    case actionTypes.GET_ALL_CREDIT_NOTE_DATA: return getAllCreditNoteData(state,action);

    default: return state;

  }
};

export default reducer;
