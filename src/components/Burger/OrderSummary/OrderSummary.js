import React from "react";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Button from "../../UI/Button/Button";
class OrderSummary extends React.Component  {

  render() {
    const ingredientSummary = Object.keys(this.props.ingredients).map((key) => {
        return (
          <li key = {key}>
            {" "}
            <span style={{ textTransform: "capitalize" }}>{key} </span> :{" "}
            {this.props.ingredients[key]}
          </li>
        );
      });
  return (
    <Aux>
      <h3>Your Order</h3>
      <p>A delicious Burger with the following ingredients : </p>
      <ul>{ingredientSummary}</ul>
      <p><strong>Total : {this.props.price}</strong></p>
      <p>Continue to checkout?</p>
      <Button type = "Success" clicked = {this.props.ok}>OK</Button>
      <Button type = "Danger" clicked = {this.props.cancel}>Cancel</Button>

    </Aux>
  );
  }
};

export default OrderSummary;
