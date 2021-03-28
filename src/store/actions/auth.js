import * as actionTypes from "../actions/types";
//import {key} from '../../keys/keys';
import axios from "axios";
let key = process.env.REACT_APP_KEY;
export const authenticationInitiate = () => {
  return {
    type: actionTypes.AUTHENTICATION_INITIATE,
  };
};

export const authenticationSuccess = (authData) => {
  return {
    type: actionTypes.AUTHENTICATION_SUCCESS,
    payload: {
      token: authData.idToken,
      userId: authData.localId,
    },
  };
};
export const authenticationFailed = (error) => {
  return {
    type: actionTypes.AUTHENTICATION_FAILED,
    payload: {
      error,
    },
  };
};
export const authenticate = (email, password, authMethod) => {
  return (dispatch) => {
    const authData = {
      email,
      password,
      returnSecureToken: true,
    };
    dispatch(authenticationInitiate());
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+key;
    if (!authMethod) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="+key;
    }
    axios
      .post(url, authData)
      .then((response) => {
        localStorage.setItem("token", response.data.idToken);
        localStorage.setItem(
          "expirationDate",
          new Date(new Date().getTime() + response.data.expiresIn * 1000)
        );
        localStorage.setItem("userId", response.data.localId);
        dispatch(authenticationSuccess(response.data));
        dispatch(setAuthTimeOut(response.data.expiresIn));
      })
      .catch((err) => {
        return dispatch(authenticationFailed(err.response.data.error.message));
      });
  };
};

export const setAuthTimeOut = (expirationTime) => {
  return (dispatch) => {
    setTimeout(() => {
      dispatch(logout());
    }, expirationTime * 1000);
  };
};
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("expirationDate");
  localStorage.removeItem("userId");
  return {
    type: actionTypes.AUTH_LOGOUT,
  };
};

export const setAuthRedirectPath = (path) => {
  return {
    type: actionTypes.SET_AUTH_REDIRECT_PATH,
    payload: {
      path,
    },
  };
};

export const checkTokenExpiration = () => {
  return (dispatch) => {
    const token = localStorage.getItem("token");
    if (!token) {
      dispatch(logout());
    } else {
      const expirationDate = new Date(localStorage.getItem("expirationDate"));
      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem("userId");
        const authData = {
          localId : userId,
          idToken : token,
        };
        dispatch(authenticationSuccess(authData));
        dispatch(
          setAuthTimeOut(
            ((expirationDate.getTime() - new Date().getTime()) / 1000)
          )
        );
      }
    }
  };
};
