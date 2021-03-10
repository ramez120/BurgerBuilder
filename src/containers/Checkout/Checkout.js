import React, { Component } from "react";
import { Route } from "react-router";
import CheckoutSummary from "../Checkout/CheckoutSummary/CheckoutSummary";
import ContactData from "../Checkout/ContactData/ContactData";
class Checkout extends Component {
  state = {
    ingredients: {
      salad: 0,
      cheese: 0,
      bacon: 0,
      meat: 0,
    },
    burgerPrice: 0,
  };

  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for (let param of query.entries()) {
      if (param[0] === "price") {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }
    this.setState({ ingredients: ingredients, burgerPrice: price });
  }

  backHandler = () => {
    this.props.history.goBack();
  };
  continueCheckoutHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          back={this.backHandler}
          continue={this.continueCheckoutHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.burgerPrice}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
