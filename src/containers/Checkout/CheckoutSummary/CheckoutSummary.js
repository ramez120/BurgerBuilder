
import React from 'react';
import Burger from '../../../components/Burger/Burger';
import Button from '../../../components/UI/Button/Button';
import classes from './CheckoutSummary.module.css';
const CheckoutSummary = (props) => {

    return (
      <div className = {classes.CheckoutSummary}>
          <h1 style = {{textAlign : 'center'}}>Ready for some BURGER?!!</h1> 
        <Burger ingredients = {props.ingredients} />
        <Button type = "Danger" clicked = {props.back}>BACK</Button>
        <Button type = "Success" clicked = {props.continue}>Continue</Button>

      </div>
    );
  };

export default CheckoutSummary;