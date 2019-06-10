import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  expenseData:[],
  expenseListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}

const createExpenseSuccess=(state,action)=>{
  return updateObject(state, {
    expenseData:action.expenseData,
    expenseListPageOpen:true
  })
}

const createExpenseFail=(state,action)=>{
  return updateObject(state)
}

const expenseViewWindowClose=(state,action)=>{
  return updateObject(state,{expenseListPageOpen:false})
}

const expenseDeleteWindowOpen=(state, action)=>{
  return updateObject(state, {isDeletePage:true})
}

const expenseDeleteWindowClose=(state, action)=>{
  return updateObject(state, {isDeletePage:false})
}

const expenseEditWindowOpen=(state, action)=>{
  return updateObject(state, {isEditPage:true})
}

const expenseEditWindowClose=(state, action)=>{
  return updateObject(state, {isEditPage:false})
}

const editExpenseSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editExpenseFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteExpenseSuccess=(state,action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,expenseListPageOpen:false})
}

const deleteExpenseFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer = (state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_EXPENSE_SUCCESS: return createExpenseSuccess(state,action);
    case actionTypes.CREATE_EXPENSE_FAIL: return createExpenseFail(state,action);
    case actionTypes.EXPENSES_LIST_PAGE_CLOSE: return expenseViewWindowClose(state,action);
    case actionTypes.EXPENSE_DELETE_WINDOW_OPEN: return expenseDeleteWindowOpen(state,action);
    case actionTypes.EXPENSE_DELETE_WINDOW_CLOSE: return expenseDeleteWindowClose(state,action);
    case actionTypes.EXPENSE_EDIT_WINDOW_OPEN: return expenseEditWindowOpen(state,action);
    case actionTypes.EXPENSE_EDIT_WINDOW_CLOSE: return expenseEditWindowClose(state,action);
    case actionTypes.EXPENSE_EDIT_SUCCESS: return editExpenseSuccess(state,action);
    case actionTypes.EXPENSE_EDIT_FAIL: return editExpenseFail(state,action);
    case actionTypes.EXPENSE_DELETE_SUCCESS: return deleteExpenseSuccess(state,action);
    case actionTypes.EXPENSE_DELETE_FAIL: return deleteExpenseFail(state,action);
    default: return state;
  }
};

export default reducer;
