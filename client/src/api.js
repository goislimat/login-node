import axios from "axios";

export default {
  user: {
    login: async () => {
      const res = await axios.get("/api/current_user");
      return res.data;
    },
    logout: () => axios.get("/api/logout"),
    signup: async credentials => {
      const res = await axios.post("/api/signup", credentials);
      // console.log(res);
      return res.data;
    }
  }
};
