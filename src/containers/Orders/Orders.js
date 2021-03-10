import classes from "./Orders.module.css";
import React, { Component } from "react";
import Order from "./Order/Order";
import axios from "../../apis/axios-orders";
import Spinner from "../../components/UI/spinner/Spinner";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
class Orders extends Component {
  state = {
    loading: true,
    orders: [],
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then((res) => {
        console.log(res.data);
        const orders = [];
        for (let key in res.data) {
          orders.push({
            ...res.data[key],

            id: key,
          });
        }
        this.setState({ orders }, () => {
          this.setState({ loading: false }, () =>
            console.log(this.state.orders)
          );
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }
  renderOrders = () => {
    if (this.state.loading) {
      return <Spinner />;
    }
    return this.state.orders.map((order) => {
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

export default withError(Orders, axios);
