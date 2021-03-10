import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
  const buttonType = props.type;
  console.log(props.disabled);
  return (
    <button
      className={[
        classes.Button,
        classes[buttonType], props.disabled ? classes.Disabled : null,
      ].join(" ")}
      onClick={props.clicked}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};
export default Button;
