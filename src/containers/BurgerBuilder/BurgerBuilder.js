import React, { Component } from "react";
import { connect } from "react-redux";
import * as ingredientsActions from "../../store/actions";
import Aux from "../../hoc/Auxillary/Auxillary";
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Spinner from "../../components/UI/spinner/Spinner";
import axios from "../../apis/axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";

class BurgerBuilder extends Component {
  state = {
    ordering: false,
  };
  componentDidMount() {
    this.props.setIngredients();
  }
  updatePurchaseState = (Ingredients) => {
    const ingredientsValues = Object.values(Ingredients);
    const sum = ingredientsValues.reduce((sum, el) => {
      return sum + el;
    }, 0);
    return sum > 0;
  };
  addIngredientHandler = (type) => {
    this.props.addIngredient(type);
    this.updatePurchaseState(this.props.ingredients.ingredients);
  };
  removeIngredientHandler = (type) => {
    this.props.removedIngredient(type);
    this.updatePurchaseState(this.props.ingredients.ingredients);
  };
  OrderingHandle = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ordering: true });
    } else {
      this.props.setAuthRedirect("/checkout");
      this.props.history.push("/auth");
    }
  };
  removeModalHandler = () => {
    this.setState({ ordering: false });
  };
  purshase = () => {
    this.props.purchasing();
    this.props.history.push("/checkout");
  };
  renderSummaryContent = () => {
    if (this.props.ingredients.error) {
      return <h1>Sorry, something went wrong</h1>;
    }
    if (!this.props.ingredients.ingredients) {
      return <Spinner />;
    }
    return (
      <OrderSummary
        ingredients={this.props.ingredients.ingredients}
        ok={this.purshase}
        cancel={this.removeModalHandler}
        price={this.props.ingredients.burgerPrice.toFixed(2)}
      />
    );
  };
  renderBurgerContent = (disabledInfo) => {
    if (this.props.ingredients.error) {
      return <h1>Sorry, something went wrong</h1>;
    }
    if (!this.props.ingredients.ingredients) {
      return <Spinner />;
    }
    return (
      <Aux>
        <Burger ingredients={this.props.ingredients.ingredients} />
        <BuildControls
          addedIngredients={this.addIngredientHandler}
          removedIngredients={this.removeIngredientHandler}
          disabledInfo={disabledInfo}
          price={this.props.ingredients.burgerPrice}
          purchasable={this.updatePurchaseState(
            this.props.ingredients.ingredients
          )}
          ordering={this.OrderingHandle}
          isAuthenticated={this.props.isAuthenticated}
        />
      </Aux>
    );
  };

  render() {
    const disabledInfo = { ...this.props.ingredients.ingredients };
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

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    isAuthenticated: state.authReducer.token != null,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addIngredient: (type) => dispatch(ingredientsActions.addIngredient(type)),
    removedIngredient: (type) =>
      dispatch(ingredientsActions.removeIngredient(type)),
    setIngredients: () => dispatch(ingredientsActions.initIngredients()),
    purchasing: () => {
      dispatch(ingredientsActions.initiatePurchaseBeforeRedirect());
    },
    setAuthRedirect: (path) => dispatch(ingredientsActions.setAuthRedirectPath(path)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
