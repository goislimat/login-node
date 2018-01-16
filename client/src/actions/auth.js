import api from "../api";
import { USER_LOGGED_IN, USER_LOGGED_OUT, NEW_FLASH } from "./types";

const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

const newFlashMessage = message => ({
  type: NEW_FLASH,
  message
});

export const fetchUser = () => async dispatch => {
  const user = await api.user.googleLogin();
  dispatch(userLoggedIn(user));
};

export const login = credentials => async dispatch => {
  try {
    const res = await api.user.login(credentials);
    dispatch(userLoggedIn(res.user));
  } catch (err) {
    const message =
      err.response.data.info.message ||
      "The server had an unespected behavior. Please, contact the support.";
    dispatch(newFlashMessage(message));
  }
};

export const logout = () => async dispatch => {
  await api.user.logout();
  dispatch(userLoggedOut());
};

export const signup = credentials => async dispatch => {
  try {
    const res = await api.user.signup(credentials);
    dispatch(userLoggedIn(res.user));
  } catch (err) {
    const message =
      err.response.data.info.message ||
      "The server had an unespected behavior. Please, contact the support.";
    dispatch(newFlashMessage(message));
  }
};
