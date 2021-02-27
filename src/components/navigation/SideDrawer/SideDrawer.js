import React from "react";
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from "./SideDrawer.module.css";
import Aux from "../../../hoc/Auxillary/Auxillary";
import Backdrop from "../../UI/Backdrop/Backdrop";
const sideDrawer = (props) => {
  return (
    <Aux>
      <Backdrop show={props.open} clicked={props.closed} />
      <div
        className={[
          classes.SideDrawer,
          props.open ? classes.Open : classes.Close,
        ].join(" ")}
      >
        <div className={classes.Logo}>
          <Logo />
        </div>
        <nav>
          <NavigationItems />
        </nav>
      </div>
    </Aux>
  );
};
export default sideDrawer;
