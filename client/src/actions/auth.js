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
  const user = await api.user.login();

  dispatch(userLoggedIn(user.data));
};

export const logout = () => async dispatch => {
  await api.user.logout();

  dispatch(userLoggedOut());
};
