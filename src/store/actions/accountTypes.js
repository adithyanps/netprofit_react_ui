import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createAccountSuccess =(accountData)=>{
  return{
    type : actionTypes.CREATE_ACCOUNT_SUCCESS,
    accountData: accountData
  }
}

export const createAccountFail =()=> {
  return{
    type:actionTypes.CREATE_ACCOUNT_FAIL
  }
}

export const accountViewWindowClose=()=>{
  return{
    type:actionTypes.ACCOUNT_LIST_PAGE_CLOSE
  }
}

export const accountViewWindowOpen=()=>{
  return{
    type:actionTypes.ACCOUNT_LIST_PAGE_OPEN
  }
}

export const accountDeleteWindowOpen=()=>{
  return{
    type:actionTypes.ACCOUNT_DELETE_WINDOW_OPEN
  }
}

export const accountDeleteWindowClose=()=>{
  return{
    type:actionTypes.ACCOUNT_DELETE_WINDOW_CLOSE
  }
}

export const accountEditWindowOpen=()=>{
  return{
    type:actionTypes.ACCOUNT_EDIT_WINDOW_OPEN
  }
}

export const accountEditWindowClose=()=>{
  return{
    type:actionTypes.ACCOUNT_EDIT_WINDOW_CLOSE
  }
}

export const editAccountSuccess=()=>{
  return{
    type:actionTypes.ACCOUNT_EDIT_SUCCESS
  }
}

export const editAccountFail=()=>{
  return{
    type:actionTypes.ACCOUNT_EDIT_FAIL
  }
}

export const deleteAccountSuccess=()=>{
  return {
    type:actionTypes.ACCOUNT_DELETE_SUCCESS
  }
}

export const deleteAccountFail=()=>{
  return {
    type:actionTypes.ACCOUNT_DELETE_FAIL
  }
}

export const getAllAccountData =(accountDataList)=>{
  return {
    type:actionTypes.GET_ALL_ACCOUNT_DATA,
    accountDataList:accountDataList
  }
}
// export const areaObjDeleteHandler=(id)=>{
//   return dispatch =>{
//     axios.delete('/invoice/area/'+ id).then(
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
//     axios.patch('/invoice/area/' + obj.id + '/',obj).then(
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
//     axios.post('/invoice/area/',data,{
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

export const getAllAccount = (data)=>{
  return dispatch => {
    axios.get('invoice/account/').then(
      response => {
        console.log(response.data)
        dispatch(getAllAccountData(response.data))

      }
    )
  }
}
