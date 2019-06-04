import * as actionTypes from './actionTypes';
import axios from "../../axios";

export const defaultAccountStart = () => {
  return {
    type : actionTypes.DEFAULT_ACCOUNT_START
  };
};

export const defaultAccountFail = (error) => {
  return {
    type : actionTypes.DEFAULT_ACCOUNT_FAIL,
    error: error
  };
};

export const fetchOrdersSuccess = (defaultAccount) => {
  return {
    type: actionTypes.DEFAULT_ACCOUNT_SUCCESS,
    defaultAccount: defaultAccount
  };
};

export const defaultAccountList =()=> {
  return dispatch => {
    axios.get('invoice/accountDefault/')
      .then( res => {
        const defaultAccount = [];
        for ( let key in res.data) {
          defaultAccount.push( {
            ...res.data[key]
          });
        }
        dispatch(fetchOrdersSuccess(defaultAccount));
      })
      .catch( error => {
        dispatch(defaultAccountFail(error));
      });
  }
}


export const accountStart = () => {
  return {
    type : actionTypes.ACCOUNTS_START
  };
};

export const accountFail = (error) => {
  return {
    type : actionTypes.ACCOUNTS_FAIL,
    error: error
  };
};

export const accountSuccess = (account) => {
  return {
    type: actionTypes.ACCOUNTS_SUCCESS,
    account: account
  };
};

export const accountList =()=> {
  return dispatch => {
    axios.get('invoice/account/')
      .then( res => {
        const account = [];
        for ( let key in res.data) {
          account.push( {
            ...res.data[key]
          });
        }
        dispatch(accountSuccess(account));
      })
      .catch( error => {
        dispatch(accountFail(error));
      });
  }
}
