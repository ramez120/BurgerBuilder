import * as actionTypes from "../actions/types";
import { updateObject } from "../../shared/utility";
const INITIALSTATE = {
  userId: null,
  error: null,
  token: null,
  loading: false,
  authRedirectPath: "/",
};

const authInitiate = (state, action) => {
  return updateObject(state, { loading: true, error: null });
};

const authSuccess = (state, action) => {
  return updateObject(state, {
    loading: false,
    error: null,
    userId: action.payload.userId,
    token: action.payload.token,
  });
};

const authFail = (state, action) => {
  return updateObject(state, { loading: false, error: action.payload.error });
};
const logout = (action, state) => {
  return updateObject(state, { userId: null, token: null });
};
const setAuthRedirectPath = (state, action) => {
  return updateObject(state, { authRedirectPath: action.payload.path });
};

const authReducer = (state = INITIALSTATE, action) => {
  switch (action.type) {
    case actionTypes.AUTHENTICATION_INITIATE:
      return authInitiate(state, action);

    case actionTypes.AUTHENTICATION_SUCCESS:
      return authSuccess(state, action);

    case actionTypes.AUTHENTICATION_FAILED:
      return authFail(state, action);
    case actionTypes.AUTH_LOGOUT:
      return logout(state, action);
    case actionTypes.SET_AUTH_REDIRECT_PATH:
      return setAuthRedirectPath(state, action);

    default:
      return state;
  }
};

export default authReducer;
