import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const currentUserStart = () => {
  return {
    type : actionTypes.CURRENT_USER_START
  };
};

export const currentUserFail = (error) => {
  return {
    type : actionTypes.CURRENT_USER_FAIL,
    error: error
  };
};

export const currentUserSuccess = (userData) => {
  return {
    type: actionTypes.CURRENT_USER_SUCCESS,
    userData: userData
  };
};

export const currentUser=()=>{
  return dispatch => {
    axios.get('/user/me',{
      headers: {
        'Authorization':'Token '+localStorage.getItem('token'),
        'X-Requested-With': 'XMLHttpRequest'
      },
    })
    .then(res=>{
      const currentUserData = [];
      for ( let key in res.data) {
        currentUserData.push( {
          ...res.data[key]
        });
      }
      console.log(res.data)
      dispatch(currentUserSuccess(res.data));
    })
    .catch(error =>{
      dispatch(currentUserFail(error));
    })
  }
}
