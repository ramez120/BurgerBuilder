import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.module.css";
const controls = [
  {
    label: "Salad",
    type: "salad",
  },
  {
    label: "Cheese",
    type: "cheese",
  },
  {
    label: "Meat",
    type: "meat",
  },
  {
    label: "Bacon",
    type: "bacon",
  },
];
const buildControls = (props) => {
  return (
    <div className={classes.BuildControls}>
      <p>
        <strong>{props.price.toFixed(2)}</strong>
      </p>
      {controls.map((control) => {
        return (
          <BuildControl
            label={control.label}
            key={control.label}
            added={() => props.addedIngredients(control.type)}
            removed={() => props.removedIngredients(control.type)}
            disabled={props.disabledInfo[control.type]}
          />
        );
      })}
      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.ordering}
      >
        {props.isAuthenticated ? 'ORDER' :'SIGN UP TO TO ORDER'}
      </button>
    </div>
  );
};
export default buildControls;
