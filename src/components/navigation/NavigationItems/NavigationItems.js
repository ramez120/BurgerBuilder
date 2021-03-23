import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const renderAuthLinks = (isAuth) => {
  return isAuth ? (
    <React.Fragment>
    <NavigationItem link="/orders">Orders</NavigationItem>
    <NavigationItem link="/logout">Logout</NavigationItem>

    </React.Fragment>
  ) : (
    <NavigationItem link="/auth">Auth</NavigationItem>
  );
};
const NavigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem link="/">BurgerBuilder</NavigationItem>
    
      {renderAuthLinks(props.isAuth)}
    </ul>
  );
};
export default NavigationItems;
