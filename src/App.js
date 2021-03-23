import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";

import Logout from "./containers/Logout/Logout";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "./store/actions";
import React, { Component, Suspense } from "react";

import "./App.css";
import Spinner from "./components/UI/spinner/Spinner";
const Checkout = React.lazy(() =>{
  return import("./containers/Checkout/Checkout");
})
const Orders = React.lazy(() =>{
  return import("./containers/Orders/Orders");
})
const Auth = React.lazy(() =>{
  return import("./containers/Auth/Authentication");
})

class App extends Component {
  componentDidMount() {
    this.props.tryAutoSignIn();
  }
  render() {
    let routes = (
      <Suspense fallback = {<Spinner />}>
      <Switch>
        <Route path="/auth" component={Auth} />
        <Route path="/" exact component={BurgerBuilder} />
        <Redirect to = "/" />
      </Switch>
      </Suspense>
    );
    if (this.props.isAuthenticated) {
      routes = (
        <Suspense fallback = {<Spinner />}>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/auth" component={Auth} />
          <Route path="/logout" component={Logout} />
          <Route path="/" exact component={BurgerBuilder} />
          <Redirect to = "/" />
     

        </Switch>
        </Suspense>
      );
    }
    return (
      <BrowserRouter>
        <Layout>{routes}</Layout>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.authReducer.token !== null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tryAutoSignIn: () => dispatch(actions.checkTokenExpiration()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
