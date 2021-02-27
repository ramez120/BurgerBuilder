import React from "react";
import classes from "./Button.module.css";
const Button = (props) => {
    const buttonType = props.type;
  return (
    <button
      className={[classes.Button, classes[buttonType]].join(" ")}
      onClick={props.clicked}
    >
      {props.children}
    </button>
  );
};
export default Button;
