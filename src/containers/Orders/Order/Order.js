import React from "react";
import classes from "./Order.module.css";

const Order = (props) => {
  const renderIngredients = (ingredients) => {
    const ingredientsArray = [];
    for (let key in ingredients) {
      ingredientsArray.push({
        amount: ingredients[key],
        ingredient: key,
      });
    }
    return ingredientsArray.map(item =>{
        return <span style = {{textTransform : 'capitalize'}} key = {item.ingredient}>{item.ingredient}({item.amount}) </span>
    })
  };
  return (
    <div className={classes.Order}>
      <p>{renderIngredients(props.ingredients)}</p>
      <p>
        price : <strong>$ {Number.parseFloat(props.price).toFixed(2)}</strong>
      </p>
    </div>
  );
};
export default Order;
