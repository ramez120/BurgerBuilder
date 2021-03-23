import * as actionTypes from "../actions/types";
import { updateObject } from "../../shared/utility";
const INITIAL_STATE = {
  orders: [],
  loading: false,
  purchased: false,
};

const purchaseSuccess = (state, action) => {
  const newOrder = {
    ...action.payload.orderData,
    id: action.payload.orderId,
  };
  return updateObject(state, {
    loading: false,
    orders: state.orders.concat(newOrder),
    purchased: true,
  });
};

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.PURCHASE_SUCCESS:
      return purchaseSuccess(state, action);

    case actionTypes.PURCHASE_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.PURCHASE_INITIATE:
      return updateObject(state, { loading: true });

    case actionTypes.INITIATE_PURCHASE_BEFORE_REDIRECT:
      return updateObject(state, { purchased: false });

    case actionTypes.FETCH_ORDERS_SUCCESS:
      return updateObject(state, {
        orders: action.payload.orders,
        loading: false,
      });

    case actionTypes.FETCH_ORDERS_FAIL:
      return updateObject(state, { loading: false });

    case actionTypes.FETCH_ORDERS_INIT:
        return updateObject(state, { loading: true });

    default:
      return state;
  }
};
export default reducer;
