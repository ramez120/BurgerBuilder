import React from "react";
import classes from "./Input.module.css";
const Input = (props) => {
  const inputClasses = [classes.InputElement];
  if (!props.valid && props.touched) {
    inputClasses.push(classes.InvalidElement);
  }
  let inputElement = null;
  switch (props.elementType) {
    case "input":
      inputElement = (
        <React.Fragment>
        <input
          onChange={props.changed}
         
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
        {!props.valid && props.touched?<label className = {classes.Label}>Please enter valid data!!</label> : null}
        </React.Fragment>

      );
      break;
    case "textArea":
      inputElement = (
        <React.Fragment>
        <textarea
          onChange={props.changed}
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
        {!props.valid && props.touched?<label className = {classes.Label}>Please enter valid data!!</label> : null}
        </React.Fragment>
      );
      break;
    case "select":
      inputElement = (
             <React.Fragment>
        <select style={{ width: "100%" }}>
          onChange = {props.changed}
          className={inputClasses.join(" ")}
          {props.elementConfig.options.map((option) => {
            return <option value={option.value}>{option.displayValue}</option>;
          })}
        </select>
        {!props.valid && props.touched?<label className = {classes.Label}>Please enter valid data!!</label> : null}
        </React.Fragment>

      );
      break;
    default:
      inputElement = (
        <React.Fragment>
        <input
          className={inputClasses.join(" ")}
          {...props.elementConfig}
          value={props.value}
        />
        {!props.valid && props.touched?<label className = {classes.Label}>Please enter valid data!!</label> : null}
        </React.Fragment>

      );
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};
export default Input;
