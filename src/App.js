import React, { Component } from 'react';
import './App.css';

import { withRouter} from 'react-router-dom';
import { BrowserRouter  as Router  } from 'react-router-dom';
import { Switch , Route ,Redirect} from 'react-router-dom';
import { browserHistory,IndexRoute} from 'react-router';

import { connect } from 'react-redux';
import axios from './axios';
import * as actions from './store/actions/index';

import Navbar from './components/UI/Layout/Navbar';
import Login from './containers/Auth/Login/Login';
import Logout from './containers/Auth/Logout/Logout';
import Home from './containers/MainPages/Home';
import SalesPage from './containers/MainPages/SalesPage';
import PurchasePage from './containers/MainPages/PurchasePage';
import AccountsPage from './containers/MainPages/AccountsPage';
import ReportsPage from './containers/MainPages/ReportsPage';
import SettingsPage from './containers/MainPages/SettingsPage';
import CreateInvoice from './containers/Sales/CreateInvoicePage';
import SalesInvoicesPage from './containers/Sales/SalesInvoicesPage';
import CreateRecieptPage from './containers/Sales/CreateRecieptPage';
import CustomerRecieptsPage from './containers/Sales/CustomerRecieptsPage';
import ExpenseListPage from './containers/QuickLink/ExpenseListPage';

import Customers from './containers/Sales/Customers';
import CreateExpensePage from './containers/QuickLink/CreateExpensePage';
import CreatePartnerPage from './containers/Settings/Partner/CreatePartnerPage';
import PartnerListPage from './containers/Settings/Partner/PartnersListPage';
import CreateProduct from './containers/Settings/Product/CreateProductPage';
import ProductListPage from './containers/Settings/Product/ProductsListPage';
import CreateProductCategory from './containers/Settings/ProductCategory/CreateProductCategoryPage';
import ProductCategoryListPage from './containers/Settings/ProductCategory/ProductCategoryListPage';
import CreateBranch from './containers/Settings/Branch/CreateBranchPage';
import BranchListPage from './containers/Settings/Branch/BranchListPage';
import CreateArea from './containers/Settings/Area/CreateAreaPage';
import AreaListPage from './containers/Settings/Area/AreaListPage';




class App extends Component {

  componentDidMount(){
    this.props.onTryAutoSignup()
    this.props.currentUser()

  }
  render() {
    console.log(this.props.user_choice)
    console.log(this.props)

    let token = null;
    token = this.props.loginToken
    let routes =(
      <div>
          <Navbar >
          <Switch>
            <Route path="/" exact component={Login} />
            <Route path="/home" exact component={Home} />
            <Route path="/sales" exact component={SalesPage} />
            <Route path="/accounts" exact component={AccountsPage} />
            <Route path="/reports" exact component={ReportsPage} />
            <Route path="/purchase" exact component={PurchasePage} />
            <Route path="/settings" exact component={SettingsPage} />
            <Route path="/create-invoice" exact component={CreateInvoice} />
            <Route path="/sales-invoices" exact component={SalesInvoicesPage} />
            <Route path="/create-reciept" exact component={CreateRecieptPage} />
            <Route path="/customer-reciepts" exact component={CustomerRecieptsPage} />
            <Route path="/expense-list" exact component={ExpenseListPage} />
            <Route path="/Customers" exact component={Customers} />
            <Route  path="/logout" component={Logout} />
            <Route path="/create-expense" exact component={CreateExpensePage} />
            <Route path="/create-partner" exact component={CreatePartnerPage} />
            <Route path="/partners" exact component={PartnerListPage} />
            <Route path="/create-products" exact component={CreateProduct} />
            <Route path="/products" exact component={ProductListPage} />
            <Route path="/create-productCategory" exact component={CreateProductCategory} />
            <Route path="/productCategorys" exact component={ProductCategoryListPage} />
            <Route path="/create-branch" exact component={CreateBranch} />
            <Route path="/branches" exact component={BranchListPage} />
            <Route path="/create-area" exact component={CreateArea} />
            <Route path="/areas" exact component= {AreaListPage}/>

          </Switch>
          </Navbar >
      </div>
    )
    if(this.props.loginToken === null ){
      routes =(
        <Switch>
          <Route path="/" exact component={Login} />
        </Switch>
      )
    }


    return (
      <div className="App">
        <React.Fragment>
            {routes}

        </React.Fragment>
      </div>
    );
  }
}

const mapStateToProps = (state)=> {
  return {
    loginToken:state.login.token,
    user_choice:state.login.user_choice,
    currentUserData:state.currentUser.userData
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(actions.authCheckState()),
    onRedirect : ()=>dispatch(actions.redirect()),
    currentUser: ()=>dispatch(actions.currentUser()),

  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
// if (this.props.currentUserData.user_choice === "FULL_ACCESS") {
//   routes=(
//       <Navbar >
//         <Switch>
//           <Route path="/settings" exact component={SettingsPage} />
//           <Route path="/create-partner" exact component={CreatePartnerPage} />
//           <Route path="/partners" exact component={PartnerListPage} />
//           <Route path="/create-products" exact component={CreateProduct} />
//           <Route path="/products" exact component={ProductListPage} />
//           <Route path="/create-productCategory" exact component={CreateProductCategory} />
//           <Route path="/productCategorys" exact component={ProductCategoryListPage} />
//           <Route path="/create-branch" exact component={CreateBranch} />
//           <Route path="/branches" exact component={BranchListPage} />
//           <Route path="/create-area" exact component={CreateArea} />
//           <Route path="/areas" exact component= {AreaListPage}/>
//        </Switch>
//       </Navbar >
//   )
// }
