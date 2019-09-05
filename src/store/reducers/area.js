import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  areaData:[],
  areaDataList:[],
  areaListPageOpen:false,
  isDeletePage:false,
  isEditPage:false,

}
const getAllAreaData =(state, action)=>{
  return updateObject( state, {
    areaDataList:action.areaDataList,
  })
}
const createAreaSuccess =(state,action) => {
  return updateObject( state, {
    areaData:action.areaData,
    areaListPageOpen:true,
  })
}

const createAreaFail = (state,action)=> {
  return  updateObject(state)
}

const areaViewWindowClose=(state, action) => {
    return updateObject(state,{areaListPageOpen:false})
}

const areaDeleteWindowOpen=(state, action) => {
    return updateObject(state,{isDeletePage:true})
}

const areaDeleteWindowClose=(state, action) => {
    return updateObject(state,{isDeletePage:false})
}

const areaEditWindowOpen=(state, action)=>{
  return updateObject(state,{isEditPage:true})
}

const areaEditWindowClose=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editAreaSuccess=(state,action)=>{
  return updateObject(state,{isEditPage:false})
}

const editAreaFail=(state,action)=>{
  return updateObject(state,{isEditPage:true})
}

const deleteAreaSuccess=(state, action)=>{
  return updateObject(state,{isDeletePage:false,isEditPage:false,areaListPageOpen:false})
}

const deleteAreaFail=(state,action)=>{
  return updateObject(state,{isDeletePage:true})
}

const reducer =(state=initialState,action)=>{
  switch (action.type) {
    case actionTypes.CREATE_AREA_SUCCESS: return createAreaSuccess(state,action);
    case actionTypes.CREATE_AREA_FAIL: return createAreaFail(state,action);
    case actionTypes.AREA_LIST_PAGE_CLOSE: return areaViewWindowClose(state,action);
    case actionTypes.AREA_DELETE_WINDOW_OPEN: return areaDeleteWindowOpen(state,action);
    case actionTypes.AREA_DELETE_WINDOW_CLOSE: return areaDeleteWindowClose(state,action);
    case actionTypes.AREA_EDIT_WINDOW_OPEN: return areaEditWindowOpen(state,action);
    case actionTypes.AREA_EDIT_WINDOW_CLOSE: return areaEditWindowClose(state,action);
    case actionTypes.AREA_EDIT_SUCCESS: return editAreaSuccess(state,action);
    case actionTypes.AREA_EDIT_FAIL: return editAreaFail(state,action);
    case actionTypes.AREA_DELETE_SUCCESS: return deleteAreaSuccess(state,action);
    case actionTypes.AREA_DELETE_FAIL: return deleteAreaFail(state,action);
    case actionTypes.GET_ALL_AREA_DATA: return getAllAreaData(state,action);

    default: return state;

  }
};

export default reducer;
