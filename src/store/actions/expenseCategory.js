import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createExpenseCategorySuccess =(expenseCategoryData)=>{
  return{
    type : actionTypes.CREATE_EXPENSE_CATEGORY_SUCCESS,
    expenseCategoryData: expenseCategoryData
  }
}

export const createExpenseCategoryFail =()=> {
  return{
    type:actionTypes.CREATE_EXPENSE_CATEGORY_FAIL
  }
}

export const expenseCategoryViewWindowClose=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_LIST_PAGE_CLOSE
  }
}

export const expenseCategoryViewWindowOpen=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_LIST_PAGE_OPEN
  }
}

export const expenseCategoryDeleteWindowOpen=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_DELETE_WINDOW_OPEN
  }
}

export const expenseCategoryDeleteWindowClose=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_DELETE_WINDOW_CLOSE
  }
}

export const expenseCategoryEditWindowOpen=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_EDIT_WINDOW_OPEN
  }
}

export const expenseCategoryEditWindowClose=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_EDIT_WINDOW_CLOSE
  }
}

export const editExpenseCategorySuccess=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_EDIT_SUCCESS
  }
}

export const editExpenseCategoryFail=()=>{
  return{
    type:actionTypes.EXPENSE_CATEGORY_EDIT_FAIL
  }
}

export const deleteExpenseCategorySuccess=()=>{
  return {
    type:actionTypes.EXPENSE_CATEGORY_DELETE_SUCCESS
  }
}

export const deleteExpenseCategoryFail=()=>{
  return {
    type:actionTypes.EXPENSE_CATEGORY_DELETE_FAIL
  }
}

export const getAllExpenseCategoryData =(expenseCategoryDataList)=>{
  return {
    type:actionTypes.GET_ALL_EXPENSE_CATEGORY_DATA,
    expenseCategoryDataList:expenseCategoryDataList
  }
}
// export const areaObjDeleteHandler=(id)=>{
//   return dispatch =>{
//     axios.delete('/expenses/area/'+ id).then(
//       response => {
//
//         dispatch(deleteAreaSuccess())
//       }
//     )
//     .catch(error=>{
//       dispatch(deleteAreaFail(error))
//     })
//   }
// }
//
// export const areaObjEditHandler=(e,obj)=>{
//   return dispatch => {
//     axios.patch('/expenses/area/' + obj.id + '/',obj).then(
//       response => {
//         console.log(response.data);
//         dispatch(editAreaSuccess(response.data))
//       }
//       .catch(error => {
//       dispatch(editAreaFail(error))
//     })
//   }
// }

// export const createArea=(data)=>{
//   return dispatch => {
//     axios.post('/expenses/area/',data,{
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }).then(
//       response=> {
//         dispatch(createAreaSuccess(response.data))
//         dispatch(getAllArea())
//
//         axios.get('/invoice/area/').then(
//           response=>{
//             console.log(response.data)
//             dispatch(getAllAreaData(response.data))
//           }
//         )
//
//       }
//     )
//     .catch(error => {
//       console.log(error)
//       dispatch(createAreaFail(error))
//     })
//   }
// }

export const getAllExpenseCategory = (data)=>{
  return dispatch => {
    axios.get('expenses/expense-category/').then(
      response => {
        console.log(response.data)

        dispatch(getAllExpenseCategoryData(response.data))

      }
    )
  }
}
