import React from "react";
import Backdrop from '../Backdrop/Backdrop';
import Aux from '../../../hoc/Auxillary/Auxillary';
import classes from "./Modal.module.css";
const Modal = (props) => {
  return (
      <Aux>
          <Backdrop show = {props.show} clicked = {props.removeModal} />
    <div
      className={classes.Modal}
      style={{
        transform: props.show ? "translateY(0)" : "translateY(-100)",
        display: props.show ? "block" :"none",
      }}
    >
      {props.children}
    </div>
    </Aux>
  );
};
export default React.memo(Modal);
