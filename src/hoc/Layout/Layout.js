import React, { Component } from "react";
import Aux from "../Auxillary/Auxillary";
import Toolbar from "../../components/navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/navigation/SideDrawer/SideDrawer";
import classes from "./Layout.module.css";
import { connect } from "react-redux";
class Layout extends Component {
  state = { showSideDrawer: false };
  closeBackdropHandler = () => {
    this.setState({ showSideDrawer: false });
  };
  ToggleDrawerHandler = () => {
    this.setState((prevState) => {
      return {
        showSideDrawer: !prevState.showSideDrawer,
      };
    });
  };
  render() {
    return (
      <Aux>
        <Toolbar
          ToggleDrawer={this.ToggleDrawerHandler}
          isAuth={this.props.isAuth}
        />
        <SideDrawer
          isAuth={this.props.isAuth}
          open={this.state.showSideDrawer}
          closed={this.closeBackdropHandler}
        />

        <main className={classes.Content}>{this.props.children}</main>
      </Aux>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    isAuth: state.authReducer.token != null,
  };
};
export default connect(mapStateToProps)(Layout);
