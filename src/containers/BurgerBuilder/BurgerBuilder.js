import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/spinner/Spinner";
import axios from "../../apis/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
const INGREDIENT_PRICES = {
  meat: 2,
  salad: 0.5,
  cheese: 1,
  bacon: 1.75,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    burgerPrice: 5,
    purchasable: false,
    ordering: false,
    loading: false,
    error: null,
  };
  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then((response) => this.setState({ ingredients: response.data }))
      .catch((error) => this.setState({ error: true }));
  }
  updatePurchaseState = (Ingredients) => {
    const ingredientsValues = Object.values(Ingredients);
    const sum = ingredientsValues.reduce((sum, el) => {
      return sum + el;
    }, 0);

    this.setState({ purchasable: sum > 0 });
  };
  addIngredientHandler = (type) => {
    let updatedIngredients = null;
    this.setState(
      (prevState, props) => {
        // update ingredients
        updatedIngredients = { ...prevState.ingredients };
        updatedIngredients[type] = prevState.ingredients[type] + 1;
        // update price

        const updatedPrice = prevState.burgerPrice + INGREDIENT_PRICES[type];

        return {
          ingredients: updatedIngredients,
          burgerPrice: updatedPrice,
        };
      },
      () => {
        this.updatePurchaseState(updatedIngredients);
      }
    );
  };
  removeIngredientHandler = (type) => {
    let updatedIngredients = null;
    this.setState(
      (prevState, props) => {
        // update ingredients
        updatedIngredients = { ...prevState.ingredients };
        if (prevState.ingredients[type] < 1) return;
        updatedIngredients[type] = prevState.ingredients[type] - 1;
        // update price
        const updatedPrice = prevState.burgerPrice - INGREDIENT_PRICES[type];

        return {
          ingredients: updatedIngredients,
          burgerPrice: updatedPrice,
        };
      },
      () => {
        this.updatePurchaseState(updatedIngredients);
      }
    );
  };
  OrderingHandle = () => {
    this.setState({ ordering: true });
  };
  removeModalHandler = () => {
    this.setState({ ordering: false });
  };
  purshase = () => {
  
    const queryParams = [];
    for (let i in this.state.ingredients) {
      console.log(i)
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price="+this.state.burgerPrice);
    const queryString = queryParams.join('&');
    console.log(queryString);
    this.props.history.push({
      pathname: "/checkout",
      search: '?'+queryString,
    });
  };
  renderSummaryContent = () => {
    if (this.state.error) {
      return <h1>Sorry, something went wrong</h1>;
    }
    if (this.state.loading || !this.state.ingredients) {
      return <Spinner />;
    }
    return (
      <OrderSummary
        ingredients={this.state.ingredients}
        ok={this.purshase}
        cancel={this.removeModalHandler}
        price={this.state.burgerPrice.toFixed(2)}
      />
    );
  };
  renderBurgerContent = (disabledInfo) => {
    if (this.state.error) {
      return <h1>Sorry, something went wrong</h1>;
    }
    if (!this.state.ingredients) {
      return <Spinner />;
    }
    return (
      <Aux>
        <Burger ingredients={this.state.ingredients} />
        <BuildControls
          addedIngredients={this.addIngredientHandler}
          removedIngredients={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.state.burgerPrice}
          purchasable={this.state.purchasable}
          ordering={this.OrderingHandle}
        />
      </Aux>
    );
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }
    return (
      <Aux>
        <Modal show={this.state.ordering} removeModal={this.removeModalHandler}>
          {this.renderSummaryContent()}
        </Modal>
        {this.renderBurgerContent(disabledInfo)}
      </Aux>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
