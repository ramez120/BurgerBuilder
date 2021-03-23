import React, { Component } from "react";
import { connect } from "react-redux";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../apis/axios-orders";
import Spinner from "../../../components/UI/spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from "../../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../../store/actions";
import { Redirect } from "react-router";
import { updateObject } from "../../../shared/utility";
import {checkValidity} from '../../../shared/utility';
class ContactData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      orderForm: {
        name: {
          elementType: "input",
          elementConfig: {
            placeholder: "your name",
            type: "text",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        street: {
          elementType: "input",
          elementConfig: {
            placeholder: "your street",
            type: "text",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        zipCode: {
          elementType: "input",
          elementConfig: {
            placeholder: "your zip code",
            type: "text",
          },
          value: "",
          validation: {
            required: true,
            maxLength: 5,
            minLength: 5,
          },
          valid: false,
          touched: false,
        },
        country: {
          elementType: "input",
          elementConfig: {
            placeholder: "your country",
            type: "text",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },
        email: {
          elementType: "input",
          elementConfig: {
            placeholder: "your email",
            type: "email",
          },
          value: "",
          validation: {
            required: true,
          },
          valid: false,
          touched: false,
        },

        deliveryMethod: {
          elementType: "select",
          elementConfig: {
            options: [
              { value: "fastest", displayValue: "Fastest" },
              { value: "cheapest", displayValue: "Cheapest" },
            ],
          },
          value: "fastest",
          validation: {},
          valid: true,
        },
      },

      isFormValid: false,
    };
    this.scrollRef = React.createRef();
  }
  componentDidMount() {
    this.scrollRef.current.scrollIntoView({ behavior: "smooth" });
  }
  handleSubmitForm = (event) => {
    event.preventDefault();
    const formData = {};
    for (let key in this.state.orderForm) {
      formData[key] = this.state.orderForm[key].value;
    }

    const order = {
      ingredients: this.props.ingredients.ingredients,
      price: this.props.ingredients.burgerPrice,
      formData,
      userId: this.props.userId,
    };
    if (
      !this.props.ingredients.ingredients ||
      !this.props.ingredients.burgerPrice
    ) {
      this.props.history.replace("/");
      return;
    }
    this.props.tryPurchase(order, this.props.token);
  };
  elementChangedHandler = (event, identifier) => {
    const updatedFormElement = updateObject(this.state.orderForm[identifier], {
      touched: true,
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.orderForm[identifier].validation
      ),
    });

    const updatedOrderForm = updateObject(this.state.orderForm, {
      [identifier]: updatedFormElement,
    });

    let validForm = true;
    for (let key in updatedOrderForm) {
      validForm = validForm && updatedOrderForm[key].valid;
    }
    this.setState({ orderForm: updatedOrderForm, isFormValid: validForm });
  };
  renderFromElements = () => {
    const fromArray = [];
    for (let key in this.state.orderForm) {
      fromArray.push({
        id: key,
        config: this.state.orderForm[key],
      });
    }
    return fromArray.map((inputEl) => {
      return (
        <Input
          key={inputEl.id}
          elementType={inputEl.config.elementType}
          elementConfig={inputEl.config.elementConfig}
          value={inputEl.config.value}
          changed={(event) => this.elementChangedHandler(event, inputEl.id)}
          valid={inputEl.config.valid}
          touched={inputEl.config.touched}
        />
      );
    });
  };

  renderContent = () => {
    if (this.props.orders.loading) return <Spinner />;
    if (this.props.orders.purchased) return <Redirect to="/" />;
    return (
      <form onSubmit={this.handleSubmitForm} ref={this.scrollRef}>
        {this.renderFromElements()}
        <Button type="Success" disabled={!this.state.isFormValid}>
          Order Now !
        </Button>
      </form>
    );
  };

  render() {
    return (
      <div
        style={{
          margin: "auto",
          width: "70%",
          boxShadow: "0px 1px 2px green",
          textAlign: "center",
          marginBottom: "10px",
          padding: "10px",
        }}
      >
        <h4>Enter your form Data here </h4>
        {this.renderContent()}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.ingredients,
    orders: state.orders,
    token: state.authReducer.token,
    userId: state.authReducer.userId,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    tryPurchase: (orderData, token) => {
      dispatch(actions.purchaseStart(orderData, token));
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(ContactData, axios));
