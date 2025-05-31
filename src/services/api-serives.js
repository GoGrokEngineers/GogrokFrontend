import axios from "axios";

const BASE_URL = "http://139.162.134.90:8000/api/competition/";

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