import React, { Component } from 'react';
import './App.css';

import { withRouter} from 'react-router-dom';
import { BrowserRouter  as Router  } from 'react-router-dom';
import { Switch , Route ,Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from './axios';
import * as actions from './store/actions/index';

import Navbar from './components/UI/Layout/Navbar';
import Login from './containers/Auth/Login/Login';
import Home from './containers/MainPages/Home';
import SalesPage from './containers/MainPages/SalesPage';
// import PurchasePage from './containers/MainPages/PurchasePage';
import AccountsPage from './containers/MainPages/AccountsPage';
import ReportsPage from './containers/MainPages/ReportsPage';

import CreateInvoice from './containers/Sales/CreateInvoicePage';
import SalesInvoicesPage from './containers/Sales/SalesInvoicesPage';
import QuickLink from './components/UI/QuickLink/QuickLink';

class App extends Component {
  componentDidMount(){
    this.props.onTryAutoSignup()


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
            <Route path="/create-invoice" exact component={CreateInvoice} />
            <Route path="/sales-invoices" exact component={SalesInvoicesPage} />

            <Route path="/qck" exact component={QuickLink} />

          </Switch>
          </Navbar >

      </div>

    )

    if(this.props.loginToken === null ) {
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
  }
}

export default withRouter(connect(mapStateToProps,mapDispatchToProps)(App));
