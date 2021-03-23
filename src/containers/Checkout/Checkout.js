import React, { Component } from "react";
import {connect} from 'react-redux';
import { Route,Redirect } from "react-router";
import CheckoutSummary from "../Checkout/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {


  componentDidMount() {
  }

  backHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };
  renderCheckoutSummary = () =>{
    let summary = <Redirect to = "/"/>;
    if(this.props.ingredients.ingredients){
      summary =(<div><CheckoutSummary
      ingredients={this.props.ingredients.ingredients}
      back={this.backHandler}
      continue={this.continueCheckoutHandler}
    />
    <Route
      path={this.props.match.path + "/contact-data"}
      component={
        ContactData}
    />
    </div>);
    
    }
    return summary;
  }

  render() {
    return (this.renderCheckoutSummary())
     
  
  }
}

const mapStateToProps = state =>{
  return {
    ingredients : state.ingredients
  }
}

export default connect(mapStateToProps)(Checkout);
