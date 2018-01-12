import axios from "axios";

export default {
  user: {
    login: () => axios.get("/api/current_user")
  }
};
