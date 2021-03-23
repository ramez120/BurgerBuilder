import * as actionTypes from "./types";
import axios from "../../apis/axios-orders";
export const purchaseSuccess = (id, ordeData) => {
  return {
    type: actionTypes.PURCHASE_SUCCESS,
    payload: {
      orderId: id,
      orderData: ordeData,
    },
  };
};
export const purchaseFailed = (error) => {
  return {
    type: actionTypes.PURCHASE_FAIL,
    payload: {
      error: error,
    },
  };
};
export const purchaseStart = (orderData,token) => {
  return (dispatch) => {
    dispatch(purchaseInitiate());
    axios
      .post("/orders.json?auth="+token, orderData)
      .then((response) => {
        dispatch(purchaseSuccess(response.data.name, orderData));
      })
      .catch((error) => {
        purchaseFailed(error);
      });
  };
};
export const purchaseInitiate = () => {
  return {
    type: actionTypes.PURCHASE_INITIATE,
  };
};
export const initiatePurchaseBeforeRedirect = () => {
  return {
    type: actionTypes.INITIATE_PURCHASE_BEFORE_REDIRECT,
  };
};

export const fetchOrdersSuccess = (orders) => {
  return {
    type: actionTypes.FETCH_ORDERS_SUCCESS,
    payload: {
      orders: orders,
    },
  };
};
export const fetchOrdersFail = (error) => {
  return {
    type: actionTypes.FETCH_ORDERS_FAIL,
    payload: {
      error: error,
    },
  };
};
export const fetchOrdersInit = () => {
  return {
    type: actionTypes.FETCH_ORDERS_INIT,
  };
};

export const fetchOrders = (token,userId) => (dispatch) => {
  dispatch(fetchOrdersInit());
 
  const queryParams = '?auth='+token+ '&orderBy="userId"&equalTo="'+userId+'"';
  axios
    .get("/orders.json"+queryParams)
    .then((res) => {
      const orders = [];
      for (let key in res.data) {
        orders.push({
          ...res.data[key],

          id: key,
        });
      }
      dispatch(fetchOrdersSuccess(orders));
    })
    .catch((error) => {
      dispatch(fetchOrdersFail(error));
    });
};
