import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  partnerData:[],
  partnerListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}

const createPartnerSuccess =(state,action) => {
  return updateObject( state, {
    partnerData:action.partnerData,
    partnerListPageOpen:true,
  })
}

const createPartnerFail = (state,action)=> {
  return  updateObject(state)
}

const partnerViewWindowClose=(state, action) => {
    return updateObject(state,{partnerListPageOpen:false})
}

const partnerDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const partnerDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const partnerEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const partnerEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editPartnerSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editPartnerFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deletePartnerSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,partnerListPageOpen:false})
}

const deletePartnerFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_PARTNER_SUCCESS: return createPartnerSuccess(state,action);
    case actionTypes.CREATE_PARTNER_FAIL: return createPartnerFail(state,action);
    case actionTypes.PARTNERS_LIST_PAGE_CLOSE: return partnerViewWindowClose(state,action);
    case actionTypes.PARTNER_DELETE_WINDOW_OPEN: return partnerDeleteWindowOpen(state,action);
    case actionTypes.PARTNER_DELETE_WINDOW_CLOSE: return partnerDeleteWindowClose(state,action);
    case actionTypes.PARTNER_EDIT_WINDOW_OPEN: return partnerEditWindowOpen(state,action);
    case actionTypes.PARTNER_EDIT_WINDOW_CLOSE: return partnerEditWindowClose(state,action);
    case actionTypes.PARTNER_EDIT_SUCCESS: return editPartnerSuccess(state,action);
    case actionTypes.PARTNER_EDIT_FAIL: return editPartnerFail(state,action);
    case actionTypes.PARTNER_DELETE_SUCCESS: return deletePartnerSuccess(state,action);
    case actionTypes.PARTNER_DELETE_FAIL: return deletePartnerFail(state,action);
    default: return state;

  }
};

export default reducer;
