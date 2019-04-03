import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState ={
  token: null,
  id: null,
  error:null,
  loading:false,
  user_choice:null,
}
const loginStart = (state, action) => {
  return updateObject(state, { error:null, loading:true});
}
const loginSuccess = (state, action) => {
  return updateObject(state, {
    token:action.token,
    error:null,
    loading:false,
    id:action.id,

  })
}

const loginFail = (state, action) => {
  return updateObject(state, {
    error:action.error,
    loading:false,

  })
}
const logout = (state, action) => {
    return ({ token: null,id: null });
};

const getUserChoice = (state, action) => {
  return updateObject(state, {
    user_choice:action.user_choice,
  })
}
const LoginReducer = (state=initialState,action) => {
    switch (action.type) {
      case actionTypes.LOGIN_START: return loginStart(state, action);
      case actionTypes.LOGIN_SUCCES: return loginSuccess(state, action);
      case actionTypes.LOGIN_FAIL: return loginFail(state, action);
      case actionTypes.LOGOUT: return logout(state, action);
      case actionTypes.GET_USER_CHOICE: return getUserChoice(state, action);
      default:
        return state
    }
}
export default LoginReducer;
