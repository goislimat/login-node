import api from "../api";
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./types";

const userLoggedIn = user => ({
  type: USER_LOGGED_IN,
  user
});

const userLoggedOut = () => ({
  type: USER_LOGGED_OUT
});

export const fetchUser = () => async dispatch => {
  const user = await api.user.googleLogin();

  dispatch(userLoggedIn(user));
};

export const login = credentials => async dispatch => {
  const user = await api.user.login(credentials);

  dispatch(userLoggedIn(user));
};

export const logout = () => async dispatch => {
  await api.user.logout();

  dispatch(userLoggedOut());
};

export const signup = credentials => async dispatch => {
  const user = await api.user.signup(credentials);

  dispatch(userLoggedIn(user));
};
