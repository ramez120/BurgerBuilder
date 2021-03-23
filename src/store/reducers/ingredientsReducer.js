import * as actionTypes from "../actions/types";
import { updateObject } from "../../shared/utility";
const INITIAL_STATE = {
  ingredients: null,
  burgerPrice: 7,
  error: false,
  building :false
};
const INGREDIENT_PRICES = {
  meat: 2,
  salad: 0.5,
  cheese: 1,
  bacon: 1.75,
};
const addIngredient = (state,action) =>{
  const addedIngredient = {
    [action.payload.type]: state.ingredients[action.payload.type] + 1,
  };
  const updatedIngredients = updateObject(
    state.ingredients,
    addedIngredient
  );
  const updatedState = {
    ingredients: updatedIngredients,
    burgerPrice: state.burgerPrice + INGREDIENT_PRICES[action.payload.type],
    building :true

  };
  return updateObject(state, updatedState);

}
const removeIngredient = (state,action) =>{
  const subIngredient = {
    [action.payload.type]: state.ingredients[action.payload.type] - 1,
  };
  const newIngredients = updateObject(state.ingredients, subIngredient);
  const newState = {
    ingredients: newIngredients,
    burgerPrice: state.burgerPrice - INGREDIENT_PRICES[action.payload.type],
    building :true
  };
  return updateObject(state, newState);
}
const setInitialIngredients = (state,action) =>{
  return updateObject(state, {
    ingredients: {
      ...action.payload.initIngredients,
    },
    error: false,
    burgerPrice: 7,
    building :false
  });
}
const ingredientsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.ADD_INGREDIENT: return addIngredient(state,action);
    case actionTypes.REMOVE_INGREDIENT: return removeIngredient(state,action);
    case actionTypes.SET_INITIAL_INGREDIENTS: return setInitialIngredients(state,action);
    case actionTypes.SET_INITIAL_INGREDIENTS_FAILED: return updateObject(state, { error: true });
    default:
      return state;
  }
};
export default ingredientsReducer;
