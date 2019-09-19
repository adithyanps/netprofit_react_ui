import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  expenseCategoryData:[],
  expenseCategoryDataList:[],
  expenseCategoryListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,
}

const getAllExpenseCategoryData =(state, action)=>{
  return updateObject( state, {
    expenseCategoryDataList:action.expenseCategoryDataList,
  })
}

const createExpenseCategorySuccess =(state,action) => {
  return updateObject( state, {
    expenseCategoryData:action.expenseCategoryData,
    expenseCategoryListPageOpen:true,
  })
}

const createExpenseCategoryFail = (state,action)=> {
  return  updateObject(state)
}

const expenseCategoryViewWindowClose=(state, action) => {
    return updateObject(state,{expenseCategoryListPageOpen:false})
}

const expenseCategoryDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const expenseCategoryDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const expenseCategoryEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const expenseCategoryEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editExpenseCategorySuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editExpenseCategoryFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteExpenseCategorySuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,expenseCategoryListPageOpen:false})
}

const deleteExpenseCategoryFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS: return createExpenseCategorySuccess(state,action);
    case actionTypes.CREATE_EXPENSE_CATEGORY_FAIL: return createExpenseCategoryFail(state,action);
    case actionTypes.EXPENSE_CATEGORY_LIST_PAGE_CLOSE: return expenseCategoryViewWindowClose(state,action);
    case actionTypes.EXPENSE_CATEGORY_DELETE_WINDOW_OPEN: return expenseCategoryDeleteWindowOpen(state,action);
    case actionTypes.EXPENSE_CATEGORY_DELETE_WINDOW_CLOSE: return expenseCategoryDeleteWindowClose(state,action);
    case actionTypes.EXPENSE_CATEGORY_EDIT_WINDOW_OPEN: return expenseCategoryEditWindowOpen(state,action);
    case actionTypes.EXPENSE_CATEGORY_EDIT_WINDOW_CLOSE: return expenseCategoryEditWindowClose(state,action);
    case actionTypes.EXPENSE_CATEGORY_EDIT_SUCCESS: return editExpenseCategorySuccess(state,action);
    case actionTypes.EXPENSE_CATEGORY_EDIT_FAIL: return editExpenseCategoryFail(state,action);
    case actionTypes.EXPENSE_CATEGORY_DELETE_SUCCESS: return deleteExpenseCategorySuccess(state,action);
    case actionTypes.EXPENSE_CATEGORY_DELETE_FAIL: return deleteExpenseCategoryFail(state,action);
    case actionTypes.GET_ALL_EXPENSE_CATEGORY_DATA: return getAllExpenseCategoryData(state,action);

    default: return state;

  }
};

export default reducer;
