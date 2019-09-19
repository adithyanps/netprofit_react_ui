import { createStore ,applyMiddleware,compose, combineReducers } from 'redux'
import thunk from 'redux-thunk';

import loginReducer from '../store/reducers/login';
import logoutReducer from '../store/reducers/logout';
import authReducer from '../store/reducers/auth';
import currentUserReducer from '../store/reducers/currentUser';
import salesInvoiceReducer from '../store/reducers/salesInvoice';
import accountReducer from '../store/reducers/account';
import recieptReducer from '../store/reducers/reciept';
import expenseReducer from '../store/reducers/expense';
import partnerReducer from '../store/reducers/partner';
import productReducer from '../store/reducers/product';
import productCategoryReducer from '../store/reducers/productCategory';
import branchReducer from '../store/reducers/branch';
import areaReducer from '../store/reducers/area';
import accountTypesReducer from '../store/reducers/accountTypes';

import expenseCategoryTypesReducer from '../store/reducers/expenseCategory';





const rootReducer = combineReducers({
  login:loginReducer,
  logout:logoutReducer,
  auth:authReducer,
  currentUser:currentUserReducer,
  salesInvoice:salesInvoiceReducer,
  account:accountReducer,
  reciept:recieptReducer,
  expense:expenseReducer,
  partner:partnerReducer,
  product:productReducer,
  productCategory:productCategoryReducer,
  branch:branchReducer,
  area:areaReducer,
  accountTypes:accountTypesReducer,
  expenseCategory:expenseCategoryTypesReducer

})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(
  rootReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )

)

export default store
