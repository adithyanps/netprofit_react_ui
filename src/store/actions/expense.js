import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createExpenseSuccess =(expenseData)=>{
  return{
    type:actionTypes.CREATE_EXPENSE_SUCCESS,
    expenseData: expenseData
  }
}

export const createExpenseFail=()=>{
  return {
    type:actionTypes.CREATE_EXPENSE_FAIL
  }
}

export const expenseViewWindowOpen=()=>{
  return {
    type:actionTypes.EXPENSES_LIST_PAGE_OPEN
  }
}

export const expenseViewWindowClose=()=>{
  return {
    type:actionTypes.EXPENSES_LIST_PAGE_CLOSE
  }
}

export const expenseDeleteWindowOpen=()=>{
  return {
    type:actionTypes.EXPENSE_DELETE_WINDOW_OPEN
  }
}

export const expenseDeleteWindowClose=()=>{
  return {
    type:actionTypes.EXPENSE_DELETE_WINDOW_CLOSE
  }
}

export const expenseEditWindowOpen=()=>{
  return {
    type:actionTypes.EXPENSE_EDIT_WINDOW_OPEN
  }
}

export const expenseEditWindowClose=()=>{
  return {
    type:actionTypes.EXPENSE_EDIT_WINDOW_CLOSE
  }
}

export const editExpenseSuccess=()=>{
  return{
    type:actionTypes.EXPENSE_EDIT_SUCCESS
  }
}

export const editExpenseFail=()=>{
  return{
    type:actionTypes.EXPENSE_EDIT_FAIL
  }
}

export const deleteExpenseSuccess=()=>{
  return{
    type:actionTypes.EXPENSE_DELETE_SUCCESS
  }
}

export const deleteExpenseFail=()=>{
  return{
    type:actionTypes.EXPENSE_DELETE_FAIL
  }
}

export const expenseObjDeleteHandler=(id)=>{
  return dispatch =>{
    axios.delete('/invoice/expenses/'+ id).then(
      response => {
        dispatch(deleteExpenseSuccess())
      }
    )
    .catch(error=>{
      dispatch(deleteExpenseFail(error))
    })
  }
}

export const expenseObjEditHandler=(obj)=>{
  return dispatch => {
    axios.patch('/invoice/expenses/' + obj.id + '/',obj).then(
      response => {
        dispatch(editExpenseSuccess(response.data))
      }
    )
    .catch(error => {
      dispatch(editExpenseFail(error))
    })
  }
}

export const createExpense=(data)=>{
  return dispatch => {
    axios.post('/invoice/expenses/',data,{
        headers: {
            'Content-Type': 'application/json',
        }
    }).then(
      response=> {
        dispatch(createExpenseSuccess(response.data))
      }
    )
    .catch(error => {
      console.log(error)
      dispatch(createExpenseFail(error))
    })
  }
}
