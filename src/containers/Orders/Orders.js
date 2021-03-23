import classes from "./Orders.module.css";
import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../apis/axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions";
import { connect } from "react-redux";
class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders(this.props.token,this.props.userId);
  }
  renderOrders = () => {
    
    if (this.props.orders.loading) {
      return <Spinner />;
    }
    return this.props.orders.orders.map((order) => {
      return (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          price={order.price}
        />
      );
    });
  };
  render() {
    return <div className={classes.Orders}>{this.renderOrders()}</div>;
  }
}
const mapStateToProps = (state) => {
  return {
    orders: state.orders,
    token : state.authReducer.token,
    userId : state.authReducer.userId
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    fetchOrders: (token,userId) => {
      dispatch(actions.fetchOrders(token,userId));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Orders, axios));
