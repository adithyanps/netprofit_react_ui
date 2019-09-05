import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  branchData:[],
  branchDataList:[],
  branchListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}
const getAllBranchData =(state, action)=>{
  return updateObject( state, {
    branchDataList:action.branchDataList,
  })
}
const createBranchSuccess =(state,action) => {
  return updateObject( state, {
    branchData:action.branchData,
    branchListPageOpen:true,
  })
}

const createBranchFail = (state,action)=> {
  return  updateObject(state)
}

const branchViewWindowClose=(state, action) => {
    return updateObject(state,{branchListPageOpen:false})
}

const branchDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const branchDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const branchEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const branchEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editBranchSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editBranchFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteBranchSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,branchListPageOpen:false})
}

const deleteBranchFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_BRANCH_SUCCESS: return createBranchSuccess(state,action);
    case actionTypes.CREATE_BRANCH_FAIL: return createBranchFail(state,action);
    case actionTypes.BRANCH_LIST_PAGE_CLOSE: return branchViewWindowClose(state,action);
    case actionTypes.BRANCH_DELETE_WINDOW_OPEN: return branchDeleteWindowOpen(state,action);
    case actionTypes.BRANCH_DELETE_WINDOW_CLOSE: return branchDeleteWindowClose(state,action);
    case actionTypes.BRANCH_EDIT_WINDOW_OPEN: return branchEditWindowOpen(state,action);
    case actionTypes.BRANCH_EDIT_WINDOW_CLOSE: return branchEditWindowClose(state,action);
    case actionTypes.BRANCH_EDIT_SUCCESS: return editBranchSuccess(state,action);
    case actionTypes.BRANCH_EDIT_FAIL: return editBranchFail(state,action);
    case actionTypes.BRANCH_DELETE_SUCCESS: return deleteBranchSuccess(state,action);
    case actionTypes.BRANCH_DELETE_FAIL: return deleteBranchFail(state,action);
    case actionTypes.GET_ALL_BRANCH_DATA: return getAllBranchData(state,action);

    default: return state;

  }
};

export default reducer;
