import { NEW_FLASH } from "../actions/types";

export default (state = "", action) => {
  switch (action.type) {
    case NEW_FLASH:
      return action.message;
    default:
      return state;
  }
};
