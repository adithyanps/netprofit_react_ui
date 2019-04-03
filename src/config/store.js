import { createStore ,applyMiddleware,compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import loginReducer from '../store/reducers/login';
import logoutReducer from '../store/reducers/logout';
import authReducer from '../store/reducers/auth';
import currentUserReducer from '../store/reducers/currentUser';

const rootReducer = combineReducers({
  login:loginReducer,
  logout:logoutReducer,
  auth:authReducer,
  currentUser:currentUserReducer,


})
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )

)

export default store
