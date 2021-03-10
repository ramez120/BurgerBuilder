import React, { Component, createRef } from "react";
import Button from "../../../components/UI/Button/Button";
import axios from "../../../apis/axios-orders";
import Spinner from "../../../components/UI/spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
class ContactData extends Component {
  constructor(props){
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
        validation :{
          required : true
        },
        valid : false,
        touched :false
      },
      street: {
        elementType: "input",
        elementConfig: {
          placeholder: "your street",
          type: "text",
        },
        value: "",
        validation :{
          required : true
        },
        valid : false,
        touched :false
      },
      zipCode: {
        elementType: "input",
        elementConfig: {
          placeholder: "your zip code",
          type: "text",
          
        },
        value: "",
        validation :{
          required : true,
          maxLength : 5,
          minLength : 5
        },
        valid : false,
        touched :false
      },
      country: {
        elementType: "input",
        elementConfig: {
          placeholder: "your country",
          type: "text",
        },
        value: "",
        validation :{
          required : true
        },
        valid : false,
        touched :false
      },
      email: {
        elementType: "input",
        elementConfig: {
          placeholder: "your email",
          type: "email",
        },
        value: "",
        validation :{
          required : true
        },
        valid : false,
        touched :false
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
        validation : {},
        valid :true
      },
     
    },
    loading: false,
    isFormValid : false
  };
  this.scrollRef = React.createRef(); 
}
  componentDidMount(){
      this.scrollRef.current.scrollIntoView();
  }
  handleSubmitForm = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const formData = {}
      for(let key in this.state.orderForm){
        formData[key] = this.state.orderForm[key];
      }
    
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData
    };
    if(!this.props.ingredients || !this.props.price){
      this.props.history.replace("/");
      return;
    }
    axios
      .post("/orders.json", order)
      .then((response) => {
        this.setState({ loading: false }, () => {
          this.props.history.push("/");
        });

        return;
      })
      .catch((error) => {
        console.log(error);
        this.setState({ loading: false }, () => {
          this.props.history.push("/");
        });
        return;
      });
  };
  elementChangedHandler = (event, identifier) => {
    
    const updatedOrderForm = {...this.state.orderForm};
    const updatedFormElement = {...updatedOrderForm[identifier]};
    updatedFormElement.touched = true;

     updatedFormElement.value = event.target.value;
     updatedFormElement.valid = this.checkValidity(updatedFormElement.value, updatedFormElement.validation);
     console.log(updatedFormElement)
     updatedOrderForm[identifier] = updatedFormElement;
     let validForm = true;
     for(let key in updatedOrderForm){
       console.log(updatedOrderForm[key])
      validForm = validForm && updatedOrderForm[key].valid
     }
     this.setState({orderForm : updatedOrderForm, isFormValid : validForm})

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
          valid = {inputEl.config.valid}
          touched = {inputEl.config.touched}
        />
      );
    });
  };

  renderContent = () => {
    if (this.state.loading) return <Spinner />;
    return (
      <form onSubmit = {this.handleSubmitForm} ref = {this.scrollRef}>
        {this.renderFromElements()}
        <Button type="Success" disabled = {!this.state.isFormValid}>
          Order Now !
        </Button>
      </form>
    );
  };
  checkValidity = (value, vaildationRules) =>{
     let isValid = true;
    if(vaildationRules.required){
        isValid = value.trim() !== ''&& isValid; 
    }
    if(vaildationRules.maxLength){
      isValid = (value.length <= vaildationRules.maxLength) && isValid;
    }
    if(vaildationRules.minLength){
      isValid = (value.length >= vaildationRules.minLength) && isValid;
    }
    return isValid;
  }
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

export default ContactData;
