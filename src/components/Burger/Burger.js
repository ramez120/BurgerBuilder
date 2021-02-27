import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredients/BurgerIngredient";

// receive ingredients key-value object
const Burger = ({ingredients}) => {
    //  make a new array of keys and map over them
  let transformedIngredients = Object.keys(ingredients).map(
    (ingrendient) => {
        // make a new array of size ingredient value and map returning desired components
      return [...Array(ingredients[ingrendient])].map((_, index) =>{
          return <BurgerIngredient type = {ingrendient} key = {ingrendient+index}/>;
      })
    }
  ).reduce((arr, el)=> {
    return arr.concat(el);
},[]) ;;
  if(transformedIngredients.length === 0){
      transformedIngredients = <p>please add ingredients</p>
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};
export default Burger;
