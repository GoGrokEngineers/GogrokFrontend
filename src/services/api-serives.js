import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

const ApiService = {
  createCompetition: async (post) => {
    const { data } = await axios.post(BASE_URL, post);
    return data;
  },
  GetDailyResults: async () => {
    const { data } = await axios.get(BASE_URL);
    return data;
  },
};

export default ApiService;