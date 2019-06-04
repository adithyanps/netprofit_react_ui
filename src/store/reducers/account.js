import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    defaultAccount: [],
    loading: false,
    account: [],
    accountLoading: false,
    // purchased: false
};



const defaultAccountStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const fetchOrdersSuccess = ( state, action ) => {
    return updateObject( state, {
        defaultAccount: action.defaultAccount,
        loading: false
    } );
};

const defaultAccountFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};





const accountStart = ( state, action ) => {
    return updateObject( state, { accountLoading: true } );
};

const accountSuccess = ( state, action ) => {
    return updateObject( state, {
        account: action.account,
        accountLoading: false
    } );
};

const accountFail = ( state, action ) => {
    return updateObject( state, { accountLoading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.DEFAULT_ACCOUNT_START: return defaultAccountStart( state, action );
        case actionTypes.DEFAULT_ACCOUNT_SUCCESS: return fetchOrdersSuccess( state, action );
        case actionTypes.DEFAULT_ACCOUNT_FAIL: return defaultAccountFail( state, action );
        case actionTypes.ACCOUNTS_START: return accountStart( state, action );
        case actionTypes.ACCOUNTS_SUCCESS: return accountSuccess( state, action );
        case actionTypes.ACCOUNTS_FAIL: return accountFail( state, action );

        default: return state;
    }
};

export default reducer;
