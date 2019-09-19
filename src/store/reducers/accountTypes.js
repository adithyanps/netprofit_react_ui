import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  accountData:[],
  accountDataList:[],
  accountListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}
const getAllAccountData =(state, action)=>{
  return updateObject( state, {
    accountDataList:action.accountDataList,
  })
}
const createAccountSuccess =(state,action) => {
  return updateObject( state, {
    accountData:action.accountData,
    accountListPageOpen:true,
  })
}

const createAccountFail = (state,action)=> {
  return  updateObject(state)
}

const accountViewWindowClose=(state, action) => {
    return updateObject(state,{accountListPageOpen:false})
}

const accountDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const accountDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const accountEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const accountEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editAccountSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editAccountFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteAccountSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,accountListPageOpen:false})
}

const deleteAccountFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_ACCOUNT_SUCCESS: return createAccountSuccess(state,action);
    case actionTypes.CREATE_ACCOUNT_FAIL: return createAccountFail(state,action);
    case actionTypes.ACCOUNT_LIST_PAGE_CLOSE: return accountViewWindowClose(state,action);
    case actionTypes.ACCOUNT_DELETE_WINDOW_OPEN: return accountDeleteWindowOpen(state,action);
    case actionTypes.ACCOUNT_DELETE_WINDOW_CLOSE: return accountDeleteWindowClose(state,action);
    case actionTypes.ACCOUNT_EDIT_WINDOW_OPEN: return accountEditWindowOpen(state,action);
    case actionTypes.ACCOUNT_EDIT_WINDOW_CLOSE: return accountEditWindowClose(state,action);
    case actionTypes.ACCOUNT_EDIT_SUCCESS: return editAccountSuccess(state,action);
    case actionTypes.ACCOUNT_EDIT_FAIL: return editAccountFail(state,action);
    case actionTypes.ACCOUNT_DELETE_SUCCESS: return deleteAccountSuccess(state,action);
    case actionTypes.ACCOUNT_DELETE_FAIL: return deleteAccountFail(state,action);
    case actionTypes.GET_ALL_ACCOUNT_DATA: return getAllAccountData(state,action);

    default: return state;

  }
};

export default reducer;
