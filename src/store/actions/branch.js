import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createBranchSuccess =(branchData)=>{
  return{
    type : actionTypes.CREATE_BRANCH_SUCCESS,
    branchData: branchData
  }
}

export const createBranchFail =()=> {
  return{
    type:actionTypes.CREATE_BRANCH_FAIL
  }
}

export const branchViewWindowClose=()=>{
  return{
    type:actionTypes.BRANCH_LIST_PAGE_CLOSE
  }
}

export const branchViewWindowOpen=()=>{
  return{
    type:actionTypes.BRANCH_LIST_PAGE_OPEN
  }
}

export const branchDeleteWindowOpen=()=>{
  return{
    type:actionTypes.BRANCH_DELETE_WINDOW_OPEN
  }
}

export const branchDeleteWindowClose=()=>{
  return{
    type:actionTypes.BRANCH_DELETE_WINDOW_CLOSE
  }
}

export const branchEditWindowOpen=()=>{
  return{
    type:actionTypes.BRANCH_EDIT_WINDOW_OPEN
  }
}

export const branchEditWindowClose=()=>{
  return{
    type:actionTypes.BRANCH_EDIT_WINDOW_CLOSE
  }
}

export const editBranchSuccess=()=>{
  return{
    type:actionTypes.BRANCH_EDIT_SUCCESS
  }
}

export const editBranchFail=()=>{
  return{
    type:actionTypes.BRANCH_EDIT_FAIL
  }
}

export const deleteBranchSuccess=()=>{
  return {
    type:actionTypes.BRANCH_DELETE_SUCCESS
  }
}

export const deleteBranchFail=()=>{
  return {
    type:actionTypes.BRANCH_DELETE_FAIL
  }
}

export const getAllBranchData =(branchDataList)=>{
  return {
    type:actionTypes.GET_ALL_BRANCH_DATA,
    branchDataList:branchDataList
  }
}
// export const branchObjDeleteHandler=(id)=>{
//   return dispatch =>{
//     axios.delete('/invoice/branch/'+ id).then(
//       response => {
//
//         dispatch(deleteBranchSuccess())
//       }
//     )
//     .catch(error=>{
//       dispatch(deleteBranchFail(error))
//     })
//   }
// }
//
// export const branchObjEditHandler=(e,obj)=>{
//   return dispatch => {
//     axios.patch('/invoice/branch/' + obj.id + '/',obj).then(
//       response => {
//         console.log(response.data);
//         dispatch(editBranchSuccess(response.data))
//       }
//     )
//     .catch(error => {
//       dispatch(editBranchFail(error))
//     })
//   }
// }

// export const createBranch=(data)=>{
//   return dispatch => {
//     axios.post('/invoice/branch/',data,{
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }).then(
//       response=> {
//         dispatch(createBranchSuccess(response.data))
//         dispatch(getAllBranch())
//
//         axios.get('/invoice/branch/').then(
//           response=>{
//             console.log(response.data)
//             dispatch(getAllBranchData(response.data))
//           }
//         )
//
//       }
//     )
//     .catch(error => {
//       console.log(error)
//       dispatch(createBranchFail(error))
//     })
//   }
// }

export const getAllBranch = (data)=>{
  return dispatch => {
    axios.get('invoice/branch/').then(
      response => {
        console.log(response.data)

        dispatch(getAllBranchData(response.data))

      }
    )
  }
}
