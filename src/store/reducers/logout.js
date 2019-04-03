import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  token: null,
  id: null,
  error:null,
  loading:false,
}

const logout = (state, action) => {
    return updateObject(state, { token: null,id: null });
};

const LogoutReducer = (state=initialState,action) => {
    switch (action.type) {
      case actionTypes.LOGOUT: return logout(state, action);
      default:
        return state
    }
}
export default LogoutReducer;
