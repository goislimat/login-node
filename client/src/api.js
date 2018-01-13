import axios from "axios";

export default {
  user: {
    googleLogin: async () => {
      const res = await axios.get("/api/current_user");
      return res.data;
    },
    login: async credentials => {
      const res = await axios.post("/api/login", credentials);
      return res.data;
    },
    logout: () => axios.get("/api/logout"),
    signup: async credentials => {
      const res = await axios.post("/api/signup", credentials);
      return res.data;
    }
  }
};
