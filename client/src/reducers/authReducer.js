import { USER_LOGGED_IN, USER_LOGGED_OUT } from "../actions/types";

export default (state = { loaded: false }, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
    case USER_LOGGED_OUT:
      return { loaded: true, user: action.user || {} };
    default:
      return state;
  }
};
