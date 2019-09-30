import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const createAreaSuccess =(areaData)=>{
  return{
    type : actionTypes.CREATE_AREA_SUCCESS,
    areaData: areaData
  }
}

export const createAreaFail =()=> {
  return{
    type:actionTypes.CREATE_AREA_FAIL
  }
}

export const areaViewWindowClose=()=>{
  return{
    type:actionTypes.AREA_LIST_PAGE_CLOSE
  }
}

export const areaViewWindowOpen=()=>{
  return{
    type:actionTypes.AREA_LIST_PAGE_OPEN
  }
}

export const areaDeleteWindowOpen=()=>{
  return{
    type:actionTypes.AREA_DELETE_WINDOW_OPEN
  }
}

export const areaDeleteWindowClose=()=>{
  return{
    type:actionTypes.AREA_DELETE_WINDOW_CLOSE
  }
}

export const areaEditWindowOpen=()=>{
  return{
    type:actionTypes.AREA_EDIT_WINDOW_OPEN
  }
}

export const areaEditWindowClose=()=>{
  return{
    type:actionTypes.AREA_EDIT_WINDOW_CLOSE
  }
}

export const editAreaSuccess=()=>{
  return{
    type:actionTypes.AREA_EDIT_SUCCESS
  }
}

export const editAreaFail=()=>{
  return{
    type:actionTypes.AREA_EDIT_FAIL
  }
}

export const deleteAreaSuccess=()=>{
  return {
    type:actionTypes.AREA_DELETE_SUCCESS
  }
}

export const deleteAreaFail=()=>{
  return {
    type:actionTypes.AREA_DELETE_FAIL
  }
}

export const getAllAreaData =(areaDataList)=>{
  return {
    type:actionTypes.GET_ALL_AREA_DATA,
    areaDataList:areaDataList
  }
}
// export const areaObjDeleteHandler=(id)=>{
//   return dispatch =>{
//     axios.delete('/masters/area/'+ id).then(
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
//     axios.patch('/masters/area/' + obj.id + '/',obj).then(
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
//     axios.post('/masters/area/',data,{
//         headers: {
//             'Content-Type': 'application/json',
//         }
//     }).then(
//       response=> {
//         dispatch(createAreaSuccess(response.data))
//         dispatch(getAllArea())
//
//         axios.get('/masters/area/').then(
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

export const getAllArea = (data)=>{
  return dispatch => {
    axios.get('masters/area/').then(
      response => {
        console.log(response.data)

        dispatch(getAllAreaData(response.data))

      }
    )
  }
}
