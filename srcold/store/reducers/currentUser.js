import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../../utility';

const initialState = {
    userData: [],
    loading: false,
};

const currentUserStart = ( state, action ) => {
    return updateObject( state, { loading: true } );
};

const currentUserSuccess = ( state, action ) => {
    return updateObject( state, {
        userData: action.userData,
        loading: false
    } );
};

const currentUserFail = ( state, action ) => {
    return updateObject( state, { loading: false } );
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {

        case actionTypes.CURRENT_USER_START: return currentUserStart( state, action );
        case actionTypes.CURRENT_USER_SUCCESS: return currentUserSuccess( state, action );
        case actionTypes.CURRENT_USER_FAIL: return currentUserFail( state, action );
        default: return state;
    }
};

export default reducer;
