import { USER_LOGGED_IN } from "../actions/types";

export default (state = { loaded: false }, action) => {
  switch (action.type) {
    case USER_LOGGED_IN:
      return { loaded: true, user: action.user || {} };
    default:
      return state;
  }
};
