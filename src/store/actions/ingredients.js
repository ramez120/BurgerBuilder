import * as actionTypes from "../actions/types";
import axios from "../../apis/axios-orders";

export const addIngredient = (type) => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    payload: { type },
  };
};
export const removeIngredient = (type) => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    payload: { type },
  };
};
export const setIngredients = (ingredients) => {
  return {
    type: actionTypes.SET_INITIAL_INGREDIENTS,
    payload: {
      initIngredients: {
        salad: ingredients.salad,
        cheese: ingredients.cheese,
        meat: ingredients.meat,
        bacon: ingredients.bacon,
      },
    },
  };
};
export const setIngredientsFailed = () => {
  return {
    type: actionTypes.SET_INITIAL_INGREDIENTS_FAILED,
  };
};

export const initIngredients = () => {
  return (dispatch) => {
    axios
      .get("/ingredients.json")
      .then((response) => {
        dispatch(setIngredients(response.data));
      })
      .catch(() => dispatch(setIngredientsFailed()));
  };
};
