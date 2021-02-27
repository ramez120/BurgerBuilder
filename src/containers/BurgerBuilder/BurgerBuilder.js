import React, { Component } from "react";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
const INGREDIENT_PRICES = {
  meat: 2,
  salad: 0.5,
  cheese: 1,
  bacon: 1.75,
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0,
    },
    burgerPrice: 5,
    purchasable: false,
    ordering: false,
  };
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
  sayOk = () => {
    alert("ok");
  };

  render() {
    const disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0 ? true : false;
    }
    return (
      <Aux>
        <Modal show={this.state.ordering} removeModal={this.removeModalHandler}>
          <OrderSummary
            ingredients={this.state.ingredients}
            ok={this.sayOk}
            cancel={this.removeModalHandler}
            price = {this.state.burgerPrice.toFixed(2)}
          />
        </Modal>
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
  }
}

export default BurgerBuilder;
