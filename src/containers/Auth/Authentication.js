import React, { Component } from "react";
import axios from "../../apis/axios-orders";
import { connect } from "react-redux";
import * as actions from "../../store/actions";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import Spinner from "../../components/UI/spinner/Spinner";
import withError from "../../hoc/withErrorHandler/withErrorHandler";
import { Redirect } from "react-router-dom";
import { updateObject, checkValidity } from "../../shared/utility";
class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "Email address",
          type: "email",
        },
        value: "",
        validation: {
          required: true,
          isEmail: true,
        },
        valid: false,
        touched: false,
      },
      password: {
        elementType: "input",
        elementConfig: {
          placeholder: "Password",
          type: "password",
        },
        value: "",
        validation: {
          required: true,
          minLength: 6,
        },
        valid: false,
        touched: false,
      },
    },
    isSignUp: true,
  };
  componentDidMount() {
    if (this.props.redirectAuth !== "/" && !this.props.buildingBurger) {
      this.props.setRedirectAuthPath();
    }
  }


  formSubmitHandler = (event) => {
    event.preventDefault();
    this.props.auth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  elementChangedHandler = (event, key) => {
    const updatedKey = updateObject(this.state.controls[key], {
      value: event.target.value,
      valid: checkValidity(
        event.target.value,
        this.state.controls[key].validation
      ),
      touched: true,
    });
    const newFormData = updateObject(this.state.controls, {
      [key]: updatedKey,
    });

    this.setState({ controls: newFormData });
  };
  renderFormElements = () => {
    const fromArray = [];
    for (let key in this.state.controls) {
      fromArray.push({
        id: key,
        config: this.state.controls[key],
      });
    }
    return fromArray.map((formEl) => {
      return (
        <Input
          key={formEl.id}
          elementType={formEl.config.elementType}
          elementConfig={formEl.config.elementConfig}
          value={formEl.config.value}
          changed={(event) => this.elementChangedHandler(event, formEl.id)}
          valid={formEl.config.valid}
          touched={formEl.config.touched}
        />
      );
    });
  };
  changeAuthMethod = () => {
    this.setState((prevState) => {
      return {
        isSignUp: !prevState.isSignUp,
      };
    });
  };

  renderContent = () => {
    let form = (
      <React.Fragment>
        <form onSubmit={this.formSubmitHandler}>
          {this.renderFormElements()}
          <Button type="Success">Submit</Button>
          <br />
        </form>
        <Button type="Danger" clicked={this.changeAuthMethod}>
          {this.state.isSignUp ? "Or Sign In ?" : "Or Sign Up ?"}
        </Button>
      </React.Fragment>
    );
    if (this.props.authReducer.loading) {
      form = <Spinner />;
    }
    return form;
  };
  render() {
      
    return (
      <div
        style={{
          margin: "auto",
          width: "70%",
          textAlign: "center",
          marginBottom: "10px",
          padding: "30px 20px",
          marginTop: "15%",
          borderRadius: "5px",
          boxShadow: "0px 1px 2px gray",
        }}
      >
        {" "}
        <div style={{ color: "red" }}>
          {this.props.authReducer.error
            ? "SORRY," + this.props.authReducer.error
            : ""}
        </div>
        {this.renderContent()}
        {this.props.isAuthenticated ? (
          <Redirect to={this.props.redirectAuth} />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    authReducer: state.authReducer,
    isAuthenticated: state.authReducer.token != null,
    buildingBurger: state.ingredients.building,
    redirectAuth: state.authReducer.authRedirectPath,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    auth: (email, password, authMethod) =>
      dispatch(actions.authenticate(email, password, authMethod)),
    setRedirectAuthPath: () => dispatch(actions.setAuthRedirectPath("/")),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withError(Auth, axios));
